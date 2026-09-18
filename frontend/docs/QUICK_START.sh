#!/bin/bash

# Manage School - Quick Start Script
# This script sets up and starts both backend and frontend

echo "================================"
echo "Manage School - Quick Start"
echo "================================"
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Step 1: Backend Setup and Start
echo -e "${BLUE}Step 1: Setting up Backend...${NC}"
cd /Users/ayushkumar/Desktop/ERP-MAIN-PROJECT-master/backend

# Check if virtual environment exists
if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
source venv/bin/activate

# Install dependencies
echo "Installing backend dependencies..."
pip install -q -r requirements.txt 2>/dev/null || echo "Requirements already satisfied"

# Apply migrations
echo "Applying database migrations..."
python3 manage.py migrate --noinput > /dev/null 2>&1

# Apply colleges migrations specifically
python3 manage.py migrate colleges --noinput > /dev/null 2>&1

echo -e "${GREEN}✓ Backend setup complete${NC}"
echo ""

# Step 2: Frontend Setup
echo -e "${BLUE}Step 2: Setting up Frontend...${NC}"
cd /Users/ayushkumar/Desktop/frontend

# Install dependencies
echo "Installing frontend dependencies..."
npm install --silent 2>/dev/null || npm install 2>&1 | tail -5

# Ensure required packages are installed
npm list xlsx > /dev/null 2>&1 || npm install -q xlsx
npm list jspdf > /dev/null 2>&1 || npm install -q jspdf
npm list jspdf-autotable > /dev/null 2>&1 || npm install -q jspdf-autotable

echo -e "${GREEN}✓ Frontend setup complete${NC}"
echo ""

# Summary
echo "================================"
echo -e "${GREEN}Setup Complete!${NC}"
echo "================================"
echo ""
echo "To start the application:"
echo ""
echo -e "${BLUE}Terminal 1 - Backend:${NC}"
echo "  cd /Users/ayushkumar/Desktop/ERP-MAIN-PROJECT-master/backend"
echo "  source venv/bin/activate"
echo "  python3 manage.py runserver 0.0.0.0:8004"
echo ""
echo -e "${BLUE}Terminal 2 - Frontend:${NC}"
echo "  cd /Users/ayushkumar/Desktop/frontend"
echo "  npm run dev"
echo ""
echo -e "${GREEN}Then open:${NC}"
echo "  http://localhost:5173/admin/manage-school"
echo ""
echo "API Documentation: http://localhost:8004/api/colleges/"
echo ""
