import { useState } from 'react';
import { Upload, FileText, Megaphone, CalendarPlus } from 'lucide-react';

export default function GodMode({ user }: { user: any, profile?: any }) {
  const [bulletin, setBulletin] = useState('New album "MIDNIGHT" is out now. The true calendar begins next month.');

  if (!user || user.role !== 'admin') {
    return (
      <div className="page-container" style={{ textAlign: 'center', marginTop: '4rem' }}>
        <h2 style={{ color: 'red' }}>ACCESS DENIED</h2>
        <p>You do not have God Mode clearance.</p>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <h2 className="glitch" data-text="God Mode Controls" style={{ fontSize: '2.5rem' }}>God Mode Controls</h2>
        <span style={{ background: 'var(--color-gold-radiant)', color: 'var(--color-obsidian)', padding: '5px 15px', borderRadius: '20px', fontWeight: 'bold' }}>
          LIVE
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
        
        {/* Global Bulletin Panel */}
        <div className="glass-panel" style={{ borderTop: '4px solid var(--color-gold-radiant)' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}><Megaphone size={24}/> Global Bulletin</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1rem' }}>
            Broadcast decrees to all users on the platform.
          </p>
          <textarea 
            value={bulletin}
            onChange={(e) => setBulletin(e.target.value)}
            style={{ 
              width: '100%', minHeight: '120px', background: 'rgba(0,0,0,0.6)', 
              border: '1px solid var(--color-earth)', borderRadius: '8px', 
              color: 'var(--color-gold-radiant)', padding: '15px', 
              fontFamily: 'inherit', resize: 'vertical', fontSize: '1.1rem'
            }}
          />
          <button className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>Push Decree</button>
        </div>

        {/* Media Control Panel */}
        <div className="glass-panel" style={{ borderTop: '4px solid var(--color-bronze)' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}><Upload size={24}/> Holy Assets Management</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1rem' }}>
            Replace global images or upload new Teachings (Videos).
          </p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ background: 'rgba(255, 204, 0, 0.05)', border: '1px dashed var(--color-gold-radiant)', padding: '1.5rem', textAlign: 'center', borderRadius: '8px', cursor: 'pointer', transition: 'var(--transition-smooth)' }}>
              <FileText size={32} style={{ color: 'var(--color-gold-radiant)', marginBottom: '10px' }} />
              <p>Upload New Cover Art</p>
            </div>
            <div style={{ background: 'rgba(255, 204, 0, 0.05)', border: '1px dashed var(--color-gold-radiant)', padding: '1.5rem', textAlign: 'center', borderRadius: '8px', cursor: 'pointer', transition: 'var(--transition-smooth)' }}>
              <Upload size={32} style={{ color: 'var(--color-gold-radiant)', marginBottom: '10px' }} />
              <p>Upload Esoteric Video (Enochian Teachings)</p>
            </div>
          </div>
        </div>

        {/* Calendar Injection */}
        <div className="glass-panel" style={{ borderTop: '4px solid var(--color-copper)' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}><CalendarPlus size={24}/> Time Alteration (Calendar)</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1rem' }}>
            Inject notifications, links, or media into specific days on the True Calendar.
          </p>
          
          <input type="date" style={{ width: '100%', padding: '10px', background: 'black', border: '1px solid var(--color-earth)', color: 'var(--color-parchment)', marginBottom: '1rem', borderRadius: '8px' }} />
          <input type="text" placeholder="Event Title" style={{ width: '100%', padding: '10px', background: 'rgba(10,10,9,0.8)', border: '1px solid var(--color-earth)', color: 'var(--text-primary)', marginBottom: '1rem', borderRadius: '8px' }} />
          <textarea placeholder="Event Details or Media Link" style={{ width: '100%', minHeight: '80px', background: 'rgba(10,10,9,0.8)', border: '1px solid var(--color-earth)', color: 'var(--text-primary)', padding: '10px', borderRadius: '8px', marginBottom: '1rem' }} />
          <button className="btn btn-secondary" style={{ width: '100%' }}>Inject into Calendar</button>
        </div>

      </div>
    </div>
  );
}
