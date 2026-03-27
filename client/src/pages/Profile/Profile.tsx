import { useEffect, useState } from 'react';
import type { IUser } from '../../types/auth.interfaces';


export function Profile() {

  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('@jobmail:token');

    fetch('http://localhost:3001/auth/me', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(res => res.json())
    .then((data: IUser) => {
      setUser(data);
    })
    .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Carregando...</div>;


  return (
    <div>
      <h1>Bem-vindo, {user?.name ?? 'Usuário'}</h1>
      {user?.avatarUrl && <img src={user.avatarUrl} alt="Foto de perfil" />}
      <p>ID: {user?.id}</p>
      <button onClick={() => {
        localStorage.removeItem('@jobmail:token')
        window.location.href = '/';
      }}>Sair</button>
    </div>
  );
}