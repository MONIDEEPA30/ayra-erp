import { useState } from 'react';
import {
  Button, TextField, Switch, Divider, Avatar, Chip,
} from '@mui/material';
import {
  Person, Lock, Notifications, Palette, School, Save,
  AdminPanelSettings, Language, Security,
} from '@mui/icons-material';

const sections = [
  { id: 'profile', label: 'Profile', icon: Person },
  { id: 'security', label: 'Security', icon: Lock },
  { id: 'notifications', label: 'Notifications', icon: Notifications },
  { id: 'university', label: 'University Info', icon: School },
  { id: 'appearance', label: 'Appearance', icon: Palette },
];

export default function SettingsPage() {
  const [active, setActive] = useState('profile');
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    feeAlerts: true,
    examAlerts: true,
    admissions: true,
    system: false,
  });

  return (
    <div className="space-y-5">
      <div className="animate-fadeInUp">
        <h1 className="font-heading text-2xl font-700 text-slate-900">Settings</h1>
        <p className="text-slate-500 text-sm mt-0.5">Manage your account, university, and system preferences</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-5 animate-fadeInUp">
        {/* Sidebar */}
        <div className="lg:w-56 flex-shrink-0">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-card p-3 space-y-1">
            {sections.map((s) => {
              const Icon = s.icon;
              return (
                <button key={s.id} onClick={() => setActive(s.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${active === s.id ? 'bg-primary-50 text-primary-700' : 'text-slate-600 hover:bg-slate-50'}`}>
                  <Icon sx={{ fontSize: 18 }} />
                  {s.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 bg-white rounded-2xl border border-slate-100 shadow-card p-6">
          {active === 'profile' && (
            <div className="space-y-5">
              <h2 className="font-heading font-600 text-slate-900 text-lg">Profile Settings</h2>
              <div className="flex items-center gap-4">
                <Avatar sx={{ width: 72, height: 72, bgcolor: '#4f46e5', fontSize: 28, fontWeight: 700 }}>A</Avatar>
                <div>
                  <Button variant="outlined" size="small" sx={{ borderColor: '#e2e8f0', color: '#475569' }}>Change Photo</Button>
                  <p className="text-xs text-slate-400 mt-1.5">JPG, GIF or PNG. Max size 2MB.</p>
                </div>
              </div>
              <Divider />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <TextField fullWidth label="Full Name" defaultValue="Admin" size="small" />
                <TextField fullWidth label="Username" defaultValue="admin" size="small" />
                <TextField fullWidth label="Email Address" defaultValue="admin@university.edu" size="small" />
                <TextField fullWidth label="Phone Number" defaultValue="+91 98765 43210" size="small" />
                <TextField fullWidth label="Role" defaultValue="Administrator" size="small" disabled />
                <TextField fullWidth label="Department" defaultValue="Administration" size="small" />
              </div>
              <div className="pt-2">
                <Button variant="contained" startIcon={<Save />}>Save Changes</Button>
              </div>
            </div>
          )}

          {active === 'security' && (
            <div className="space-y-5">
              <h2 className="font-heading font-600 text-slate-900 text-lg">Security Settings</h2>
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-100 flex items-start gap-3">
                <Security sx={{ color: '#d97706', fontSize: 20, mt: 0.2 }} />
                <div>
                  <p className="text-sm font-semibold text-amber-800">Change your default password</p>
                  <p className="text-xs text-amber-700 mt-0.5">For production use, change credentials in <code>src/context/AuthContext.jsx</code></p>
                </div>
              </div>
              <Divider />
              <div className="space-y-4">
                <TextField fullWidth label="Current Password" type="password" size="small" />
                <TextField fullWidth label="New Password" type="password" size="small" />
                <TextField fullWidth label="Confirm New Password" type="password" size="small" />
              </div>
              <div className="flex items-center justify-between py-3 border-t border-slate-100">
                <div>
                  <p className="text-sm font-semibold text-slate-800">Two-Factor Authentication</p>
                  <p className="text-xs text-slate-400 mt-0.5">Add an extra layer of security to your account</p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between py-3 border-t border-slate-100">
                <div>
                  <p className="text-sm font-semibold text-slate-800">Session Timeout</p>
                  <p className="text-xs text-slate-400 mt-0.5">Auto logout after 30 minutes of inactivity</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Button variant="contained" startIcon={<Save />}>Update Password</Button>
            </div>
          )}

          {active === 'notifications' && (
            <div className="space-y-5">
              <h2 className="font-heading font-600 text-slate-900 text-lg">Notification Preferences</h2>
              <div className="space-y-2">
                {[
                  { key: 'email', label: 'Email Notifications', desc: 'Receive alerts via email' },
                  { key: 'sms', label: 'SMS Notifications', desc: 'Receive alerts via SMS' },
                  { key: 'feeAlerts', label: 'Fee Due Alerts', desc: 'Notify when fee deadlines approach' },
                  { key: 'examAlerts', label: 'Exam Schedule Alerts', desc: 'Notify about exam updates' },
                  { key: 'admissions', label: 'Admission Requests', desc: 'Notify when new applications arrive' },
                  { key: 'system', label: 'System Updates', desc: 'Notify about system maintenance' },
                ].map((n) => (
                  <div key={n.key} className="flex items-center justify-between py-3 border-b border-slate-100">
                    <div>
                      <p className="text-sm font-semibold text-slate-800">{n.label}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{n.desc}</p>
                    </div>
                    <Switch
                      checked={notifications[n.key]}
                      onChange={(e) => setNotifications((p) => ({ ...p, [n.key]: e.target.checked }))}
                    />
                  </div>
                ))}
              </div>
              <Button variant="contained" startIcon={<Save />}>Save Preferences</Button>
            </div>
          )}

          {active === 'university' && (
            <div className="space-y-5">
              <h2 className="font-heading font-600 text-slate-900 text-lg">University Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <TextField fullWidth label="University Name" defaultValue="State University of Technology" size="small" />
                <TextField fullWidth label="University Code" defaultValue="SUT-2024" size="small" />
                <TextField fullWidth label="Established Year" defaultValue="1985" size="small" />
                <TextField fullWidth label="Affiliation" defaultValue="UGC Recognized" size="small" />
                <TextField fullWidth label="Contact Email" defaultValue="info@university.edu" size="small" />
                <TextField fullWidth label="Contact Phone" defaultValue="+91 674 123 4567" size="small" />
                <TextField fullWidth label="City" defaultValue="Bhubaneswar" size="small" />
                <TextField fullWidth label="State" defaultValue="Odisha" size="small" />
                <TextField fullWidth label="Pincode" defaultValue="751024" size="small" />
                <TextField fullWidth label="Website" defaultValue="https://university.edu" size="small" />
              </div>
              <TextField fullWidth label="Address" defaultValue="Campus Road, Tech Park, Bhubaneswar" size="small" multiline rows={2} />
              <div className="pt-2">
                <Button variant="contained" startIcon={<Save />}>Save University Info</Button>
              </div>
            </div>
          )}

          {active === 'appearance' && (
            <div className="space-y-5">
              <h2 className="font-heading font-600 text-slate-900 text-lg">Appearance</h2>
              <div>
                <p className="text-sm font-semibold text-slate-800 mb-3">Theme</p>
                <div className="flex gap-3">
                  {['Light', 'Dark', 'System'].map((t) => (
                    <button key={t}
                      className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-all ${t === 'Light' ? 'border-primary-500 bg-primary-50 text-primary-700' : 'border-slate-200 text-slate-600 hover:border-slate-300'}`}>
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <Divider />
              <div>
                <p className="text-sm font-semibold text-slate-800 mb-3">Accent Color</p>
                <div className="flex gap-3">
                  {['#4f46e5', '#059669', '#d97706', '#dc2626', '#7c3aed', '#0891b2'].map((c) => (
                    <button key={c} className="w-8 h-8 rounded-full border-2 border-white shadow-sm hover:scale-110 transition-transform"
                      style={{ backgroundColor: c }} />
                  ))}
                </div>
              </div>
              <Divider />
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-800">Compact Mode</p>
                  <p className="text-xs text-slate-400 mt-0.5">Reduce spacing for denser layout</p>
                </div>
                <Switch />
              </div>
              <Button variant="contained" startIcon={<Save />}>Save Appearance</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
