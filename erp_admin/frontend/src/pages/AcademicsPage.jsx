import { useState, useEffect, useCallback } from 'react';
import {
  Button, Chip, Tab, Tabs, LinearProgress, TextField, FormControl, InputLabel,
  Select, MenuItem, CircularProgress, Alert, IconButton, Tooltip,
} from '@mui/material';
import { Add, MenuBook, CalendarToday, Assignment, CheckCircle, Edit, Delete } from '@mui/icons-material';
import api from '../utils/api';
import { DEPARTMENTS } from '../utils/constants';
import FormDialog from '../components/common/FormDialog';

const DEPT_COLORS = { 'Computer Science': '#4f46e5', 'Electronics': '#06b6d4', 'Mathematics': '#ef4444', 'Physics': '#8b5cf6', 'Business Administration': '#10b981', 'Mechanical Engineering': '#f59e0b' };
const getDeptColor = (dept) => DEPT_COLORS[dept] || '#64748b';
const EXAM_TYPES = ['Mid-Semester', 'End-Semester', 'Internal', 'Practical', 'Viva'];

const emptyCourse = { name: '', code: '', department: '', semester: '', credits: '', capacity: '', status: 'Active' };
const emptyExam = { course: '', examType: 'Mid-Semester', date: '', startTime: '', endTime: '', venue: '', maxMarks: '', status: 'Scheduled' };

