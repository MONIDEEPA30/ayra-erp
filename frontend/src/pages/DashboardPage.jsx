import { useState } from 'react';
import {
  People, School, AccountBalance, TrendingUp, TrendingDown,
  CalendarToday, Assignment, CheckCircleOutline, PendingActions,
  Warning, MoreVert, ArrowForward,
} from '@mui/icons-material';
import { Button, IconButton, Avatar, Chip, LinearProgress, Menu, MenuItem } from '@mui/material';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend,
} from 'recharts';

const enrollmentData = [
  { month: 'Aug', students: 3800, target: 3600 },
  { month: 'Sep', students: 3950, target: 3800 },
  { month: 'Oct', students: 4020, target: 3900 },
  { month: 'Nov', students: 4100, target: 4000 },
  { month: 'Dec', students: 4050, target: 4100 },
  { month: 'Jan', students: 4200, target: 4200 },
];

const revenueData = [
  { month: 'Aug', collected: 1200000, pending: 340000 },
  { month: 'Sep', collected: 1850000, pending: 210000 },
  { month: 'Oct', collected: 1600000, pending: 290000 },
  { month: 'Nov', collected: 2100000, pending: 180000 },
  { month: 'Dec', collected: 1750000, pending: 250000 },
  { month: 'Jan', collected: 2300000, pending: 150000 },
];

const departmentData = [
  { name: 'Computer Sci.', value: 28, color: '#4f46e5' },
  { name: 'Engineering', value: 22, color: '#06b6d4' },
  { name: 'Business', value: 18, color: '#10b981' },
  { name: 'Arts', value: 14, color: '#f59e0b' },
  { name: 'Sciences', value: 12, color: '#ef4444' },
  { name: 'Others', value: 6, color: '#8b5cf6' },
];

const recentActivities = [
  { id: 1, type: 'admission', text: 'New admission request from Priya Sharma (CS Dept.)', time: '10 mins ago', color: '#4f46e5' },
  { id: 2, type: 'fee', text: 'Fee payment of ₹45,000 received – Roll No. 2024CS102', time: '42 mins ago', color: '#10b981' },
  { id: 3, type: 'exam', text: 'Mid-semester exam schedule published for all departments', time: '2 hours ago', color: '#f59e0b' },
  { id: 4, type: 'leave', text: 'Dr. Ramesh Kumar submitted a leave application', time: '3 hours ago', color: '#06b6d4' },
  { id: 5, type: 'result', text: 'Result sheet submitted by Prof. Neha Verma – BCA 3rd Sem', time: '5 hours ago', color: '#ef4444' },
];

const pendingTasks = [
  { id: 1, title: 'Approve 12 admission applications', priority: 'High', due: 'Today' },
  { id: 2, title: 'Review fee concession requests (8)', priority: 'Medium', due: 'Tomorrow' },
  { id: 3, title: 'Finalize timetable for new semester', priority: 'High', due: 'Mar 24' },
  { id: 4, title: 'Faculty appraisal forms collection', priority: 'Low', due: 'Mar 28' },
];

const statCards = [
  {
    label: 'Total Students',
    value: '4,217',
    change: '+5.2%',
    up: true,
    icon: People,
    color: '#4f46e5',
    bg: '#eef2ff',
    sub: 'vs last semester',
  },
  {
    label: 'Faculty Members',
    value: '327',
    change: '+2.8%',
    up: true,
    icon: School,
    color: '#06b6d4',
    bg: '#ecfeff',
    sub: 'across 24 depts.',
  },
  {
    label: 'Revenue Collected',
    value: '₹2.31Cr',
    change: '+12.4%',
    up: true,
    icon: AccountBalance,
    color: '#10b981',
    bg: '#ecfdf5',
    sub: 'this semester',
  },
  {
    label: 'Pending Dues',
    value: '₹15.8L',
    change: '-8.1%',
    up: false,
    icon: Warning,
    color: '#f59e0b',
    bg: '#fffbeb',
    sub: '43 students',
  },
];

