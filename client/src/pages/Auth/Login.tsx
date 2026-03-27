export function Login() {
    const apiBaseUrl = import.meta.env.VITE_API_URL;

  const handleGoogleLogin = () => {
    window.location.href = `${apiBaseUrl}/auth/google`;
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