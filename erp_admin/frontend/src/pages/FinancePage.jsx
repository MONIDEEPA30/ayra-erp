import { useState, useEffect, useCallback } from 'react';
import {
  Button, Chip, CircularProgress, Alert, TextField, FormControl, InputLabel,
  Select, MenuItem, Autocomplete,
} from '@mui/material';
import { AccountBalance, TrendingUp, Warning, CheckCircle, Add, Download } from '@mui/icons-material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import api from '../utils/api';
import { formatCurrency } from '../utils/helpers';
import FormDialog from '../components/common/FormDialog';

const STATUS_STYLES = {
  Paid: { bg: '#ecfdf5', color: '#059669' },
  Pending: { bg: '#fffbeb', color: '#d97706' },
  Partial: { bg: '#eff6ff', color: '#2563eb' },
  Overdue: { bg: '#fef2f2', color: '#ef4444' },
};

const MONTH_NAMES = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const emptyForm = { student: null, feeType: 'Tuition Fee', totalAmount: '', paidAmount: '', academicYear: '', dueDate: '', status: 'Pending' };

export default function FinancePage() {
  const [fees, setFees] = useState([]);
  const [financeStats, setFinanceStats] = useState(null);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [dialog, setDialog] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const fetchFees = useCallback(async () => {
    try {
      const { data } = await api.get('/finance/fees', { params: { limit: 20 } });
      setFees(data.data.fees);
    } catch {
      setError('Failed to load fee records.');
    }
  }, []);

  const fetchStats = useCallback(async () => {
    try {
      const { data } = await api.get('/finance/stats');
      setFinanceStats(data.data);
    } catch {
      /* silent */
    }
  }, []);

  const fetchStudents = useCallback(async () => {
    try {
      const { data } = await api.get('/students', { params: { limit: 100 } });
      setStudents(data.data.students);
    } catch {
      /* silent */
    }
  }, []);

  useEffect(() => {
    Promise.all([fetchFees(), fetchStats(), fetchStudents()]).finally(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setError('');
    try {
      await api.post('/finance/fees', {
        student: form.student?._id,
        feeType: form.feeType,
        totalAmount: Number(form.totalAmount),
        paidAmount: Number(form.paidAmount) || 0,
        academicYear: form.academicYear,
        paymentDate: form.paidAmount > 0 ? new Date().toISOString() : undefined,
        status: Number(form.paidAmount) >= Number(form.totalAmount) ? 'Paid' : Number(form.paidAmount) > 0 ? 'Partial' : 'Pending',
      });
      setDialog(false);
      setForm(emptyForm);
      fetchFees();
      fetchStats();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to record payment.');
    } finally {
      setSaving(false);
    }
  };

  const monthlyData = financeStats?.monthlyCollection?.map((m) => ({
    month: MONTH_NAMES[m._id.month] || '?',
    amount: Math.round(m.collected / 100000),
  })) || [];

  const totalRevenue = financeStats?.totalRevenue?.total || 0;
  const totalCollected = financeStats?.totalRevenue?.collected || 0;
  const totalPending = totalRevenue - totalCollected;
  const collectionRate = totalRevenue > 0 ? ((totalCollected / totalRevenue) * 100).toFixed(1) : 0;

  const byStatusData = financeStats?.byStatus || [];
  const overdueEntry = byStatusData.find((s) => s._id === 'Overdue');

  const expenseBreakdown = [
    { name: 'Salaries', value: 65, color: '#4f46e5' },
    { name: 'Infrastructure', value: 15, color: '#06b6d4' },
    { name: 'Library', value: 8, color: '#10b981' },
    { name: 'Events', value: 7, color: '#f59e0b' },
    { name: 'Others', value: 5, color: '#8b5cf6' },
  ];

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 animate-fadeInUp">
        <div>
          <h1 className="font-heading text-2xl font-700 text-slate-900">Finance</h1>
          <p className="text-slate-500 text-sm mt-0.5">Fee management, expenses, and financial reports</p>
        </div>
        <div className="flex gap-2.5">
          <Button variant="outlined" size="small" startIcon={<Download />} sx={{ borderColor: '#e2e8f0', color: '#475569' }}>Export</Button>
          <Button variant="contained" size="small" startIcon={<Add />} onClick={() => setDialog(true)}>Record Payment</Button>
        </div>
      </div>

      {error && <Alert severity="error" onClose={() => setError('')}>{error}</Alert>}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Revenue', value: formatCurrency(totalRevenue), sub: 'Total billed', color: '#4f46e5', bg: '#eef2ff', icon: AccountBalance },
          { label: 'Collected', value: formatCurrency(totalCollected), sub: `${collectionRate}% collection rate`, color: '#10b981', bg: '#ecfdf5', icon: CheckCircle },
          { label: 'Pending Dues', value: formatCurrency(totalPending), sub: 'Outstanding', color: '#f59e0b', bg: '#fffbeb', icon: Warning },
          { label: 'Overdue', value: formatCurrency(overdueEntry?.totalAmount || 0), sub: `${overdueEntry?.count || 0} records`, color: '#ef4444', bg: '#fef2f2', icon: TrendingUp },
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 animate-fadeInUp">
        <div className="lg:col-span-2 bg-white rounded-2xl p-5 shadow-card border border-slate-100">
          <h3 className="font-heading font-600 text-slate-900 text-base mb-1">Monthly Collection (INR Lakhs)</h3>
          <p className="text-xs text-slate-400 mb-4">Fee collection per month</p>
          {monthlyData.length > 0 ? (
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: '10px', fontSize: 12 }} formatter={(v) => `INR ${v}L`} />
                <Bar dataKey="amount" fill="#4f46e5" radius={[6, 6, 0, 0]} name="Collection" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-48 text-slate-400 text-sm">No collection data yet</div>
          )}
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

      <div className="bg-white rounded-2xl border border-slate-100 shadow-card animate-fadeInUp">
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-heading font-600 text-slate-900">Recent Fee Records</h3>
        </div>
        {loading ? (
          <div className="flex justify-center py-10"><CircularProgress /></div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50">
                  {['Student', 'Roll No.', 'Fee Type', 'Total', 'Paid', 'Balance', 'Status'].map((h) => (
                    <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {fees.length === 0 ? (
                  <tr><td colSpan={7} className="text-center py-10 text-slate-400">No fee records found</td></tr>
                ) : fees.map((f) => (
                  <tr key={f._id} className="border-t border-slate-100 hover:bg-slate-50 transition-colors">
                    <td className="px-5 py-3.5"><span className="text-sm font-medium text-slate-800">{f.student?.name || '-'}</span></td>
                    <td className="px-5 py-3.5"><span className="font-mono text-xs text-slate-500">{f.student?.rollNo || '-'}</span></td>
                    <td className="px-5 py-3.5"><span className="text-sm text-slate-600">{f.feeType}</span></td>
                    <td className="px-5 py-3.5"><span className="text-sm text-slate-700">{formatCurrency(f.totalAmount)}</span></td>
                    <td className="px-5 py-3.5"><span className="text-sm font-semibold text-emerald-600">{formatCurrency(f.paidAmount)}</span></td>
                    <td className="px-5 py-3.5"><span className="text-sm font-semibold text-red-500">{formatCurrency(f.balanceAmount)}</span></td>
                    <td className="px-5 py-3.5">
                      <Chip label={f.status} size="small" sx={{ bgcolor: STATUS_STYLES[f.status]?.bg, color: STATUS_STYLES[f.status]?.color, fontWeight: 600, fontSize: '0.7rem', height: 22 }} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <FormDialog
        open={dialog}
        onClose={() => setDialog(false)}
        title="Record Payment"
        subtitle="Register a fee payment against a student and sync the finance records."
        error={error}
        onPrimary={handleSave}
        primaryDisabled={saving || !form.student || !form.totalAmount}
        primaryLabel="Record Payment"
        loading={saving}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Autocomplete
            options={students}
            getOptionLabel={(s) => `${s.name} (${s.rollNo})`}
            value={form.student}
            onChange={(_, val) => setForm({ ...form, student: val })}
            renderInput={(params) => <TextField {...params} label="Student" size="small" required />}
            sx={{ gridColumn: { sm: 'span 2' } }}
          />
          <FormControl size="small" fullWidth>
            <InputLabel>Fee Type</InputLabel>
            <Select value={form.feeType} label="Fee Type" onChange={(e) => setForm({ ...form, feeType: e.target.value })}>
              {['Tuition Fee', 'Hostel Fee', 'Transport Fee', 'Library Fee', 'Exam Fee', 'Other'].map((t) => <MenuItem key={t} value={t}>{t}</MenuItem>)}
            </Select>
          </FormControl>
          <TextField label="Academic Year" value={form.academicYear} onChange={(e) => setForm({ ...form, academicYear: e.target.value })} size="small" fullWidth placeholder="2024-25" sx={{ gridColumn: { sm: 'span 2' } }} />
          <TextField label="Total Amount (INR)" value={form.totalAmount} onChange={(e) => setForm({ ...form, totalAmount: e.target.value })} size="small" fullWidth type="number" required />
          <TextField label="Paid Amount (INR)" value={form.paidAmount} onChange={(e) => setForm({ ...form, paidAmount: e.target.value })} size="small" fullWidth type="number" />
        </div>
      </FormDialog>
    </div>
  );
}
