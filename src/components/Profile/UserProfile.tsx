import { useState } from 'react';
import { Upload, Crown, Music } from 'lucide-react';

export default function UserProfile({ user, onLogout }: { user: any, onLogout: () => void }) {
  const [bio, setBio] = useState('Seeker of truth and true time. Supporter of the Endtimez economy.');

  if (!user) return <div className="page-container"><h2>Please log in to view your profile.</h2></div>;

  return (
    <div className="page-container">
      <h2 className="glitch" data-text="Your Profile">Your Profile</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem', marginTop: '1rem' }}>
        
        {/* Avatar and Info Panel */}
        <div className="glass-panel" style={{ textAlign: 'center' }}>
          <div style={{ position: 'relative', width: '150px', height: '150px', margin: '0 auto 1.5rem', borderRadius: '50%', overflow: 'hidden', border: '3px solid var(--color-gold-radiant)' }}>
            <img src={user.avatar} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'rgba(0,0,0,0.6)', padding: '5px' }}>
              <Upload size={16} />
            </div>
          </div>
          <h3 style={{ color: 'var(--color-parchment)' }}>{user.name}</h3>
          
          {user.role === 'admin' && (
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255, 204, 0, 0.1)', color: 'var(--color-gold-radiant)', padding: '5px 15px', borderRadius: '20px', marginTop: '10px', fontSize: '0.85rem' }}>
              <Crown size={14}/> God Mode Active
            </div>
          )}

          <div style={{ marginTop: '2rem' }}>
            <button className="btn btn-secondary" style={{ width: '100%', marginBottom: '1rem' }}>Edit Avatar</button>
            <button onClick={onLogout} className="btn" style={{ width: '100%', background: 'transparent', border: '1px solid var(--color-earth)', color: 'var(--text-secondary)' }}>Log Out</button>
          </div>
        </div>

        {/* Details & Economy Stats Panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div className="glass-panel">
            <h3 style={{ borderBottom: '1px solid var(--color-earth)', paddingBottom: '10px', marginBottom: '15px' }}>Spiritual Bio</h3>
            <textarea 
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              style={{ width: '100%', minHeight: '100px', background: 'rgba(10,10,9,0.5)', border: '1px solid var(--color-earth)', borderRadius: '8px', color: 'var(--text-secondary)', padding: '15px', fontFamily: 'inherit', resize: 'vertical' }}
            />
            <div style={{ textAlign: 'right', marginTop: '10px' }}>
              <button className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>Save Bio</button>
            </div>
          </div>

          <div className="glass-panel">
            <h3 style={{ borderBottom: '1px solid var(--color-earth)', paddingBottom: '10px', marginBottom: '15px' }}>Library & Support</h3>
            <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
              <div style={{ textAlign: 'center', padding: '15px', background: 'rgba(0,0,0,0.4)', borderRadius: '12px', flex: 1 }}>
                <Music size={32} style={{ color: 'var(--color-bronze)', marginBottom: '10px' }} />
                <h4 style={{ color: 'var(--color-gold-radiant)' }}>12</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Songs Owned</p>
              </div>
              <div style={{ textAlign: 'center', padding: '15px', background: 'rgba(0,0,0,0.4)', borderRadius: '12px', flex: 1 }}>
                <h4 style={{ color: 'var(--color-gold-radiant)', fontSize: '2rem', marginTop: '10px' }}>$142</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Total Economy Support</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
