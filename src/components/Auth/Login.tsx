import { useState } from 'react';
import { User, Lock, Mail, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [spiritualName, setSpiritualName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate('/profile');
      } else {
        // Sign Up
        const { data: authData, error: authError } = await supabase.auth.signUp({ email, password });
        if (authError) throw authError;

        if (authData.user) {
          // Creating profile
          const { error: profileError } = await supabase.from('profiles').insert([
            { id: authData.user.id, username: spiritualName, avatar_url: '/assets/images/avatar_mock.png' }
          ]);
          if (profileError) throw profileError;
        }
        
        navigate('/profile');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred during spiritual alignment.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container" style={{ alignItems: 'center', justifyContent: 'center', minHeight: '70vh' }}>
      <div className="glass-panel" style={{ width: '100%', maxWidth: '450px', padding: '3rem' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: 'var(--color-parchment)' }}>
          {isLogin ? 'Ascend to the Sanctum' : 'Join the True Assembly'}
        </h2>

        {error && (
          <div style={{ background: 'rgba(255,0,0,0.1)', border: '1px solid red', padding: '10px', borderRadius: '8px', color: '#ffaaaa', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <AlertCircle size={16}/> {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {!isLogin && (
            <div style={{ position: 'relative' }}>
              <User size={20} style={{ position: 'absolute', top: '12px', left: '15px', color: 'var(--color-bronze)' }} />
              <input 
                type="text" 
                placeholder="Spiritual Name / Moniker" 
                required 
                value={spiritualName}
                onChange={e => setSpiritualName(e.target.value)}
                style={inputStyle} 
              />
            </div>
          )}
          
          <div style={{ position: 'relative' }}>
            <Mail size={20} style={{ position: 'absolute', top: '12px', left: '15px', color: 'var(--color-bronze)' }} />
            <input 
              type="email" 
              placeholder="Email Transmisson" 
              required 
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={inputStyle} 
            />
          </div>
          
          <div style={{ position: 'relative' }}>
            <Lock size={20} style={{ position: 'absolute', top: '12px', left: '15px', color: 'var(--color-bronze)' }} />
            <input 
              type="password" 
              placeholder="Secret Cipher" 
              required 
              value={password}
              onChange={e => setPassword(e.target.value)}
              style={inputStyle} 
              minLength={6}
            />
          </div>
          
          <button type="submit" disabled={loading} className="btn btn-primary" style={{ marginTop: '1rem', width: '100%', opacity: loading ? 0.7 : 1 }}>
            {loading ? 'Communing...' : (isLogin ? 'Initiate' : 'Establish Covenant')}
          </button>
        </form>
        
        <p style={{ textAlign: 'center', marginTop: '2rem', color: 'var(--text-secondary)' }}>
          {isLogin ? "Not yet recorded in the ledgers? " : "Already established? "}
          <button 
            onClick={() => { setIsLogin(!isLogin); setError(null); }} 
            style={{ background: 'none', border: 'none', color: 'var(--color-gold-radiant)', cursor: 'pointer', fontFamily: 'inherit', fontSize: '1rem', textDecoration: 'underline' }}
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
  background: 'rgba(5, 5, 4, 0.8)',
  border: '1px solid var(--color-earth)',
  borderRadius: '8px',
  color: 'var(--color-gold-radiant)',
  fontFamily: 'var(--font-ui)',
  fontSize: '1rem',
  outline: 'none',
  transition: 'var(--transition-smooth)'
};
