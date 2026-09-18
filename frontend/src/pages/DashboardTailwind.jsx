/**
 * Dashboard - Tailwind CSS Version
 * Modern dashboard with KPI cards, charts, and statistics
 */

import React, { useState } from 'react';
import {
  Users,
  TrendingUp,
  DollarSign,
  BarChart3,
  Calendar,
  Clock,
  AlertCircle,
} from 'lucide-react';
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
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const DashboardTailwind = () => {
  const [dateRange, setDateRange] = useState('month');

  // KPI Data
  const stats = {
    totalStudents: 1250,
    totalTeachers: 85,
    totalRevenue: 850000,
    attendanceRate: 92,
  };

  // Chart Data
  const enrollmentData = [
    { month: 'Jan', students: 50, teachers: 5 },
    { month: 'Feb', students: 60, teachers: 6 },
    { month: 'Mar', students: 75, teachers: 7 },
    { month: 'Apr', students: 90, teachers: 8 },
    { month: 'May', students: 110, teachers: 10 },
    { month: 'Jun', students: 130, teachers: 12 },
  ];

  const revenueData = [
    { month: 'Jan', revenue: 50000 },
    { month: 'Feb', revenue: 60000 },
    { month: 'Mar', revenue: 75000 },
    { month: 'Apr', revenue: 90000 },
    { month: 'May', revenue: 110000 },
    { month: 'Jun', revenue: 130000 },
  ];

  const departmentData = [
    { name: 'Science', value: 350, color: '#3b82f6' },
    { name: 'Arts', value: 280, color: '#10b981' },
    { name: 'Commerce', value: 240, color: '#f59e0b' },
    { name: 'Technical', value: 380, color: '#ef4444' },
  ];

  const recentActivities = [
    { id: 1, action: 'New student registered', details: 'John Doe admitted to Class 10', time: '2 hours ago' },
    { id: 2, action: 'Payment received', details: 'School fee payment - INR 50,000', time: '4 hours ago' },
    { id: 3, action: 'Exam scheduled', details: 'Mid-term exam scheduled for January 15', time: '1 day ago' },
    { id: 4, action: 'Teacher added', details: 'Dr. Sarah added to Science department', time: '2 days ago' },
    { id: 5, action: 'Event created', details: 'Annual sports day scheduled', time: '3 days ago' },
  ];

  // KPI Card Component
  const KPICard = ({ icon: Icon, label, value, trend, color }) => (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium mb-2">{label}</p>
          <p className="text-2xl font-bold text-gray-900">{value.toLocaleString()}</p>
          {trend && (
            <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> {trend} from last month
            </p>
          )}
        </div>
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );

  // Chart Container Component
  const ChartCard = ({ title, children }) => (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      {children}
    </div>
  );

  // Activity Item Component
  const ActivityItem = ({ activity }) => (
    <div className="flex items-start gap-4 pb-4 border-b border-gray-200 last:border-b-0 last:pb-0">
      <div className="p-2 bg-blue-50 rounded-lg mt-0.5">
        <Clock className="w-4 h-4 text-blue-600" />
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-900">{activity.action}</p>
        <p className="text-xs text-gray-600 mt-1">{activity.details}</p>
        <p className="text-xs text-gray-500 mt-2">{activity.time}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's your system overview.</p>
        </div>

        {/* Date Range Selector */}
        <div className="mb-6 flex gap-2">
          {['week', 'month', 'quarter', 'year'].map((range) => (
            <button
              key={range}
              onClick={() => setDateRange(range)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                dateRange === range
                  ? 'bg-black text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              {range.charAt(0).toUpperCase() + range.slice(1)}
            </button>
          ))}
        </div>

        {/* KPI Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <KPICard
            icon={Users}
            label="Total Students"
            value={stats.totalStudents}
            trend="+12%"
            color="bg-blue-600"
          />
          <KPICard
            icon={Users}
            label="Total Teachers"
            value={stats.totalTeachers}
            trend="+8%"
            color="bg-green-600"
          />
          <KPICard
            icon={DollarSign}
            label="Total Revenue"
            value={stats.totalRevenue}
            trend="+15%"
            color="bg-purple-600"
          />
          <KPICard
            icon={BarChart3}
            label="Attendance Rate"
            value={`${stats.attendanceRate}%`}
            trend="+2%"
            color="bg-orange-600"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Enrollment Chart */}
          <div className="lg:col-span-2">
            <ChartCard title="Student & Teacher Enrollment Trend">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={enrollmentData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="month" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#ffffff',
                      border: '1px solid #e5e7eb',
                      borderRadius: '0.5rem',
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="students"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    dot={{ fill: '#3b82f6', r: 4 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="teachers"
                    stroke="#10b981"
                    strokeWidth={2}
                    dot={{ fill: '#10b981', r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>

          {/* Department Distribution */}
          <ChartCard title="Student Distribution by Department">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={departmentData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {departmentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        {/* Revenue Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <ChartCard title="Monthly Revenue">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '0.5rem',
                  }}
                />
                <Bar dataKey="revenue" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* Quick Stats */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                <span className="text-gray-700 text-sm">Enrollment Rate</span>
                <span className="text-2xl font-bold text-gray-900">87%</span>
              </div>
              <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                <span className="text-gray-700 text-sm">Pass Rate</span>
                <span className="text-2xl font-bold text-gray-900">94%</span>
              </div>
              <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                <span className="text-gray-700 text-sm">Average GPA</span>
                <span className="text-2xl font-bold text-gray-900">3.8</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700 text-sm">Active Events</span>
                <span className="text-2xl font-bold text-gray-900">12</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section - Alerts and Recent Activities */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Alerts */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-orange-600" />
                Alerts & Notifications
              </h3>
              <div className="space-y-3">
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-xs font-medium text-yellow-800">⚠ Payment Due</p>
                  <p className="text-xs text-yellow-700 mt-1">5 students have pending fees</p>
                </div>
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-xs font-medium text-blue-800">ℹ Exam Scheduled</p>
                  <p className="text-xs text-blue-700 mt-1">Mid-term exams start in 5 days</p>
                </div>
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-xs font-medium text-green-800">✓ Event Reminder</p>
                  <p className="text-xs text-green-700 mt-1">Annual sports day next week</p>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activities */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activities</h3>
              <div className="space-y-0">
                {recentActivities.map((activity) => (
                  <ActivityItem key={activity.id} activity={activity} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardTailwind;
