import { Routes, Route, Navigate } from 'react-router-dom';
import { CssBaseline, ThemeProvider as MuiThemeProvider } from '@mui/material';
import { useAuth } from './context/AuthContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import SchoolProvider from './context/SchoolContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Students from './pages/Students';
import Teachers from './pages/Teachers';
import Leaves from './pages/Leaves';
import Courses from './pages/Courses';
import Attendance from './pages/Attendance';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import Finance from './pages/Finance';
import Academic from './pages/Academic';
import LessonPlan from './pages/LessonPlan';
import ClassRoutine from './pages/ClassRoutine';
import Guardian from './pages/Guardian';
import StudentType from './pages/StudentType';
import ManageStudentTailwind from './pages/ManageStudentTailwind';
import AdmitStudentTailwind from './pages/AdmitStudentTailwind';
import BulkAdmissionTailwind from './pages/BulkAdmissionTailwind';
import OnlineAdmissionTailwind from './pages/OnlineAdmissionTailwind';
import StudentActivityTailwind from './pages/StudentActivityTailwind';
import StudentAttendanceTailwind from './pages/StudentAttendanceTailwind';
import TeacherAttendanceTailwind from './pages/TeacherAttendanceTailwind';
import EmployeeAttendanceTailwind from './pages/EmployeeAttendanceTailwind';
import ManageAbsentEmailTailwind from './pages/ManageAbsentEmailTailwind';
import ManageAbsentSMSTailwind from './pages/ManageAbsentSMSTailwind';
import Exam from './pages/Exam';
import Library from './pages/Library';
import Hostel from './pages/Hostel';
import TimeTable from './pages/TimeTable';
import UserManagement from './pages/UserManagement';
import Transport from './pages/Transport';
import Inventory from './pages/Inventory';
import Payments from './pages/Payments';
import Departments from './pages/Departments';
import Events from './pages/Events';
import Feedback from './pages/Feedback';
import Certificates from './pages/Certificates';
import Announcements from './pages/Announcements';
import Grades from './pages/Grades';
import GeneralSettings from './pages/admin/GeneralSettings';
import PaymentSettings from './pages/admin/PaymentSettings';
import SMSSettings from './pages/admin/SMSSettings';
import ManageEmailSetting from './pages/admin/ManageEmailSetting';
import ManageAcademicYear from './pages/admin/ManageAcademicYear';
import ActivityLog from './pages/admin/ActivityLog';
import AdminFeedback from './pages/admin/Feedback';
import OpeningHour from './pages/admin/OpeningHour';
import ThemeSettings from './pages/admin/ThemeSettings';
import LanguageSettings from './pages/admin/LanguageSettings';
import LanguageManagement from './pages/admin/LanguageManagement';
import ManageLanguage from './pages/admin/ManageLanguage';
import ManageUser from './pages/admin/ManageUser';
import ManageUserRole from './pages/admin/ManageUserRole';
import RolePermission from './pages/admin/RolePermission';
import RolePermissionChecklist from './pages/admin/RolePermissionChecklist';
import ManageSchool from './pages/admin/ManageSchool';
import ManageSuperAdmin from './pages/admin/ManageSuperAdmin';
import ResetUserPassword from './pages/admin/ResetUserPassword';
import ResetUsername from './pages/admin/ResetUsername';
import UserCredential from './pages/admin/UserCredential';
import BackupDatabase from './pages/admin/BackupDatabase';
import SMSTemplates from './pages/templates/SMSTemplates';
import EmailTemplates from './pages/templates/EmailTemplates';
import FrontOffice from './pages/FrontOffice';
import HumanResources from './pages/HumanResources';
import IDCardSetting from './pages/IDCardSetting';
import AdmitCardSetting from './pages/AdmitCardSetting';
import GenerateTeacherIDCard from './pages/GenerateTeacherIDCard';
import GenerateEmployeeIDCard from './pages/GenerateEmployeeIDCard';
import GenerateStudentIDCard from './pages/GenerateStudentIDCard';
import GenerateStudentAdmitCard from './pages/GenerateStudentAdmitCard';
import ExamInstruction from './pages/ExamInstruction';
import QuestionBank from './pages/QuestionBank';
import OnlineExam from './pages/OnlineExam';
import ExamResult from './pages/ExamResult';
import ExamGrade from './pages/ExamGrade';
import ExamTerm from './pages/ExamTerm';
import ExamSchedule from './pages/ExamSchedule';
import ExamSuggestion from './pages/ExamSuggestion';
import ExamAttendance from './pages/ExamAttendance';
import ManageMark from './pages/ManageMark';
import ExamTermResult from './pages/ExamTermResult';
import ExamFinalResult from './pages/ExamFinalResult';
import MeritList from './pages/MeritList';
import MarkSheet from './pages/MarkSheet';
import ResultCard from './pages/ResultCard';
import MarkSendByEmail from './pages/MarkSendByEmail';
import MarkSendBySMS from './pages/MarkSendBySMS';
import ResultSendByEmail from './pages/ResultSendByEmail';
import ResultSendBySMS from './pages/ResultSendBySMS';
import Promotion from './pages/Promotion';
import CertificateType from './pages/CertificateType';
import GenerateCertificate from './pages/GenerateCertificate';
import Supplier from './pages/Supplier';
import Warehouse from './pages/Warehouse';
import Category from './pages/Category';
import Product from './pages/Product';
import Purchase from './pages/Purchase';
import Sale from './pages/Sale';
import Issue from './pages/Issue';
import Vendor from './pages/Vendor';
import Store from './pages/Store';
import AssetCategory from './pages/AssetCategory';
import AssetItem from './pages/AssetItem';
import AssetPurchase from './pages/AssetPurchase';
import AssetIssue from './pages/AssetIssue';
import Book from './pages/Book';
import LibraryMember from './pages/LibraryMember';
import IssueReturn from './pages/IssueReturn';
import EBook from './pages/EBook';
import Vehicle from './pages/Vehicle';
import TransportRoute from './pages/TransportRoute';
import TransportMember from './pages/TransportMember';
import ManageHostel from './pages/ManageHostel';
import ManageRoom from './pages/ManageRoom';
import HostelMember from './pages/HostelMember';
import ManageMessage from './pages/ManageMessage';
import Email from './pages/Email';
import SMS from './pages/SMS';
import ComplainType from './pages/ComplainType';
import ManageComplain from './pages/ManageComplain';
import Notice from './pages/Notice';
import News from './pages/News';
import Holiday from './pages/Holiday';
import Candidate from './pages/Candidate';
import Donar from './pages/Donar';
import Scholarship from './pages/Scholarship';
import Event from './pages/Event';
import SalaryGrade from './pages/SalaryGrade';
import SalaryPayment from './pages/SalaryPayment';
import SalaryHistory from './pages/SalaryHistory';
import Discount from './pages/Discount';
import FeeType from './pages/FeeType';
import FeeCollection from './pages/FeeCollection';
import ManageInvoice from './pages/ManageInvoice';
import DueInvoice from './pages/DueInvoice';
import DueReceipt from './pages/DueReceipt';
import PaidReceipt from './pages/PaidReceipt';
import DueFeeEmail from './pages/DueFeeEmail';
import DueFeeSMS from './pages/DueFeeSMS';
import IncomeHead from './pages/IncomeHead';
import Income from './pages/Income';
import ExpenditureHead from './pages/ExpenditureHead';
import Expenditure from './pages/Expenditure';
import IncomeReport from './pages/IncomeReport';
import ExpenditureReport from './pages/ExpenditureReport';
import InvoiceReport from './pages/InvoiceReport';
import DueFeeReport from './pages/DueFeeReport';
import FeeCollectionReport from './pages/FeeCollectionReport';
import AccountingBalanceReport from './pages/AccountingBalanceReport';
import LibraryReport from './pages/LibraryReport';
import StudentAttendanceReport from './pages/StudentAttendanceReport';
import StudentYearlyAttendanceReport from './pages/StudentYearlyAttendanceReport';
import TeacherAttendanceReport from './pages/TeacherAttendanceReport';
import TeacherYearlyAttendanceReport from './pages/TeacherYearlyAttendanceReport';
import EmployeeAttendanceReport from './pages/EmployeeAttendanceReport';
import EmployeeYearlyAttendanceReport from './pages/EmployeeYearlyAttendanceReport';
import StudentReport from './pages/StudentReport';
import StudentInvoiceReport from './pages/StudentInvoiceReport';
import StudentActivityReport from './pages/StudentActivityReport';
import PayrollReport from './pages/PayrollReport';
import DailyTransactionReport from './pages/DailyTransactionReport';
import DailyStatementReport from './pages/DailyStatementReport';
import ExamResultReport from './pages/ExamResultReport';
import Gallery from './pages/Gallery';
import GalleryImage from './pages/GalleryImage';
import FrontendPage from './pages/FrontendPage';
import Slider from './pages/Slider';
import AboutSchool from './pages/AboutSchool';
import ManageAward from './pages/ManageAward';
import ManageTodo from './pages/ManageTodo';
import FAQ from './pages/FAQ';
import SubscriptionFAQ from './pages/SubscriptionFAQ';
import SubscriptionSlider from './pages/SubscriptionSlider';
import SubscriptionSetting from './pages/SubscriptionSetting';
import GeneralSetting from './pages/GeneralSetting';
import SubscriptionPlan from './pages/SubscriptionPlan';
import Subscription from './pages/Subscription';
import MyProfile from './pages/MyProfile';
import ResetPassword from './pages/ResetPassword';
import Layout from './components/common/Layout';
import ProtectedRoute from './components/auth/ProtectedRoute';
import RoleBasedRoute from './components/auth/RoleBasedRoute';

