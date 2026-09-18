import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Collapse,
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  alpha,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Person as TeacherIcon,
  Book as CourseIcon,
  Settings as SettingsIcon,
  Palette as ThemeIcon,
  Language as LanguageIcon,
  ExpandLess,
  ExpandMore,
  EventNote as LeaveIcon,
  ListAlt as LessonPlanIcon,
  Schedule as ClassRoutineIcon,
  PeopleAlt as GuardianIcon,
  School as StudentIcon,
  CheckCircle as AttendanceIcon,
  CreditCard as CardIcon,
  Quiz as ExamIcon,
  Assignment as ManageExamIcon,
  Grading as ExamMarkIcon,
  TrendingUp as PromotionIcon,
  CardMembership as CertificateIcon,
  Inventory as InventoryIcon,
  AccountBalance as AssetIcon,
  LocalLibrary as LibraryIcon,
  DirectionsBus as TransportIcon,
  Hotel as HostelIcon,
  Message as MessageIcon,
  Mail as MailIcon,
  ReportProblem as ComplaintIcon,
  Campaign as AnnouncementIcon,
  School as ScholarshipIcon,
  Event as EventIcon,
  AttachMoney as PayrollIcon,
  AccountBalance as AccountingIcon,
  Assessment as ReportIcon,
  Collections as GalleryIcon,
  Web as FrontendIcon,
  MoreHoriz as MiscellaneousIcon,
  Subscriptions as SubscriptionsIcon,
  AccountCircle as ProfileIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { usePermissions } from '../../hooks/usePermissions';

const DRAWER_WIDTH = 280;

