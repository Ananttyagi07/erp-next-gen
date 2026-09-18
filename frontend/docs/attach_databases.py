#!/usr/bin/env python3
"""
Script to attach existing databases to Django backend
Handles: Erp_Database and Erp_Database2 with admin/admin credentials
"""

import os
import sys
import psycopg2
from pathlib import Path

# Configuration
DB_HOST = 'localhost'
DB_PORT = 5432
DB_USER = 'admin'
DB_PASSWORD = 'admin'
DATABASES_TO_CHECK = ['Erp_Database', 'Erp_Database2']

def test_connection(host, port, user, password, database=None):
    """Test PostgreSQL connection"""
    try:
        conn = psycopg2.connect(
            host=host,
            port=port,
            user=user,
            password=password,
            database=database or 'postgres'
        )
        cursor = conn.cursor()
        cursor.execute("SELECT version();")
        version = cursor.fetchone()[0]
        cursor.close()
        conn.close()
        return True, version
    except psycopg2.Error as e:
        return False, str(e)

def list_databases(host, port, user, password):
    """List all databases"""
    try:
        conn = psycopg2.connect(
            host=host,
            port=port,
            user=user,
            password=password,
            database='postgres'
        )
        cursor = conn.cursor()
        cursor.execute("""
            SELECT datname FROM pg_database
            WHERE datistemplate = false
            ORDER BY datname
        """)
        databases = [row[0] for row in cursor.fetchall()]
        cursor.close()
        conn.close()
        return databases
    except psycopg2.Error as e:
        return None

def get_database_size(host, port, user, password, database):
    """Get database size"""
    try:
        conn = psycopg2.connect(
            host=host,
            port=port,
            user=user,
            password=password,
            database=database
        )
        cursor = conn.cursor()
        cursor.execute("""
            SELECT pg_size_pretty(pg_database_size('%s'))
        """ % database)
        size = cursor.fetchone()[0]
        cursor.close()
        conn.close()
        return size
    except psycopg2.Error as e:
        return None

def get_table_count(host, port, user, password, database):
    """Get table count in database"""
    try:
        conn = psycopg2.connect(
            host=host,
            port=port,
            user=user,
            password=password,
            database=database
        )
        cursor = conn.cursor()
        cursor.execute("""
            SELECT COUNT(*) FROM information_schema.tables
            WHERE table_schema = 'public'
        """)
        count = cursor.fetchone()[0]
        cursor.close()
        conn.close()
        return count
    except psycopg2.Error as e:
        return None