export default function AcademicsPage() {
  const [tab, setTab] = useState(0);
  const [courses, setCourses] = useState([]);
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [dialog, setDialog] = useState({ open: false, type: '', mode: 'add', data: null });
  const [courseForm, setCourseForm] = useState(emptyCourse);
  const [examForm, setExamForm] = useState(emptyExam);
  const [saving, setSaving] = useState(false);

  const fetchCourses = useCallback(async () => {
    try {
      const { data } = await api.get('/academics/courses', { params: { limit: 50 } });
      setCourses(data.data.courses);
    } catch { setError('Failed to load courses.'); }
  }, []);

  const fetchExams = useCallback(async () => {
    try {
      const { data } = await api.get('/academics/exams', { params: { limit: 50 } });
      setExams(data.data.exams);
    } catch { setError('Failed to load exams.'); }
  }, []);

  useEffect(() => {
    Promise.all([fetchCourses(), fetchExams()]).finally(() => setLoading(false));
  }, []);

  const openCourseAdd = () => { setCourseForm(emptyCourse); setDialog({ open: true, type: 'course', mode: 'add', data: null }); };
  const openCourseEdit = (c) => { setCourseForm({ name: c.name, code: c.code, department: c.department, semester: c.semester, credits: c.credits, capacity: c.capacity, status: c.status }); setDialog({ open: true, type: 'course', mode: 'edit', data: c }); };
  const openExamAdd = () => { setExamForm(emptyExam); setDialog({ open: true, type: 'exam', mode: 'add', data: null }); };
  const closeDialog = () => { setDialog({ open: false, type: '', mode: 'add', data: null }); setError(''); };

  const handleSaveCourse = async () => {
    setSaving(true); setError('');
    try {
      const payload = { ...courseForm, credits: Number(courseForm.credits), capacity: Number(courseForm.capacity) };
      if (dialog.mode === 'add') await api.post('/academics/courses', payload);
      else await api.put(`/academics/courses/${dialog.data._id}`, payload);
      closeDialog(); fetchCourses();
    } catch (err) { setError(err.response?.data?.message || 'Failed to save course.'); }
    finally { setSaving(false); }
  };

  const handleSaveExam = async () => {
    setSaving(true); setError('');
    try {
      await api.post('/academics/exams', {
        ...examForm,
        maxMarks: examForm.maxMarks ? Number(examForm.maxMarks) : undefined,
      });
      closeDialog(); fetchExams();
    } catch (err) { setError(err.response?.data?.message || 'Failed to save exam.'); }
    finally { setSaving(false); }
  };

  const handleDeleteCourse = async (id) => {
    if (!window.confirm('Delete this course?')) return;
    try { await api.delete(`/academics/courses/${id}`); fetchCourses(); }
    catch { setError('Failed to delete course.'); }
  };

  const handleDeleteExam = async (id) => {
    if (!window.confirm('Delete this exam?')) return;
    try { await api.delete(`/academics/exams/${id}`); fetchExams(); }
    catch { setError('Failed to delete exam.'); }
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 animate-fadeInUp">
        <div>
          <h1 className="font-heading text-2xl font-700 text-slate-900">Academics</h1>
          <p className="text-slate-500 text-sm mt-0.5">Manage courses, exams, timetables, and academic records</p>
        </div>
        <Button variant="contained" size="small" startIcon={<Add />} onClick={tab === 0 ? openCourseAdd : openExamAdd}>
          {tab === 0 ? 'Add Course' : 'Schedule Exam'}
        </Button>
      </div>

      {error && <Alert severity="error" onClose={() => setError('')}>{error}</Alert>}

      {/* Quick stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Active Courses', value: courses.filter((c) => c.status === 'Active').length, icon: MenuBook, color: '#4f46e5', bg: '#eef2ff' },
          { label: 'Exams Scheduled', value: exams.filter((e) => e.status === 'Scheduled').length, icon: CalendarToday, color: '#f59e0b', bg: '#fffbeb' },
          { label: 'Total Courses', value: courses.length, icon: Assignment, color: '#ef4444', bg: '#fef2f2' },
          { label: 'Completed Exams', value: exams.filter((e) => e.status === 'Completed').length, icon: CheckCircle, color: '#10b981', bg: '#ecfdf5' },
        ].map((s) => {
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

      {/* Tabs */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-card animate-fadeInUp">
        <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ px: 3, borderBottom: '1px solid #f1f5f9' }}>
          <Tab label="Courses" sx={{ textTransform: 'none', fontFamily: '"DM Sans"', fontWeight: 600, fontSize: '0.875rem' }} />
          <Tab label="Exam Schedule" sx={{ textTransform: 'none', fontFamily: '"DM Sans"', fontWeight: 600, fontSize: '0.875rem' }} />
        </Tabs>

        <div className="p-5">
          {loading ? (
            <div className="flex justify-center py-12"><CircularProgress /></div>
          ) : tab === 0 ? (
            <div className="space-y-3">
              {courses.length === 0 ? (
                <div className="text-center py-12 text-slate-400">No courses found. Add your first course.</div>
              ) : courses.map((c) => (
                <div key={c._id} className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 hover:border-primary-200 hover:bg-slate-50 transition-all">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 font-mono font-700 text-xs"
                    style={{ backgroundColor: getDeptColor(c.department) + '18', color: getDeptColor(c.department) }}>
                    {c.code?.slice(0, 3)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-semibold text-sm text-slate-900">{c.name}</p>
                      <span className="font-mono text-xs text-slate-400">{c.code}</span>
                    </div>
                    <div className="flex items-center gap-3 mt-1 flex-wrap text-xs text-slate-500">
                      <span>{c.faculty?.name || 'Unassigned'}</span>
                      <span>·</span><span>{c.credits} credits</span>
                      <span>·</span><span style={{ color: getDeptColor(c.department) }}>{c.department}</span>
                    </div>
                    {c.capacity > 0 && (
                      <div className="flex items-center gap-2 mt-2">
                        <LinearProgress variant="determinate" value={Math.min(((c.enrolledCount || 0) / c.capacity) * 100, 100)}
                          sx={{ flex: 1, height: 5, borderRadius: 3, bgcolor: '#f1f5f9', '& .MuiLinearProgress-bar': { bgcolor: getDeptColor(c.department) } }} />
                        <span className="text-xs text-slate-500 whitespace-nowrap">{c.enrolledCount || 0}/{c.capacity}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Chip label={`Sem ${c.semester}`} size="small" sx={{ bgcolor: '#f8fafc', fontSize: '0.7rem', height: 22 }} />
                    <Chip label={c.status} size="small" sx={{ bgcolor: '#ecfdf5', color: '#059669', fontWeight: 600, fontSize: '0.7rem', height: 22 }} />
                    <Tooltip title="Edit"><IconButton size="small" onClick={() => openCourseEdit(c)}><Edit sx={{ fontSize: 15, color: '#64748b' }} /></IconButton></Tooltip>
                    <Tooltip title="Delete"><IconButton size="small" onClick={() => handleDeleteCourse(c._id)}><Delete sx={{ fontSize: 15, color: '#ef4444' }} /></IconButton></Tooltip>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {exams.length === 0 ? (
                <div className="text-center py-12 text-slate-400">No exams scheduled yet.</div>
              ) : exams.map((e) => (
                <div key={e._id} className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0">
                    <CalendarToday sx={{ color: '#d97706', fontSize: 20 }} />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-sm text-slate-900">{e.course?.name || 'Unknown Course'}</p>
                    <div className="flex items-center gap-3 mt-1 flex-wrap text-xs text-slate-500">
                      <span>{new Date(e.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                      <span>·</span><span>{e.startTime} – {e.endTime}</span>
                      <span>·</span><span>{e.venue}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Chip label={e.examType} size="small" sx={{ bgcolor: '#fffbeb', color: '#d97706', fontWeight: 600, fontSize: '0.7rem', height: 22 }} />
                    <Chip label={e.status} size="small" sx={{ bgcolor: e.status === 'Completed' ? '#ecfdf5' : '#eef2ff', color: e.status === 'Completed' ? '#059669' : '#4f46e5', fontWeight: 600, fontSize: '0.7rem', height: 22 }} />
                    <Tooltip title="Delete"><IconButton size="small" onClick={() => handleDeleteExam(e._id)}><Delete sx={{ fontSize: 15, color: '#ef4444' }} /></IconButton></Tooltip>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Course Dialog */}
      <FormDialog
        open={dialog.open && dialog.type === 'course'}
        onClose={closeDialog}
        title={dialog.mode === 'add' ? 'Add Course' : 'Edit Course'}
        subtitle="Define the academic structure with course code, department, semester, and capacity."
        error={error}
        onPrimary={handleSaveCourse}
        primaryDisabled={saving || !courseForm.name || !courseForm.code}
        primaryLabel={dialog.mode === 'add' ? 'Add Course' : 'Save Course'}
        loading={saving}
      >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <TextField label="Course Name" value={courseForm.name} onChange={(e) => setCourseForm({ ...courseForm, name: e.target.value })} size="small" fullWidth required sx={{ gridColumn: 'span 2' }} />
            <TextField label="Course Code" value={courseForm.code} onChange={(e) => setCourseForm({ ...courseForm, code: e.target.value })} size="small" fullWidth required />
            <FormControl size="small" fullWidth>
              <InputLabel>Department</InputLabel>
              <Select value={courseForm.department} label="Department" onChange={(e) => setCourseForm({ ...courseForm, department: e.target.value })}>
                {DEPARTMENTS.map((d) => <MenuItem key={d} value={d}>{d}</MenuItem>)}
              </Select>
            </FormControl>
            <TextField label="Semester" value={courseForm.semester} onChange={(e) => setCourseForm({ ...courseForm, semester: e.target.value })} size="small" fullWidth />
            <TextField label="Credits" value={courseForm.credits} onChange={(e) => setCourseForm({ ...courseForm, credits: e.target.value })} size="small" fullWidth type="number" />
            <TextField label="Capacity" value={courseForm.capacity} onChange={(e) => setCourseForm({ ...courseForm, capacity: e.target.value })} size="small" fullWidth type="number" />
          </div>
      </FormDialog>

      <FormDialog
        open={dialog.open && dialog.type === 'exam'}
        onClose={closeDialog}
        title="Schedule Exam"
        subtitle="Plan the exam window with course, type, date, venue, and marks configuration."
        error={error}
        onPrimary={handleSaveExam}
        primaryDisabled={saving || !examForm.course || !examForm.date || !examForm.startTime || !examForm.endTime || !examForm.venue}
        primaryLabel="Schedule Exam"
        loading={saving}
      >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <FormControl size="small" fullWidth sx={{ gridColumn: 'span 2' }}>
              <InputLabel>Course</InputLabel>
              <Select value={examForm.course} label="Course" onChange={(e) => setExamForm({ ...examForm, course: e.target.value })}>
                {courses.map((c) => <MenuItem key={c._id} value={c._id}>{c.name} ({c.code})</MenuItem>)}
              </Select>
            </FormControl>
            <FormControl size="small" fullWidth>
              <InputLabel>Exam Type</InputLabel>
              <Select value={examForm.examType} label="Exam Type" onChange={(e) => setExamForm({ ...examForm, examType: e.target.value })}>
                {EXAM_TYPES.map((t) => <MenuItem key={t} value={t}>{t}</MenuItem>)}
              </Select>
            </FormControl>
            <TextField label="Date" value={examForm.date} onChange={(e) => setExamForm({ ...examForm, date: e.target.value })} size="small" fullWidth type="date" InputLabelProps={{ shrink: true }} />
            <TextField label="Start Time" value={examForm.startTime} onChange={(e) => setExamForm({ ...examForm, startTime: e.target.value })} size="small" fullWidth />
            <TextField label="End Time" value={examForm.endTime} onChange={(e) => setExamForm({ ...examForm, endTime: e.target.value })} size="small" fullWidth />
            <TextField label="Venue" value={examForm.venue} onChange={(e) => setExamForm({ ...examForm, venue: e.target.value })} size="small" fullWidth sx={{ gridColumn: 'span 2' }} />
            <TextField label="Max Marks" value={examForm.maxMarks} onChange={(e) => setExamForm({ ...examForm, maxMarks: e.target.value })} size="small" fullWidth type="number" />
          </div>
      </FormDialog>
    </div>
  );
}
