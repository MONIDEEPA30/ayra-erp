import { useState } from 'react';
import { Button, Chip, Tab, Tabs, LinearProgress } from '@mui/material';
import { Add, MenuBook, CalendarToday, Assignment, CheckCircle } from '@mui/icons-material';

const courses = [
  { code: 'CS301', name: 'Data Structures & Algorithms', dept: 'Computer Science', faculty: 'Dr. Ramesh Kumar', credits: 4, enrolled: 82, capacity: 90, semester: '5th', status: 'Active' },
  { code: 'CS302', name: 'Database Management Systems', dept: 'Computer Science', faculty: 'Prof. Neha Verma', credits: 3, enrolled: 78, capacity: 85, semester: '5th', status: 'Active' },
  { code: 'EC201', name: 'Digital Electronics', dept: 'Electronics', faculty: 'Dr. Suresh Panda', credits: 4, enrolled: 60, capacity: 75, semester: '3rd', status: 'Active' },
  { code: 'MA101', name: 'Engineering Mathematics I', dept: 'Mathematics', faculty: 'Dr. Anita Mishra', credits: 4, enrolled: 200, capacity: 220, semester: '1st', status: 'Active' },
  { code: 'CS401', name: 'Machine Learning', dept: 'Computer Science', faculty: 'Dr. Ramesh Kumar', credits: 3, enrolled: 45, capacity: 50, semester: '7th', status: 'Active' },
  { code: 'PH201', name: 'Quantum Mechanics', dept: 'Physics', faculty: 'Dr. Priya Nair', credits: 4, enrolled: 35, capacity: 50, semester: '3rd', status: 'Active' },
];

const examSchedule = [
  { subject: 'Data Structures & Algorithms', date: 'Mar 25, 2026', time: '10:00 AM', room: 'Hall A-101', students: 82 },
  { subject: 'Engineering Mathematics I', date: 'Mar 26, 2026', time: '10:00 AM', room: 'Hall B-201', students: 200 },
  { subject: 'Digital Electronics', date: 'Mar 27, 2026', time: '2:00 PM', room: 'Lab C-101', students: 60 },
  { subject: 'Database Management Systems', date: 'Mar 28, 2026', time: '10:00 AM', room: 'Hall A-102', students: 78 },
];

const DEPT_COLORS = { 'Computer Science': '#4f46e5', 'Electronics': '#06b6d4', 'Mathematics': '#ef4444', 'Physics': '#8b5cf6', 'Business Admin': '#10b981' };

export default function AcademicsPage() {
  const [tab, setTab] = useState(0);

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 animate-fadeInUp">
        <div>
          <h1 className="font-heading text-2xl font-700 text-slate-900">Academics</h1>
          <p className="text-slate-500 text-sm mt-0.5">Manage courses, exams, timetables, and academic records</p>
        </div>
        <Button variant="contained" size="small" startIcon={<Add />}>Add Course</Button>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 stagger-children">
        {[
          { label: 'Active Courses', value: '148', icon: MenuBook, color: '#4f46e5', bg: '#eef2ff' },
          { label: 'Exams Scheduled', value: '24', icon: CalendarToday, color: '#f59e0b', bg: '#fffbeb' },
          { label: 'Assignments Due', value: '36', icon: Assignment, color: '#ef4444', bg: '#fef2f2' },
          { label: 'Results Published', value: '112', icon: CheckCircle, color: '#10b981', bg: '#ecfdf5' },
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
          <Tab label="Timetable" sx={{ textTransform: 'none', fontFamily: '"DM Sans"', fontWeight: 600, fontSize: '0.875rem' }} />
        </Tabs>

        <div className="p-5">
          {tab === 0 && (
            <div className="space-y-3">
              {courses.map((c) => (
                <div key={c.code} className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 hover:border-primary-200 hover:bg-slate-50 transition-all cursor-pointer">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 font-mono font-700 text-xs"
                    style={{ backgroundColor: DEPT_COLORS[c.dept] + '18', color: DEPT_COLORS[c.dept] }}>
                    {c.code.slice(0, 3)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-semibold text-sm text-slate-900">{c.name}</p>
                      <span className="font-mono text-xs text-slate-400">{c.code}</span>
                    </div>
                    <div className="flex items-center gap-3 mt-1 flex-wrap">
                      <span className="text-xs text-slate-500">{c.faculty}</span>
                      <span className="text-xs text-slate-400">·</span>
                      <span className="text-xs text-slate-500">{c.credits} credits</span>
                      <span className="text-xs text-slate-400">·</span>
                      <span className="text-xs font-medium" style={{ color: DEPT_COLORS[c.dept] }}>{c.dept}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <LinearProgress variant="determinate" value={(c.enrolled / c.capacity) * 100}
                        sx={{ flex: 1, height: 5, borderRadius: 3, bgcolor: '#f1f5f9', '& .MuiLinearProgress-bar': { bgcolor: DEPT_COLORS[c.dept] } }} />
                      <span className="text-xs text-slate-500 whitespace-nowrap">{c.enrolled}/{c.capacity} enrolled</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Chip label={`Sem ${c.semester}`} size="small" sx={{ bgcolor: '#f8fafc', fontSize: '0.7rem', height: 22 }} />
                    <Chip label={c.status} size="small" sx={{ bgcolor: '#ecfdf5', color: '#059669', fontWeight: 600, fontSize: '0.7rem', height: 22 }} />
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab === 1 && (
            <div className="space-y-3">
              {examSchedule.map((e, i) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0">
                    <CalendarToday sx={{ color: '#d97706', fontSize: 20 }} />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-sm text-slate-900">{e.subject}</p>
                    <div className="flex items-center gap-3 mt-1 flex-wrap text-xs text-slate-500">
                      <span>{e.date}</span>
                      <span>·</span>
                      <span>{e.time}</span>
                      <span>·</span>
                      <span>{e.room}</span>
                      <span>·</span>
                      <span>{e.students} students</span>
                    </div>
                  </div>
                  <Chip label="Scheduled" size="small" sx={{ bgcolor: '#fffbeb', color: '#d97706', fontWeight: 600, fontSize: '0.7rem', height: 22 }} />
                </div>
              ))}
            </div>
          )}

          {tab === 2 && (
            <div className="text-center py-12 text-slate-400">
              <CalendarToday sx={{ fontSize: 48, opacity: 0.3 }} />
              <p className="mt-3 font-medium">Timetable builder coming soon</p>
              <p className="text-sm mt-1">Connect backend to enable drag-and-drop scheduling</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
