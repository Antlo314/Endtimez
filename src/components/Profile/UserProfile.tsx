import { useState, useEffect } from 'react';
import { Upload, Crown, Music } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export default function UserProfile({ user, profile, onProfileUpdate }: { user: any, profile: any, onProfileUpdate: (id: string) => void }) {
  const [bio, setBio] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (profile?.bio) {
      setBio(profile.bio);
    }
  }, [profile]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const handleSaveBio = async () => {
    if (!profile) return;
    setSaving(true);
    await supabase.from('profiles').update({ bio }).eq('id', profile.id);
    onProfileUpdate(profile.id);
    setSaving(false);
  };

  if (!profile) return <div className="page-container"><h2>Seeking coordinates...</h2></div>;

  return (
    <div className="page-container">
      <h2 className="glitch" data-text="Your Coordinates">Your Coordinates</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem', marginTop: '1rem' }}>
        
        {/* Avatar and Info Panel */}
        <div className="glass-panel" style={{ textAlign: 'center', padding: '2rem' }}>
          <div style={{ position: 'relative', width: '150px', height: '150px', margin: '0 auto 1.5rem', borderRadius: '50%', overflow: 'hidden', border: '3px solid var(--color-gold-radiant)' }}>
            <img src={profile.avatar_url || '/assets/images/avatar_mock.png'} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'rgba(0,0,0,0.6)', padding: '5px', cursor: 'pointer' }}>
              <Upload size={16} />
            </div>
          </div>
          <h3 style={{ color: 'var(--color-parchment)', fontSize: '1.5rem' }}>{profile.username || 'Unnamed Soul'}</h3>
          
          {profile.role === 'admin' && (
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255, 204, 0, 0.15)', color: 'var(--color-gold-radiant)', padding: '5px 15px', borderRadius: '20px', marginTop: '10px', fontSize: '0.85rem', border: '1px solid var(--color-gold-radiant)' }}>
              <Crown size={14}/> God Mode Active
            </div>
          )}

          <div style={{ marginTop: '2.5rem' }}>
            <button className="btn btn-secondary" style={{ width: '100%', marginBottom: '1rem', borderColor: 'var(--color-earth)' }}>Change Appearance</button>
            <button onClick={handleLogout} className="btn" style={{ width: '100%', background: 'transparent', border: '1px solid rgba(255,0,0,0.3)', color: '#ffaaaa' }}>Depart Sanctum</button>
          </div>
        </div>

        {/* Details & Economy Stats Panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div className="glass-panel" style={{ padding: '2rem' }}>
            <h3 style={{ borderBottom: '1px solid var(--color-earth)', paddingBottom: '10px', marginBottom: '15px', color: 'var(--color-sand)' }}>Spiritual Biography</h3>
            <textarea 
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Record your journey..."
              style={{ width: '100%', minHeight: '100px', background: 'rgba(0,0,0,0.8)', border: '1px solid var(--color-earth)', borderRadius: '8px', color: 'var(--color-gold-radiant)', padding: '15px', fontFamily: 'inherit', resize: 'vertical' }}
            />
            <div style={{ textAlign: 'right', marginTop: '10px' }}>
              <button onClick={handleSaveBio} disabled={saving} className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
                {saving ? 'Inscribing...' : 'Seal Biography'}
              </button>
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '2rem' }}>
            <h3 style={{ borderBottom: '1px solid var(--color-earth)', paddingBottom: '10px', marginBottom: '15px', color: 'var(--color-sand)' }}>The Treasury (Your Support)</h3>
            <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
              <div style={{ textAlign: 'center', padding: '15px', background: 'rgba(0,0,0,0.6)', borderRadius: '12px', flex: 1, border: '1px solid var(--color-earth)' }}>
                <Music size={32} style={{ color: 'var(--color-bronze)', margin: '0 auto 10px' }} />
                <h4 style={{ color: 'var(--color-gold-radiant)' }}>0</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Sacred Harmonies Owned</p>
              </div>
              <div style={{ textAlign: 'center', padding: '15px', background: 'rgba(0,0,0,0.6)', borderRadius: '12px', flex: 1, border: '1px solid var(--color-earth)' }}>
                <h4 style={{ color: 'var(--color-gold-radiant)', fontSize: '2.5rem', marginTop: '5px' }}>${profile.total_support || '0.00'}</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Total Economy Sustained</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
