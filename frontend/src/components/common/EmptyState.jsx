import { InboxOutlined } from '@mui/icons-material';

export default function EmptyState({ icon: Icon = InboxOutlined, title = 'No data found', description, action }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mb-4">
        <Icon sx={{ fontSize: 32, color: '#94a3b8' }} />
      </div>
      <p className="font-heading font-600 text-slate-700 text-base">{title}</p>
      {description && <p className="text-slate-400 text-sm mt-1 max-w-xs">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
