"""
Links the 664 seeded Permission rows (and a handful of extra codenames the
frontend checks for that the module catalogue never generated) to the 5
default Roles via RolePermission. seed_permissions only ever created the
Permission and Role rows themselves — nothing linked them, so hasPermission()
was always False for every user, including Superadmin.
"""
from django.core.management.base import BaseCommand
from django.db import transaction
from apps.roles.models import Permission, Role, RolePermission


# Frontend (Sidebar.jsx) gates a handful of items on codenames that don't
# come out of any module in seed_permissions's MODULES catalogue.
EXTRA_PERMISSION_CODES = [
    'academic_class', 'academic_section', 'college', 'course', 'leave', 'role', 'staff', 'timetable', 'user',
]

# Modules relevant to each non-admin default role. Superadmin/Admin get
# (almost) everything; Teacher/Student/Staff get a scoped slice so their
# dashboards and sidebars visibly differ.
TEACHER_MODULES = {
    'teacher', 'academic_activity', 'lessonplan', 'student', 'guardian',
    'attendance', 'exam', 'exam_mark', 'messaging', 'announcement', 'event',
    'library', 'user_leave', 'leave_management',
}
STUDENT_MODULES = {
    'student', 'academic_activity', 'attendance', 'exam', 'exam_mark',
    'library', 'announcement', 'event', 'messaging', 'online_exam',
    'certificate', 'scholarship', 'guardian', 'lessonplan',
}
STAFF_MODULES = {
    'human_resource', 'front_office', 'inventory', 'asset_management',
    'complain', 'payroll', 'accounting', 'report', 'transport', 'hostel',
}

VIEW_ONLY_ACTIONS = {'view'}


class Command(BaseCommand):
    help = 'Link seeded permissions to the 5 default roles (Superadmin, Admin, Teacher, Student, Staff)'

    def handle(self, *args, **options):
        self._ensure_extra_permissions()

        roles = {r.name: r for r in Role.objects.filter(is_default=True)}
        missing = {'Superadmin', 'Admin', 'Teacher', 'Student', 'Staff'} - set(roles)
        if missing:
            self.stdout.write(self.style.ERROR(
                f'Missing default roles: {missing}. Run `seed_permissions` first.'
            ))
            return

        all_permissions = list(Permission.objects.all())
        superadmin_only = [p for p in all_permissions if '(Only Super Admin)' in p.description]
        superadmin_only_ids = {p.id for p in superadmin_only}

        with transaction.atomic():
            self._assign(roles['Superadmin'], all_permissions)
            self._assign(roles['Admin'], [p for p in all_permissions if p.id not in superadmin_only_ids])
            self._assign(roles['Teacher'], self._scoped(all_permissions, TEACHER_MODULES))
            self._assign(roles['Student'], self._scoped(all_permissions, STUDENT_MODULES, view_only=True))
            self._assign(roles['Staff'], self._scoped(all_permissions, STAFF_MODULES))

        for name, role in roles.items():
            count = RolePermission.objects.filter(role=role).count()
            self.stdout.write(self.style.SUCCESS(f'✓ {name}: {count} permissions linked'))

    def _ensure_extra_permissions(self):
        created = 0
        for code in EXTRA_PERMISSION_CODES:
            for action in ('view', 'add', 'edit', 'delete'):
                name = f'{action}_{code}'
                _, was_created = Permission.objects.get_or_create(
                    name=name,
                    defaults={'module': 'core', 'description': f'{action.title()} permission for {code} (core)'},
                )
                if was_created:
                    created += 1
        if created:
            self.stdout.write(self.style.SUCCESS(f'✓ Created {created} additional core permissions'))

    def _scoped(self, all_permissions, modules, view_only=False):
        result = []
        for p in all_permissions:
            if p.module not in modules:
                continue
            if view_only and not p.name.startswith('view_'):
                continue
            result.append(p)
        return result

    def _assign(self, role, permissions):
        RolePermission.objects.filter(role=role).delete()
        RolePermission.objects.bulk_create(
            [RolePermission(role=role, permission=p) for p in permissions],
            ignore_conflicts=True,
        )
