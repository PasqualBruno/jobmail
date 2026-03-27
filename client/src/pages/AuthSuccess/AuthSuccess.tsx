import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export function AuthSuccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get('token');

    if (token) {
      localStorage.setItem('@jobmail:token', token);
      navigate('/profile');
    } else {
      navigate('/');
    }
  }, [searchParams, navigate]);

  return <div>Autenticando e salvando token...</div>;
}