import { useState } from 'react';
import {
  Button, TextField, InputAdornment, Avatar, Chip, IconButton,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Select, MenuItem, FormControl, InputLabel, Pagination, Tooltip,
} from '@mui/material';
import {
  Search, Add, FilterList, Download, Edit, Delete,
  Visibility, People, School, CheckCircle, Cancel,
} from '@mui/icons-material';

const STUDENTS = [
  { id: 'CS2024001', name: 'Aarav Sharma', dept: 'Computer Science', year: '3rd Year', email: 'aarav.s@uni.edu', phone: '9876543210', status: 'Active', fees: 'Paid', cgpa: 8.9, avatar: 'A' },
  { id: 'CS2024002', name: 'Priya Verma', dept: 'Computer Science', year: '2nd Year', email: 'priya.v@uni.edu', phone: '9876543211', status: 'Active', fees: 'Pending', cgpa: 9.1, avatar: 'P' },
  { id: 'EC2023015', name: 'Rohit Nayak', dept: 'Electronics', year: '4th Year', email: 'rohit.n@uni.edu', phone: '9876543212', status: 'Active', fees: 'Paid', cgpa: 7.8, avatar: 'R' },
  { id: 'ME2024008', name: 'Sneha Patil', dept: 'Mechanical', year: '1st Year', email: 'sneha.p@uni.edu', phone: '9876543213', status: 'Active', fees: 'Paid', cgpa: 8.2, avatar: 'S' },
  { id: 'BA2023022', name: 'Kiran Das', dept: 'Business Admin', year: '2nd Year', email: 'kiran.d@uni.edu', phone: '9876543214', status: 'Inactive', fees: 'Pending', cgpa: 7.5, avatar: 'K' },
  { id: 'CS2024003', name: 'Meera Joshi', dept: 'Computer Science', year: '3rd Year', email: 'meera.j@uni.edu', phone: '9876543215', status: 'Active', fees: 'Paid', cgpa: 9.4, avatar: 'M' },
  { id: 'PH2023010', name: 'Arjun Reddy', dept: 'Physics', year: '2nd Year', email: 'arjun.r@uni.edu', phone: '9876543216', status: 'Active', fees: 'Paid', cgpa: 8.7, avatar: 'A' },
  { id: 'MA2024011', name: 'Divya Singh', dept: 'Mathematics', year: '1st Year', email: 'divya.s@uni.edu', phone: '9876543217', status: 'Active', fees: 'Pending', cgpa: 8.0, avatar: 'D' },
];

const DEPT_COLORS = {
  'Computer Science': '#4f46e5',
  'Electronics': '#06b6d4',
  'Mechanical': '#f59e0b',
  'Business Admin': '#10b981',
  'Physics': '#8b5cf6',
  'Mathematics': '#ef4444',
};

const statCards = [
  { label: 'Total Students', value: '4,217', icon: People, color: '#4f46e5', bg: '#eef2ff' },
  { label: 'Active', value: '4,082', icon: CheckCircle, color: '#10b981', bg: '#ecfdf5' },
  { label: 'Inactive', value: '135', icon: Cancel, color: '#ef4444', bg: '#fef2f2' },
  { label: 'Departments', value: '24', icon: School, color: '#f59e0b', bg: '#fffbeb' },
];

