import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/authContext';

export default function OAuthRedirect() {
  const [searchParams] = useSearchParams();
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get('token');
    if (token) {
      login(token);
      navigate('/events', { replace: true });
    } else {
      navigate('/auth?error=oauth_failed', { replace: true });
    }
  }, [searchParams, login, navigate]);

  return <p>Signing you in...</p>;
}