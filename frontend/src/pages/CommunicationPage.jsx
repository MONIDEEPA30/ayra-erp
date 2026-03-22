import { useState } from 'react';
import { Button, Chip, TextField, InputAdornment, Avatar } from '@mui/material';
import { Forum, Send, Add, Search, Announcement, Email, Sms, Campaign } from '@mui/icons-material';

const announcements = [
  { id: 1, title: 'Mid-Semester Exam Schedule Released', category: 'Academic', date: 'Mar 20, 2026', audience: 'All Students', status: 'Published', priority: 'High' },
  { id: 2, title: 'Fee Payment Deadline Extended to March 31', category: 'Finance', date: 'Mar 18, 2026', audience: 'Fee Defaulters', status: 'Published', priority: 'High' },
  { id: 3, title: 'Annual Sports Day Registration Open', category: 'Events', date: 'Mar 15, 2026', audience: 'All Students & Faculty', status: 'Published', priority: 'Medium' },
  { id: 4, title: 'Library Timing Changed — Effective April 1', category: 'General', date: 'Mar 12, 2026', audience: 'All', status: 'Draft', priority: 'Low' },
  { id: 5, title: 'Faculty Development Program — April Batch', category: 'Faculty', date: 'Mar 10, 2026', audience: 'Faculty Only', status: 'Published', priority: 'Medium' },
];

const messages = [
  { id: 1, from: 'Priya Verma', role: 'Student', subject: 'Fee Concession Request', preview: 'I would like to request a fee concession for this semester due to financial...', time: '10:30 AM', unread: true, avatar: 'P' },
  { id: 2, from: 'Dr. Ramesh Kumar', role: 'Faculty', subject: 'Leave Application — March 28', preview: 'Kindly approve my leave application for March 28-29 due to personal reasons...', time: 'Yesterday', unread: true, avatar: 'R' },
  { id: 3, from: 'Accounts Dept', role: 'Department', subject: 'Q3 Financial Summary', preview: 'Please find attached the Q3 fee collection summary for your review...', time: 'Mar 19', unread: false, avatar: 'A' },
  { id: 4, from: 'Aarav Sharma', role: 'Student', subject: 'Exam Hall Ticket Issue', preview: 'My hall ticket has incorrect subject codes. Request your urgent attention...', time: 'Mar 18', unread: false, avatar: 'A' },
];

const CAT_COLORS = { Academic: '#4f46e5', Finance: '#10b981', Events: '#f59e0b', General: '#06b6d4', Faculty: '#8b5cf6' };

export default function CommunicationPage() {
  const [tab, setTab] = useState('announcements');
  const [search, setSearch] = useState('');

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 animate-fadeInUp">
        <div>
          <h1 className="font-heading text-2xl font-700 text-slate-900">Communication</h1>
          <p className="text-slate-500 text-sm mt-0.5">Announcements, messages, and notifications</p>
        </div>
        <div className="flex gap-2.5">
          <Button variant="contained" size="small" startIcon={<Add />}>New Announcement</Button>
        </div>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 stagger-children">
        {[
          { label: 'Total Announcements', value: '24', icon: Announcement, color: '#4f46e5', bg: '#eef2ff' },
          { label: 'Unread Messages', value: '8', icon: Email, color: '#ef4444', bg: '#fef2f2' },
          { label: 'SMS Sent (Month)', value: '1,240', icon: Sms, color: '#10b981', bg: '#ecfdf5' },
          { label: 'Broadcasts', value: '6', icon: Campaign, color: '#f59e0b', bg: '#fffbeb' },
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

      {/* Tab switcher */}
      <div className="flex gap-2 animate-fadeInUp">
        {['announcements', 'messages'].map((t) => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all capitalize ${tab === t ? 'bg-primary-600 text-white shadow-sm' : 'bg-white text-slate-600 border border-slate-200 hover:border-primary-200 hover:text-primary-600'}`}>
            {t}
          </button>
        ))}
      </div>

      {tab === 'announcements' && (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-card overflow-hidden animate-fadeInUp">
          <div className="px-5 py-4 border-b border-slate-100">
            <TextField
              placeholder="Search announcements..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              size="small"
              fullWidth
              InputProps={{ startAdornment: <InputAdornment position="start"><Search sx={{ fontSize: 18, color: '#94a3b8' }} /></InputAdornment> }}
            />
          </div>
          <div className="divide-y divide-slate-100">
            {announcements.filter((a) => a.title.toLowerCase().includes(search.toLowerCase())).map((a) => (
              <div key={a.id} className="flex items-start gap-4 px-5 py-4 hover:bg-slate-50 transition-colors cursor-pointer">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: CAT_COLORS[a.category] + '20', color: CAT_COLORS[a.category] }}>
                  <Announcement sx={{ fontSize: 18 }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-semibold text-sm text-slate-900">{a.title}</p>
                    <span className="text-xs text-slate-400 flex-shrink-0">{a.date}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                    <Chip label={a.category} size="small"
                      sx={{ bgcolor: CAT_COLORS[a.category] + '18', color: CAT_COLORS[a.category], fontWeight: 600, fontSize: '0.65rem', height: 20 }} />
                    <span className="text-xs text-slate-400">To: {a.audience}</span>
                    <Chip label={a.status} size="small"
                      sx={{ bgcolor: a.status === 'Published' ? '#ecfdf5' : '#f8fafc', color: a.status === 'Published' ? '#059669' : '#64748b', fontWeight: 600, fontSize: '0.65rem', height: 20 }} />
                    <Chip label={a.priority} size="small"
                      sx={{ bgcolor: a.priority === 'High' ? '#fef2f2' : a.priority === 'Medium' ? '#fffbeb' : '#f8fafc', color: a.priority === 'High' ? '#ef4444' : a.priority === 'Medium' ? '#d97706' : '#94a3b8', fontWeight: 600, fontSize: '0.65rem', height: 20 }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'messages' && (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-card overflow-hidden animate-fadeInUp">
          <div className="divide-y divide-slate-100">
            {messages.map((m) => (
              <div key={m.id} className={`flex items-start gap-4 px-5 py-4 hover:bg-slate-50 transition-colors cursor-pointer ${m.unread ? 'bg-blue-50/30' : ''}`}>
                <Avatar sx={{ width: 38, height: 38, bgcolor: '#4f46e5', fontSize: 14, fontWeight: 700, flexShrink: 0 }}>{m.avatar}</Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <p className={`text-sm ${m.unread ? 'font-700 text-slate-900' : 'font-medium text-slate-700'}`}>{m.from}</p>
                      <Chip label={m.role} size="small" sx={{ bgcolor: '#f1f5f9', color: '#64748b', fontSize: '0.62rem', height: 18 }} />
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {m.unread && <div className="w-2 h-2 rounded-full bg-primary-600" />}
                      <span className="text-xs text-slate-400">{m.time}</span>
                    </div>
                  </div>
                  <p className={`text-sm mt-0.5 ${m.unread ? 'font-600 text-slate-800' : 'text-slate-600'}`}>{m.subject}</p>
                  <p className="text-xs text-slate-400 mt-0.5 truncate">{m.preview}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="px-5 py-4 border-t border-slate-100">
            <div className="flex gap-2">
              <TextField placeholder="Compose a new message..." size="small" fullWidth />
              <Button variant="contained" size="small" sx={{ minWidth: 44, px: 1.5 }}><Send sx={{ fontSize: 18 }} /></Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
