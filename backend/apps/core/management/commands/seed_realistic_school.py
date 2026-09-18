"""
Builds two realistic branches of one school (not the generic "College 1/2"
placeholder data from seed_data.py): staff with real school designations
(Principal, Vice Principal, lab assistants, librarian, art/music/yoga
teachers...), subject-teacher-class assignments, 500-600 students per
branch spread across classes 1-10, attendance history, and fee/invoice/
payment records — with the two branches deliberately different in scale
so switching between them in the demo actually shows a difference.
"""
import random
from datetime import timedelta, date
from decimal import Decimal

from django.core.management.base import BaseCommand
from django.db import transaction
from django.utils import timezone

from apps.colleges.models import College, Department
from apps.hr.models import Designation, Employee
from apps.academic.models import SchoolClass, ClassSection, Subject
from apps.teachers.models import Teacher
from apps.students.models import Student
from apps.users.models import User, UserRoleAssignment
from apps.roles.models import Role
from apps.attendance.models import StudentAttendance
from apps.accounting.models import FeeType, Invoice, Payment


FIRST_NAMES_M = [
    'Aarav', 'Vivaan', 'Aditya', 'Vihaan', 'Arjun', 'Sai', 'Reyansh', 'Krishna',
    'Ishaan', 'Rohan', 'Kabir', 'Aryan', 'Dhruv', 'Karan', 'Siddharth', 'Rahul',
    'Amit', 'Vikram', 'Rajesh', 'Suresh', 'Manoj', 'Anil', 'Sanjay', 'Deepak',
    'Ravi', 'Ajay', 'Nikhil', 'Varun', 'Gaurav', 'Harsh',
]
FIRST_NAMES_F = [
    'Saanvi', 'Ananya', 'Aadhya', 'Diya', 'Ira', 'Myra', 'Anika', 'Pari',
    'Kavya', 'Riya', 'Sneha', 'Pooja', 'Neha', 'Priya', 'Divya', 'Shreya',
    'Meera', 'Kavita', 'Sunita', 'Anjali', 'Nisha', 'Rekha', 'Swati', 'Ritu',
    'Preeti', 'Kiran', 'Asha', 'Deepa', 'Geeta', 'Manisha',
]
LAST_NAMES = [
    'Sharma', 'Verma', 'Gupta', 'Kumar', 'Singh', 'Patel', 'Mehta', 'Joshi',
    'Malhotra', 'Kapoor', 'Reddy', 'Nair', 'Iyer', 'Chatterjee', 'Banerjee',
    'Mukherjee', 'Agarwal', 'Bansal', 'Chopra', 'Saxena', 'Tiwari', 'Yadav',
    'Rao', 'Pillai', 'Menon', 'Das', 'Ghosh', 'Roy', 'Bhat', 'Desai',
]

SUBJECTS = ['English', 'Hindi', 'Mathematics', 'Science', 'Social Studies',
            'Computer Science']

SPECIAL_DESIGNATIONS = [
    ('Principal', 1),
    ('Vice Principal', 1),
    ('Head Teacher', 1),
    ('Librarian', 1),
    ('Computer Lab Teacher', 1),
    ('Computer Lab Assistant', 1),
    ('Chemistry Lab Assistant', 1),
    ('Physics Lab Assistant', 1),
    ('Biology Lab Assistant', 1),
    ('Art Teacher', 2),
    ('Music Teacher', 2),
    ('Yoga & PE Teacher', 2),
]
SUBJECT_TEACHER_DESIGNATION = 'Subject Teacher'
OFFICE_DESIGNATIONS = ['Office Manager', 'Account Manager', 'IT Head', 'Support Staff']


def unique_name(used, pool_f=FIRST_NAMES_F, pool_m=FIRST_NAMES_M):
    while True:
        gender = random.choice(['M', 'F'])
        first = random.choice(pool_m if gender == 'M' else pool_f)
        last = random.choice(LAST_NAMES)
        key = f'{first} {last}'
        if key not in used:
            used.add(key)
            return first, last, gender


