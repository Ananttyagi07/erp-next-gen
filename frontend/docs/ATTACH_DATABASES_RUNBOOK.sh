#!/bin/bash
# Database Attachment Runbook
# Run this script step by step to attach your databases

set -e

echo "╔══════════════════════════════════════════════════════════════╗"
echo "║     DATABASE ATTACHMENT RUNBOOK - Erp_Database Setup        ║"
echo "╚══════════════════════════════════════════════════════════════╝"

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Step 1: Check PostgreSQL
echo -e "\n${BLUE}[STEP 1]${NC} Checking PostgreSQL Installation..."
if pg_isready -h localhost -p 5432 > /dev/null 2>&1; then
    echo -e "${GREEN}✅ PostgreSQL is running on localhost:5432${NC}"
else
    echo -e "${RED}❌ PostgreSQL is not running${NC}"
    echo "   Start with: brew services start postgresql"
    exit 1
fi

# Step 2: Check databases
echo -e "\n${BLUE}[STEP 2]${NC} Checking for Target Databases..."
PSQL_CMD="psql -U postgres -h localhost"

DBS=$($PSQL_CMD -c "\l" 2>/dev/null | grep -E "Erp_Database|erp_university" || true)

if [ -z "$DBS" ]; then
    echo -e "${YELLOW}⚠️  No matching databases found${NC}"
    echo "   Creating Erp_Database and Erp_Database2..."
    
    createdb -U postgres "Erp_Database" 2>/dev/null || true
    createdb -U postgres "Erp_Database2" 2>/dev/null || true
    
    echo -e "${GREEN}✅ Databases created${NC}"
else
    echo -e "${GREEN}✅ Found databases:${NC}"
    echo "$DBS"
fi

# Step 3: Setup admin user
echo -e "\n${BLUE}[STEP 3]${NC} Setting up admin user..."

# Create admin user if not exists
$PSQL_CMD -c "CREATE USER admin WITH PASSWORD 'admin';" 2>/dev/null || true

# Grant privileges
$PSQL_CMD -c "GRANT ALL PRIVILEGES ON DATABASE \"Erp_Database\" TO admin;" 2>/dev/null || true
$PSQL_CMD -c "GRANT ALL PRIVILEGES ON DATABASE \"Erp_Database2\" TO admin;" 2>/dev/null || true

echo -e "${GREEN}✅ Admin user configured${NC}"

# Step 4: Test connections
echo -e "\n${BLUE}[STEP 4]${NC} Testing Connections..."

for DB in "Erp_Database" "Erp_Database2"; do
    if PGPASSWORD=admin psql -U admin -h localhost -d "$DB" -c "SELECT 1;" > /dev/null 2>&1; then
        echo -e "${GREEN}✅ $DB: Connected${NC}"
    else
        echo -e "${RED}❌ $DB: Connection failed${NC}"
        echo "   Run: PGPASSWORD=admin psql -U admin -h localhost -d $DB"
        exit 1
    fi
done

# Step 5: Update Django .env
echo -e "\n${BLUE}[STEP 5]${NC} Updating Django Configuration..."

DJANGO_DIR="/Users/ayushkumar/Desktop/ERP-MAIN-PROJECT-master/backend"
ENV_FILE="$DJANGO_DIR/.env"

if [ -f "$ENV_FILE" ]; then
    echo "Current .env file:"
    grep "^DATABASE_" "$ENV_FILE"
    
    echo -e "\n${YELLOW}Please update the following in $ENV_FILE:${NC}"
    echo "  DATABASE_NAME=Erp_Database"
    echo "  DATABASE_USER=admin"
    echo "  DATABASE_PASSWORD=admin"
    echo "  DATABASE_HOST=localhost"
    echo "  DATABASE_PORT=5432"
else
    echo -e "${RED}❌ .env file not found at $ENV_FILE${NC}"
    exit 1
fi

# Step 6: Django check
echo -e "\n${BLUE}[STEP 6]${NC} Running Django System Check..."

cd "$DJANGO_DIR"
source venv/bin/activate 2>/dev/null || python -m venv venv && source venv/bin/activate

if python manage.py check > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Django configuration OK${NC}"
else
    echo -e "${RED}❌ Django check failed${NC}"
    python manage.py check
    exit 1
fi

# Step 7: Test Django connection
echo -e "\n${BLUE}[STEP 7]${NC} Testing Django Database Connection..."

python manage.py shell << PYTHON
from django.db import connection
cursor = connection.cursor()
cursor.execute("SELECT 1")
result = cursor.fetchone()
if result:
    print("✅ Django connected to database")
PYTHON

# Step 8: Summary
echo -e "\n${GREEN}╔══════════════════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║           ✅ DATABASE ATTACHMENT COMPLETE!                    ║${NC}"
echo -e "${GREEN}╚══════════════════════════════════════════════════════════════╝${NC}"

echo -e "\n${BLUE}Next Steps:${NC}"
echo "1. Verify .env file is updated correctly"
echo "2. Run migrations: python manage.py migrate"
echo "3. Create superuser: python manage.py createsuperuser"
echo "4. Start server: python manage.py runserver"
echo "5. Visit: http://localhost:8000/api/"

