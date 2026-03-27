export function Login() {
  const handleGoogleLogin = () => {
    // Redireciona para o seu servidor Node
    window.location.href = 'http://localhost:3001/auth/google';
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
   
      <button 
        onClick={handleGoogleLogin}
        style={{ padding: '12px 24px', fontSize: '16px', cursor: 'pointer' }}
      >
        Entrar com Google
      </button>
    </div>
  );
}