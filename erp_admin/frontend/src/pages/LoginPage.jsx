import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  TextField, Button, InputAdornment, IconButton, Alert, CircularProgress,
} from '@mui/material';
import {
  Visibility, VisibilityOff, School, LockOutlined, PersonOutlined,
} from '@mui/icons-material';

export default function LoginPage() {
  const { login, loginError, setLoginError } = useAuth();
  const [selectedAccount, setSelectedAccount] = useState('Master Admin');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const accountTypes = ['Accounts', 'HR', 'Academics', 'Master Admin'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedAccount !== 'Master Admin') {
      setLoginError('Only Master Admin login is enabled right now.');
      return;
    }
    setLoading(true);
    await login(username, password, 'superadmin');
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel — Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #3730a3 0%, #4f46e5 40%, #6366f1 70%, #818cf8 100%)' }}>
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-white/5 rounded-full" />
          <div className="absolute top-1/3 -right-16 w-72 h-72 bg-white/5 rounded-full" />
          <div className="absolute bottom-16 left-16 w-48 h-48 bg-white/5 rounded-full" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/5 rounded-full" />
          {/* Grid pattern */}
          <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="relative z-10 flex flex-col justify-between p-12 text-white w-full">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <School sx={{ fontSize: 22, color: 'white' }} />
            </div>
            <span className="font-heading font-700 text-xl tracking-tight">AYRA ERP</span>
          </div>

          <div className="space-y-6">
            <div>
              <p className="text-indigo-200 text-sm font-medium uppercase tracking-widest mb-4">University ERP System</p>
              <h1 className="font-heading text-4xl font-800 leading-tight">
                Manage your<br />
                university with<br />
                <span className="text-indigo-200">confidence.</span>
              </h1>
            </div>
            <p className="text-indigo-200 text-base leading-relaxed max-w-xs">
              A complete administration portal for students, faculty, academics, finance, and institutional communication.
            </p>

            <div className="flex gap-8 pt-4">
              {[
                { label: 'Students', value: '4,200+' },
                { label: 'Faculty', value: '320+' },
                { label: 'Departments', value: '24' },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="font-heading text-2xl font-700">{stat.value}</div>
                  <div className="text-indigo-300 text-xs font-medium mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-2">
            {['Students', 'Faculty', 'Finance', 'Academics', 'Communication'].map((tag) => (
              <span key={tag} className="px-3 py-1.5 bg-white/15 rounded-full text-xs font-medium backdrop-blur-sm">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel — Login Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12 bg-slate-50">
        <div className="w-full max-w-md animate-fadeInUp">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center">
              <School sx={{ fontSize: 22, color: 'white' }} />
            </div>
            <span className="font-heading font-700 text-xl text-slate-900">AYRA ERP</span>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-card border border-slate-100">
            <div className="mb-8">
              <h2 className="font-heading text-2xl font-700 text-slate-900">Welcome back</h2>
              <p className="text-slate-500 text-sm mt-1.5">Sign in to your administrator account</p>
            </div>

            {loginError && (
              <Alert severity="error" className="mb-5" onClose={() => setLoginError('')}>
                {loginError}
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <TextField
                fullWidth
                label="Username"
                variant="outlined"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonOutlined sx={{ color: '#94a3b8', fontSize: 20 }} />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                fullWidth
                label="Password"
                type={showPassword ? 'text' : 'password'}
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlined sx={{ color: '#94a3b8', fontSize: 20 }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)} edge="end" size="small">
                        {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">Portal Access</p>
                <div className="grid grid-cols-2 gap-2">
                  {accountTypes.map((account) => {
                    const isActive = selectedAccount === account;
                    const isEnabled = account === 'Master Admin';

                    return (
                      <button
                        key={account}
                        type="button"
                        onClick={() => {
                          setSelectedAccount(account);
                          if (account !== 'Master Admin') {
                            setLoginError('Only Master Admin login is enabled right now.');
                          } else {
                            setLoginError('');
                          }
                        }}
                        className={`rounded-xl border px-3 py-2.5 text-sm font-semibold transition-all ${
                          isActive
                            ? 'border-primary-600 bg-primary-50 text-primary-700'
                            : 'border-slate-200 bg-white text-slate-500'
                        } ${!isEnabled ? 'opacity-70' : ''}`}
                      >
                        {account}
                      </button>
                    );
                  })}
                </div>
                <p className="text-xs text-slate-400 mt-2">
                  Master Admin login is active. Other portals are reserved for future role-based access.
                </p>
              </div>

              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 accent-indigo-600 rounded" />
                  <span className="text-sm text-slate-600">Remember me</span>
                </label>
                <button type="button" className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                  Forgot password?
                </button>
              </div>

              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={loading || !username || !password || selectedAccount !== 'Master Admin'}
                sx={{ mt: 1, py: 1.4, fontSize: '0.95rem', fontWeight: 600 }}
              >
                {loading ? <CircularProgress size={20} color="inherit" /> : 'Sign in to Dashboard'}
              </Button>
            </form>

            <div className="mt-6 pt-5 border-t border-slate-100">
              <p className="text-center text-xs text-slate-400">
                Run <span className="font-mono text-slate-600">npm run seed</span> in backend to create the default admin account.
              </p>
            </div>
          </div>

          <p className="text-center text-xs text-slate-400 mt-5">
            © {new Date().getFullYear()} AYRA ERP · University Administration System
          </p>
        </div>
      </div>
    </div>
  );
}
