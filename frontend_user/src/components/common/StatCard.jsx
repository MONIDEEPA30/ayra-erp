import { TrendingUp, TrendingDown } from '@mui/icons-material';

export default function StatCard({ label, value, sub, change, up, icon: Icon, color, bg }) {
  return (
    <div className="stat-card">
      <div className="flex items-start justify-between mb-4">
        {Icon && (
          <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ backgroundColor: bg }}>
            <Icon sx={{ fontSize: 22, color }} />
          </div>
        )}
        {change && (
          <div className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${up ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>
            {up ? <TrendingUp sx={{ fontSize: 13 }} /> : <TrendingDown sx={{ fontSize: 13 }} />}
            {change}
          </div>
        )}
      </div>
      <p className="font-heading text-2xl font-700 text-slate-900">{value}</p>
      <p className="text-slate-600 text-sm font-medium mt-0.5">{label}</p>
      {sub && <p className="text-slate-400 text-xs mt-1">{sub}</p>}
    </div>
  );
}
