import { useEffect, useState } from 'react';
import type { IUser } from '../../../types/auth.interfaces';

export function Profile() {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);


  const [emailRecipient, setEmailRecipient] = useState('');
  const [jobName, setJobName] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [feedback, setFeedback] = useState('');

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

  const handleSendTestEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setFeedback('');

    const token = localStorage.getItem('@jobmail:token');

    try {
      const response = await fetch('http://localhost:3001/mail/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ 
          to: emailRecipient, 
          jobName: jobName 
        })
      });

      const data = await response.json();

      if (response.ok) {
        setFeedback('✅ E-mail enviado! Verifique sua caixa de "Enviados".');
        setEmailRecipient('');
        setJobName('');
      } else {
        setFeedback(`❌ Erro: ${data.error || 'Falha no envio'}`);
      }
    } catch (err) {
      setFeedback('❌ Erro crítico na requisição.');
    } finally {
      setIsSending(false);
    }
  };

  if (loading) return <div>Carregando...</div>;

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <section style={{ marginBottom: '40px', borderBottom: '1px solid #eee', pb: '20px' }}>
        <h1>Bem-vindo, {user?.name ?? 'Usuário'}</h1>
        {user?.avatarUrl && (
          <img 
            src={user.avatarUrl} 
            alt="Foto de perfil" 
            style={{ width: '80px', borderRadius: '50%' }} 
          />
        )}
        <p><strong>ID:</strong> {user?.id}</p>
        <p><strong>Email:</strong> {user?.email}</p>
        <button onClick={() => {
          localStorage.removeItem('@jobmail:token');
          window.location.href = '/';
        }}>Sair</button>
      </section>

      <section style={{ backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '8px' }}>
        <h2>🧪 Testar Envio de E-mail (Gmail API)</h2>
        <form onSubmit={handleSendTestEmail} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '400px' }}>
          <input 
            type="email" 
            placeholder="E-mail do destinatário" 
            value={emailRecipient}
            onChange={(e) => setEmailRecipient(e.target.value)}
            required
            style={{ padding: '8px' }}
          />
          <input 
            type="text" 
            placeholder="Nome da vaga (ex: Dev React)" 
            value={jobName}
            onChange={(e) => setJobName(e.target.value)}
            required
            style={{ padding: '8px' }}
          />
          <button type="submit" disabled={isSending}>
            {isSending ? 'Enviando...' : 'Disparar E-mail'}
          </button>
        </form>
        {feedback && <p style={{ marginTop: '10px', fontWeight: 'bold' }}>{feedback}</p>}
      </section>
    </div>
  );
}