import { useState } from 'react';
import { Upload, Megaphone, CalendarPlus, CheckCircle, AlertCircle } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export default function GodMode({ user, profile }: { user: any, profile?: any }) {
  // Bulletin
  const [bTitle, setBTitle] = useState('');
  const [bContent, setBContent] = useState('');
  const [bLoading, setBLoading] = useState(false);
  const [bMsg, setBMsg] = useState('');

  // Vault Video
  const [vTitle, setVTitle] = useState('');
  const [vId, setVId] = useState('');
  const [vCategory, setVCategory] = useState('premium');
  const [vLoading, setVLoading] = useState(false);
  const [vMsg, setVMsg] = useState('');

  // Calendar Event
  const [cDate, setCDate] = useState('');
  const [cTitle, setCTitle] = useState('');
  const [cDesc, setCDesc] = useState('');
  const [cLoading, setCLoading] = useState(false);
  const [cMsg, setCMsg] = useState('');

  // Roadmap
  const [rTitle, setRTitle] = useState('');
  const [rStatus, setRStatus] = useState('tba');
  const [rLoading, setRLoading] = useState(false);
  const [rMsg, setRMsg] = useState('');

  // Channel
  const [chName, setChName] = useState('');
  const [chDesc, setChDesc] = useState('');
  const [chLoading, setChLoading] = useState(false);
  const [chMsg, setChMsg] = useState('');

  if (!user || profile?.role !== 'admin') {
    return (
      <div className="page-container" style={{ textAlign: 'center', marginTop: '4rem' }}>
        <h2 style={{ color: 'var(--red)' }}>ACCESS DENIED</h2>
        <p>You do not have The Prophet's Watch clearance.</p>
      </div>
    );
  }

  const handlePushBulletin = async () => {
    setBLoading(true); setBMsg('');
    const { error } = await supabase.from('app_bulletin').insert([{ title: bTitle || 'SYSTEM UPDATE', content: bContent }]);
    if (error) setBMsg('Error: ' + error.message);
    else { setBMsg('Decree successfully broadcast.'); setBTitle(''); setBContent(''); }
    setBLoading(false);
  };

  const handlePushVideo = async () => {
    setVLoading(true); setVMsg('');
    const { error } = await supabase.from('app_videos').insert([{ title: vTitle, youtube_id: vId, category: vCategory }]);
    if (error) setVMsg('Error: ' + error.message);
    else { setVMsg('Holy Asset injected into Vault.'); setVTitle(''); setVId(''); }
    setVLoading(false);
  };

  const handlePushCalendar = async () => {
    setCLoading(true); setCMsg('');
    const { error } = await supabase.from('calendar_events').insert([{ event_date: cDate, title: cTitle, description: cDesc }]);
    if (error) setCMsg('Error: ' + error.message);
    else { setCMsg('Epoch properly overloaded.'); setCDate(''); setCTitle(''); setCDesc(''); }
    setCLoading(false);
  };

  const handlePushRoadmap = async () => {
    setRLoading(true); setRMsg('');
    const { error } = await supabase.from('app_roadmap').insert([{ title: rTitle, status: rStatus }]);
    if (error) setRMsg('Error: ' + error.message);
    else { setRMsg('Roadmap updated successfully.'); setRTitle(''); }
    setRLoading(false);
  };

  const handlePushChannel = async () => {
    setChLoading(true); setChMsg('');
    const { error } = await supabase.from('app_channels').insert([{ name: chName, description: chDesc }]);
    if (error) setChMsg('Error: ' + error.message);
    else { setChMsg('Channel established successfully.'); setChName(''); setChDesc(''); }
    setChLoading(false);
  };

  return (
    <div className="page-container fade-in">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <h2 className="glitch" data-text="The Prophet's Watch" style={{ fontSize: '2.5rem' }}>The Prophet's Watch</h2>
        <span style={{ background: 'var(--color-gold-radiant)', color: 'var(--color-obsidian)', padding: '5px 15px', borderRadius: '20px', fontWeight: 'bold' }}>LIVE</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
        
        {/* Global Bulletin Panel */}
        <div className="glass-panel" style={{ borderTop: '4px solid var(--color-gold-radiant)' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}><Megaphone size={24}/> Global Bulletin</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1rem' }}>Broadcast decrees to all users on the platform.</p>
          
          <input 
            type="text" placeholder="Decree Title (Optional)" 
            value={bTitle} onChange={e => setBTitle(e.target.value)}
            style={{ width: '100%', padding: '10px', background: 'rgba(0,0,0,0.6)', border: '1px solid var(--color-earth)', color: 'var(--color-gold-radiant)', marginBottom: '1rem', borderRadius: '8px' }}
          />

          <textarea 
            placeholder="Record your decree..."
            value={bContent} onChange={(e) => setBContent(e.target.value)}
            style={{ width: '100%', minHeight: '120px', background: 'rgba(0,0,0,0.6)', border: '1px solid var(--color-earth)', borderRadius: '8px', color: 'var(--color-parchment)', padding: '15px', fontFamily: 'inherit', resize: 'vertical', fontSize: '1.1rem' }}
          />
          {bMsg && <p style={{ color: bMsg.includes('Error') ? '#ffaaaa' : 'var(--color-gold-radiant)', fontSize: '0.9rem', marginTop: '0.5rem' }}>{bMsg.includes('Error') ? <AlertCircle size={14}/> : <CheckCircle size={14}/>} {bMsg}</p>}
          <button onClick={handlePushBulletin} disabled={bLoading || !bContent} className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
            {bLoading ? 'Pushing...' : 'Push Decree'}
          </button>
        </div>

        {/* Media Control Panel */}
        <div className="glass-panel" style={{ borderTop: '4px solid var(--color-bronze)' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}><Upload size={24}/> Vault Injection (Videos)</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1rem' }}>Add new YouTube manifestations into the Vault directly.</p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <input 
              type="text" placeholder="Video Title" required
              value={vTitle} onChange={e => setVTitle(e.target.value)}
              style={{ width: '100%', padding: '10px', background: 'rgba(0,0,0,0.6)', border: '1px solid var(--color-earth)', color: 'var(--color-gold-radiant)', borderRadius: '8px' }}
            />
            <input 
              type="text" placeholder="YouTube Video ID (ex: dQw4w9WgXcQ)" required
              value={vId} onChange={e => setVId(e.target.value)}
              style={{ width: '100%', padding: '10px', background: 'rgba(0,0,0,0.6)', border: '1px solid var(--color-earth)', color: 'var(--color-parchment)', borderRadius: '8px' }}
            />
            <select 
              value={vCategory} onChange={e => setVCategory(e.target.value)}
              style={{ width: '100%', padding: '10px', background: 'rgba(0,0,0,0.6)', border: '1px solid var(--color-earth)', color: 'var(--color-parchment)', borderRadius: '8px' }}>
              <option value="premium">Premium Drop</option>
              <option value="recent">Latest Prophetic Release (Free)</option>
              <option value="popular">Most Viewed (Free)</option>
            </select>

            {vMsg && <p style={{ color: vMsg.includes('Error') ? '#ffaaaa' : 'var(--color-gold-radiant)', fontSize: '0.9rem' }}>{vMsg.includes('Error') ? <AlertCircle size={14}/> : <CheckCircle size={14}/>} {vMsg}</p>}
            
            <button onClick={handlePushVideo} disabled={vLoading || !vTitle || !vId} className="btn" style={{ background: 'rgba(255, 204, 0, 0.15)', border: '1px solid var(--color-gold-radiant)', color: 'var(--color-gold-radiant)', width: '100%' }}>
              {vLoading ? 'Injecting...' : 'Inject into Vault'}
            </button>
          </div>
        </div>

        {/* Epoch Overload Panel */}
        <div className="glass-panel" style={{ borderTop: '4px solid var(--color-copper)' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}><CalendarPlus size={24}/> Epoch Overload (Calendar)</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1rem' }}>Inject notifications into the True Calendar.</p>
          
          <input type="date" value={cDate} onChange={e => setCDate(e.target.value)} required style={{ width: '100%', padding: '10px', background: 'rgba(0,0,0,0.6)', border: '1px solid var(--color-earth)', color: 'var(--color-parchment)', marginBottom: '1rem', borderRadius: '8px' }} />
          <input type="text" placeholder="Event Title" value={cTitle} onChange={e => setCTitle(e.target.value)} required style={{ width: '100%', padding: '10px', background: 'rgba(0,0,0,0.6)', border: '1px solid var(--color-earth)', color: 'var(--text-primary)', marginBottom: '1rem', borderRadius: '8px' }} />
          <textarea placeholder="Event Description..." value={cDesc} onChange={e => setCDesc(e.target.value)} required style={{ width: '100%', minHeight: '80px', background: 'rgba(0,0,0,0.6)', border: '1px solid var(--color-earth)', borderRadius: '8px', color: 'var(--color-parchment)', padding: '15px', fontFamily: 'inherit', resize: 'vertical', marginBottom: '1rem' }} />
          
          {cMsg && <p style={{ color: cMsg.includes('Error') ? '#ffaaaa' : 'var(--color-gold-radiant)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>{cMsg.includes('Error') ? <AlertCircle size={14}/> : <CheckCircle size={14}/>} {cMsg}</p>}
          <button onClick={handlePushCalendar} disabled={cLoading || !cDate || !cTitle} className="btn btn-secondary" style={{ width: '100%' }}>
            {cLoading ? 'Injecting...' : 'Engage Event'}
          </button>
        </div>

        {/* Premium Roadmap Panel */}
        <div className="glass-panel" style={{ borderTop: '4px solid var(--color-brass)' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}><Megaphone size={24}/> Premium Roadmap Override</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1rem' }}>Configure upcoming Treasury content drops.</p>
          
          <input type="text" placeholder="Drop Title" value={rTitle} onChange={e => setRTitle(e.target.value)} required style={{ width: '100%', padding: '10px', background: 'rgba(0,0,0,0.6)', border: '1px solid var(--color-earth)', color: 'var(--text-primary)', marginBottom: '1rem', borderRadius: '8px' }} />
          <select value={rStatus} onChange={e => setRStatus(e.target.value)} style={{ width: '100%', padding: '10px', background: 'rgba(0,0,0,0.6)', border: '1px solid var(--color-earth)', color: 'var(--color-parchment)', marginBottom: '1rem', borderRadius: '8px', cursor: 'pointer' }}>
            <option value="soon">SOON</option>
            <option value="tba">TBA</option>
            <option value="live">LIVE</option>
            <option value="planned">PLANNED</option>
          </select>
          
          {rMsg && <p style={{ color: rMsg.includes('Error') ? '#ffaaaa' : 'var(--color-gold-radiant)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>{rMsg}</p>}
          <button onClick={handlePushRoadmap} disabled={rLoading || !rTitle} className="btn btn-secondary" style={{ width: '100%' }}>
            {rLoading ? 'Injecting...' : 'Add to Roadmap'}
          </button>
        </div>

        {/* Codex Channel Panel */}
        <div className="glass-panel" style={{ borderTop: '4px solid var(--gold)' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}><Upload size={24}/> Codex Frequency Channels</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1rem' }}>Establish new communication arrays in the Codex.</p>
          
          <input type="text" placeholder="Channel Name (e.g. general)" value={chName} onChange={e => setChName(e.target.value)} required style={{ width: '100%', padding: '10px', background: 'rgba(0,0,0,0.6)', border: '1px solid var(--color-earth)', color: 'var(--text-primary)', marginBottom: '1rem', borderRadius: '8px' }} />
          <textarea placeholder="Channel Purpose..." value={chDesc} onChange={e => setChDesc(e.target.value)} style={{ width: '100%', minHeight: '60px', background: 'rgba(0,0,0,0.6)', border: '1px solid var(--color-earth)', borderRadius: '8px', color: 'var(--color-parchment)', padding: '15px', fontFamily: 'inherit', resize: 'vertical', marginBottom: '1rem' }} />
          
          {chMsg && <p style={{ color: chMsg.includes('Error') ? '#ffaaaa' : 'var(--color-gold-radiant)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>{chMsg}</p>}
          <button onClick={handlePushChannel} disabled={chLoading || !chName} className="btn btn-secondary" style={{ width: '100%' }}>
            {chLoading ? 'Establishing...' : 'Create Frequency'}
          </button>
        </div>

      </div>
    </div>
  );
}