export const getMenuItems = (t) => [
  {
    translationKey: 'dashboard',
    icon: <DashboardIcon />,
    path: '/dashboard',
    permissions: [],
  },
  {
    translationKey: 'theme',
    icon: <ThemeIcon />,
    path: '/admin/theme-settings',
    permissions: [],
  },
  {
    translationKey: 'languageManagement',
    icon: <LanguageIcon />,
    path: '/admin/language-management',
    permissions: [],
  },
  {
    translationKey: 'administrator',
    icon: <SettingsIcon />,
    submenu: [
      { translationKey: 'generalSettings', path: '/admin/general-settings', permissions: [] },
      { translationKey: 'manageSchool', path: '/admin/manage-school', permissions: [] },
      { translationKey: 'paymentSettings', path: '/admin/payment-settings', permissions: [] },
      { translationKey: 'smsSettings', path: '/admin/sms-settings', permissions: [] },
      { translationKey: 'emailSettings', path: '/admin/email-settings', permissions: [] },
      { translationKey: 'academicYears', path: '/admin/academic-years', permissions: ['view_academic_year'] },
      { translationKey: 'userRole', path: '/admin/user-role', permissions: ['view_role'] },
      { translationKey: 'rolePermission', path: '/admin/role-permission', permissions: ['view_role'] },
      { translationKey: 'manageSuperAdmin', path: '/admin/manage-super-admin', permissions: ['view_user'] },
      { translationKey: 'manageUser', path: '/admin/manage-users', permissions: ['view_user'] },
      { translationKey: 'resetUserPassword', path: '/admin/reset-user-password', permissions: ['view_user'] },
      { translationKey: 'resetUsername', path: '/admin/reset-username', permissions: ['view_user'] },
      { translationKey: 'userCredential', path: '/admin/user-credential', permissions: ['view_user'] },
      { translationKey: 'activityLog', path: '/admin/activity-log', permissions: [] },
      { translationKey: 'feedback', path: '/admin/feedback', permissions: [] },
      { translationKey: 'backupDatabase', path: '/admin/backup-database', permissions: [] },
      { translationKey: 'openingHours', path: '/admin/opening-hours', permissions: [] },
    ],
    permissions: ['view_user', 'view_role', 'view_college'],
  },
  {
    translationKey: 'templates',
    icon: <SettingsIcon />,
    submenu: [
      { translationKey: 'smsTemplates', path: '/templates/sms', permissions: ['view_sms_template'] },
      { translationKey: 'emailTemplates', path: '/templates/email', permissions: ['view_email_template'] },
    ],
    permissions: ['view_sms_template', 'view_email_template'],
  },
  {
    translationKey: 'frontOffice',
    icon: <SettingsIcon />,
    submenu: [
      { translationKey: 'visitorPurpose', path: '/front-office?tab=0', permissions: [] },
      { translationKey: 'manageVisitor', path: '/front-office?tab=1', permissions: [] },
      { translationKey: 'callLog', path: '/front-office?tab=2', permissions: [] },
      { translationKey: 'postalDispatch', path: '/front-office?tab=3', permissions: [] },
      { translationKey: 'postalReceive', path: '/front-office?tab=4', permissions: [] },
    ],
    permissions: [],
  },
  {
    translationKey: 'humanResources',
    icon: <SettingsIcon />,
    submenu: [
      { translationKey: 'manageDesignation', path: '/hr?tab=0', permissions: ['view_staff'] },
      { translationKey: 'manageEmployee', path: '/hr?tab=1', permissions: ['view_leave'] },
    ],
    permissions: ['view_staff', 'view_leave'],
  },
  {
    translationKey: 'Teacher',
    icon: <TeacherIcon />,
    submenu: [
      { translationKey: 'Departments', path: '/teachers?tab=0', permissions: ['view_department'] },
      { translationKey: 'Manage Teacher', path: '/teachers?tab=1', permissions: ['view_user'] },
      { translationKey: 'Class Lecture', path: '/teachers?tab=2', permissions: ['view_academic_class'] },
      { translationKey: 'Rating', path: '/teachers?tab=3', permissions: ['view_rating'] },
    ],
    permissions: ['view_user', 'view_department'],
  },
  {
    translationKey: 'Manage Leave',
    icon: <LeaveIcon />,
    submenu: [
      { translationKey: 'Leave Type', path: '/leaves?tab=0', permissions: ['view_leave_type'] },
      { translationKey: 'Leave Application', path: '/leaves?tab=1', permissions: ['view_leave'] },
      { translationKey: 'Waiting Application', path: '/leaves?tab=2', permissions: ['view_leave'] },
      { translationKey: 'Approved Application', path: '/leaves?tab=3', permissions: ['view_leave'] },
      { translationKey: 'Declined Application', path: '/leaves?tab=4', permissions: ['view_leave'] },
    ],
    permissions: ['view_leave', 'view_leave_type'],
  },
  {
    translationKey: 'academic',
    icon: <CourseIcon />,
    submenu: [
      { translationKey: 'Class', path: '/academic?tab=0', permissions: ['view_academic_class'] },
      { translationKey: 'Section', path: '/academic?tab=1', permissions: ['view_academic_section'] },
      { translationKey: 'Subject', path: '/academic?tab=2', permissions: ['view_course'] },
      { translationKey: 'Syllabus', path: '/academic?tab=3', permissions: ['view_course'] },
      { translationKey: 'Material', path: '/academic?tab=4', permissions: ['view_course'] },
      { translationKey: 'Live Class', path: '/academic?tab=5', permissions: ['view_live_class'] },
      { translationKey: 'Assignment', path: '/academic?tab=6', permissions: ['view_course'] },
      { translationKey: 'Submission', path: '/academic?tab=7', permissions: ['view_course'] },
    ],
    permissions: ['view_academic_class', 'view_academic_section', 'view_course', 'view_user'],
  },
  {
    translationKey: 'Lesson Plan',
    icon: <LessonPlanIcon />,
    submenu: [
      { translationKey: 'Lesson', path: '/lesson-plan?tab=0', permissions: ['view_course'] },
      { translationKey: 'Topic', path: '/lesson-plan?tab=1', permissions: ['view_course'] },
      { translationKey: 'Lesson Timeline', path: '/lesson-plan?tab=2', permissions: ['view_course'] },
      { translationKey: 'Lesson Status', path: '/lesson-plan?tab=3', permissions: ['view_course'] },
      { translationKey: 'Lesson Plan', path: '/lesson-plan?tab=4', permissions: ['view_course'] },
    ],
    permissions: ['view_course'],
  },
  {
    translationKey: 'Class Routine',
    icon: <ClassRoutineIcon />,
    path: '/class-routine',
    permissions: ['view_timetable'],
  },
  {
    translationKey: 'Guardian',
    icon: <GuardianIcon />,
    path: '/guardian',
    permissions: ['view_guardian'],
  },
  {
    translationKey: 'Manage Student',
    icon: <StudentIcon />,
    permissions: ['view_student'],
    submenu: [
      { translationKey: 'Student Type', path: '/student-type', permissions: ['view_student'] },
      { translationKey: 'Student List', path: '/student-list', permissions: ['view_student'] },
      { translationKey: 'Admit Student', path: '/admit-student', permissions: ['view_student'] },
      { translationKey: 'Bulk Admission', path: '/bulk-admission', permissions: ['view_student'] },
      { translationKey: 'Online Admission', path: '/online-admission', permissions: ['view_student'] },
      { translationKey: 'Student Activity', path: '/student-activity', permissions: ['view_student'] },
    ],
  },
  {
    translationKey: 'Attendance',
    icon: <AttendanceIcon />,
    permissions: ['view_student', 'view_staff'],
    submenu: [
      { translationKey: 'Student Attendance', path: '/student-attendance', permissions: ['view_student'] },
      { translationKey: 'Teacher Attendance', path: '/teacher-attendance', permissions: ['view_staff'] },
      { translationKey: 'Employee Attendance', path: '/employee-attendance', permissions: ['view_staff'] },
      { translationKey: 'Absent Email', path: '/absent-email', permissions: ['view_student'] },
      { translationKey: 'Absent SMS', path: '/absent-sms', permissions: ['view_student'] },
    ],
  },
  {
    translationKey: 'Generate Card',
    icon: <CardIcon />,
    permissions: ['view_student', 'view_staff'],
    submenu: [
      { translationKey: 'ID Card Setting', path: '/card-generation/id-card-setting', permissions: [] },
      { translationKey: 'Admit Card Setting', path: '/card-generation/admit-card-setting', permissions: [] },
      { translationKey: 'Teacher ID Card', path: '/card-generation/teacher-id-card', permissions: ['view_staff'] },
      { translationKey: 'Employee ID Card', path: '/card-generation/employee-id-card', permissions: ['view_staff'] },
      { translationKey: 'Student ID Card', path: '/card-generation/student-id-card', permissions: ['view_student'] },
      { translationKey: 'Student Admit Card', path: '/card-generation/student-admit-card', permissions: ['view_student'] },
    ],
  },
  {
    translationKey: 'Online Exam',
    icon: <ExamIcon />,
    permissions: ['view_student', 'view_staff'],
    submenu: [
      { translationKey: 'Instruction', path: '/online-exam/instruction', permissions: [] },
      { translationKey: 'Question Bank', path: '/online-exam/question-bank', permissions: ['view_staff'] },
      { translationKey: 'Online Exam', path: '/online-exam/exam', permissions: ['view_student'] },
      { translationKey: 'Exam Result', path: '/online-exam/exam-result', permissions: ['view_student'] },
    ],
  },
  {
    translationKey: 'Manage Exam',
    icon: <ManageExamIcon />,
    permissions: ['view_student', 'view_staff'],
    submenu: [
      { translationKey: 'Exam Grade', path: '/manage-exam/exam-grade', permissions: ['view_staff'] },
      { translationKey: 'Exam Term', path: '/manage-exam/exam-term', permissions: ['view_staff'] },
      { translationKey: 'Schedule', path: '/manage-exam/schedule', permissions: ['view_staff'] },
      { translationKey: 'Suggestion', path: '/manage-exam/suggestion', permissions: ['view_staff'] },
      { translationKey: 'Attendance', path: '/manage-exam/attendance', permissions: ['view_staff'] },
    ],
  },
  {
    translationKey: 'Exam Mark',
    icon: <ExamMarkIcon />,
    permissions: ['view_student', 'view_staff'],
    submenu: [
      { translationKey: 'Manage Mark', path: '/exam-mark/manage-mark', permissions: ['view_staff'] },
      { translationKey: 'Exam Term Result', path: '/exam-mark/exam-term-result', permissions: ['view_staff'] },
      { translationKey: 'Exam Final Result', path: '/exam-mark/exam-final-result', permissions: ['view_staff'] },
      { translationKey: 'Merit List', path: '/exam-mark/merit-list', permissions: ['view_staff'] },
      { translationKey: 'Mark Sheet', path: '/exam-mark/mark-sheet', permissions: ['view_student', 'view_staff'] },
      { translationKey: 'Result Card', path: '/exam-mark/result-card', permissions: ['view_student', 'view_staff'] },
      { translationKey: 'Mark Send by Email', path: '/exam-mark/mark-send-email', permissions: ['view_staff'] },
      { translationKey: 'Mark Send by SMS', path: '/exam-mark/mark-send-sms', permissions: ['view_staff'] },
      { translationKey: 'Result Send by Email', path: '/exam-mark/result-send-email', permissions: ['view_staff'] },
      { translationKey: 'Result Send by SMS', path: '/exam-mark/result-send-sms', permissions: ['view_staff'] },
    ],
  },
  {
    translationKey: 'Promotion',
    icon: <PromotionIcon />,
    path: '/promotion',
    permissions: ['view_student', 'view_staff'],
  },
  {
    translationKey: 'Certificate',
    icon: <CertificateIcon />,
    permissions: ['view_student', 'view_staff'],
    submenu: [
      { translationKey: 'Certificate Type', path: '/certificate/certificate-type', permissions: ['view_staff'] },
      { translationKey: 'Generate Certificate', path: '/certificate/generate-certificate', permissions: ['view_staff'] },
    ],
  },
  {
    translationKey: 'Inventory',
    icon: <InventoryIcon />,
    permissions: ['view_staff'],
    submenu: [
      { translationKey: 'Supplier', path: '/inventory/supplier', permissions: ['view_staff'] },
      { translationKey: 'Warehouse', path: '/inventory/warehouse', permissions: ['view_staff'] },
      { translationKey: 'Category', path: '/inventory/category', permissions: ['view_staff'] },
      { translationKey: 'Product', path: '/inventory/product', permissions: ['view_staff'] },
      { translationKey: 'Purchase', path: '/inventory/purchase', permissions: ['view_staff'] },
      { translationKey: 'Sale', path: '/inventory/sale', permissions: ['view_staff'] },
      { translationKey: 'Issue', path: '/inventory/issue', permissions: ['view_staff'] },
    ],
  },
  {
    translationKey: 'Asset Management',
    icon: <AssetIcon />,
    permissions: ['view_staff'],
    submenu: [
      { translationKey: 'Vendor', path: '/asset/vendor', permissions: ['view_staff'] },
      { translationKey: 'Store', path: '/asset/store', permissions: ['view_staff'] },
      { translationKey: 'Category', path: '/asset/category', permissions: ['view_staff'] },
      { translationKey: 'Item', path: '/asset/item', permissions: ['view_staff'] },
      { translationKey: 'Purchase', path: '/asset/purchase', permissions: ['view_staff'] },
      { translationKey: 'Issue', path: '/asset/issue', permissions: ['view_staff'] },
    ],
  },
  {
    translationKey: 'Library',
    icon: <LibraryIcon />,
    permissions: ['view_staff'],
    submenu: [
      { translationKey: 'Book', path: '/library/book', permissions: ['view_staff'] },
      { translationKey: 'Library Member', path: '/library/member', permissions: ['view_staff'] },
      { translationKey: 'Issue & Return', path: '/library/issue-return', permissions: ['view_staff'] },
      { translationKey: 'E-book', path: '/library/ebook', permissions: ['view_staff'] },
    ],
  },
  {
    translationKey: 'Transport',
    icon: <TransportIcon />,
    permissions: ['view_staff'],
    submenu: [
      { translationKey: 'Vehicle', path: '/transport/vehicle', permissions: ['view_staff'] },
      { translationKey: 'Transport Route', path: '/transport/route', permissions: ['view_staff'] },
      { translationKey: 'Transport Member', path: '/transport/member', permissions: ['view_staff'] },
    ],
  },
  {
    translationKey: 'Hostel',
    icon: <HostelIcon />,
    permissions: ['view_staff'],
    submenu: [
      { translationKey: 'Manage Hostel', path: '/hostel/manage-hostel', permissions: ['view_staff'] },
      { translationKey: 'Manage Room', path: '/hostel/manage-room', permissions: ['view_staff'] },
      { translationKey: 'Hostel Member', path: '/hostel/hostel-member', permissions: ['view_staff'] },
    ],
  },
  {
    translationKey: 'Message',
    icon: <MessageIcon />,
    path: '/message',
    permissions: ['view_staff'],
  },
  {
    translationKey: 'Mail & SMS',
    icon: <MailIcon />,
    permissions: ['view_staff'],
    submenu: [
      { translationKey: 'Email', path: '/mail-sms/email', permissions: ['view_staff'] },
      { translationKey: 'SMS', path: '/mail-sms/sms', permissions: ['view_staff'] },
    ],
  },
  {
    translationKey: 'Complain',
    icon: <ComplaintIcon />,
    permissions: ['view_staff'],
    submenu: [
      { translationKey: 'Complain Type', path: '/complain/complain-type', permissions: ['view_staff'] },
      { translationKey: 'Manage Complain', path: '/complain/manage-complain', permissions: ['view_staff'] },
    ],
  },
  {
    translationKey: 'Announcement',
    icon: <AnnouncementIcon />,
    permissions: ['view_staff'],
    submenu: [
      { translationKey: 'Notice', path: '/announcement/notice', permissions: ['view_staff'] },
      { translationKey: 'News', path: '/announcement/news', permissions: ['view_staff'] },
      { translationKey: 'Holiday', path: '/announcement/holiday', permissions: ['view_staff'] },
    ],
  },
  {
    translationKey: 'Scholarship',
    icon: <ScholarshipIcon />,
    permissions: ['view_staff'],
    submenu: [
      { translationKey: 'Candidate', path: '/scholarship/candidate', permissions: ['view_staff'] },
      { translationKey: 'Donar', path: '/scholarship/donar', permissions: ['view_staff'] },
      { translationKey: 'Scholarship', path: '/scholarship/scholarship', permissions: ['view_staff'] },
    ],
  },
  {
    translationKey: 'Event',
    icon: <EventIcon />,
    permissions: ['view_staff'],
    path: '/event',
  },
  {
    translationKey: 'Payroll',
    icon: <PayrollIcon />,
    permissions: ['view_staff'],
    submenu: [
      { translationKey: 'Salary Grade', path: '/payroll/salary-grade', permissions: ['view_staff'] },
      { translationKey: 'Salary Payment', path: '/payroll/salary-payment', permissions: ['view_staff'] },
      { translationKey: 'Salary History', path: '/payroll/salary-history', permissions: ['view_staff'] },
    ],
  },
  {
    translationKey: 'Accounting',
    icon: <AccountingIcon />,
    permissions: ['view_staff'],
    submenu: [
      { translationKey: 'Discount', path: '/accounting/discount', permissions: ['view_staff'] },
      { translationKey: 'Fee Type', path: '/accounting/fee-type', permissions: ['view_staff'] },
      { translationKey: 'Fee Collection', path: '/accounting/fee-collection', permissions: ['view_staff'] },
      { translationKey: 'Manage Invoice', path: '/accounting/manage-invoice', permissions: ['view_staff'] },
      { translationKey: 'Due Invoice', path: '/accounting/due-invoice', permissions: ['view_staff'] },
      { translationKey: 'Due Receipt', path: '/accounting/due-receipt', permissions: ['view_staff'] },
      { translationKey: 'Paid Receipt', path: '/accounting/paid-receipt', permissions: ['view_staff'] },
      { translationKey: 'Due Fee Email', path: '/accounting/due-fee-email', permissions: ['view_staff'] },
      { translationKey: 'Due Fee SMS', path: '/accounting/due-fee-sms', permissions: ['view_staff'] },
      { translationKey: 'Income Head', path: '/accounting/income-head', permissions: ['view_staff'] },
      { translationKey: 'Income', path: '/accounting/income', permissions: ['view_staff'] },
      { translationKey: 'Expenditure Head', path: '/accounting/expenditure-head', permissions: ['view_staff'] },
      { translationKey: 'Expenditure', path: '/accounting/expenditure', permissions: ['view_staff'] },
    ],
  },
  {
    translationKey: 'Report',
    icon: <ReportIcon />,
    permissions: ['view_staff'],
    submenu: [
      { translationKey: 'Income Report', path: '/reports/income-report', permissions: ['view_staff'] },
      { translationKey: 'Expenditure Report', path: '/reports/expenditure-report', permissions: ['view_staff'] },
      { translationKey: 'Invoice Report', path: '/reports/invoice-report', permissions: ['view_staff'] },
      { translationKey: 'Due Fee Report', path: '/reports/due-fee-report', permissions: ['view_staff'] },
      { translationKey: 'Fee Collection Report', path: '/reports/fee-collection-report', permissions: ['view_staff'] },
      { translationKey: 'Accounting Balance Report', path: '/reports/accounting-balance-report', permissions: ['view_staff'] },
      { translationKey: 'Library Report', path: '/reports/library-report', permissions: ['view_staff'] },
      { translationKey: 'Student Attendance Report', path: '/reports/student-attendance-report', permissions: ['view_staff'] },
      { translationKey: 'Student Yearly Attendance Report', path: '/reports/student-yearly-attendance-report', permissions: ['view_staff'] },
      { translationKey: 'Teacher Attendance Report', path: '/reports/teacher-attendance-report', permissions: ['view_staff'] },
      { translationKey: 'Teacher Yearly Attendance Report', path: '/reports/teacher-yearly-attendance-report', permissions: ['view_staff'] },
      { translationKey: 'Employee Attendance Report', path: '/reports/employee-attendance-report', permissions: ['view_staff'] },
      { translationKey: 'Employee Yearly Attendance Report', path: '/reports/employee-yearly-attendance-report', permissions: ['view_staff'] },
      { translationKey: 'Student Report', path: '/reports/student-report', permissions: ['view_staff'] },
      { translationKey: 'Student Invoice Report', path: '/reports/student-invoice-report', permissions: ['view_staff'] },
      { translationKey: 'Student Activity Report', path: '/reports/student-activity-report', permissions: ['view_staff'] },
      { translationKey: 'Payroll Report', path: '/reports/payroll-report', permissions: ['view_staff'] },
      { translationKey: 'Daily Transaction Report', path: '/reports/daily-transaction-report', permissions: ['view_staff'] },
      { translationKey: 'Daily Statement Report', path: '/reports/daily-statement-report', permissions: ['view_staff'] },
      { translationKey: 'Exam Result Report', path: '/reports/exam-result-report', permissions: ['view_staff'] },
    ],
  },
  {
    translationKey: 'Media Gallery',
    icon: <GalleryIcon />,
    permissions: [],
    submenu: [
      { translationKey: 'Gallery', path: '/media-gallery/gallery', permissions: [] },
      { translationKey: 'Gallery Image', path: '/media-gallery/gallery-image', permissions: [] },
    ],
  },
  {
    translationKey: 'Manage Frontend',
    icon: <FrontendIcon />,
    permissions: [],
    submenu: [
      { translationKey: 'Frontend Page', path: '/frontend-cms/frontend-page', permissions: [] },
      { translationKey: 'Slider', path: '/frontend-cms/slider', permissions: [] },
      { translationKey: 'About School', path: '/frontend-cms/about-school', permissions: [] },
    ],
  },
  {
    translationKey: 'Miscellaneous',
    icon: <MiscellaneousIcon />,
    permissions: [],
    submenu: [
      { translationKey: 'Manage Award', path: '/miscellaneous/manage-award', permissions: [] },
      { translationKey: 'Manage Todo', path: '/miscellaneous/manage-todo', permissions: [] },
      { translationKey: 'FAQ', path: '/miscellaneous/faq', permissions: [] },
    ],
  },
  {
    translationKey: 'Subscription (SaaS)',
    icon: <SubscriptionsIcon />,
    permissions: [],
    submenu: [
      { translationKey: 'FAQ', path: '/subscription/faq', permissions: [] },
      { translationKey: 'Slider', path: '/subscription/slider', permissions: [] },
      { translationKey: 'Subscription Setting', path: '/subscription/setting', permissions: [] },
      { translationKey: 'General Setting', path: '/subscription/general-setting', permissions: [] },
      { translationKey: 'Subscription Plan', path: '/subscription/plan', permissions: [] },
      { translationKey: 'Subscription', path: '/subscription/subscription', permissions: [] },
    ],
  },
  {
    translationKey: 'Profile',
    icon: <ProfileIcon />,
    permissions: [],
    submenu: [
      { translationKey: 'My Profile', path: '/profile/my-profile', permissions: [] },
      { translationKey: 'Reset Password', path: '/profile/reset-password', permissions: [] },
      { translationKey: 'Logout', path: '/profile/logout', permissions: [] },
    ],
  },
];