export default function StudentsPage() {
  const [search, setSearch] = useState('');
  const [deptFilter, setDeptFilter] = useState('');
  const [page, setPage] = useState(1);

  const filtered = STUDENTS.filter((s) =>
    (s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.id.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase())) &&
    (deptFilter ? s.dept === deptFilter : true)
  );

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 animate-fadeInUp">
        <div>
          <h1 className="font-heading text-2xl font-700 text-slate-900">Students</h1>
          <p className="text-slate-500 text-sm mt-0.5">Manage student records, enrollment, and academic data</p>
        </div>
        <div className="flex gap-2.5">
          <Button variant="outlined" size="small" startIcon={<Download />} sx={{ borderColor: '#e2e8f0', color: '#475569' }}>Export</Button>
          <Button variant="contained" size="small" startIcon={<Add />}>Add Student</Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 stagger-children">
        {statCards.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="stat-card animate-fadeInUp flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: s.bg }}>
                <Icon sx={{ fontSize: 20, color: s.color }} />
              </div>
              <div>
                <p className="font-heading text-xl font-700 text-slate-900">{s.value}</p>
                <p className="text-slate-500 text-xs font-medium">{s.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-card p-4 flex flex-col sm:flex-row gap-3 animate-fadeInUp">
        <TextField
          placeholder="Search by name, ID or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          size="small"
          sx={{ flex: 1 }}
          InputProps={{ startAdornment: <InputAdornment position="start"><Search sx={{ fontSize: 18, color: '#94a3b8' }} /></InputAdornment> }}
        />
        <FormControl size="small" sx={{ minWidth: 180 }}>
          <InputLabel>Department</InputLabel>
          <Select value={deptFilter} label="Department" onChange={(e) => setDeptFilter(e.target.value)}>
            <MenuItem value="">All Departments</MenuItem>
            {[...new Set(STUDENTS.map((s) => s.dept))].map((d) => (
              <MenuItem key={d} value={d}>{d}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl size="small" sx={{ minWidth: 130 }}>
          <InputLabel>Year</InputLabel>
          <Select value="" label="Year">
            <MenuItem value="">All Years</MenuItem>
            {['1st Year', '2nd Year', '3rd Year', '4th Year'].map((y) => <MenuItem key={y} value={y}>{y}</MenuItem>)}
          </Select>
        </FormControl>
        <Button variant="outlined" size="small" startIcon={<FilterList />} sx={{ borderColor: '#e2e8f0', color: '#475569', minWidth: 100 }}>
          Filters
        </Button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-card overflow-hidden animate-fadeInUp">
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Student</TableCell>
                <TableCell>Roll No.</TableCell>
                <TableCell>Department</TableCell>
                <TableCell>Year</TableCell>
                <TableCell>CGPA</TableCell>
                <TableCell>Fees</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filtered.map((s) => (
                <TableRow key={s.id} hover sx={{ '&:hover': { bgcolor: '#fafbff' } }}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar sx={{ width: 36, height: 36, bgcolor: DEPT_COLORS[s.dept] || '#4f46e5', fontSize: 14, fontWeight: 700 }}>
                        {s.avatar}
                      </Avatar>
                      <div>
                        <p className="font-semibold text-sm text-slate-800">{s.name}</p>
                        <p className="text-xs text-slate-400">{s.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell><span className="font-mono text-xs font-medium text-slate-600 bg-slate-50 px-2 py-1 rounded-md">{s.id}</span></TableCell>
                  <TableCell>
                    <span className="text-xs font-medium" style={{ color: DEPT_COLORS[s.dept] }}>{s.dept}</span>
                  </TableCell>
                  <TableCell><span className="text-sm text-slate-700">{s.year}</span></TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-800 text-sm">{s.cgpa}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Chip label={s.fees} size="small"
                      sx={{
                        bgcolor: s.fees === 'Paid' ? '#ecfdf5' : '#fff7ed',
                        color: s.fees === 'Paid' ? '#059669' : '#d97706',
                        fontWeight: 600, fontSize: '0.7rem', height: 22,
                      }} />
                  </TableCell>
                  <TableCell>
                    <Chip label={s.status} size="small"
                      sx={{
                        bgcolor: s.status === 'Active' ? '#eef2ff' : '#fef2f2',
                        color: s.status === 'Active' ? '#4f46e5' : '#ef4444',
                        fontWeight: 600, fontSize: '0.7rem', height: 22,
                      }} />
                  </TableCell>
                  <TableCell align="right">
                    <div className="flex items-center justify-end gap-1">
                      <Tooltip title="View"><IconButton size="small"><Visibility sx={{ fontSize: 16, color: '#64748b' }} /></IconButton></Tooltip>
                      <Tooltip title="Edit"><IconButton size="small"><Edit sx={{ fontSize: 16, color: '#64748b' }} /></IconButton></Tooltip>
                      <Tooltip title="Delete"><IconButton size="small"><Delete sx={{ fontSize: 16, color: '#ef4444' }} /></IconButton></Tooltip>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div className="flex items-center justify-between px-5 py-3.5 border-t border-slate-100">
          <p className="text-xs text-slate-400">Showing {filtered.length} of {STUDENTS.length} students</p>
          <Pagination count={Math.ceil(STUDENTS.length / 10)} page={page} onChange={(_, v) => setPage(v)} size="small" />
        </div>
      </div>
    </div>
  );
}