// Inner App component that uses the theme context
function AppContent() {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const { muiTheme, isLoading: themeLoading } = useTheme();

  // Show loading spinner while checking authentication or theme
  if (authLoading || themeLoading) {
    return (
      <MuiThemeProvider theme={muiTheme}>
        <CssBaseline />
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh'
        }}>
          Loading...
        </div>
      </MuiThemeProvider>
    );
  }

  return (
    <MuiThemeProvider theme={muiTheme}>
      <CssBaseline />
      <Routes>
          <Route path="/login" element={<Login />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Layout>
                  <Dashboard />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/students"
            element={
              <RoleBasedRoute requiredPermissions={['view_student']}>
                <Layout>
                  <Students />
                </Layout>
              </RoleBasedRoute>
            }
          />

          <Route
            path="/teachers"
            element={
              <RoleBasedRoute requiredPermissions={['view_teacher']}>
                <Layout>
                  <Teachers />
                </Layout>
              </RoleBasedRoute>
            }
          />

          <Route
            path="/leaves"
            element={
              <RoleBasedRoute requiredPermissions={['view_leave']}>
                <Layout>
                  <Leaves />
                </Layout>
              </RoleBasedRoute>
            }
          />

          <Route
            path="/courses"
            element={
              <ProtectedRoute>
                <Layout>
                  <Courses />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/attendance"
            element={
              <RoleBasedRoute requiredPermissions={['view_attendance']}>
                <Layout>
                  <Attendance />
                </Layout>
              </RoleBasedRoute>
            }
          />

          <Route
            path="/reports"
            element={
              <RoleBasedRoute requiredPermissions={['view_report']}>
                <Layout>
                  <Reports />
                </Layout>
              </RoleBasedRoute>
            }
          />

          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <Layout>
                  <Settings />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/finance/invoices"
            element={
              <RoleBasedRoute requiredPermissions={['view_invoice']}>
                <Layout>
                  <Finance type="invoices" />
                </Layout>
              </RoleBasedRoute>
            }
          />

          <Route
            path="/finance/payments"
            element={
              <RoleBasedRoute requiredPermissions={['view_payment']}>
                <Layout>
                  <Finance type="payments" />
                </Layout>
              </RoleBasedRoute>
            }
          />

          <Route
            path="/academic"
            element={
              <RoleBasedRoute requiredPermissions={['view_academic_class']}>
                <Layout>
                  <Academic />
                </Layout>
              </RoleBasedRoute>
            }
          />

          <Route
            path="/academic/classes"
            element={
              <RoleBasedRoute requiredPermissions={['view_class']}>
                <Layout>
                  <Academic type="classes" />
                </Layout>
              </RoleBasedRoute>
            }
          />

          <Route
            path="/academic/sections"
            element={
              <RoleBasedRoute requiredPermissions={['view_section']}>
                <Layout>
                  <Academic type="sections" />
                </Layout>
              </RoleBasedRoute>
            }
          />

          <Route
            path="/lesson-plan"
            element={
              <RoleBasedRoute requiredPermissions={['view_course']}>
                <Layout>
                  <LessonPlan />
                </Layout>
              </RoleBasedRoute>
            }
          />

          <Route
            path="/class-routine"
            element={
              <RoleBasedRoute requiredPermissions={['view_timetable']}>
                <Layout>
                  <ClassRoutine />
                </Layout>
              </RoleBasedRoute>
            }
          />

          <Route
            path="/guardian"
            element={
              <RoleBasedRoute requiredPermissions={['view_guardian']}>
                <Layout>
                  <Guardian />
                </Layout>
              </RoleBasedRoute>
            }
          />

          <Route
            path="/student-type"
            element={
              <RoleBasedRoute requiredPermissions={['view_student']}>
                <Layout>
                  <StudentType />
                </Layout>
              </RoleBasedRoute>
            }
          />

          <Route
            path="/student-list"
            element={
              <RoleBasedRoute requiredPermissions={['view_student']}>
                <Layout>
                  <ManageStudentTailwind />
                </Layout>
              </RoleBasedRoute>
            }
          />

          <Route
            path="/admit-student"
            element={
              <RoleBasedRoute requiredPermissions={['view_student']}>
                <Layout>
                  <AdmitStudentTailwind />
                </Layout>
              </RoleBasedRoute>
            }
          />

          <Route
            path="/bulk-admission"
            element={
              <RoleBasedRoute requiredPermissions={['view_student']}>
                <Layout>
                  <BulkAdmissionTailwind />
                </Layout>
              </RoleBasedRoute>
            }
          />

          <Route
            path="/online-admission"
            element={
              <RoleBasedRoute requiredPermissions={['view_student']}>
                <Layout>
                  <OnlineAdmissionTailwind />
                </Layout>
              </RoleBasedRoute>
            }
          />

          <Route
            path="/student-activity"
            element={
              <RoleBasedRoute requiredPermissions={['view_student']}>
                <Layout>
                  <StudentActivityTailwind />
                </Layout>
              </RoleBasedRoute>
            }
          />

          <Route
            path="/student-attendance"
            element={
              <RoleBasedRoute requiredPermissions={['view_student']}>
                <Layout>
                  <StudentAttendanceTailwind />
                </Layout>
              </RoleBasedRoute>
            }
          />

          <Route
            path="/teacher-attendance"
            element={
              <RoleBasedRoute requiredPermissions={['view_staff']}>
                <Layout>
                  <TeacherAttendanceTailwind />
                </Layout>
              </RoleBasedRoute>
            }
          />

          <Route
            path="/employee-attendance"
            element={
              <RoleBasedRoute requiredPermissions={['view_staff']}>
                <Layout>
                  <EmployeeAttendanceTailwind />
                </Layout>
              </RoleBasedRoute>
            }
          />

          <Route
            path="/absent-email"
            element={
              <RoleBasedRoute requiredPermissions={['view_student']}>
                <Layout>
                  <ManageAbsentEmailTailwind />
                </Layout>
              </RoleBasedRoute>
            }
          />

          <Route
            path="/absent-sms"
            element={
              <RoleBasedRoute requiredPermissions={['view_student']}>
                <Layout>
                  <ManageAbsentSMSTailwind />
                </Layout>
              </RoleBasedRoute>
            }
          />

          <Route
            path="/exam"
            element={
              <ProtectedRoute>
                <Layout>
                  <Exam />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/library"
            element={
              <ProtectedRoute>
                <Layout>
                  <Library />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/hostel"
            element={
              <ProtectedRoute>
                <Layout>
                  <Hostel />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/timetable"
            element={
              <ProtectedRoute>
                <Layout>
                  <TimeTable />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/users"
            element={
              <ProtectedRoute>
                <Layout>
                  <UserManagement />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route path="/transport" element={<ProtectedRoute><Layout><Transport /></Layout></ProtectedRoute>} />
          <Route path="/inventory" element={<ProtectedRoute><Layout><Inventory /></Layout></ProtectedRoute>} />
          <Route path="/payments-records" element={<ProtectedRoute><Layout><Payments /></Layout></ProtectedRoute>} />
          <Route path="/departments" element={<ProtectedRoute><Layout><Departments /></Layout></ProtectedRoute>} />
          <Route path="/events" element={<ProtectedRoute><Layout><Events /></Layout></ProtectedRoute>} />
          <Route path="/feedback" element={<ProtectedRoute><Layout><Feedback /></Layout></ProtectedRoute>} />
          <Route path="/certificates" element={<ProtectedRoute><Layout><Certificates /></Layout></ProtectedRoute>} />
          <Route path="/announcements" element={<ProtectedRoute><Layout><Announcements /></Layout></ProtectedRoute>} />
          <Route path="/grades" element={<ProtectedRoute><Layout><Grades /></Layout></ProtectedRoute>} />

          {/* Additional Academic Routes */}
          <Route path="/marks" element={<ProtectedRoute><Layout><Grades /></Layout></ProtectedRoute>} />
          <Route path="/guardians" element={<ProtectedRoute><Layout><Students /></Layout></ProtectedRoute>} />
          <Route path="/promotion" element={<RoleBasedRoute requiredPermissions={['view_student', 'view_staff']}><Layout><Promotion /></Layout></RoleBasedRoute>} />
          <Route path="/certificates" element={<ProtectedRoute><Layout><Certificates /></Layout></ProtectedRoute>} />

          {/* Examination Routes */}
          <Route path="/exam-management" element={<ProtectedRoute><Layout><Exam /></Layout></ProtectedRoute>} />
          <Route path="/online-exam" element={<ProtectedRoute><Layout><Exam /></Layout></ProtectedRoute>} />

          {/* Finance Routes */}
          <Route path="/accounting" element={<ProtectedRoute><Layout><Finance type="accounting" /></Layout></ProtectedRoute>} />
          <Route path="/payroll" element={<ProtectedRoute><Layout><Finance type="payroll" /></Layout></ProtectedRoute>} />
          <Route path="/scholarship" element={<ProtectedRoute><Layout><Finance type="scholarship" /></Layout></ProtectedRoute>} />

          {/* HR Routes */}
          <Route path="/leave" element={<ProtectedRoute><Layout><Attendance /></Layout></ProtectedRoute>} />

          {/* Administration Routes */}
          <Route path="/roles" element={<ProtectedRoute><Layout><UserManagement /></Layout></ProtectedRoute>} />
          <Route path="/colleges" element={<ProtectedRoute><Layout><Departments /></Layout></ProtectedRoute>} />
          <Route path="/templates/sms" element={<RoleBasedRoute requiredPermissions={['view_sms_template']}><Layout><SMSTemplates /></Layout></RoleBasedRoute>} />
          <Route path="/templates/email" element={<RoleBasedRoute requiredPermissions={['view_email_template']}><Layout><EmailTemplates /></Layout></RoleBasedRoute>} />
          <Route path="/front-office" element={<ProtectedRoute><Layout><FrontOffice /></Layout></ProtectedRoute>} />
          <Route path="/hr" element={<ProtectedRoute><Layout><HumanResources /></Layout></ProtectedRoute>} />
          <Route path="/card-generation" element={<ProtectedRoute><Layout><Settings /></Layout></ProtectedRoute>} />

          {/* Facilities Routes */}
          <Route path="/asset-management" element={<ProtectedRoute><Layout><Inventory /></Layout></ProtectedRoute>} />

          {/* Communication Routes */}
          <Route path="/announcement" element={<ProtectedRoute><Layout><Announcements /></Layout></ProtectedRoute>} />
          <Route path="/messaging" element={<ProtectedRoute><Layout><Feedback /></Layout></ProtectedRoute>} />
          <Route path="/communication" element={<ProtectedRoute><Layout><Announcements /></Layout></ProtectedRoute>} />
          <Route path="/complain" element={<ProtectedRoute><Layout><Feedback /></Layout></ProtectedRoute>} />

          {/* Features Routes */}
          <Route path="/live-classes" element={<ProtectedRoute><Layout><TimeTable /></Layout></ProtectedRoute>} />
          <Route path="/media-gallery" element={<ProtectedRoute><Layout><Events /></Layout></ProtectedRoute>} />
          <Route path="/frontend-cms" element={<ProtectedRoute><Layout><Settings /></Layout></ProtectedRoute>} />

          {/* Student Management */}
          <Route path="/student-management" element={<ProtectedRoute><Layout><Students /></Layout></ProtectedRoute>} />

          {/* Admin Settings Routes */}
          <Route path="/admin/general-settings" element={<ProtectedRoute><Layout><GeneralSettings /></Layout></ProtectedRoute>} />
          <Route path="/admin/payment-settings" element={<ProtectedRoute><Layout><PaymentSettings /></Layout></ProtectedRoute>} />
          <Route path="/admin/sms-settings" element={<ProtectedRoute><Layout><SMSSettings /></Layout></ProtectedRoute>} />
          <Route path="/admin/email-settings" element={<ProtectedRoute><Layout><ManageEmailSetting /></Layout></ProtectedRoute>} />
          <Route path="/admin/academic-years" element={<ProtectedRoute><Layout><ManageAcademicYear /></Layout></ProtectedRoute>} />
          <Route path="/admin/user-role" element={<RoleBasedRoute requiredPermissions={['view_role']}><Layout><ManageUserRole /></Layout></RoleBasedRoute>} />
          <Route path="/admin/manage-users" element={<RoleBasedRoute requiredPermissions={['view_user']}><Layout><ManageUser /></Layout></RoleBasedRoute>} />
          <Route path="/admin/role-permission" element={<RoleBasedRoute requiredPermissions={['view_role']}><Layout><RolePermission /></Layout></RoleBasedRoute>} />
          <Route path="/admin/role-permission/:roleId/checklist" element={<RoleBasedRoute requiredPermissions={['view_role']}><Layout><RolePermissionChecklist /></Layout></RoleBasedRoute>} />
          <Route path="/admin/manage-school" element={<ProtectedRoute><Layout><ManageSchool /></Layout></ProtectedRoute>} />
          <Route path="/admin/manage-super-admin" element={<ProtectedRoute><Layout><ManageSuperAdmin /></Layout></ProtectedRoute>} />
          <Route path="/admin/reset-user-password" element={<ProtectedRoute><Layout><ResetUserPassword /></Layout></ProtectedRoute>} />
          <Route path="/admin/reset-username" element={<ProtectedRoute><Layout><ResetUsername /></Layout></ProtectedRoute>} />
          <Route path="/admin/user-credential" element={<ProtectedRoute><Layout><UserCredential /></Layout></ProtectedRoute>} />
          <Route path="/admin/backup-database" element={<ProtectedRoute><Layout><BackupDatabase /></Layout></ProtectedRoute>} />
          <Route path="/admin/activity-log" element={<ProtectedRoute><Layout><ActivityLog /></Layout></ProtectedRoute>} />
          <Route path="/admin/feedback" element={<ProtectedRoute><Layout><AdminFeedback /></Layout></ProtectedRoute>} />
          <Route path="/admin/opening-hours" element={<ProtectedRoute><Layout><OpeningHour /></Layout></ProtectedRoute>} />
          <Route path="/admin/theme-settings" element={<ProtectedRoute><Layout><ThemeSettings /></Layout></ProtectedRoute>} />
          <Route path="/admin/language-settings" element={<ProtectedRoute><Layout><LanguageSettings /></Layout></ProtectedRoute>} />
          <Route path="/admin/language-management" element={<ProtectedRoute><Layout><LanguageManagement /></Layout></ProtectedRoute>} />
          <Route path="/admin/languages" element={<ProtectedRoute><Layout><ManageLanguage /></Layout></ProtectedRoute>} />

          {/* Card Generation Routes */}
          <Route path="/card-generation/id-card-setting" element={<ProtectedRoute><Layout><IDCardSetting /></Layout></ProtectedRoute>} />
          <Route path="/card-generation/admit-card-setting" element={<ProtectedRoute><Layout><AdmitCardSetting /></Layout></ProtectedRoute>} />
          <Route path="/card-generation/teacher-id-card" element={<RoleBasedRoute requiredPermissions={['view_staff']}><Layout><GenerateTeacherIDCard /></Layout></RoleBasedRoute>} />
          <Route path="/card-generation/employee-id-card" element={<RoleBasedRoute requiredPermissions={['view_staff']}><Layout><GenerateEmployeeIDCard /></Layout></RoleBasedRoute>} />
          <Route path="/card-generation/student-id-card" element={<RoleBasedRoute requiredPermissions={['view_student']}><Layout><GenerateStudentIDCard /></Layout></RoleBasedRoute>} />
          <Route path="/card-generation/student-admit-card" element={<RoleBasedRoute requiredPermissions={['view_student']}><Layout><GenerateStudentAdmitCard /></Layout></RoleBasedRoute>} />

          {/* Online Exam Routes */}
          <Route path="/online-exam/instruction" element={<ProtectedRoute><Layout><ExamInstruction /></Layout></ProtectedRoute>} />
          <Route path="/online-exam/question-bank" element={<RoleBasedRoute requiredPermissions={['view_staff']}><Layout><QuestionBank /></Layout></RoleBasedRoute>} />
          <Route path="/online-exam/exam" element={<RoleBasedRoute requiredPermissions={['view_student']}><Layout><OnlineExam /></Layout></RoleBasedRoute>} />
          <Route path="/online-exam/exam-result" element={<RoleBasedRoute requiredPermissions={['view_student']}><Layout><ExamResult /></Layout></RoleBasedRoute>} />

          {/* Manage Exam Routes */}
          <Route path="/manage-exam/exam-grade" element={<RoleBasedRoute requiredPermissions={['view_staff']}><Layout><ExamGrade /></Layout></RoleBasedRoute>} />
          <Route path="/manage-exam/exam-term" element={<RoleBasedRoute requiredPermissions={['view_staff']}><Layout><ExamTerm /></Layout></RoleBasedRoute>} />
          <Route path="/manage-exam/schedule" element={<RoleBasedRoute requiredPermissions={['view_staff']}><Layout><ExamSchedule /></Layout></RoleBasedRoute>} />
          <Route path="/manage-exam/suggestion" element={<RoleBasedRoute requiredPermissions={['view_staff']}><Layout><ExamSuggestion /></Layout></RoleBasedRoute>} />
          <Route path="/manage-exam/attendance" element={<RoleBasedRoute requiredPermissions={['view_staff']}><Layout><ExamAttendance /></Layout></RoleBasedRoute>} />

          {/* Exam Mark Routes */}
          <Route path="/exam-mark/manage-mark" element={<RoleBasedRoute requiredPermissions={['view_staff']}><Layout><ManageMark /></Layout></RoleBasedRoute>} />
          <Route path="/exam-mark/exam-term-result" element={<RoleBasedRoute requiredPermissions={['view_staff']}><Layout><ExamTermResult /></Layout></RoleBasedRoute>} />
          <Route path="/exam-mark/exam-final-result" element={<RoleBasedRoute requiredPermissions={['view_staff']}><Layout><ExamFinalResult /></Layout></RoleBasedRoute>} />
          <Route path="/exam-mark/merit-list" element={<RoleBasedRoute requiredPermissions={['view_staff']}><Layout><MeritList /></Layout></RoleBasedRoute>} />
          <Route path="/exam-mark/mark-sheet" element={<RoleBasedRoute requiredPermissions={['view_staff', 'view_student']}><Layout><MarkSheet /></Layout></RoleBasedRoute>} />
          <Route path="/exam-mark/result-card" element={<RoleBasedRoute requiredPermissions={['view_staff', 'view_student']}><Layout><ResultCard /></Layout></RoleBasedRoute>} />
          <Route path="/exam-mark/mark-send-email" element={<RoleBasedRoute requiredPermissions={['view_staff']}><Layout><MarkSendByEmail /></Layout></RoleBasedRoute>} />
          <Route path="/exam-mark/mark-send-sms" element={<RoleBasedRoute requiredPermissions={['view_staff']}><Layout><MarkSendBySMS /></Layout></RoleBasedRoute>} />
          <Route path="/exam-mark/result-send-email" element={<RoleBasedRoute requiredPermissions={['view_staff']}><Layout><ResultSendByEmail /></Layout></RoleBasedRoute>} />
          <Route path="/exam-mark/result-send-sms" element={<RoleBasedRoute requiredPermissions={['view_staff']}><Layout><ResultSendBySMS /></Layout></RoleBasedRoute>} />

          {/* Certificate Routes */}
          <Route path="/certificate/certificate-type" element={<RoleBasedRoute requiredPermissions={['view_staff']}><Layout><CertificateType /></Layout></RoleBasedRoute>} />
          <Route path="/certificate/generate-certificate" element={<RoleBasedRoute requiredPermissions={['view_staff']}><Layout><GenerateCertificate /></Layout></RoleBasedRoute>} />

          {/* Inventory Routes */}
          <Route path="/inventory/supplier" element={<RoleBasedRoute requiredPermissions={['view_staff']}><Layout><Supplier /></Layout></RoleBasedRoute>} />
          <Route path="/inventory/warehouse" element={<RoleBasedRoute requiredPermissions={['view_staff']}><Layout><Warehouse /></Layout></RoleBasedRoute>} />
          <Route path="/inventory/category" element={<RoleBasedRoute requiredPermissions={['view_staff']}><Layout><Category /></Layout></RoleBasedRoute>} />
          <Route path="/inventory/product" element={<RoleBasedRoute requiredPermissions={['view_staff']}><Layout><Product /></Layout></RoleBasedRoute>} />
          <Route path="/inventory/purchase" element={<RoleBasedRoute requiredPermissions={['view_staff']}><Layout><Purchase /></Layout></RoleBasedRoute>} />
          <Route path="/inventory/sale" element={<RoleBasedRoute requiredPermissions={['view_staff']}><Layout><Sale /></Layout></RoleBasedRoute>} />
          <Route path="/inventory/issue" element={<RoleBasedRoute requiredPermissions={['view_staff']}><Layout><Issue /></Layout></RoleBasedRoute>} />

          {/* Asset Management Routes */}
          <Route path="/asset/vendor" element={<RoleBasedRoute requiredPermissions={['view_staff']}><Layout><Vendor /></Layout></RoleBasedRoute>} />
          <Route path="/asset/store" element={<RoleBasedRoute requiredPermissions={['view_staff']}><Layout><Store /></Layout></RoleBasedRoute>} />
          <Route path="/asset/category" element={<RoleBasedRoute requiredPermissions={['view_staff']}><Layout><AssetCategory /></Layout></RoleBasedRoute>} />
          <Route path="/asset/item" element={<RoleBasedRoute requiredPermissions={['view_staff']}><Layout><AssetItem /></Layout></RoleBasedRoute>} />
          <Route path="/asset/purchase" element={<RoleBasedRoute requiredPermissions={['view_staff']}><Layout><AssetPurchase /></Layout></RoleBasedRoute>} />
          <Route path="/asset/issue" element={<RoleBasedRoute requiredPermissions={['view_staff']}><Layout><AssetIssue /></Layout></RoleBasedRoute>} />

          {/* Library Routes */}
          <Route path="/library/book" element={<RoleBasedRoute requiredPermissions={['view_staff']}><Layout><Book /></Layout></RoleBasedRoute>} />
          <Route path="/library/member" element={<RoleBasedRoute requiredPermissions={['view_staff']}><Layout><LibraryMember /></Layout></RoleBasedRoute>} />
          <Route path="/library/issue-return" element={<RoleBasedRoute requiredPermissions={['view_staff']}><Layout><IssueReturn /></Layout></RoleBasedRoute>} />
          <Route path="/library/ebook" element={<RoleBasedRoute requiredPermissions={['view_staff']}><Layout><EBook /></Layout></RoleBasedRoute>} />

          {/* Transport Routes */}
          <Route path="/transport/vehicle" element={<RoleBasedRoute requiredPermissions={['view_staff']}><Layout><Vehicle /></Layout></RoleBasedRoute>} />
          <Route path="/transport/route" element={<RoleBasedRoute requiredPermissions={['view_staff']}><Layout><TransportRoute /></Layout></RoleBasedRoute>} />
          <Route path="/transport/member" element={<RoleBasedRoute requiredPermissions={['view_staff']}><Layout><TransportMember /></Layout></RoleBasedRoute>} />

          {/* Hostel Routes */}
          <Route path="/hostel/manage-hostel" element={<RoleBasedRoute requiredPermissions={['view_staff']}><Layout><ManageHostel /></Layout></RoleBasedRoute>} />
          <Route path="/hostel/manage-room" element={<RoleBasedRoute requiredPermissions={['view_staff']}><Layout><ManageRoom /></Layout></RoleBasedRoute>} />
          <Route path="/hostel/hostel-member" element={<RoleBasedRoute requiredPermissions={['view_staff']}><Layout><HostelMember /></Layout></RoleBasedRoute>} />

          {/* Message Route */}
          <Route path="/message" element={<RoleBasedRoute requiredPermissions={['view_staff']}><Layout><ManageMessage /></Layout></RoleBasedRoute>} />

          {/* Mail & SMS Routes */}
          <Route path="/mail-sms/email" element={<RoleBasedRoute requiredPermissions={['view_staff']}><Layout><Email /></Layout></RoleBasedRoute>} />
          <Route path="/mail-sms/sms" element={<RoleBasedRoute requiredPermissions={['view_staff']}><Layout><SMS /></Layout></RoleBasedRoute>} />

          {/* Complain Routes */}
          <Route path="/complain/complain-type" element={<RoleBasedRoute requiredPermissions={['view_staff']}><Layout><ComplainType /></Layout></RoleBasedRoute>} />
          <Route path="/complain/manage-complain" element={<RoleBasedRoute requiredPermissions={['view_staff']}><Layout><ManageComplain /></Layout></RoleBasedRoute>} />

          {/* Announcement Routes */}
          <Route path="/announcement/notice" element={<RoleBasedRoute requiredPermissions={['view_staff']}><Layout><Notice /></Layout></RoleBasedRoute>} />
          <Route path="/announcement/news" element={<RoleBasedRoute requiredPermissions={['view_staff']}><Layout><News /></Layout></RoleBasedRoute>} />
          <Route path="/announcement/holiday" element={<RoleBasedRoute requiredPermissions={['view_staff']}><Layout><Holiday /></Layout></RoleBasedRoute>} />

          {/* Scholarship Routes */}
          <Route path="/scholarship/candidate" element={<RoleBasedRoute requiredPermissions={['view_staff']}><Layout><Candidate /></Layout></RoleBasedRoute>} />
          <Route path="/scholarship/donar" element={<RoleBasedRoute requiredPermissions={['view_staff']}><Layout><Donar /></Layout></RoleBasedRoute>} />
          <Route path="/scholarship/scholarship" element={<RoleBasedRoute requiredPermissions={['view_staff']}><Layout><Scholarship /></Layout></RoleBasedRoute>} />

          {/* Event Route */}
          <Route path="/event" element={<RoleBasedRoute requiredPermissions={['view_staff']}><Layout><Event /></Layout></RoleBasedRoute>} />

          {/* Payroll Routes */}
          <Route path="/payroll/salary-grade" element={<RoleBasedRoute requiredPermissions={['view_staff']}><Layout><SalaryGrade /></Layout></RoleBasedRoute>} />
          <Route path="/payroll/salary-payment" element={<RoleBasedRoute requiredPermissions={['view_staff']}><Layout><SalaryPayment /></Layout></RoleBasedRoute>} />
          <Route path="/payroll/salary-history" element={<RoleBasedRoute requiredPermissions={['view_staff']}><Layout><SalaryHistory /></Layout></RoleBasedRoute>} />

          {/* Accounting Routes */}
          <Route path="/accounting/discount" element={<RoleBasedRoute requiredPermissions={['view_staff']}><Layout><Discount /></Layout></RoleBasedRoute>} />
          <Route path="/accounting/fee-type" element={<RoleBasedRoute requiredPermissions={['view_staff']}><Layout><FeeType /></Layout></RoleBasedRoute>} />
          <Route path="/accounting/fee-collection" element={<RoleBasedRoute requiredPermissions={['view_staff']}><Layout><FeeCollection /></Layout></RoleBasedRoute>} />
          <Route path="/accounting/manage-invoice" element={<RoleBasedRoute requiredPermissions={['view_staff']}><Layout><ManageInvoice /></Layout></RoleBasedRoute>} />
          <Route path="/accounting/due-invoice" element={<RoleBasedRoute requiredPermissions={['view_staff']}><Layout><DueInvoice /></Layout></RoleBasedRoute>} />
          <Route path="/accounting/due-receipt" element={<RoleBasedRoute requiredPermissions={['view_staff']}><Layout><DueReceipt /></Layout></RoleBasedRoute>} />
          <Route path="/accounting/paid-receipt" element={<RoleBasedRoute requiredPermissions={['view_staff']}><Layout><PaidReceipt /></Layout></RoleBasedRoute>} />
          <Route path="/accounting/due-fee-email" element={<RoleBasedRoute requiredPermissions={['view_staff']}><Layout><DueFeeEmail /></Layout></RoleBasedRoute>} />
          <Route path="/accounting/due-fee-sms" element={<RoleBasedRoute requiredPermissions={['view_staff']}><Layout><DueFeeSMS /></Layout></RoleBasedRoute>} />
          <Route path="/accounting/income-head" element={<RoleBasedRoute requiredPermissions={['view_staff']}><Layout><IncomeHead /></Layout></RoleBasedRoute>} />
          <Route path="/accounting/income" element={<RoleBasedRoute requiredPermissions={['view_staff']}><Layout><Income /></Layout></RoleBasedRoute>} />
          <Route path="/accounting/expenditure-head" element={<RoleBasedRoute requiredPermissions={['view_staff']}><Layout><ExpenditureHead /></Layout></RoleBasedRoute>} />
          <Route path="/accounting/expenditure" element={<RoleBasedRoute requiredPermissions={['view_staff']}><Layout><Expenditure /></Layout></RoleBasedRoute>} />

          {/* Report Routes */}
          <Route path="/reports/income-report" element={<RoleBasedRoute requiredPermissions={['view_staff']}><Layout><IncomeReport /></Layout></RoleBasedRoute>} />
          <Route path="/reports/expenditure-report" element={<RoleBasedRoute requiredPermissions={['view_staff']}><Layout><ExpenditureReport /></Layout></RoleBasedRoute>} />
          <Route path="/reports/invoice-report" element={<RoleBasedRoute requiredPermissions={['view_staff']}><Layout><InvoiceReport /></Layout></RoleBasedRoute>} />
          <Route path="/reports/due-fee-report" element={<RoleBasedRoute requiredPermissions={['view_staff']}><Layout><DueFeeReport /></Layout></RoleBasedRoute>} />
          <Route path="/reports/fee-collection-report" element={<RoleBasedRoute requiredPermissions={['view_staff']}><Layout><FeeCollectionReport /></Layout></RoleBasedRoute>} />
          <Route path="/reports/accounting-balance-report" element={<RoleBasedRoute requiredPermissions={['view_staff']}><Layout><AccountingBalanceReport /></Layout></RoleBasedRoute>} />
          <Route path="/reports/library-report" element={<RoleBasedRoute requiredPermissions={['view_staff']}><Layout><LibraryReport /></Layout></RoleBasedRoute>} />
          <Route path="/reports/student-attendance-report" element={<RoleBasedRoute requiredPermissions={['view_staff']}><Layout><StudentAttendanceReport /></Layout></RoleBasedRoute>} />
          <Route path="/reports/student-yearly-attendance-report" element={<RoleBasedRoute requiredPermissions={['view_staff']}><Layout><StudentYearlyAttendanceReport /></Layout></RoleBasedRoute>} />
          <Route path="/reports/teacher-attendance-report" element={<RoleBasedRoute requiredPermissions={['view_staff']}><Layout><TeacherAttendanceReport /></Layout></RoleBasedRoute>} />
          <Route path="/reports/teacher-yearly-attendance-report" element={<RoleBasedRoute requiredPermissions={['view_staff']}><Layout><TeacherYearlyAttendanceReport /></Layout></RoleBasedRoute>} />
          <Route path="/reports/employee-attendance-report" element={<RoleBasedRoute requiredPermissions={['view_staff']}><Layout><EmployeeAttendanceReport /></Layout></RoleBasedRoute>} />
          <Route path="/reports/employee-yearly-attendance-report" element={<RoleBasedRoute requiredPermissions={['view_staff']}><Layout><EmployeeYearlyAttendanceReport /></Layout></RoleBasedRoute>} />
          <Route path="/reports/student-report" element={<RoleBasedRoute requiredPermissions={['view_staff']}><Layout><StudentReport /></Layout></RoleBasedRoute>} />
          <Route path="/reports/student-invoice-report" element={<RoleBasedRoute requiredPermissions={['view_staff']}><Layout><StudentInvoiceReport /></Layout></RoleBasedRoute>} />
          <Route path="/reports/student-activity-report" element={<RoleBasedRoute requiredPermissions={['view_staff']}><Layout><StudentActivityReport /></Layout></RoleBasedRoute>} />
          <Route path="/reports/payroll-report" element={<RoleBasedRoute requiredPermissions={['view_staff']}><Layout><PayrollReport /></Layout></RoleBasedRoute>} />
          <Route path="/reports/daily-transaction-report" element={<RoleBasedRoute requiredPermissions={['view_staff']}><Layout><DailyTransactionReport /></Layout></RoleBasedRoute>} />
          <Route path="/reports/daily-statement-report" element={<RoleBasedRoute requiredPermissions={['view_staff']}><Layout><DailyStatementReport /></Layout></RoleBasedRoute>} />
          <Route path="/reports/exam-result-report" element={<RoleBasedRoute requiredPermissions={['view_staff']}><Layout><ExamResultReport /></Layout></RoleBasedRoute>} />

          {/* Media Gallery Routes */}
          <Route path="/media-gallery/gallery" element={<Layout><Gallery /></Layout>} />
          <Route path="/media-gallery/gallery-image" element={<Layout><GalleryImage /></Layout>} />

          {/* Manage Frontend Routes */}
          <Route path="/frontend-cms/frontend-page" element={<Layout><FrontendPage /></Layout>} />
          <Route path="/frontend-cms/slider" element={<Layout><Slider /></Layout>} />
          <Route path="/frontend-cms/about-school" element={<Layout><AboutSchool /></Layout>} />

          {/* Miscellaneous Routes */}
          <Route path="/miscellaneous/manage-award" element={<Layout><ManageAward /></Layout>} />
          <Route path="/miscellaneous/manage-todo" element={<Layout><ManageTodo /></Layout>} />
          <Route path="/miscellaneous/faq" element={<Layout><FAQ /></Layout>} />

          {/* Subscription (SaaS) Routes */}
          <Route path="/subscription/faq" element={<Layout><SubscriptionFAQ /></Layout>} />
          <Route path="/subscription/slider" element={<Layout><SubscriptionSlider /></Layout>} />
          <Route path="/subscription/setting" element={<Layout><SubscriptionSetting /></Layout>} />
          <Route path="/subscription/general-setting" element={<Layout><GeneralSetting /></Layout>} />
          <Route path="/subscription/plan" element={<Layout><SubscriptionPlan /></Layout>} />
          <Route path="/subscription/subscription" element={<Layout><Subscription /></Layout>} />

          {/* Profile Routes */}
          <Route path="/profile/my-profile" element={<Layout><MyProfile /></Layout>} />
          <Route path="/profile/reset-password" element={<Layout><ResetPassword /></Layout>} />

          <Route
            path="/"
            element={
              isAuthenticated ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </MuiThemeProvider>
  );
}

function App() {
  return (
    <ThemeProvider>
      <SchoolProvider>
        <AppContent />
      </SchoolProvider>
    </ThemeProvider>
  );
}

export default App;
