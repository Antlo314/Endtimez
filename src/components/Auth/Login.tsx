import { useState } from 'react';
import { User, Lock, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Login({ onLogin }: { onLogin: (user: any) => void }) {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login
    onLogin({ name: 'Darak iBar', role: 'admin', avatar: '/assets/images/avatar_mock.png' });
    navigate('/');
  };

  return (
    <div className="page-container" style={{ alignItems: 'center', justifyContent: 'center', minHeight: '70vh' }}>
      <div className="glass-panel" style={{ width: '100%', maxWidth: '450px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>
          {isLogin ? 'Enter the Sanctum' : 'Join the Community'}
        </h2>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {!isLogin && (
            <div style={{ position: 'relative' }}>
              <User size={20} style={{ position: 'absolute', top: '12px', left: '15px', color: 'var(--color-bronze)' }} />
              <input 
                type="text" 
                placeholder="Spiritual Name" 
                required 
                style={inputStyle} 
              />
            </div>
          )}
          
          <div style={{ position: 'relative' }}>
            <Mail size={20} style={{ position: 'absolute', top: '12px', left: '15px', color: 'var(--color-bronze)' }} />
            <input 
              type="email" 
              placeholder="Email Address" 
              required 
              style={inputStyle} 
            />
          </div>
          
          <div style={{ position: 'relative' }}>
            <Lock size={20} style={{ position: 'absolute', top: '12px', left: '15px', color: 'var(--color-bronze)' }} />
            <input 
              type="password" 
              placeholder="Password" 
              required 
              style={inputStyle} 
            />
          </div>
          
          <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem', width: '100%' }}>
            {isLogin ? 'Initiate' : 'Register'}
          </button>
        </form>
        
        <p style={{ textAlign: 'center', marginTop: '2rem', color: 'var(--text-secondary)' }}>
          {isLogin ? "Don't have an account? " : "Already initiated? "}
          <button 
            onClick={() => setIsLogin(!isLogin)} 
            style={{ background: 'none', border: 'none', color: 'var(--color-gold-radiant)', cursor: 'pointer', fontFamily: 'inherit', fontSize: '1rem' }}
          >
            {isLogin ? 'Sign Up' : 'Log In'}
          </button>
        </p>
      </div>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '12px 15px 12px 45px',
  background: 'rgba(10, 10, 9, 0.6)',
  border: '1px solid var(--color-earth)',
  borderRadius: '8px',
  color: 'var(--text-primary)',
  fontFamily: 'var(--font-ui)',
  fontSize: '1rem',
  outline: 'none',
  transition: 'var(--transition-smooth)'
};
