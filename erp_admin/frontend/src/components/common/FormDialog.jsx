import { Alert, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

export default function FormDialog({
  open,
  onClose,
  title,
  subtitle,
  error,
  children,
  maxWidth = 'sm',
  primaryLabel = 'Save',
  secondaryLabel = 'Cancel',
  onPrimary,
  primaryDisabled = false,
  loading = false,
}) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={maxWidth}
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 4,
          overflow: 'hidden',
          backgroundImage: 'none',
          boxShadow: '0 24px 60px rgba(15, 23, 42, 0.18)',
          border: '1px solid rgba(148, 163, 184, 0.18)',
        },
      }}
    >
      <DialogTitle sx={{ px: 3.5, py: 3, borderBottom: '1px solid #e2e8f0', background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)' }}>
        <div>
          <h2 className="font-heading text-xl font-700 text-slate-900">{title}</h2>
          {subtitle && <p className="text-sm text-slate-500 mt-1.5 max-w-xl leading-6">{subtitle}</p>}
        </div>
      </DialogTitle>

      <DialogContent sx={{ px: 3.5, py: 3.5, bgcolor: '#f8fafc' }}>
        {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}
        <div
          className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-6"
          style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.8)' }}
        >
          {children}
        </div>
      </DialogContent>

      <DialogActions sx={{ px: 3.5, py: 2.5, borderTop: '1px solid #e2e8f0', bgcolor: '#ffffff', gap: 1.25 }}>
        <Button onClick={onClose} sx={{ color: '#64748b' }}>
          {secondaryLabel}
        </Button>
        <Button variant="contained" onClick={onPrimary} disabled={primaryDisabled}>
          {loading ? <CircularProgress size={18} color="inherit" /> : primaryLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
