import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Paper,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Typography,
  Breadcrumbs,
  Link,
  Alert,
  CircularProgress,
  Grid,
  Card,
  CardContent,
  Tabs,
  Tab,
  Stack,
  Tooltip,
  IconButton,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Save as SaveIcon,
  Lock as LockIcon,
  Print as PrintIcon,
} from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';
import apiService from '../../services/apiService';

// Complete Feature Matrix with all modules and functions
const FEATURE_MATRIX = [
  {
    id: 1,
    module: 'Setting',
    features: [
      { id: '1.1', name: 'General Setting (Only Admin)', permissions: ['view', 'add', 'edit', 'delete'] },
      { id: '1.2', name: 'Payment Setting (Only Admin)', permissions: ['view', 'add', 'edit', 'delete'] },
      { id: '1.3', name: 'SMS Setting (Only Admin)', permissions: ['view', 'add', 'edit', 'delete'] },
      { id: '1.4', name: 'Email Setting (Only Admin)', permissions: ['view', 'add', 'edit', 'delete'] },
      { id: '1.5', name: 'Global Search', permissions: ['view'] },
      { id: '1.6', name: 'Global Session Change', permissions: ['view', 'edit'] },
      { id: '1.7', name: 'Opening Hour (Only Admin)', permissions: ['view', 'add', 'edit', 'delete'] },
    ],
  },
  {
    id: 2,
    module: 'Theme',
    features: [
      { id: '2.1', name: 'Theme', permissions: ['view', 'add', 'edit', 'delete'] },
    ],
  },
  {
    id: 3,
    module: 'Language',
    features: [
      { id: '3.1', name: 'Language', permissions: ['view', 'add', 'edit', 'delete'] },
    ],
  },
  {
    id: 4,
    module: 'Administrator',
    features: [
      { id: '4.1', name: 'Academic Year', permissions: ['view', 'add', 'edit', 'delete'] },
      { id: '4.2', name: 'User Role (Only Super Admin)', permissions: ['view', 'add', 'edit', 'delete'] },
      { id: '4.3', name: 'Role Permission (Only Super Admin)', permissions: ['view', 'add', 'edit', 'delete'] },
      { id: '4.4', name: 'Manage User', permissions: ['view', 'add', 'edit', 'delete'] },
      { id: '4.5', name: 'Reset User Password', permissions: ['view', 'add', 'edit'] },
      { id: '4.6', name: 'Backup Database (Only Super Admin)', permissions: ['view', 'add'] },
      { id: '4.7', name: 'School (Only Super Admin)', permissions: ['view', 'add', 'edit', 'delete'] },
      { id: '4.8', name: 'Payment (Only Super Admin)', permissions: ['view', 'add', 'edit', 'delete'] },
      { id: '4.9', name: 'SMS (Only Super Admin)', permissions: ['view', 'add', 'edit', 'delete'] },
      { id: '4.10', name: 'SMS Template', permissions: ['view', 'add', 'edit', 'delete'] },
      { id: '4.11', name: 'Email Template', permissions: ['view', 'add', 'edit', 'delete'] },
      { id: '4.12', name: 'Activity Log', permissions: ['view'] },
      { id: '4.13', name: 'Super Admin (Only Super Admin)', permissions: ['view', 'add', 'edit', 'delete'] },
      { id: '4.14', name: 'Guardian Feedback', permissions: ['view'] },
      { id: '4.15', name: 'General Setting (Only Super Admin)', permissions: ['view', 'add', 'edit', 'delete'] },
      { id: '4.16', name: 'Email Setting (Only Super Admin)', permissions: ['view', 'add', 'edit', 'delete'] },
      { id: '4.17', name: 'User Credential', permissions: ['view', 'add', 'edit', 'delete'] },
      { id: '4.18', name: 'Username', permissions: ['view', 'edit'] },
      { id: '4.19', name: 'Opening Hour (Only Super Admin)', permissions: ['view', 'add', 'edit', 'delete'] },
    ],
  },
  {
    id: 5,
    module: 'Human Resource',
    features: [
      { id: '5.1', name: 'Designation', permissions: ['view', 'add', 'edit', 'delete'] },
      { id: '5.2', name: 'Employee', permissions: ['view', 'add', 'edit', 'delete'] },
    ],
  },
  {
    id: 6,
    module: 'Teacher',
    features: [
      { id: '6.1', name: 'Teacher', permissions: ['view', 'add', 'edit', 'delete'] },
      { id: '6.2', name: 'Teacher Lecture', permissions: ['view', 'add', 'edit', 'delete'] },
      { id: '6.3', name: 'Department', permissions: ['view', 'add', 'edit', 'delete'] },
      { id: '6.4', name: 'Rating', permissions: ['view', 'add', 'edit'] },
    ],
  },
  {
    id: 7,
    module: 'Academic Activity',
    features: [
      { id: '7.1', name: 'Classes', permissions: ['view', 'add', 'edit', 'delete'] },
      { id: '7.2', name: 'Section', permissions: ['view', 'add', 'edit', 'delete'] },
      { id: '7.3', name: 'Subject', permissions: ['view', 'add', 'edit', 'delete'] },
      { id: '7.4', name: 'Syllabus', permissions: ['view', 'add', 'edit', 'delete'] },
      { id: '7.5', name: 'Class Routine', permissions: ['view', 'add', 'edit', 'delete'] },
      { id: '7.6', name: 'Promotion', permissions: ['view', 'add', 'edit'] },
      { id: '7.7', name: 'Material', permissions: ['view', 'add', 'edit', 'delete'] },
      { id: '7.8', name: 'Live Class', permissions: ['view', 'add', 'edit', 'delete'] },
      { id: '7.9', name: 'Assignment', permissions: ['view', 'add', 'edit', 'delete'] },
      { id: '7.10', name: 'Submission', permissions: ['view', 'add', 'edit', 'delete'] },
    ],
  },
  {
    id: 8,
    module: 'Guardian',
    features: [
      { id: '8.1', name: 'Guardian', permissions: ['view', 'add', 'edit', 'delete'] },
      { id: '8.2', name: 'Feedback', permissions: ['view', 'add', 'edit'] },
    ],
  },
  {
    id: 9,
    module: 'Student',
    features: [
      { id: '9.1', name: 'Student', permissions: ['view', 'add', 'edit', 'delete'] },
      { id: '9.2', name: 'Bulk Import', permissions: ['view', 'add'] },
      { id: '9.3', name: 'Student Activity', permissions: ['view', 'add', 'edit', 'delete'] },
      { id: '9.4', name: 'Online Admission', permissions: ['view', 'add', 'edit'] },
      { id: '9.5', name: 'Student Type', permissions: ['view', 'add', 'edit', 'delete'] },
    ],
  },
  {
    id: 10,
    module: 'Attendance',
    features: [
      { id: '10.1', name: 'Employee Attendance', permissions: ['view', 'add', 'edit', 'delete'] },
      { id: '10.2', name: 'Teacher Attendance', permissions: ['view', 'add', 'edit', 'delete'] },
      { id: '10.3', name: 'Student Attendance', permissions: ['view', 'add', 'edit', 'delete'] },
      { id: '10.4', name: 'Absent Email', permissions: ['view', 'add', 'edit'] },
      { id: '10.5', name: 'Absent SMS', permissions: ['view', 'add', 'edit'] },
    ],
  },
  {
    id: 11,
    module: 'Exam',
    features: [
      { id: '11.1', name: 'Exam Term', permissions: ['view', 'add', 'edit', 'delete'] },
      { id: '11.2', name: 'Exam Grade', permissions: ['view', 'add', 'edit', 'delete'] },
      { id: '11.3', name: 'Exam Schedule', permissions: ['view', 'add', 'edit', 'delete'] },
      { id: '11.4', name: 'Exam Suggestion', permissions: ['view', 'add', 'edit'] },
      { id: '11.5', name: 'Exam Attendance', permissions: ['view', 'add', 'edit', 'delete'] },
    ],
  },
  {
    id: 12,
    module: 'Exam Mark',
    features: [
      { id: '12.1', name: 'Exam Mark', permissions: ['view', 'add', 'edit', 'delete'] },
      { id: '12.2', name: 'Mark Sheet', permissions: ['view', 'add', 'edit'] },
      { id: '12.3', name: 'Result', permissions: ['view', 'add', 'edit'] },
      { id: '12.4', name: 'Mark send by SMS', permissions: ['view', 'add', 'edit'] },
      { id: '12.5', name: 'Mark send by Email', permissions: ['view', 'add', 'edit'] },
      { id: '12.6', name: 'Exam Result', permissions: ['view', 'add', 'edit'] },
      { id: '12.7', name: 'Final Result', permissions: ['view', 'edit'] },
      { id: '12.8', name: 'Merit List', permissions: ['view'] },
      { id: '12.9', name: 'Result Email', permissions: ['view', 'add', 'edit'] },
      { id: '12.10', name: 'Result SMS', permissions: ['view', 'add', 'edit'] },
      { id: '12.11', name: 'Result Card', permissions: ['view', 'edit'] },
    ],
  },
  {
    id: 13,
    module: 'Library',
    features: [
      { id: '13.1', name: 'Library Book', permissions: ['view', 'add', 'edit', 'delete'] },
      { id: '13.2', name: 'Library Member', permissions: ['view', 'add', 'edit', 'delete'] },
      { id: '13.3', name: 'Issue & Return', permissions: ['view', 'add', 'edit', 'delete'] },
      { id: '13.4', name: 'e-book', permissions: ['view', 'add', 'edit', 'delete'] },
    ],
  },
  {
    id: 14,
    module: 'Transport',
    features: [
      { id: '14.1', name: 'Vehicle', permissions: ['view', 'add', 'edit', 'delete'] },
      { id: '14.2', name: 'Transport Route', permissions: ['view', 'add', 'edit', 'delete'] },
      { id: '14.3', name: 'Transport Member', permissions: ['view', 'add', 'edit', 'delete'] },
    ],
  },
  {
    id: 15,
    module: 'Hostel',
    features: [
      { id: '15.1', name: 'Hostel', permissions: ['view', 'add', 'edit', 'delete'] },
      { id: '15.2', name: 'Hostel Room', permissions: ['view', 'add', 'edit', 'delete'] },
      { id: '15.3', name: 'Hostel Member', permissions: ['view', 'add', 'edit', 'delete'] },
    ],
  },
  {
    id: 16,
    module: 'Message, Email & SMS',
    features: [
      { id: '16.1', name: 'Email', permissions: ['view', 'add', 'edit', 'delete'] },
      { id: '16.2', name: 'Text SMS', permissions: ['view', 'add', 'edit', 'delete'] },
      { id: '16.3', name: 'Message', permissions: ['view', 'add', 'edit', 'delete'] },
    ],
  },
  {
    id: 17,
    module: 'Announcement',
    features: [
      { id: '17.1', name: 'Notice', permissions: ['view', 'add', 'edit', 'delete'] },
      { id: '17.2', name: 'News', permissions: ['view', 'add', 'edit', 'delete'] },
      { id: '17.3', name: 'Holiday', permissions: ['view', 'add', 'edit', 'delete'] },
    ],
  },
  {
    id: 18,
    module: 'Event',
    features: [
      { id: '18.1', name: 'Event', permissions: ['view', 'add', 'edit', 'delete'] },
    ],
  },
  {
    id: 19,
    module: 'Front Office',
    features: [
      { id: '19.1', name: 'Visitor', permissions: ['view', 'add', 'edit', 'delete'] },
      { id: '19.2', name: 'Visitor Purpose', permissions: ['view', 'add', 'edit', 'delete'] },
      { id: '19.3', name: 'Call Logs', permissions: ['view', 'add', 'edit'] },
      { id: '19.4', name: 'Postal Dispatch', permissions: ['view', 'add', 'edit', 'delete'] },
      { id: '19.5', name: 'Postal Receive', permissions: ['view', 'add', 'edit', 'delete'] },
      { id: '19.6', name: 'Front Office', permissions: ['view', 'add', 'edit', 'delete'] },
    ],
  },
  {
    id: 20,
    module: 'Accounting',
    features: [
      { id: '20.1', name: 'Expenditure Head', permissions: ['view', 'add', 'edit', 'delete'] },
      { id: '20.2', name: 'Expenditure', permissions: ['view', 'add', 'edit', 'delete'] },
      { id: '20.3', name: 'Income Head', permissions: ['view', 'add', 'edit', 'delete'] },
      { id: '20.4', name: 'Income', permissions: ['view', 'add', 'edit', 'delete'] },
      { id: '20.5', name: 'Invoice', permissions: ['view', 'add', 'edit', 'delete'] },
      { id: '20.6', name: 'Payment', permissions: ['view', 'add', 'edit', 'delete'] },
      { id: '20.7', name: 'Discount', permissions: ['view', 'add', 'edit', 'delete'] },
      { id: '20.8', name: 'Fee Type', permissions: ['view', 'add', 'edit', 'delete'] },
      { id: '20.9', name: 'Due Fee Email', permissions: ['view', 'add', 'edit'] },
      { id: '20.10', name: 'Due Fee SMS', permissions: ['view', 'add', 'edit'] },
      { id: '20.11', name: 'Invoice Receipt', permissions: ['view', 'add', 'edit'] },
    ],
  },
  {
    id: 21,
    module: 'Report',
    features: [
      { id: '21.1', name: 'Report', permissions: ['view', 'add'] },
    ],
  },
  {
    id: 22,
    module: 'Certificate',
    features: [
      { id: '22.1', name: 'Certificate Type', permissions: ['view', 'add', 'edit', 'delete'] },
      { id: '22.2', name: 'Certificate', permissions: ['view', 'add', 'edit', 'delete'] },
    ],
  },
  {
    id: 23,
    module: 'Media Gallery',
    features: [
      { id: '23.1', name: 'Gallery', permissions: ['view', 'add', 'edit', 'delete'] },
      { id: '23.2', name: 'Image', permissions: ['view', 'add', 'edit', 'delete'] },
    ],
  },
  {
    id: 24,
    module: 'Frontend',
    features: [
      { id: '24.1', name: 'Frontend', permissions: ['view', 'add', 'edit', 'delete'] },
      { id: '24.2', name: 'Home Slider', permissions: ['view', 'add', 'edit', 'delete'] },
      { id: '24.3', name: 'About', permissions: ['view', 'add', 'edit', 'delete'] },
    ],
  },
  {
    id: 25,
    module: 'Payroll',
    features: [
      { id: '25.1', name: 'Salary Grade', permissions: ['view', 'add', 'edit', 'delete'] },
      { id: '25.2', name: 'Payment', permissions: ['view', 'add', 'edit', 'delete'] },
      { id: '25.3', name: 'History', permissions: ['view'] },
    ],
  },
  {
    id: 26,
    module: 'Complain',
    features: [
      { id: '26.1', name: 'Complain', permissions: ['view', 'add', 'edit', 'delete'] },
      { id: '26.2', name: 'Complain Type', permissions: ['view', 'add', 'edit', 'delete'] },
    ],
  },
  {
    id: 27,
    module: 'User Complain',
    features: [
      { id: '27.1', name: 'User Complain (Except Super Admin)', permissions: ['view', 'add', 'edit', 'delete'] },
    ],
  },
  {
    id: 28,
    module: 'User Leave',
    features: [
      { id: '28.1', name: 'User Leave (Except Super Admin)', permissions: ['view', 'add', 'edit', 'delete'] },
    ],
  },
  {
    id: 29,
    module: 'Leave Management',
    features: [
      { id: '29.1', name: 'Leave Management', permissions: ['view', 'add', 'edit', 'delete'] },
      { id: '29.2', name: 'Leave Type', permissions: ['view', 'add', 'edit', 'delete'] },
      { id: '29.3', name: 'Leave Application', permissions: ['view', 'add', 'edit', 'delete'] },
      { id: '29.4', name: 'Waiting Leave', permissions: ['view'] },
      { id: '29.5', name: 'Approve Leave', permissions: ['view', 'edit'] },
      { id: '29.6', name: 'Decline Leave', permissions: ['view', 'edit'] },
    ],
  },
  {
    id: 30,
    module: 'ID Card & Admit Card',
    features: [
      { id: '30.1', name: 'ID & Admit card', permissions: ['view', 'add', 'edit', 'delete'] },
      { id: '30.2', name: 'Teacher ID card', permissions: ['view', 'add', 'edit', 'delete'] },
      { id: '30.3', name: 'Employee ID Card', permissions: ['view', 'add', 'edit', 'delete'] },
      { id: '30.4', name: 'Student ID card', permissions: ['view', 'add', 'edit', 'delete'] },
      { id: '30.5', name: 'ID Card Setting (Only Super Admin)', permissions: ['view', 'add', 'edit', 'delete'] },
      { id: '30.6', name: 'Admit Card Setting (Only Super Admin)', permissions: ['view', 'add', 'edit', 'delete'] },
      { id: '30.7', name: 'Admit card', permissions: ['view', 'add', 'edit'] },
      { id: '30.8', name: 'School ID Setting (Only Admin)', permissions: ['view', 'add', 'edit'] },
      { id: '30.9', name: 'School Admit Setting (Only Admin)', permissions: ['view', 'add', 'edit'] },
    ],
  },
  {
    id: 31,
    module: 'Miscellaneous',
    features: [
      { id: '31.1', name: 'Award', permissions: ['view', 'add', 'edit', 'delete'] },
      { id: '31.2', name: 'Faq', permissions: ['view', 'add', 'edit', 'delete'] },
      { id: '31.3', name: 'Todo', permissions: ['view', 'add', 'edit', 'delete'] },
    ],
  },
  {
    id: 32,
    module: 'Scholarship',
    features: [
      { id: '32.1', name: 'Candidate', permissions: ['view', 'add', 'edit', 'delete'] },
      { id: '32.2', name: 'Donor', permissions: ['view', 'add', 'edit', 'delete'] },
      { id: '32.3', name: 'Scholarship', permissions: ['view', 'add', 'edit', 'delete'] },
    ],
  },
  {
    id: 33,
    module: 'Asset Management',
    features: [
      { id: '33.1', name: 'Category', permissions: ['view', 'add', 'edit', 'delete'] },
      { id: '33.2', name: 'Issue', permissions: ['view', 'add', 'edit', 'delete'] },
      { id: '33.3', name: 'Item Category', permissions: ['view', 'add', 'edit', 'delete'] },
      { id: '33.4', name: 'Purchase', permissions: ['view', 'add', 'edit', 'delete'] },
      { id: '33.5', name: 'Store', permissions: ['view', 'add', 'edit', 'delete'] },
      { id: '33.6', name: 'Vendor', permissions: ['view', 'add', 'edit', 'delete'] },
    ],
  },
  {
    id: 34,
    module: 'Inventory',
    features: [
      { id: '34.1', name: 'Item Category', permissions: ['view', 'add', 'edit', 'delete'] },
      { id: '34.2', name: 'Item Supplier', permissions: ['view', 'add', 'edit', 'delete'] },
      { id: '34.3', name: 'Item Warehouse', permissions: ['view', 'add', 'edit', 'delete'] },
      { id: '34.4', name: 'Item Product', permissions: ['view', 'add', 'edit', 'delete'] },
      { id: '34.5', name: 'Item Purchase', permissions: ['view', 'add', 'edit', 'delete'] },
      { id: '34.6', name: 'Item Sale', permissions: ['view', 'add', 'edit', 'delete'] },
      { id: '34.7', name: 'Item Issue', permissions: ['view', 'add', 'edit', 'delete'] },
    ],
  },
  {
    id: 35,
    module: 'Lessonplan',
    features: [
      { id: '35.1', name: 'Lessonplan', permissions: ['view', 'add', 'edit', 'delete'] },
      { id: '35.2', name: 'Lesson', permissions: ['view', 'add', 'edit', 'delete'] },
      { id: '35.3', name: 'Topic', permissions: ['view', 'add', 'edit', 'delete'] },
      { id: '35.4', name: 'Status', permissions: ['view', 'add', 'edit', 'delete'] },
      { id: '35.5', name: 'Timeline', permissions: ['view', 'add', 'edit', 'delete'] },
    ],
  },
  {
    id: 36,
    module: 'Online Exam',
    features: [
      { id: '36.1', name: 'Take Exam', permissions: ['view', 'add', 'edit'] },
      { id: '36.2', name: 'Online Exam', permissions: ['view', 'add', 'edit', 'delete'] },
      { id: '36.3', name: 'Question Bank', permissions: ['view', 'add', 'edit', 'delete'] },
      { id: '36.4', name: 'Exam Instructions', permissions: ['view', 'add', 'edit', 'delete'] },
    ],
  },
  {
    id: 37,
    module: 'Subscription',
    features: [
      { id: '37.1', name: 'Faqs (Only Super Admin)', permissions: ['view', 'add', 'edit', 'delete'] },
      { id: '37.2', name: 'Slider (Only Super Admin)', permissions: ['view', 'add', 'edit', 'delete'] },
      { id: '37.3', name: 'Subscription (Only Super Admin)', permissions: ['view', 'add', 'edit', 'delete'] },
      { id: '37.4', name: 'Setting (Only Super Admin)', permissions: ['view', 'add', 'edit', 'delete'] },
      { id: '37.5', name: 'Plan (Only Super Admin)', permissions: ['view', 'add', 'edit', 'delete'] },
    ],
  },
];

