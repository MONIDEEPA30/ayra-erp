import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { Home } from '@mui/icons-material';

export default function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="text-center animate-fadeInUp">
        <p className="font-heading text-8xl font-800 text-primary-100 select-none">404</p>
        <h1 className="font-heading text-2xl font-700 text-slate-900 -mt-4">Page not found</h1>
        <p className="text-slate-500 text-sm mt-2 mb-6">The page you're looking for doesn't exist or has been moved.</p>
        <Button variant="contained" startIcon={<Home />} onClick={() => navigate('/dashboard')}>
          Go to Dashboard
        </Button>
      </div>
    </div>
  );
}
