"""
Database router for multi-school multi-database support.
Routes database queries to the appropriate database based on school selection.
"""
from threading import local
from django.conf import settings

# Thread-local storage for database context
_thread_local = local()


class SchoolDatabaseRouter:
    """
    A router to control database operations on models based on school selection.
    """

    def db_for_read(self, model, **hints):
        """
        Direct read operations to the appropriate database based on selected school.
        """
        return self.get_db_for_school()

    def db_for_write(self, model, **hints):
        """
        Direct write operations to the appropriate database based on selected school.
        """
        return self.get_db_for_school()

    def allow_relation(self, obj1, obj2, **hints):
        """
        Allow relations between objects in the same database.
        """
        db1 = self.get_db_for_school()
        db2 = self.get_db_for_school()
        return db1 == db2

    def allow_migrate(self, db, app_label, model_name=None, **hints):
        """
        Ensure migrations run on the primary database.
        """
        return db == 'default'

    @staticmethod
    def get_db_for_school():
        """
        Get the database name for the current school context.

        NOTE: this router previously sent school2 traffic to a hardcoded
        'secondary' database (SECONDARY_DB_* in settings). That connection
        points at an unreachable/unmigrated host in every environment this
        has been run in, so selecting school2 turned every single API call
        into a 500. The real, currently-populated multi-tenant model is
        college_id-based row isolation within one database (see
        CollegeIsolatedModel + the X-School-Id header read directly in
        views like apps.dashboard.views), not separate physical databases.
        Always routing to 'default' here makes that the only DB in play
        until true per-tenant database provisioning is actually built and
        verified end-to-end.
        """
        return 'default'

    @staticmethod
    def set_school(school_id):
        """
        Set the current school context for database operations.

        Args:
            school_id: 'school1' or 'school2'
        """
        _thread_local.school_id = school_id

    @staticmethod
    def get_current_school():
        """
        Get the currently selected school.
        """
        return getattr(_thread_local, 'school_id', 'school1')

    @staticmethod
    def clear_school():
        """
        Clear the school context.
        """
        if hasattr(_thread_local, 'school_id'):
            del _thread_local.school_id
