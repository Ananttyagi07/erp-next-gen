import { useEffect, useState, useRef, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  useTheme,
  CircularProgress,
  Chip,
} from '@mui/material';
import {
  School as StudentIcon,
  Person as TeacherIcon,
  AttachMoney as RevenueIcon,
  Event as AttendanceIcon,
  ArrowForward as ArrowForwardIcon,
  Apps as AppsIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { useAuth } from '../context/AuthContext';
import { usePermissions } from '../hooks/usePermissions';
import { useSchool } from '../context/useSchool';
import apiService from '../services/apiService';
import { getMenuItems } from '../components/common/Sidebar';

// Cosmetic/meta entries that aren't real business modules — left out of the
// "Your Modules" grid so it reads as an actual module directory.
const NON_MODULE_KEYS = new Set(['dashboard', 'theme', 'languageManagement']);

const ROLE_TAGLINES = {
  Superadmin: 'Full system access across every college and module.',
  Admin: "Here's what's happening across your college today.",
  Teacher: 'Your teaching workspace — classes, attendance and results.',
  Student: 'Your academic snapshot — attendance, exams and resources.',
  Staff: 'Your daily operations hub.',
};

const Dashboard = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { hasPermission, hasAnyPermission, isSuperuser } = usePermissions();
  const { selectedSchool } = useSchool();

  // Derive the module grid straight from the same menuItems config that
  // drives the Sidebar, so it automatically evolves whenever a role's
  // permission set changes — no separate mapping to keep in sync.
  const canAccess = (item) => {
    if (isSuperuser) return true;
    if (!item.permissions || item.permissions.length === 0) return true;
    return hasAnyPermission(item.permissions);
  };

  const moduleItems = useMemo(() => {
    const menuItems = getMenuItems(t);
    const tiles = [];

    menuItems.forEach((item) => {
      if (NON_MODULE_KEYS.has(item.translationKey)) return;
      if (!canAccess(item)) return;

      if (item.path) {
        tiles.push({ key: item.translationKey, label: t(item.translationKey), icon: item.icon, path: item.path });
        return;
      }

      if (item.submenu) {
        const firstAccessible = item.submenu.find((sub) => sub.path && canAccess(sub));
        if (firstAccessible) {
          tiles.push({ key: item.translationKey, label: t(item.translationKey), icon: item.icon, path: firstAccessible.path });
        }
      }
    });

    return tiles;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t, isSuperuser, user]);

  const roleName = user?.primary_role?.name || user?.role || (isSuperuser ? 'Superadmin' : null);
  const tagline = ROLE_TAGLINES[roleName] || 'Here is your workspace overview.';
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalTeachers: 0,
    totalRevenue: 0,
    attendanceRate: 0,
  });
  const [enrollmentData, setEnrollmentData] = useState([]);
  const [revenueData, setRevenueData] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);

  // Reload dashboard data when school changes
  useEffect(() => {
    fetchDashboardData();
  }, [selectedSchool]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [statsRes, enrollmentRes, revenueRes, activitiesRes] = await Promise.all([
        apiService.get('/dashboard/stats/'),
        apiService.get('/dashboard/enrollment-trend/'),
        apiService.get('/dashboard/revenue-trend/'),
        apiService.get('/dashboard/recent-activities/'),
      ]);

      const statsData = statsRes.data?.data || statsRes.data;
      const enrollmentChartData = enrollmentRes.data?.data || enrollmentRes.data;
      const revenueChartData = revenueRes.data?.data || revenueRes.data;
      const activitiesData = activitiesRes.data?.data || activitiesRes.data || [];

      setStats({
        totalStudents: statsData?.totalStudents || 0,
        totalTeachers: statsData?.totalTeachers || 0,
        totalRevenue: statsData?.totalRevenue || 0,
        attendanceRate: statsData?.attendanceRate || 0,
      });

      setEnrollmentData(Array.isArray(enrollmentChartData) ? enrollmentChartData : []);
      setRevenueData(Array.isArray(revenueChartData) ? revenueChartData : []);
      setRecentActivities(Array.isArray(activitiesData) ? activitiesData : []);

      console.log('[Dashboard] Data loaded:', {
        stats: statsData,
        enrollment: enrollmentChartData,
        revenue: revenueChartData,
        activities: activitiesData,
      });
    } catch (err) {
      console.error('[Dashboard] Error loading data:', err);
      setError(err.message);
      // Keep empty arrays instead of mock data
      setEnrollmentData([]);
      setRevenueData([]);
      setRecentActivities([]);
    } finally {
      setLoading(false);
    }
  };

  const CountUp = ({ value }) => {
    const [display, setDisplay] = useState('0');
    const rafRef = useRef();

    useEffect(() => {
      const numeric = parseFloat(String(value).replace(/[^0-9.-]/g, ''));
      const prefix = String(value).match(/^[^\d-]*/)?.[0] || '';
      const suffix = String(value).match(/[^\d]*$/)?.[0] || '';

      if (Number.isNaN(numeric)) {
        setDisplay(value);
        return;
      }

      const duration = 900;
      const start = performance.now();

      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(numeric * eased);
        setDisplay(`${prefix}${current.toLocaleString()}${suffix}`);
        if (progress < 1) {
          rafRef.current = requestAnimationFrame(tick);
        }
      };

      rafRef.current = requestAnimationFrame(tick);
      return () => cancelAnimationFrame(rafRef.current);
    }, [value]);

    return display;
  };

  const kpiCardVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, delay: i * 0.08, ease: [0.4, 0, 0.2, 1] },
    }),
  };

  const KPICard = ({ icon: Icon, title, value, color, index = 0 }) => (
    <motion.div
      custom={index}
      initial="hidden"
      animate="visible"
      variants={kpiCardVariants}
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 280, damping: 22 }}
    >
      <Card
        className="hover-lift"
        sx={{
          height: '100%',
          background: `linear-gradient(135deg, ${color}20 0%, ${color}05 100%)`,
          borderLeft: `4px solid ${color}`,
        }}
      >
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box>
              <Typography color="textSecondary" gutterBottom>
                {title}
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 'bold', mt: 1 }}>
                <CountUp value={value} />
              </Typography>
            </Box>
            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: index * 0.08 + 0.2, type: 'spring', stiffness: 260, damping: 18 }}
            >
              <Icon sx={{ fontSize: 40, color, opacity: 0.7 }} />
            </motion.div>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <Box>
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
        <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
          <Box sx={{ flex: 1, minWidth: 240 }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
              {t('dashboardTitle')}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {`Welcome back, ${user?.first_name || user?.username || 'User'}! ${tagline}`}
            </Typography>
          </Box>
          {roleName && (
            <Chip
              label={roleName}
              sx={{
                fontWeight: 700,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                fontSize: '0.7rem',
                px: 1,
                backgroundColor: theme.palette.primary.main,
                color: '#fff',
              }}
            />
          )}
        </Box>
      </motion.div>

      {/* KPI Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {hasPermission('view_student') && (
          <Grid item xs={12} sm={6} md={3}>
            <KPICard
              index={0}
              icon={StudentIcon}
              title={t('totalStudents')}
              value={stats.totalStudents?.toLocaleString() || '0'}
              color="#667eea"
            />
          </Grid>
        )}
        {hasPermission('view_teacher') && (
          <Grid item xs={12} sm={6} md={3}>
            <KPICard
              index={1}
              icon={TeacherIcon}
              title={t('totalTeachers')}
              value={stats.totalTeachers?.toLocaleString() || '0'}
              color="#764ba2"
            />
          </Grid>
        )}
        {hasPermission('view_payment') && (
          <Grid item xs={12} sm={6} md={3}>
            <KPICard
              index={2}
              icon={RevenueIcon}
              title={t('monthlyRevenue')}
              value={`₹ ${stats.totalRevenue?.toLocaleString() || '0'}`}
              color="#f093fb"
            />
          </Grid>
        )}
        {hasPermission('view_student_attendance') && (
          <Grid item xs={12} sm={6} md={3}>
            <KPICard
              index={3}
              icon={AttendanceIcon}
              title={t('attendanceRate')}
              value={`${stats.attendanceRate || 0}%`}
              color="#4facfe"
            />
          </Grid>
        )}
      </Grid>

      {/* Loading State */}
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
          <CircularProgress />
        </Box>
      )}

      {/* Error State */}
      {error && !loading && (
        <Paper sx={{ p: 3, backgroundColor: '#ffebee', borderLeft: '4px solid #f44336' }}>
          <Typography color="error" variant="body2">
            Error loading dashboard data: {error}
          </Typography>
        </Paper>
      )}

      {/* Charts */}
      {!loading && (
        <Grid container spacing={3}>
          {/* Enrollment Trend */}
          {(hasPermission('view_student') || hasPermission('view_teacher')) && (
            <Grid item xs={12} md={6}>
              <Paper className="hover-lift" sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                  {t('enrollmentTrend')}
                </Typography>
                {enrollmentData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={enrollmentData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      {hasPermission('view_student') && (
                        <Line
                          type="monotone"
                          dataKey="students"
                          stroke="#667eea"
                          strokeWidth={2}
                          dot={{ fill: '#667eea', r: 4 }}
                        />
                      )}
                      {hasPermission('view_teacher') && (
                        <Line
                          type="monotone"
                          dataKey="teachers"
                          stroke="#764ba2"
                          strokeWidth={2}
                          dot={{ fill: '#764ba2', r: 4 }}
                        />
                      )}
                    </LineChart>
                  </ResponsiveContainer>
                ) : (
                  <Typography variant="body2" color="textSecondary" sx={{ py: 3, textAlign: 'center' }}>
                    No enrollment data available
                  </Typography>
                )}
              </Paper>
            </Grid>
          )}

          {/* Revenue Chart */}
          {hasPermission('view_payment') && (
            <Grid item xs={12} md={6}>
              <Paper className="hover-lift" sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                  {t('monthlyRevenue')}
                </Typography>
                {revenueData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="revenue" fill="#f093fb" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <Typography variant="body2" color="textSecondary" sx={{ py: 3, textAlign: 'center' }}>
                    No revenue data available
                  </Typography>
                )}
              </Paper>
            </Grid>
          )}

          {/* Recent Activities */}
          <Grid item xs={12}>
            <Paper className="hover-lift" sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                {t('recentActivities')}
              </Typography>
              {recentActivities.length > 0 ? (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  {recentActivities.map((activity, index) => (
                    <Typography key={index} variant="body2" color="textSecondary">
                      {typeof activity === 'string' ? activity : activity.description || JSON.stringify(activity)}
                    </Typography>
                  ))}
                </Box>
              ) : (
                <Typography variant="body2" color="textSecondary" sx={{ textAlign: 'center', py: 2 }}>
                  No recent activities
                </Typography>
              )}
            </Paper>
          </Grid>
        </Grid>
      )}

      {/* Your Modules — dynamically derived from this role's permissions */}
      {moduleItems.length > 0 && (
        <Box sx={{ mt: 5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <AppsIcon color="action" />
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Your Modules
            </Typography>
            <Chip
              size="small"
              label={moduleItems.length}
              sx={{ fontWeight: 700, backgroundColor: 'action.selected' }}
            />
          </Box>
          <Grid container spacing={2}>
            {moduleItems.map((mod, index) => (
              <Grid item xs={6} sm={4} md={3} lg={2} key={mod.key}>
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: Math.min(index * 0.03, 0.6), ease: [0.4, 0, 0.2, 1] }}
                  whileHover={{ y: -4 }}
                >
                  <Paper
                    className="hover-lift"
                    onClick={() => navigate(mod.path)}
                    sx={{
                      p: 2,
                      cursor: 'pointer',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      gap: 1,
                      borderTop: `3px solid ${theme.palette.primary.main}`,
                      '&:hover .module-arrow': {
                        opacity: 1,
                        transform: 'translateX(0)',
                      },
                    }}
                  >
                    <Box sx={{ color: theme.palette.primary.main, fontSize: 28, display: 'flex' }}>
                      {mod.icon || <AppsIcon fontSize="inherit" />}
                    </Box>
                    <Typography variant="body2" sx={{ fontWeight: 600, lineHeight: 1.3 }}>
                      {mod.label}
                    </Typography>
                    <ArrowForwardIcon
                      className="module-arrow"
                      sx={{
                        fontSize: 16,
                        color: theme.palette.primary.main,
                        opacity: 0,
                        transform: 'translateX(-4px)',
                        transition: 'all 0.18s ease',
                        ml: 'auto',
                      }}
                    />
                  </Paper>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Box>
  );
};

export default Dashboard;
