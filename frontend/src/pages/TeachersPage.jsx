import { useState } from 'react';
import {
  Button, TextField, InputAdornment, Avatar, Chip, IconButton,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Tooltip, Pagination, Card, CardContent,
} from '@mui/material';
import { Search, Add, Edit, Delete, Visibility, Download, School, Star } from '@mui/icons-material';

const TEACHERS = [
  { id: 'FAC001', name: 'Dr. Ramesh Kumar', dept: 'Computer Science', designation: 'Professor', email: 'r.kumar@uni.edu', subjects: ['DBMS', 'Algorithms'], exp: 14, students: 120, rating: 4.8, status: 'Active' },
  { id: 'FAC002', name: 'Prof. Neha Verma', dept: 'Computer Science', designation: 'Asst. Professor', email: 'n.verma@uni.edu', subjects: ['OS', 'Networks'], exp: 7, students: 85, rating: 4.6, status: 'Active' },
  { id: 'FAC003', name: 'Dr. Suresh Panda', dept: 'Electronics', designation: 'Associate Prof.', email: 's.panda@uni.edu', subjects: ['Digital Electronics', 'VLSI'], exp: 11, students: 95, rating: 4.5, status: 'Active' },
  { id: 'FAC004', name: 'Dr. Anita Mishra', dept: 'Mathematics', designation: 'Professor', email: 'a.mishra@uni.edu', subjects: ['Calculus', 'Linear Algebra'], exp: 18, students: 200, rating: 4.9, status: 'Active' },
  { id: 'FAC005', name: 'Mr. Vivek Rao', dept: 'Business Admin', designation: 'Lecturer', email: 'v.rao@uni.edu', subjects: ['Marketing', 'Management'], exp: 4, students: 75, rating: 4.2, status: 'On Leave' },
  { id: 'FAC006', name: 'Dr. Priya Nair', dept: 'Physics', designation: 'Asst. Professor', email: 'p.nair@uni.edu', subjects: ['Quantum Physics', 'Optics'], exp: 9, students: 110, rating: 4.7, status: 'Active' },
];

const DEPT_COLORS = { 'Computer Science': '#4f46e5', 'Electronics': '#06b6d4', 'Mathematics': '#ef4444', 'Business Admin': '#10b981', 'Physics': '#8b5cf6' };

export default function TeachersPage() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const filtered = TEACHERS.filter((t) => t.name.toLowerCase().includes(search.toLowerCase()) || t.dept.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 animate-fadeInUp">
        <div>
          <h1 className="font-heading text-2xl font-700 text-slate-900">Faculty & Teachers</h1>
          <p className="text-slate-500 text-sm mt-0.5">Manage faculty profiles, assignments, and performance</p>
        </div>
        <div className="flex gap-2.5">
          <Button variant="outlined" size="small" startIcon={<Download />} sx={{ borderColor: '#e2e8f0', color: '#475569' }}>Export</Button>
          <Button variant="contained" size="small" startIcon={<Add />}>Add Faculty</Button>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Faculty', value: '327', color: '#4f46e5', bg: '#eef2ff' },
          { label: 'Professors', value: '84', color: '#10b981', bg: '#ecfdf5' },
          { label: 'Asst. Professors', value: '143', color: '#06b6d4', bg: '#ecfeff' },
          { label: 'On Leave', value: '12', color: '#f59e0b', bg: '#fffbeb' },
        ].map((c) => (
          <div key={c.label} className="stat-card animate-fadeInUp">
            <p className="font-heading text-2xl font-700" style={{ color: c.color }}>{c.value}</p>
            <p className="text-slate-500 text-sm mt-1">{c.label}</p>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-card p-4 flex gap-3 animate-fadeInUp">
        <TextField
          placeholder="Search faculty by name or department..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          size="small"
          sx={{ flex: 1 }}
          InputProps={{ startAdornment: <InputAdornment position="start"><Search sx={{ fontSize: 18, color: '#94a3b8' }} /></InputAdornment> }}
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-card overflow-hidden animate-fadeInUp">
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Faculty Member</TableCell>
                <TableCell>ID</TableCell>
                <TableCell>Department</TableCell>
                <TableCell>Designation</TableCell>
                <TableCell>Subjects</TableCell>
                <TableCell>Experience</TableCell>
                <TableCell>Rating</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filtered.map((t) => (
                <TableRow key={t.id} hover sx={{ '&:hover': { bgcolor: '#fafbff' } }}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar sx={{ width: 36, height: 36, bgcolor: DEPT_COLORS[t.dept] || '#4f46e5', fontSize: 13, fontWeight: 700 }}>
                        {t.name.charAt(0)}
                      </Avatar>
                      <div>
                        <p className="font-semibold text-sm text-slate-800">{t.name}</p>
                        <p className="text-xs text-slate-400">{t.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell><span className="font-mono text-xs font-medium text-slate-600 bg-slate-50 px-2 py-1 rounded">{t.id}</span></TableCell>
                  <TableCell><span className="text-xs font-medium" style={{ color: DEPT_COLORS[t.dept] }}>{t.dept}</span></TableCell>
                  <TableCell><span className="text-sm text-slate-700">{t.designation}</span></TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {t.subjects.map((s) => (
                        <Chip key={s} label={s} size="small" sx={{ fontSize: '0.65rem', height: 20, bgcolor: '#f1f5f9', color: '#475569' }} />
                      ))}
                    </div>
                  </TableCell>
                  <TableCell><span className="text-sm text-slate-700">{t.exp} yrs</span></TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Star sx={{ fontSize: 14, color: '#f59e0b' }} />
                      <span className="text-sm font-semibold text-slate-800">{t.rating}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Chip label={t.status} size="small"
                      sx={{ bgcolor: t.status === 'Active' ? '#eef2ff' : '#fffbeb', color: t.status === 'Active' ? '#4f46e5' : '#d97706', fontWeight: 600, fontSize: '0.7rem', height: 22 }} />
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
          <p className="text-xs text-slate-400">Showing {filtered.length} of {TEACHERS.length} faculty members</p>
          <Pagination count={3} page={page} onChange={(_, v) => setPage(v)} size="small" />
        </div>
      </div>
    </div>
  );
}
