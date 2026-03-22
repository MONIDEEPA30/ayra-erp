import { useState } from 'react';
import { Outlet, useLocation, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  Avatar, Badge, Tooltip, Menu, MenuItem, Divider, IconButton,
  Drawer, useMediaQuery, useTheme,
} from '@mui/material';
import {
  Dashboard, People, School, MenuBook, AccountBalance,
  Forum, Settings, Notifications, Search, Menu as MenuIcon,
  Logout, Person, ChevronRight, Close, KeyboardArrowDown,
} from '@mui/icons-material';

const navItems = [
  { label: 'Dashboard', icon: Dashboard, path: '/dashboard' },
  { label: 'Students', icon: People, path: '/students' },
  { label: 'Teachers', icon: School, path: '/teachers' },
  { label: 'Academics', icon: MenuBook, path: '/academics' },
  { label: 'Finance', icon: AccountBalance, path: '/finance' },
  { label: 'Communication', icon: Forum, path: '/communication' },
];

const bottomItems = [
  { label: 'Settings', icon: Settings, path: '/settings' },
];

function SidebarContent({ onClose }) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNav = (path) => {
    navigate(path);
    if (onClose) onClose();
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Logo */}
      <div className="flex items-center justify-between px-5 py-5 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-primary-600 rounded-xl flex items-center justify-center shadow-md">
            <School sx={{ fontSize: 18, color: 'white' }} />
          </div>
          <div>
            <p className="font-heading font-700 text-sm text-slate-900 leading-tight">AYRA ERP</p>
            <p className="text-xs text-slate-400 font-medium">University Admin Portal</p>
          </div>
        </div>
        {onClose && (
          <IconButton onClick={onClose} size="small">
            <Close fontSize="small" />
          </IconButton>
        )}
      </div>

      {/* Nav */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest px-4 mb-3">Main Menu</p>
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => handleNav(item.path)}
              className={`sidebar-link w-full ${active ? 'active' : ''}`}
            >
              <Icon sx={{ fontSize: 19 }} className="link-icon flex-shrink-0" />
              <span>{item.label}</span>
              {active && <ChevronRight sx={{ fontSize: 16, ml: 'auto' }} />}
            </button>
          );
        })}

        <div className="pt-4">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest px-4 mb-3">System</p>
          {bottomItems.map((item) => {
            const Icon = item.icon;
            const active = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => handleNav(item.path)}
                className={`sidebar-link w-full ${active ? 'active' : ''}`}
              >
                <Icon sx={{ fontSize: 19 }} className="link-icon flex-shrink-0" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom user info */}
      <div className="px-3 pb-4 border-t border-slate-100 pt-4">
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-slate-50">
          <Avatar sx={{ width: 34, height: 34, bgcolor: '#4f46e5', fontSize: 14, fontWeight: 700 }}>A</Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-slate-800 truncate">Admin</p>
            <p className="text-xs text-slate-400 truncate">admin@university.edu</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('lg'));

  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [notifAnchor, setNotifAnchor] = useState(null);
  const [searchVal, setSearchVal] = useState('');

  const notifications = [
    { id: 1, title: 'Fee submission deadline', desc: 'Semester fee due in 3 days', time: '2h ago', unread: true },
    { id: 2, title: 'New admission request', desc: '12 new applications pending review', time: '5h ago', unread: true },
    { id: 3, title: 'Exam schedule updated', desc: 'Mid-term exams updated for CS dept.', time: '1d ago', unread: false },
    { id: 4, title: 'Faculty meeting', desc: 'Dept. heads meeting on Friday 10am', time: '2d ago', unread: false },
  ];

  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-60 flex-shrink-0 flex-col shadow-sidebar border-r border-slate-100">
        <SidebarContent />
      </aside>

      {/* Mobile Drawer */}
      <Drawer
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        PaperProps={{ sx: { width: 240, border: 'none' } }}
      >
        <SidebarContent onClose={() => setMobileOpen(false)} />
      </Drawer>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="bg-white border-b border-slate-100 px-4 lg:px-6 h-16 flex items-center gap-4 flex-shrink-0 shadow-sm">
          {/* Mobile menu toggle */}
          <IconButton
            className="lg:hidden"
            onClick={() => setMobileOpen(true)}
            sx={{ display: { lg: 'none' } }}
          >
            <MenuIcon />
          </IconButton>

          {/* Search */}
          <div className="flex-1 max-w-md">
            <div className="relative flex items-center">
              <Search sx={{ fontSize: 18, color: '#94a3b8', position: 'absolute', left: 10 }} />
              <input
                type="text"
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                placeholder="Search students, teachers, records..."
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-transparent transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 ml-auto">
            {/* Notifications */}
            <Tooltip title="Notifications">
              <IconButton onClick={(e) => setNotifAnchor(e.currentTarget)} size="small">
                <Badge badgeContent={unreadCount} color="error" max={9}>
                  <Notifications sx={{ fontSize: 20, color: '#64748b' }} />
                </Badge>
              </IconButton>
            </Tooltip>

            {/* Profile */}
            <div
              className="flex items-center gap-2.5 cursor-pointer hover:bg-slate-50 rounded-xl px-2 py-1.5 transition-colors"
              onClick={(e) => setAnchorEl(e.currentTarget)}
            >
              <Avatar sx={{ width: 32, height: 32, bgcolor: '#4f46e5', fontSize: 13, fontWeight: 700 }}>
                {user?.name?.charAt(0) || 'A'}
              </Avatar>
              <div className="hidden sm:block">
                <p className="text-sm font-semibold text-slate-800 leading-tight">{user?.name}</p>
                <p className="text-xs text-slate-400">{user?.role}</p>
              </div>
              <KeyboardArrowDown sx={{ fontSize: 16, color: '#94a3b8' }} />
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <Outlet />
        </main>
      </div>

      {/* Notification Menu */}
      <Menu
        anchorEl={notifAnchor}
        open={Boolean(notifAnchor)}
        onClose={() => setNotifAnchor(null)}
        PaperProps={{ sx: { width: 340, borderRadius: 2, mt: 1 } }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <div className="px-4 py-3 border-b border-slate-100">
          <p className="font-heading font-600 text-slate-900 text-sm">Notifications</p>
          <p className="text-xs text-slate-400">{unreadCount} unread</p>
        </div>
        {notifications.map((n) => (
          <MenuItem key={n.id} onClick={() => setNotifAnchor(null)}
            sx={{ py: 1.5, px: 2, borderLeft: n.unread ? '3px solid #4f46e5' : '3px solid transparent' }}>
            <div className="w-full">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-slate-800">{n.title}</p>
                <span className="text-xs text-slate-400">{n.time}</span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">{n.desc}</p>
            </div>
          </MenuItem>
        ))}
        <div className="px-4 py-2.5 border-t border-slate-100">
          <button className="text-xs text-primary-600 font-semibold hover:text-primary-700 w-full text-center">
            View all notifications
          </button>
        </div>
      </Menu>

      {/* Profile Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        PaperProps={{ sx: { width: 200, borderRadius: 2, mt: 1 } }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <div className="px-3 py-2.5">
          <p className="font-semibold text-sm text-slate-900">{user?.name}</p>
          <p className="text-xs text-slate-400">{user?.email}</p>
        </div>
        <Divider />
        <MenuItem onClick={() => { setAnchorEl(null); navigate('/settings'); }}>
          <Person sx={{ fontSize: 17, mr: 1.5, color: '#64748b' }} />
          <span className="text-sm">Profile</span>
        </MenuItem>
        <MenuItem onClick={() => { setAnchorEl(null); navigate('/settings'); }}>
          <Settings sx={{ fontSize: 17, mr: 1.5, color: '#64748b' }} />
          <span className="text-sm">Settings</span>
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => { setAnchorEl(null); logout(); }} sx={{ color: '#ef4444' }}>
          <Logout sx={{ fontSize: 17, mr: 1.5 }} />
          <span className="text-sm">Sign out</span>
        </MenuItem>
      </Menu>
    </div>
  );
}
