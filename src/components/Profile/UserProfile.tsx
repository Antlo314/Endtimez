import { useState, useEffect } from 'react';
import { Upload, Crown, Music, Megaphone, Calendar as CalendarIcon, ArrowRight } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export default function UserProfile({ profile, onProfileUpdate }: { user: any, profile: any, onProfileUpdate: (id: string) => void }) {
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

  if (!profile) return <div className="page-container" style={{textAlign:'center'}}><h2 style={{color:'var(--gold)'}}>Seeking coordinates...</h2></div>;

  return (
    <div className="page-container fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem', width: '100%', marginTop: '2rem' }}>
        <h2 className="glitch" data-text="The Sanctum">The Sanctum</h2>
        {profile.role === 'admin' && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255, 204, 0, 0.15)', color: 'var(--color-gold-radiant)', padding: '5px 15px', borderRadius: '20px', border: '1px solid var(--color-gold-radiant)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
            <Crown size={14}/> God Mode Active
          </div>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '2rem', width: '100%' }}>
        
        {/* LEFT COLUMN: Sanctum Bulletin & Premium Updates */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          <div className="glass-panel" style={{ padding: '2.5rem', borderTop: '3px solid var(--gold)' }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--gold)', marginBottom: '2rem', borderBottom: '1px solid rgba(212, 175, 55, 0.2)', paddingBottom: '1rem', textTransform: 'uppercase', letterSpacing: '3px' }}>
              <Megaphone size={24} /> Sanctum Bulletin
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {/* Update Item 1 */}
              <div style={{ borderLeft: '3px solid var(--gold)', paddingLeft: '1.5rem', position: 'relative' }}>
                <div style={{ position: 'absolute', left: '-5px', top: '2px', width: '7px', height: '7px', borderRadius: '50%', background: 'var(--color-gold-radiant)', boxShadow: '0 0 10px var(--color-gold-radiant)'}}></div>
                <span style={{ fontSize: '0.8rem', color: 'var(--color-bronze)', fontWeight: 600, letterSpacing: '1px' }}>LATEST UPDATE</span>
                <h4 style={{ color: 'var(--text-color)', fontSize: '1.2rem', marginTop: '0.5rem', marginBottom: '0.5rem', fontFamily: 'var(--font-heading)' }}>The Vault is Open</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                  DarakiBar's YouTube compilation is now freely accessible in the Vault. Premium exclusive content is currently in production—stay alert for the first drop. Gather your coordinates and prepare.
                </p>
              </div>
              
              {/* Update Item 2 */}
              <div style={{ borderLeft: '3px solid var(--glass-border)', paddingLeft: '1.5rem', opacity: 0.7 }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600, letterSpacing: '1px' }}>SYSTEM LOG</span>
                <h4 style={{ color: 'var(--color-sand)', fontSize: '1.1rem', marginTop: '0.5rem', marginBottom: '0.5rem', fontFamily: 'var(--font-heading)' }}>New UI Alignment</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                  The Endtimez Music aesthetic has successfully synchronized with the true frequency. Navigation arrays have been recalibrated.
                </p>
              </div>
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '2rem', background: 'linear-gradient(135deg, rgba(10,10,9,0.95), rgba(212,175,55,0.08))', border: '1px solid var(--gold)' }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-color)', marginBottom: '1rem', fontFamily: 'var(--font-heading)' }}>
              <Crown size={24} color="var(--gold)" /> Premium Content Roadmap
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              Upcoming exclusive drops reserved for faithful supporters of the treasury.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--color-parchment)', fontSize: '0.95rem' }}><CalendarIcon size={18} color="rgba(255,255,255,0.4)" /> <span style={{ color: 'var(--gold)', minWidth: '80px', fontWeight: 600 }}>SOON</span> Origin of the Nephilim Series</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--color-parchment)', fontSize: '0.95rem' }}><CalendarIcon size={18} color="rgba(255,255,255,0.4)" /> <span style={{ color: 'var(--gold)', minWidth: '80px', fontWeight: 600 }}>TBA</span> Classified Transmission 02</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'rgba(255,255,255,0.5)', fontSize: '0.95rem' }}><CalendarIcon size={18} color="rgba(255,255,255,0.2)" /> <span style={{ color: 'rgba(212,175,55,0.5)', minWidth: '80px', fontWeight: 600 }}>TBA</span> Vault Archives Volume 3</li>
            </ul>
          </div>
        </div>

        {/* RIGHT COLUMN: Player ID & Stats */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          {/* Identity Card */}
          <div className="glass-panel" style={{ textAlign: 'center', padding: '2.5rem 2rem', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100px', background: 'linear-gradient(to bottom, rgba(212,175,55,0.15), transparent)' }}></div>
            
            <div style={{ position: 'relative', width: '130px', height: '130px', margin: '0 auto 1.5rem', borderRadius: '50%', overflow: 'hidden', border: '3px solid var(--gold)', background: 'var(--color-obsidian)', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
              <img src={profile.avatar_url || '/assets/images/avatar_mock.png'} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'rgba(0,0,0,0.7)', padding: '6px', cursor: 'pointer', display: 'flex', justifyContent: 'center' }}>
                <Upload size={16} color="var(--color-sand)" />
              </div>
            </div>
            
            <h3 style={{ color: 'var(--color-parchment)', fontSize: '1.6rem', marginBottom: '0.3rem', fontFamily: 'var(--font-heading)' }}>{profile.username || 'Unnamed Soul'}</h3>
            <p style={{ color: 'var(--gold)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '2rem' }}>
              {profile.role === 'admin' ? 'Master Architect' : 'Sanctum Member'}
            </p>

            <div style={{ textAlign: 'left', marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>Spiritual Biography</label>
              <textarea 
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Record your spiritual journey..."
                style={{ width: '100%', minHeight: '90px', background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '4px', color: 'var(--color-parchment)', padding: '12px', fontFamily: 'inherit', resize: 'none', fontSize: '0.9rem', transition: 'border 0.3s ease' }}
                onFocus={(e) => e.target.style.borderColor = 'var(--gold)'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
              />
            </div>
            
            <button onClick={handleSaveBio} disabled={saving} className="btn gold-btn" style={{ width: '100%', padding: '0.8rem', fontSize: '0.9rem' }}>
              {saving ? 'Inscribing...' : 'Update Records'}
            </button>
          </div>

          {/* Treasury Stats */}
          <div className="glass-panel" style={{ padding: '2rem' }}>
            <h4 style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1.5rem' }}>Economy Sustained</h4>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '1.5rem', marginBottom: '1.5rem' }}>
              <div>
                <span style={{ color: 'var(--color-sand)', fontSize: '0.8rem', display: 'block', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Total Contribution</span>
                <span style={{ color: 'var(--gold)', fontSize: '2.5rem', fontWeight: 600, lineHeight: 1, fontFamily: 'var(--font-heading)' }}>${profile.total_support || '0.00'}</span>
              </div>
              <button className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.8rem', borderColor: 'var(--color-bronze)' }}>Add Funds</button>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <div style={{ padding: '10px', background: 'rgba(212,175,55,0.1)', borderRadius: '8px', border: '1px solid rgba(212,175,55,0.2)' }}>
                  <Music size={20} color="var(--gold)" />
                </div>
                <div>
                  <span style={{ color: 'var(--color-sand)', fontSize: '0.8rem', display: 'block', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '2px' }}>Harmonies Owned</span>
                  <span style={{ color: 'var(--color-parchment)', fontSize: '1.2rem', fontWeight: 600 }}>0</span>
                </div>
              </div>
              <ArrowRight size={18} color="var(--text-secondary)" style={{ cursor: 'pointer', transition: 'color 0.3s ease' }} onMouseOver={(e) => e.currentTarget.style.color = 'var(--gold)'} onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-secondary)'} />
            </div>
          </div>

          <button onClick={handleLogout} className="btn" style={{ width: '100%', background: 'rgba(255,0,0,0.05)', border: '1px solid rgba(255,0,0,0.2)', color: '#ffaaaa', padding: '1rem', fontSize: '0.9rem', letterSpacing: '2px' }}>DEPART SANCTUM</button>
        </div>

      </div>
    </div>
  );
}
