import { useState } from 'react';
import { Button, Chip, Tab, Tabs, LinearProgress } from '@mui/material';
import { AccountBalance, TrendingUp, Warning, CheckCircle, Add, Download } from '@mui/icons-material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const feeData = [
  { id: 'FEE001', student: 'Aarav Sharma', rollNo: 'CS2024001', amount: 45000, paid: 45000, due: 0, date: 'Jan 15, 2026', status: 'Paid' },
  { id: 'FEE002', student: 'Priya Verma', rollNo: 'CS2024002', amount: 45000, paid: 0, due: 45000, date: '—', status: 'Pending' },
  { id: 'FEE003', student: 'Rohit Nayak', rollNo: 'EC2023015', amount: 40000, paid: 20000, due: 20000, date: 'Feb 10, 2026', status: 'Partial' },
  { id: 'FEE004', student: 'Sneha Patil', rollNo: 'ME2024008', amount: 42000, paid: 42000, due: 0, date: 'Jan 22, 2026', status: 'Paid' },
  { id: 'FEE005', student: 'Kiran Das', rollNo: 'BA2023022', amount: 38000, paid: 0, due: 38000, date: '—', status: 'Overdue' },
];

const monthlyRevenue = [
  { month: 'Aug', amount: 1200 },
  { month: 'Sep', amount: 1850 },
  { month: 'Oct', amount: 1600 },
  { month: 'Nov', amount: 2100 },
  { month: 'Dec', amount: 1750 },
  { month: 'Jan', amount: 2310 },
];

const expenseBreakdown = [
  { name: 'Salaries', value: 65, color: '#4f46e5' },
  { name: 'Infrastructure', value: 15, color: '#06b6d4' },
  { name: 'Library', value: 8, color: '#10b981' },
  { name: 'Events', value: 7, color: '#f59e0b' },
  { name: 'Others', value: 5, color: '#8b5cf6' },
];

const STATUS_STYLES = {
  Paid: { bg: '#ecfdf5', color: '#059669' },
  Pending: { bg: '#fffbeb', color: '#d97706' },
  Partial: { bg: '#eff6ff', color: '#2563eb' },
  Overdue: { bg: '#fef2f2', color: '#ef4444' },
};

export default function FinancePage() {
  const [tab, setTab] = useState(0);

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 animate-fadeInUp">
        <div>
          <h1 className="font-heading text-2xl font-700 text-slate-900">Finance</h1>
          <p className="text-slate-500 text-sm mt-0.5">Fee management, expenses, and financial reports</p>
        </div>
        <div className="flex gap-2.5">
          <Button variant="outlined" size="small" startIcon={<Download />} sx={{ borderColor: '#e2e8f0', color: '#475569' }}>Export</Button>
          <Button variant="contained" size="small" startIcon={<Add />}>Record Payment</Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 stagger-children">
        {[
          { label: 'Total Revenue', value: '₹2.31 Cr', sub: 'This semester', color: '#4f46e5', bg: '#eef2ff', icon: AccountBalance },
          { label: 'Collected', value: '₹1.96 Cr', sub: '84.8% collection rate', color: '#10b981', bg: '#ecfdf5', icon: CheckCircle },
          { label: 'Pending Dues', value: '₹35.2 L', sub: '43 students', color: '#f59e0b', bg: '#fffbeb', icon: Warning },
          { label: 'Overdue', value: '₹8.4 L', sub: '12 students', color: '#ef4444', bg: '#fef2f2', icon: TrendingUp },
        ].map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="stat-card animate-fadeInUp">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: s.bg }}>
                  <Icon sx={{ fontSize: 18, color: s.color }} />
                </div>
              </div>
              <p className="font-heading text-xl font-700 text-slate-900">{s.value}</p>
              <p className="text-slate-600 text-sm font-medium mt-0.5">{s.label}</p>
              <p className="text-slate-400 text-xs mt-1">{s.sub}</p>
            </div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 animate-fadeInUp">
        <div className="lg:col-span-2 bg-white rounded-2xl p-5 shadow-card border border-slate-100">
          <h3 className="font-heading font-600 text-slate-900 text-base mb-1">Monthly Collection (₹ Lakhs)</h3>
          <p className="text-xs text-slate-400 mb-4">Fee collection per month</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={monthlyRevenue}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: '10px', fontSize: 12 }} formatter={(v) => `₹${v}L`} />
              <Bar dataKey="amount" fill="#4f46e5" radius={[6, 6, 0, 0]} name="Collection" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-card border border-slate-100">
          <h3 className="font-heading font-600 text-slate-900 text-base mb-1">Expense Breakdown</h3>
          <p className="text-xs text-slate-400 mb-4">Budget allocation</p>
          <ResponsiveContainer width="100%" height={150}>
            <PieChart>
              <Pie data={expenseBreakdown} innerRadius={40} outerRadius={65} paddingAngle={3} dataKey="value">
                {expenseBreakdown.map((e) => <Cell key={e.name} fill={e.color} />)}
              </Pie>
              <Tooltip formatter={(v) => `${v}%`} contentStyle={{ borderRadius: 10, fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1.5 mt-2">
            {expenseBreakdown.map((d) => (
              <div key={d.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: d.color }} />
                  <span className="text-slate-600">{d.name}</span>
                </div>
                <span className="font-semibold text-slate-800">{d.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Fee Records */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-card animate-fadeInUp">
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-heading font-600 text-slate-900">Recent Fee Records</h3>
          <button className="text-xs text-primary-600 font-semibold">View all</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50">
                {['Receipt ID', 'Student', 'Roll No.', 'Total Fee', 'Paid', 'Balance', 'Status'].map((h) => (
                  <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {feeData.map((f, i) => (
                <tr key={f.id} className={`border-t border-slate-100 hover:bg-slate-50 transition-colors ${i % 2 === 0 ? '' : ''}`}>
                  <td className="px-5 py-3.5"><span className="font-mono text-xs text-slate-600">{f.id}</span></td>
                  <td className="px-5 py-3.5"><span className="text-sm font-medium text-slate-800">{f.student}</span></td>
                  <td className="px-5 py-3.5"><span className="font-mono text-xs text-slate-500">{f.rollNo}</span></td>
                  <td className="px-5 py-3.5"><span className="text-sm text-slate-700">₹{f.amount.toLocaleString()}</span></td>
                  <td className="px-5 py-3.5"><span className="text-sm font-semibold text-emerald-600">₹{f.paid.toLocaleString()}</span></td>
                  <td className="px-5 py-3.5"><span className="text-sm font-semibold text-red-500">₹{f.due.toLocaleString()}</span></td>
                  <td className="px-5 py-3.5">
                    <Chip label={f.status} size="small"
                      sx={{ bgcolor: STATUS_STYLES[f.status]?.bg, color: STATUS_STYLES[f.status]?.color, fontWeight: 600, fontSize: '0.7rem', height: 22 }} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