const Sidebar = ({ open, onClose }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [expandedItems, setExpandedItems] = useState({});
  const { user, logout } = useAuth();
  const { hasPermission, hasAnyPermission, permissionNames } = usePermissions();
  const menuItems = getMenuItems(t);

  // Auto-expand menu items that contain the current active path
  useEffect(() => {
    const newExpandedItems = { ...expandedItems };
    let hasChanges = false;

    menuItems.forEach((item, index) => {
      if (item.submenu) {
        const hasActiveSubitem = item.submenu.some(subitem => {
          if (subitem.path.includes('?')) {
            const [pathPart, queryPart] = subitem.path.split('?');
            return location.pathname === pathPart && location.search === `?${queryPart}`;
          }
          return location.pathname === subitem.path;
        });
        if (hasActiveSubitem && !newExpandedItems[index]) {
          newExpandedItems[index] = true;
          hasChanges = true;
        }
      }
    });

    if (hasChanges) {
      setExpandedItems(newExpandedItems);
    }
  }, [location.pathname, location.search]);

  const handleToggle = (index) => {
    setExpandedItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleNavigate = async (path) => {
    // Handle logout
    if (path === '/profile/logout') {
      try {
        await logout();
        navigate('/login');
      } catch (error) {
        console.error('Logout failed:', error);
      }
      if (isMobile) {
        onClose();
      }
      return;
    }

    // Normal navigation
    navigate(path);
    if (isMobile) {
      onClose();
    }
  };

  const isActive = (path) => {
    // Return false if path is undefined (for menu items with only submenus)
    if (!path) {
      return false;
    }
    // Handle query parameters - check if pathname matches and query params match
    if (path.includes('?')) {
      const [pathPart, queryPart] = path.split('?');
      return location.pathname === pathPart && location.search === `?${queryPart}`;
    }
    return location.pathname === path;
  };

  const hasAccess = (item) => {
    // Superusers always have access
    if (user?.is_superuser) {
      return true;
    }

    // If no permissions required, allow access
    if (!item.permissions || item.permissions.length === 0) {
      return true;
    }

    // Check if user has any of the required permissions
    return hasAnyPermission(item.permissions);
  };

  const drawerContent = (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Box sx={{ p: 2, backgroundColor: 'primary.main' }}>
        <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold' }}>
          ERP System
        </Typography>
      </Box>

      <List sx={{ flex: 1, overflow: 'auto', p: 1 }}>
        {menuItems.filter(item => hasAccess(item)).map((item) => (
          <div key={item.translationKey}>
            <ListItem
              disablePadding
              sx={{ mb: 0.5 }}
            >
              {item.submenu ? (
                <ListItemButton
                  onClick={() => {
                    console.log('Toggling menu item:', item.translationKey, 'Current state:', expandedItems[item.translationKey]);
                    handleToggle(item.translationKey);
                  }}
                  sx={{
                    '&:hover': {
                      backgroundColor: 'action.hover',
                    },
                    '&:active': {
                      backgroundColor: alpha(theme.palette.primary.main, 0.16),
                    },
                  }}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={t(item.translationKey)} />
                  <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center' }}>
                    {expandedItems[item.translationKey] ? <ExpandLess /> : <ExpandMore />}
                  </Box>
                </ListItemButton>
              ) : (
                <ListItemButton
                  onClick={() => handleNavigate(item.path)}
                  selected={isActive(item.path)}
                  sx={{
                    borderLeft: '3px solid transparent',
                    '&.Mui-selected': {
                      backgroundColor: alpha(theme.palette.primary.main, 0.1),
                      borderLeft: `3px solid ${theme.palette.primary.main}`,
                      color: theme.palette.primary.main,
                      fontWeight: 600,
                      '& .MuiListItemIcon-root': {
                        color: theme.palette.primary.main,
                      },
                      '&:hover': {
                        backgroundColor: alpha(theme.palette.primary.main, 0.16),
                      },
                    },
                  }}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={t(item.translationKey)} />
                </ListItemButton>
              )}
            </ListItem>

            {item.submenu && (
              <Collapse in={expandedItems[item.translationKey]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding sx={{ pl: 2 }}>
                  {item.submenu.filter(subitem => hasAccess(subitem)).map((subitem, subindex) => (
                    <ListItem key={subindex} disablePadding sx={{ mb: 0.3 }}>
                      <ListItemButton
                        onClick={() => handleNavigate(subitem.path)}
                        selected={isActive(subitem.path)}
                        sx={{
                          pl: 2,
                          borderLeft: '3px solid transparent',
                          '&.Mui-selected': {
                            backgroundColor: alpha(theme.palette.primary.main, 0.1),
                            borderLeft: `3px solid ${theme.palette.primary.main}`,
                            color: theme.palette.primary.main,
                            fontWeight: 600,
                            '&:hover': {
                              backgroundColor: alpha(theme.palette.primary.main, 0.16),
                            },
                          },
                        }}
                      >
                        <ListItemText
                          primary={t(subitem.translationKey)}
                          primaryTypographyProps={{ variant: 'body2' }}
                        />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            )}
          </div>
        ))}
      </List>

      <Divider />

      <Box sx={{ p: 2, textAlign: 'center' }}>
        <Typography variant="caption" color="textSecondary">
          ERP v1.0.0
        </Typography>
      </Box>
    </Box>
  );

  return (
    <>
      {/* Desktop Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          width: DRAWER_WIDTH,
          flexShrink: 0,
          zIndex: 1100,
          '& .MuiDrawer-paper': {
            width: DRAWER_WIDTH,
            boxSizing: 'border-box',
            backgroundColor: '#fff',
            borderRight: '1px solid #e0e0e0',
          },
          display: { xs: 'none', sm: 'block' },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        anchor="left"
        open={open}
        onClose={onClose}
        sx={{
          display: { xs: 'block', sm: 'none' },
          // Header/AppBar is forced to zIndex 1300 (see Header.jsx); without
          // an explicit override here this Drawer falls back to MUI's
          // default temporary-drawer zIndex (1200), which is BELOW the
          // AppBar — the drawer was opening but rendering invisibly behind
          // the fixed header. Must stay above 1300.
          zIndex: 1400,
          '& .MuiDrawer-paper': {
            width: DRAWER_WIDTH,
            boxSizing: 'border-box',
            top: 56, // Height of AppBar on mobile
            zIndex: 1400,
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
};

export default Sidebar;