class Command(BaseCommand):
    help = 'Seed two realistic school branches with staff, students, attendance and fees'

    def add_arguments(self, parser):
        parser.add_argument('--branch1-students', type=int, default=580)
        parser.add_argument('--branch2-students', type=int, default=430)

    def handle(self, *args, **options):
        used_names = set()

        branches = [
            {
                'college_id': 1,
                'name': 'Greenwood Public School — Rohini Campus',
                'code': 'GPS-ROH',
                'admin_title': 'Principal',
                'student_count': options['branch1_students'],
                'attendance_days': 25,
                'fee_paid_ratio': 0.78,
            },
            {
                'college_id': 2,
                'name': 'Greenwood Public School — Dwarka Campus',
                'code': 'GPS-DWK',
                'admin_title': 'IT Head',
                'student_count': options['branch2_students'],
                'attendance_days': 18,
                'fee_paid_ratio': 0.55,
            },
        ]

        roles = {r.name: r for r in Role.objects.filter(is_default=True)}

        for cfg in branches:
            with transaction.atomic():
                self._wipe_branch_data(cfg['college_id'])
                self.seed_branch(cfg, roles, used_names)

        self.stdout.write(self.style.SUCCESS('\n✓ Both branches seeded.'))

    def _wipe_branch_data(self, college_id):
        """
        Clear out the generic university-themed demo data (from
        seed_data.py, run earlier) for this college before laying down the
        realistic school dataset — otherwise old SchoolClass rows like
        "First Year (FY)" collide with the new "Class 1..10" ones on the
        same (college, numeric_name) key and keep their old name.

        This deletes the Teacher/Student/Employee accounts seed_data.py
        created for this college (and only this college) — including
        whichever of those happened to be handed out earlier as demo
        credentials. superadmin@erp.local and admin@erp.local are never
        touched: they aren't Teacher/Student/Employee profiles.
        """
        user_ids = set(
            Teacher.objects.filter(college_id=college_id).values_list('user_id', flat=True)
        ) | set(
            Student.objects.filter(college_id=college_id).values_list('user_id', flat=True)
        ) | set(
            Employee.objects.filter(college_id=college_id).values_list('user_id', flat=True)
        )

        Payment.objects.filter(college_id=college_id).delete()
        Invoice.objects.filter(college_id=college_id).delete()
        StudentAttendance.objects.filter(college_id=college_id).delete()
        Student.objects.filter(college_id=college_id).delete()
        Teacher.objects.filter(college_id=college_id).delete()
        Employee.objects.filter(college_id=college_id).delete()
        Subject.objects.filter(college_id=college_id).delete()
        ClassSection.objects.filter(college_id=college_id).delete()
        SchoolClass.objects.filter(college_id=college_id).delete()
        Designation.objects.filter(college_id=college_id).delete()
        FeeType.objects.filter(college_id=college_id).delete()

        if user_ids:
            User.objects.filter(id__in=user_ids).delete()

    def seed_branch(self, cfg, roles, used_names):
        college, _ = College.objects.update_or_create(
            id=cfg['college_id'],
            defaults={'name': cfg['name'], 'code': cfg['code']},
        )
        self.stdout.write(self.style.SUCCESS(f"\n=== {college.name} ==="))

        department, _ = Department.objects.get_or_create(
            college=college, name='Academics', defaults={'code': 'ACAD'}
        )

        # Designations
        designation_objs = {}
        for name, _count in SPECIAL_DESIGNATIONS:
            d, _ = Designation.objects.get_or_create(college=college, name=name)
            designation_objs[name] = d
        subj_designation, _ = Designation.objects.get_or_create(
            college=college, name=SUBJECT_TEACHER_DESIGNATION
        )
        for name in OFFICE_DESIGNATIONS:
            d, _ = Designation.objects.get_or_create(college=college, name=name)
            designation_objs[name] = d
        designation_objs[SUBJECT_TEACHER_DESIGNATION] = subj_designation

        # Classes 1-10, sections A & B
        classes = []
        for n in range(1, 11):
            sc, _ = SchoolClass.objects.get_or_create(
                college=college, numeric_name=n, defaults={'name': f'Class {n}'}
            )
            sections = []
            for sec_name in ['A', 'B']:
                sec, _ = ClassSection.objects.get_or_create(
                    college=college, school_class=sc, name=sec_name
                )
                sections.append(sec)
            classes.append((sc, sections))

        # --- Staff: special designations first ---
        joining_base = timezone.now().date() - timedelta(days=365 * 4)
        admin_user = None
        email_domain = cfg['code'].lower().replace('-', '') + '.edu'

        for desig_name, count in SPECIAL_DESIGNATIONS:
            for i in range(count):
                first, last, _gender = unique_name(used_names)
                email = f"{first.lower()}.{last.lower()}{i or ''}@{email_domain}"
                user = self._make_user(email, first, last)
                teacher = Teacher.objects.create(
                    user=user, college=college, department=department,
                    designation=designation_objs[desig_name],
                    national_id=f'STF{college.id}{user.id:05d}',
                    joining_date=joining_base - timedelta(days=random.randint(0, 900)),
                    qualification=random.choice(['M.Ed', 'B.Ed', 'M.A.', 'M.Sc.', 'Ph.D']),
                    specialization=desig_name,
                    experience_years=random.randint(3, 20),
                )
                UserRoleAssignment.objects.get_or_create(
                    user=user, role=roles['Teacher'],
                    defaults={'college': college, 'is_active': True},
                )
                if desig_name == cfg['admin_title'] and admin_user is None:
                    admin_user = user
                    UserRoleAssignment.objects.get_or_create(
                        user=user, role=roles['Admin'],
                        defaults={'college': college, 'is_active': True},
                    )
                    self.stdout.write(
                        f"  ✓ Admin login for this branch is held by the {desig_name}: {email}"
                    )

        # Office/support staff (Employee, not Teacher)
        for desig_name in OFFICE_DESIGNATIONS:
            first, last, _gender = unique_name(used_names)
            email = f"{first.lower()}.{last.lower()}.staff@{email_domain}"
            user = self._make_user(email, first, last)
            Employee.objects.create(
                user=user, college=college, designation=designation_objs[desig_name],
                national_id=f'EMP{college.id}{user.id:05d}',
                joining_date=joining_base - timedelta(days=random.randint(0, 900)),
                qualification=random.choice(['B.Com', '12th Pass', 'Diploma', 'BCA']),
                experience_years=random.randint(1, 12),
            )
            UserRoleAssignment.objects.get_or_create(
                user=user, role=roles['Staff'],
                defaults={'college': college, 'is_active': True},
            )
            if desig_name == cfg['admin_title'] and admin_user is None:
                admin_user = user
                UserRoleAssignment.objects.get_or_create(
                    user=user, role=roles['Admin'],
                    defaults={'college': college, 'is_active': True},
                )
                self.stdout.write(
                    f"  ✓ Admin login for this branch is held by the {desig_name}: {email}"
                )

        # --- Subject teachers, assigned to real class ranges ---
        subject_objs = {}
        subject_teachers = []
        target_subject_teachers = 50 - sum(c for _, c in SPECIAL_DESIGNATIONS) - len(OFFICE_DESIGNATIONS)
        for i in range(max(target_subject_teachers, 20)):
            first, last, _gender = unique_name(used_names)
            email = f"{first.lower()}.{last.lower()}{i}@{email_domain}"
            user = self._make_user(email, first, last)
            subject_name = SUBJECTS[i % len(SUBJECTS)]
            teacher = Teacher.objects.create(
                user=user, college=college, department=department,
                designation=subj_designation,
                national_id=f'STF{college.id}{user.id:05d}',
                joining_date=joining_base - timedelta(days=random.randint(0, 1200)),
                qualification=random.choice(['B.Ed', 'M.A.', 'M.Sc.', 'TGT Certified', 'PGT Certified']),
                specialization=subject_name,
                experience_years=random.randint(1, 18),
            )
            UserRoleAssignment.objects.get_or_create(
                user=user, role=roles['Teacher'],
                defaults={'college': college, 'is_active': True},
            )
            subject_teachers.append((teacher, subject_name))

        # Assign each teacher a contiguous class range for their subject
        # (e.g. "Hindi teacher, Classes 5-8") and create the Subject rows.
        by_subject = {}
        for teacher, subject_name in subject_teachers:
            by_subject.setdefault(subject_name, []).append(teacher)

        for subject_name, teachers_for_subject in by_subject.items():
            class_numbers = list(range(1, 11))
            random.shuffle(teachers_for_subject)
            chunk_size = max(1, len(class_numbers) // len(teachers_for_subject))
            idx = 0
            for t_index, teacher in enumerate(teachers_for_subject):
                span = class_numbers[idx: idx + chunk_size] if t_index < len(teachers_for_subject) - 1 else class_numbers[idx:]
                idx += chunk_size
                if not span:
                    continue
                for sc, _sections in classes:
                    if sc.numeric_name in span:
                        Subject.objects.get_or_create(
                            college=college, name=subject_name, school_class=sc,
                            defaults={'subject_type': 'Core', 'teacher': teacher},
                        )
                lo, hi = min(span), max(span)
                self.stdout.write(
                    f"  ✓ {teacher.user.get_full_name()} ({subject_name} teacher) — Class {lo}"
                    + (f" to {hi}" if hi != lo else '')
                )

        # --- Fee types ---
        tuition, _ = FeeType.objects.get_or_create(
            college=college, fee_type='Tuition Fee', defaults={'title': 'Monthly Tuition Fee'}
        )
        transport, _ = FeeType.objects.get_or_create(
            college=college, fee_type='Transport Fee', defaults={'title': 'Monthly Transport Fee'}
        )

        # --- Students ---
        self.stdout.write(f"  Creating {cfg['student_count']} students...")
        today = timezone.now().date()
        roll_counter = 1
        student_objs = []
        for i in range(cfg['student_count']):
            sc, sections = random.choice(classes)
            section = random.choice(sections)
            first, last, _gender = unique_name(used_names)
            email = f"{first.lower()}.{last.lower()}{i}@student.{email_domain}"
            user = self._make_user(email, first, last, password='student123')
            student = Student.objects.create(
                user=user, college=college, school_class=sc, section=section,
                roll_number=f'{sc.numeric_name}{roll_counter:03d}',
                registration_number=f'REG{college.id}{i:05d}',
                admission_date=today - timedelta(days=random.randint(60, 1400)),
            )
            roll_counter += 1
            UserRoleAssignment.objects.get_or_create(
                user=user, role=roles['Student'],
                defaults={'college': college, 'is_active': True},
            )
            student_objs.append((student, sc, section))

        # --- Attendance: last N school days for every student ---
        self.stdout.write(f"  Generating {cfg['attendance_days']} days of attendance...")
        attendance_rows = []
        day = today
        days_done = 0
        marker = None
        while days_done < cfg['attendance_days']:
            if day.weekday() < 5:  # skip weekends
                for student, sc, section in student_objs:
                    roll = random.random()
                    status = 'Present' if roll < 0.88 else ('Late' if roll < 0.94 else 'Absent')
                    attendance_rows.append(StudentAttendance(
                        college=student.college, student=student, school_class=sc,
                        section=section, attendance_date=day, status=status,
                    ))
                days_done += 1
            day -= timedelta(days=1)
        StudentAttendance.objects.bulk_create(attendance_rows, batch_size=1000, ignore_conflicts=True)

        # --- Fees: invoice + payment per student, ratio varies per branch ---
        self.stdout.write("  Generating invoices and payments...")
        month_label = today.strftime('%B %Y')
        invoices = []
        for student, sc, _section in student_objs:
            gross = random.choice([1500, 2000, 2500, 3000])
            invoices.append(Invoice(
                college=student.college, invoice_number=f'INV-{student.college.id}-{student.id}',
                student=student, school_class=sc, fee_type=tuition, month=month_label,
                gross_amount=gross, net_amount=gross,
            ))
        Invoice.objects.bulk_create(invoices, batch_size=1000, ignore_conflicts=True)

        created_invoices = list(Invoice.objects.filter(
            college=college, month=month_label
        ).select_related('student'))
        payments = []
        paid_count = 0
        for inv in created_invoices:
            if random.random() < cfg['fee_paid_ratio']:
                inv.paid_amount = inv.net_amount
                paid_count += 1
                payments.append(Payment(
                    college=inv.college, invoice=inv,
                    payment_method=random.choice(['Cash', 'Bank Transfer', 'Online', 'Cheque']),
                    amount=inv.net_amount,
                    payment_date=today - timedelta(days=random.randint(0, 20)),
                    reference=f'PAY-{inv.invoice_number}',
                ))
            elif random.random() < 0.5:
                partial = Decimal(str(round(float(inv.net_amount) * random.uniform(0.2, 0.7), 2)))
                inv.paid_amount = partial
                payments.append(Payment(
                    college=inv.college, invoice=inv,
                    payment_method=random.choice(['Cash', 'Bank Transfer', 'Online']),
                    amount=partial,
                    payment_date=today - timedelta(days=random.randint(0, 20)),
                    reference=f'PAY-{inv.invoice_number}',
                ))
            inv.save()  # recomputes due_amount / paid_status
        Payment.objects.bulk_create(payments, batch_size=1000, ignore_conflicts=True)

        self.stdout.write(self.style.SUCCESS(
            f"  ✓ {len(student_objs)} students, {len(subject_teachers)} subject teachers, "
            f"{sum(c for _, c in SPECIAL_DESIGNATIONS)} specialist staff, "
            f"{len(OFFICE_DESIGNATIONS)} office staff, "
            f"{paid_count}/{len(created_invoices)} invoices fully paid "
            f"({cfg['fee_paid_ratio']*100:.0f}% target), "
            f"{len(attendance_rows)} attendance records"
        ))

    def _make_user(self, email, first, last, password='teacher123'):
        user, _created = User.objects.get_or_create(
            email=email,
            defaults={
                'username': email.split('@')[0],
                'first_name': first, 'last_name': last, 'is_active': True,
            },
        )
        user.set_password(password)
        user.save()
        return user