def main():
    print("=" * 80)
    print("DATABASE ATTACHMENT TOOL")
    print("=" * 80)

    # Step 1: Test connection
    print("\n[1] Testing PostgreSQL Connection...")
    print(f"    Host: {DB_HOST}:{DB_PORT}")
    print(f"    User: {DB_USER}")

    success, result = test_connection(DB_HOST, DB_PORT, DB_USER, DB_PASSWORD)

    if not success:
        print(f"    ❌ Connection failed: {result}")
        print("\n    Troubleshooting:")
        print("    - Is PostgreSQL running? (pg_isready)")
        print("    - Is user 'admin' created?")
        print("    - Is password 'admin' correct?")
        print("    - Check PostgreSQL logs")
        return False

    print(f"    ✅ Connection successful!")
    print(f"    PostgreSQL: {result.split(',')[0]}")

    # Step 2: List databases
    print("\n[2] Scanning Available Databases...")
    databases = list_databases(DB_HOST, DB_PORT, DB_USER, DB_PASSWORD)

    if databases is None:
        print("    ❌ Could not list databases")
        return False

    print(f"    Found {len(databases)} database(s):")
    for db in databases:
        print(f"      - {db}")

    # Step 3: Check for target databases
    print("\n[3] Checking for Target Databases...")
    found_databases = {}

    for target_db in DATABASES_TO_CHECK:
        if target_db in databases:
            size = get_database_size(DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, target_db)
            tables = get_table_count(DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, target_db)
            print(f"    ✅ {target_db}")
            print(f"       Size: {size}")
            print(f"       Tables: {tables}")
            found_databases[target_db] = {
                'size': size,
                'tables': tables
            }
        else:
            print(f"    ❌ {target_db} - NOT FOUND")

    if not found_databases:
        print("\n    ⚠️  No target databases found!")
        print("    Please create Erp_Database and Erp_Database2 in pgAdmin4")
        return False

    # Step 4: Generate Django settings
    print("\n[4] Generating Django Configuration...")

    django_config = generate_django_config(found_databases, DB_HOST, DB_PORT, DB_USER, DB_PASSWORD)

    print("\n" + "=" * 80)
    print("DJANGO SETTINGS.PY - DATABASE CONFIGURATION")
    print("=" * 80)
    print(django_config)

    # Step 5: Generate .env file
    print("\n" + "=" * 80)
    print(".ENV FILE - DATABASE CONFIGURATION")
    print("=" * 80)

    env_config = generate_env_config(found_databases)
    print(env_config)

    # Step 6: Save configuration
    save_location = Path("/Users/ayushkumar/Desktop/DATABASE_CONNECTION_CONFIG.txt")
    with open(save_location, 'w') as f:
        f.write("DJANGO SETTINGS.PY - DATABASE CONFIGURATION\n")
        f.write("=" * 80 + "\n")
        f.write(django_config)
        f.write("\n\n")
        f.write(".ENV FILE - DATABASE CONFIGURATION\n")
        f.write("=" * 80 + "\n")
        f.write(env_config)

    print(f"\n✅ Configuration saved to: {save_location}")

    # Step 7: Next steps
    print("\n" + "=" * 80)
    print("NEXT STEPS")
    print("=" * 80)
    print("""
1. Update Django settings.py with the configuration above:
   - Copy DATABASES dictionary to config/settings/base.py

2. Update .env file:
   - Update DATABASE_NAME to the actual database name
   - Update DATABASE_PASSWORD to match (currently 'admin')

3. Run migrations:
   cd /Users/ayushkumar/Desktop/ERP-MAIN-PROJECT-master/backend
   python manage.py migrate

4. Create superuser (if needed):
   python manage.py createsuperuser

5. Start Django server:
   python manage.py runserver

6. Test database connection:
   python manage.py shell
   >>> from django.db import connection
   >>> cursor = connection.cursor()
   >>> cursor.execute("SELECT 1")
   >>> print("✅ Database connected!")
    """)

    return True

def generate_django_config(found_databases, host, port, user, password):
    """Generate Django DATABASES configuration"""

    config = """
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'erp_university',  # Default database
        'USER': 'erp_user',
        'PASSWORD': 'erp_password',
        'HOST': 'localhost',
        'PORT': '5432',
    },
"""

    # Add found databases
    db_index = 1
    for db_name in found_databases.keys():
        config += f"""
    'tenant_{db_index}': {{
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': '{db_name}',
        'USER': '{user}',
        'PASSWORD': '{password}',
        'HOST': '{host}',
        'PORT': '{port}',
    }},
"""
        db_index += 1

    config += "}\n"
    return config

def generate_env_config(found_databases):
    """Generate .env configuration"""

    config = ""

    for idx, (db_name, info) in enumerate(found_databases.items(), 1):
        config += f"""
# Database {idx}: {db_name}
DATABASE_{idx}_NAME={db_name}
DATABASE_{idx}_USER=admin
DATABASE_{idx}_PASSWORD=admin
DATABASE_{idx}_HOST=localhost
DATABASE_{idx}_PORT=5432
"""

    return config

if __name__ == '__main__':
    try:
        success = main()
        sys.exit(0 if success else 1)
    except Exception as e:
        print(f"\n❌ Error: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)