function StatCard({ card, delay }) {
  const Icon = card.icon;
  return (
    <div className="stat-card animate-fadeInUp" style={{ animationDelay: `${delay}s` }}>
      <div className="flex items-start justify-between mb-4">
        <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ backgroundColor: card.bg }}>
          <Icon sx={{ fontSize: 22, color: card.color }} />
        </div>
        <div className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${card.up ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>
          {card.up ? <TrendingUp sx={{ fontSize: 13 }} /> : <TrendingDown sx={{ fontSize: 13 }} />}
          {card.change}
        </div>
      </div>
      <div>
        <p className="font-heading text-2xl font-700 text-slate-900">{card.value}</p>
        <p className="text-slate-600 text-sm font-medium mt-0.5">{card.label}</p>
        <p className="text-slate-400 text-xs mt-1">{card.sub}</p>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const today = new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 animate-fadeInUp">
        <div>
          <h1 className="font-heading text-2xl font-700 text-slate-900">Dashboard</h1>
          <p className="text-slate-500 text-sm mt-0.5 flex items-center gap-1.5">
            <CalendarToday sx={{ fontSize: 14 }} />
            {today}
          </p>
        </div>
        <div className="flex gap-2.5">
          <Button variant="outlined" size="small" startIcon={<Assignment />} sx={{ borderColor: '#e2e8f0', color: '#475569' }}>
            Generate Report
          </Button>
          <Button variant="contained" size="small" startIcon={<People />}>
            Add Student
          </Button>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 stagger-children">
        {statCards.map((card, i) => (
          <StatCard key={card.label} card={card} delay={i * 0.05} />
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Enrollment Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-5 shadow-card border border-slate-100 animate-fadeInUp">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-heading font-600 text-slate-900 text-base">Student Enrollment Trend</h3>
              <p className="text-xs text-slate-400 mt-0.5">Monthly enrollment vs target</p>
            </div>
            <Chip label="2024–25" size="small" sx={{ bgcolor: '#eef2ff', color: '#4f46e5', fontWeight: 600, fontSize: '0.7rem' }} />
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={enrollmentData}>
              <defs>
                <linearGradient id="gradStudents" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', fontSize: 12 }} />
              <Area type="monotone" dataKey="target" stroke="#e2e8f0" strokeWidth={2} fill="none" strokeDasharray="4 2" name="Target" />
              <Area type="monotone" dataKey="students" stroke="#4f46e5" strokeWidth={2.5} fill="url(#gradStudents)" name="Enrolled" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Dept Distribution */}
        <div className="bg-white rounded-2xl p-5 shadow-card border border-slate-100 animate-fadeInUp">
          <div className="mb-5">
            <h3 className="font-heading font-600 text-slate-900 text-base">Dept. Distribution</h3>
            <p className="text-xs text-slate-400 mt-0.5">Students per department</p>
          </div>
          <ResponsiveContainer width="100%" height={165}>
            <PieChart>
              <Pie data={departmentData} innerRadius={50} outerRadius={75} paddingAngle={3} dataKey="value">
                {departmentData.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(v) => `${v}%`} contentStyle={{ borderRadius: '10px', fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {departmentData.slice(0, 4).map((d) => (
              <div key={d.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: d.color }} />
                  <span className="text-slate-600">{d.name}</span>
                </div>
                <span className="font-semibold text-slate-800">{d.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Revenue Chart + Pending Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Revenue */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-5 shadow-card border border-slate-100 animate-fadeInUp">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-heading font-600 text-slate-900 text-base">Fee Collection Overview</h3>
              <p className="text-xs text-slate-400 mt-0.5">Collected vs pending (₹)</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={revenueData} barCategoryGap="30%">
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false}
                tickFormatter={(v) => `${(v / 100000).toFixed(1)}L`} />
              <Tooltip contentStyle={{ borderRadius: '10px', fontSize: 12 }}
                formatter={(v) => `₹${(v / 100000).toFixed(2)}L`} />
              <Bar dataKey="collected" fill="#4f46e5" radius={[5, 5, 0, 0]} name="Collected" />
              <Bar dataKey="pending" fill="#fde68a" radius={[5, 5, 0, 0]} name="Pending" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pending Tasks */}
        <div className="bg-white rounded-2xl p-5 shadow-card border border-slate-100 animate-fadeInUp">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-heading font-600 text-slate-900 text-base">Pending Tasks</h3>
            <span className="badge badge-error">{pendingTasks.length} tasks</span>
          </div>
          <div className="space-y-3">
            {pendingTasks.map((task) => (
              <div key={task.id} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer">
                <PendingActions sx={{ fontSize: 18, color: task.priority === 'High' ? '#ef4444' : task.priority === 'Medium' ? '#f59e0b' : '#94a3b8', mt: 0.2 }} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-800 leading-snug">{task.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`badge text-[10px] ${task.priority === 'High' ? 'badge-error' : task.priority === 'Medium' ? 'badge-warning' : 'bg-slate-100 text-slate-600'}`}>
                      {task.priority}
                    </span>
                    <span className="text-xs text-slate-400">{task.due}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-3 text-xs text-primary-600 font-semibold text-center hover:text-primary-700 py-2 rounded-xl hover:bg-primary-50 transition-colors flex items-center justify-center gap-1">
            View all tasks <ArrowForward sx={{ fontSize: 13 }} />
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl p-5 shadow-card border border-slate-100 animate-fadeInUp">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-heading font-600 text-slate-900 text-base">Recent Activity</h3>
          <button className="text-xs text-primary-600 font-semibold hover:text-primary-700">View all</button>
        </div>
        <div className="space-y-0">
          {recentActivities.map((a, i) => (
            <div key={a.id} className={`flex items-start gap-4 py-3.5 ${i < recentActivities.length - 1 ? 'border-b border-slate-100' : ''}`}>
              <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: a.color }} />
              <p className="flex-1 text-sm text-slate-700">{a.text}</p>
              <span className="text-xs text-slate-400 flex-shrink-0 mt-0.5">{a.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