const RolePermissionChecklist = () => {
  const navigate = useNavigate();
  const { roleId } = useParams();
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [selectedPermissions, setSelectedPermissions] = useState({});
  const [expandedModules, setExpandedModules] = useState(new Set());
  const [permissionMapping, setPermissionMapping] = useState({}); // Maps permission names to IDs
  const [allPermissionsByModule, setAllPermissionsByModule] = useState([]); // All permissions from backend
  const [featureToPermissionMap, setFeatureToPermissionMap] = useState({}); // Maps feature_permType to permission ID

  useEffect(() => {
    if (roleId) {
      loadRoleAndPermissions();
    }
  }, [roleId]);

  const loadRoleAndPermissions = async () => {
    try {
      setLoading(true);
      const response = await apiService.get(`/roles/roles/${roleId}/`);
      const roleData = response.data.data || response.data;
      setRole(roleData);

      // Load current permissions for role
      const permResponse = await apiService.get(`/roles/roles/${roleId}/permissions/`);
      const permData = permResponse.data.data || permResponse.data;

      // Store all permissions by module for reference
      setAllPermissionsByModule(permData.permissions_by_module || []);

      // Build permission mapping, feature-to-permission mapping, and selected permissions
      const mapping = {};
      const featureMap = {};
      const selected = {};

      console.log('[Permission Mapping] Starting mapping from backend module:', permData.permissions_by_module);
      console.log('[Permission Mapping] FEATURE_MATRIX modules:', FEATURE_MATRIX.map(m => m.module));

      (permData.permissions_by_module || []).forEach(mod => {
        console.log(`[Permission Mapping] Processing module: ${mod.module}, module_name: ${mod.module_name}`);
        mod.permissions?.forEach(perm => {
          // Create mapping from permission name to ID
          // Permission names typically follow pattern like "view_setting", "add_student", etc.
          mapping[perm.name] = perm.id;

          if (perm.is_assigned) {
            selected[perm.id] = true;
          }

          // Build feature-to-permission mapping
          // Try to map backend permissions to our feature matrix
          // Extract permission type (view, add, edit, delete) and module name
          const parts = perm.name.split('_');
          if (parts.length >= 2) {
            const permType = parts[0]; // view, add, edit, delete
            const moduleName = parts.slice(1).join('_'); // rest is module name

            console.log(`[Permission Mapping] Permission: ${perm.name}, Type: ${permType}, Module: ${moduleName}, ID: ${perm.id}`);

            // Try to find matching feature in FEATURE_MATRIX
            // Use the backend module name as primary match
            let found = false;
            for (const featureModule of FEATURE_MATRIX) {
              // Try multiple matching strategies
              const moduleMatch =
                featureModule.module.toLowerCase() === mod.module.toLowerCase() || // Direct match with backend module
                featureModule.module.toLowerCase() === moduleName.replace(/_/g, '').toLowerCase() ||
                featureModule.module.toLowerCase() === moduleName.toLowerCase();

              if (moduleMatch) {
                console.log(`[Permission Mapping] Matched module: ${featureModule.module} for backend module ${mod.module}`);
                // Map all features in this module to this permission
                featureModule.features.forEach(feature => {
                  if (feature.permissions.includes(permType)) {
                    const key = `${feature.id}_${permType}`;
                    featureMap[key] = perm.id;
                    found = true;
                    console.log(`[Permission Mapping] Mapped ${key} -> ${perm.id}`);
                  }
                });
              }
            }

            if (!found) {
              console.warn(`[Permission Mapping] No feature match found for ${perm.name}`);
            }
          }
        });
      });

      console.log('[Permission Mapping] Final featureMap:', featureMap);
      console.log('[Permission Mapping] Final selectedPermissions:', selected);
      console.log('[Permission Mapping] Feature to permission map stats:', Object.keys(featureMap).length, 'mappings');

      setPermissionMapping(mapping);
      setFeatureToPermissionMap(featureMap);
      setSelectedPermissions(selected);
    } catch (err) {
      console.error('Error loading role and permissions:', err);
      setError('Failed to load role details');
    } finally {
      setLoading(false);
    }
  };

  const handleFeaturePermissionChange = (featureId, permissionType, checked) => {
    const key = `${featureId}_${permissionType}`;
    const permissionId = featureToPermissionMap[key];

    if (permissionId) {
      setSelectedPermissions(prev => ({
        ...prev,
        [permissionId]: checked
      }));
    } else {
      console.warn(`No permission found for ${key}`);
    }
  };

  const handleModuleToggle = (moduleId) => {
    const newExpanded = new Set(expandedModules);
    if (newExpanded.has(moduleId)) {
      newExpanded.delete(moduleId);
    } else {
      newExpanded.add(moduleId);
    }
    setExpandedModules(newExpanded);
  };

  const handleSelectAllModulePermissions = (moduleId, select = true) => {
    const module = FEATURE_MATRIX.find(m => m.id === moduleId);
    if (!module) return;

    const newSelected = { ...selectedPermissions };
    module.features.forEach(feature => {
      feature.permissions.forEach(permType => {
        const featureKey = `${feature.id}_${permType}`;
        const permissionId = featureToPermissionMap[featureKey];

        if (permissionId) {
          if (select) {
            newSelected[permissionId] = true;
          } else {
            delete newSelected[permissionId];
          }
        }
      });
    });
    setSelectedPermissions(newSelected);
  };

  const handleSavePermissions = async () => {
    try {
      setSaving(true);

      // Convert selected permissions object to array of permission IDs
      // selectedPermissions now contains actual permission IDs as keys
      const permissionIds = Object.keys(selectedPermissions)
        .filter(key => selectedPermissions[key])
        .map(key => parseInt(key, 10)); // Convert string keys to integer IDs

      await apiService.put(`/roles/roles/${roleId}/permissions/`, {
        permission_ids: permissionIds,
      });

      setSuccess(true);
      // Navigate back after 2 seconds to let user see success message
      setTimeout(() => {
        navigate('/admin/role-permission');
      }, 2000);
    } catch (err) {
      console.error('Error saving permissions:', err);
      setError('Failed to save permissions');
    } finally {
      setSaving(false);
    }
  };

  const getModuleStats = (moduleId) => {
    const module = FEATURE_MATRIX.find(m => m.id === moduleId);
    if (!module) return { total: 0, selected: 0 };

    let total = 0;
    let selected = 0;

    module.features.forEach(feature => {
      feature.permissions.forEach(permType => {
        total++;
        const key = `${feature.id}_${permType}`;
        const permissionId = featureToPermissionMap[key];
        if (permissionId && selectedPermissions[permissionId]) selected++;
      });
    });

    return { total, selected };
  };

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      {/* Breadcrumb */}
      <Breadcrumbs sx={{ mb: 2 }}>
        <Link
          component="button"
          variant="body2"
          onClick={() => navigate('/admin/role-permission')}
          sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 0.5 }}
        >
          <ArrowBackIcon fontSize="small" /> Role Permissions
        </Link>
        <Typography variant="body2">{role?.name || 'Loading...'}</Typography>
      </Breadcrumbs>

      {/* Alerts */}
      {error && <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSuccess(false)}>Permissions saved successfully!</Alert>}

      {/* Header */}
      <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <LockIcon sx={{ fontSize: 32, color: '#667eea' }} />
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                Permission Checklist: {role?.name}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {role?.description}
              </Typography>
            </Box>
          </Box>
          <Stack direction="row" spacing={1}>
            <Tooltip title="Print checklist">
              <IconButton size="small">
                <PrintIcon />
              </IconButton>
            </Tooltip>
          </Stack>
        </Box>

        {/* Summary Stats */}
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 2 }}>
          <Card variant="outlined">
            <CardContent sx={{ py: 2 }}>
              <Typography color="textSecondary" variant="body2" sx={{ mb: 1 }}>
                Modules
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                {FEATURE_MATRIX.length}
              </Typography>
            </CardContent>
          </Card>
          <Card variant="outlined">
            <CardContent sx={{ py: 2 }}>
              <Typography color="textSecondary" variant="body2" sx={{ mb: 1 }}>
                Total Features
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                {FEATURE_MATRIX.reduce((sum, m) => sum + m.features.length, 0)}
              </Typography>
            </CardContent>
          </Card>
          <Card variant="outlined">
            <CardContent sx={{ py: 2 }}>
              <Typography color="textSecondary" variant="body2" sx={{ mb: 1 }}>
                Permissions Selected
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                {Object.values(selectedPermissions).filter(v => v).length}
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Paper>

      {/* Checklist Tables */}
      <Box sx={{ display: 'grid', gap: 2 }}>
        {FEATURE_MATRIX.map(module => {
          const stats = getModuleStats(module.id);
          const isExpanded = expandedModules.has(module.id);

          return (
            <Paper key={module.id} elevation={1}>
              {/* Module Header */}
              <Box
                onClick={() => handleModuleToggle(module.id)}
                sx={{
                  p: 2,
                  backgroundColor: '#f5f5f5',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  '&:hover': { backgroundColor: '#eeeeee' },
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography
                    sx={{
                      transform: isExpanded ? 'rotate(0deg)' : 'rotate(-90deg)',
                      transition: 'transform 0.3s',
                      fontSize: 20,
                    }}
                  >
                    ▼
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}>
                    {module.id}. {module.module}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Typography variant="body2" color="textSecondary">
                    {stats.selected}/{stats.total} selected
                  </Typography>
                  <Box sx={{ width: 120, height: 6, backgroundColor: '#e0e0e0', borderRadius: 3, overflow: 'hidden' }}>
                    <Box
                      sx={{
                        height: '100%',
                        width: `${stats.total > 0 ? (stats.selected / stats.total) * 100 : 0}%`,
                        backgroundColor: stats.selected === stats.total ? '#4caf50' : '#2196f3',
                        transition: 'width 0.3s',
                      }}
                    />
                  </Box>
                </Box>
              </Box>

              {/* Module Features Table */}
              {isExpanded && (
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow sx={{ backgroundColor: '#fafafa' }}>
                        <TableCell sx={{ width: '5%', fontWeight: 'bold' }}>#SL</TableCell>
                        <TableCell sx={{ width: '50%', fontWeight: 'bold' }}>Function Name</TableCell>
                        <TableCell sx={{ width: '15%', textAlign: 'center', fontWeight: 'bold' }}>View</TableCell>
                        <TableCell sx={{ width: '12%', textAlign: 'center', fontWeight: 'bold' }}>Add</TableCell>
                        <TableCell sx={{ width: '12%', textAlign: 'center', fontWeight: 'bold' }}>Edit</TableCell>
                        <TableCell sx={{ width: '12%', textAlign: 'center', fontWeight: 'bold' }}>Delete</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {module.features.map((feature, index) => (
                        <TableRow key={feature.id} hover>
                          <TableCell sx={{ fontSize: '0.85rem' }}>{index + 1}</TableCell>
                          <TableCell>
                            <Typography variant="body2">{feature.name}</Typography>
                          </TableCell>
                          {['view', 'add', 'edit', 'delete'].map(permType => {
                            const key = `${feature.id}_${permType}`;
                            const permissionId = featureToPermissionMap[key];
                            return (
                              <TableCell key={permType} sx={{ textAlign: 'center' }}>
                                {feature.permissions.includes(permType) ? (
                                  <Checkbox
                                    checked={permissionId ? !!selectedPermissions[permissionId] : false}
                                    onChange={(e) =>
                                      handleFeaturePermissionChange(feature.id, permType, e.target.checked)
                                    }
                                    size="small"
                                    disabled={!permissionId}
                                    title={!permissionId ? 'Permission mapping not found' : ''}
                                  />
                                ) : (
                                  <Typography variant="caption" color="textSecondary">-</Typography>
                                )}
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </Paper>
          );
        })}
      </Box>

      {/* Action Buttons */}
      <Box sx={{ display: 'flex', gap: 2, mt: 4, justifyContent: 'flex-end' }}>
        <Button
          variant="outlined"
          onClick={() => navigate('/admin/role-permission')}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          startIcon={<SaveIcon />}
          onClick={handleSavePermissions}
          disabled={saving}
          loading={saving}
        >
          {saving ? 'Saving...' : 'Save Permissions'}
        </Button>
      </Box>
    </Container>
  );
};

export default RolePermissionChecklist;
