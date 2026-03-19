import { useState } from 'react';
import { Send, Paperclip, Hash, Users, Crown } from 'lucide-react';

export default function Chat() {
  const [messages, setMessages] = useState([
    { id: 1, user: 'Darak iBar', text: 'Welcome to the inner sanctum. The true calendar begins soon.', time: '10:00 AM' },
    { id: 2, user: 'Seeker7', text: 'Peace and blessings. Just got the new MIDNIGHT album.', time: '10:15 AM' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages([...messages, { id: Date.now(), user: 'You', text: input, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
    setInput('');
  };

  return (
    <div className="page-container fade-in" style={{ height: 'calc(100vh - 120px)', display: 'flex', flexDirection: 'column' }}>
      <h2 className="glitch" data-text="Community Sanctum" style={{ marginBottom: '1rem' }}>Community Sanctum</h2>
      
      <div className="glass-panel" style={{ flex: 1, display: 'flex', gap: '1.5rem', padding: '1.5rem', overflow: 'hidden' }}>
        
        {/* Sidebar Channels */}
        <div style={{ width: '250px', borderRight: '1px solid var(--color-earth)', paddingRight: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h4 style={{ color: 'var(--color-bronze)' }}>Channels</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <button style={channelBtnStyle}><Hash size={16}/> general</button>
            <button style={{ ...channelBtnStyle, background: 'rgba(255, 204, 0, 0.1)', color: 'var(--color-gold-radiant)' }}><Hash size={16}/> enochian-time</button>
            <button style={channelBtnStyle}><Hash size={16}/> music-discussion</button>
          </div>
          
          <h4 style={{ color: 'var(--color-bronze)', marginTop: '2rem' }}>Online</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              <div style={{ width: '8px', height: '8px', background: '#00ff00', borderRadius: '50%' }}></div> Darak iBar <Crown size={12} color="var(--color-gold-radiant)"/>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              <div style={{ width: '8px', height: '8px', background: '#00ff00', borderRadius: '50%' }}></div> Seeker7
            </div>
          </div>
        </div>

        {/* Chat Area */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <div style={{ borderBottom: '1px solid var(--color-earth)', paddingBottom: '1rem', marginBottom: '1rem' }}>
            <h3 style={{ margin: 0 }}>#enochian-time</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>Discussion of the true calendar and seasons.</p>
          </div>
          
          <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem', paddingRight: '1rem' }}>
            {messages.map((msg) => (
              <div key={msg.id} style={{ display: 'flex', gap: '1rem' }}>
                <div style={{ width: '40px', height: '40px', background: 'var(--color-earth)', borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Users size={20} color="var(--color-sand)" />
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
                    <span style={{ fontWeight: 'bold', color: msg.user === 'Darak iBar' ? 'var(--color-gold-radiant)' : 'var(--color-parchment)' }}>{msg.user}</span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{msg.time}</span>
                  </div>
                  <p style={{ color: 'var(--text-primary)', marginTop: '0.25rem' }}>{msg.text}</p>
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSend} style={{ marginTop: '1rem', display: 'flex', gap: '1rem', alignItems: 'center', background: 'rgba(0,0,0,0.5)', padding: '0.5rem', borderRadius: '8px', border: '1px solid var(--color-earth)' }}>
            <button type="button" style={{ background: 'transparent', border: 'none', color: 'var(--color-bronze)', cursor: 'pointer', padding: '0.5rem' }}>
              <Paperclip size={20} />
            </button>
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Message #enochian-time..." 
              style={{ flex: 1, background: 'transparent', border: 'none', color: 'var(--text-primary)', outline: 'none', fontSize: '1rem' }}
            />
            <button type="submit" style={{ background: 'transparent', border: 'none', color: 'var(--color-gold-radiant)', cursor: 'pointer', padding: '0.5rem' }}>
              <Send size={20} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

const channelBtnStyle = {
  background: 'transparent',
  border: 'none',
  color: 'var(--text-secondary)',
  textAlign: 'left' as const,
  padding: '0.5rem',
  borderRadius: '4px',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  fontSize: '1rem',
  transition: 'var(--transition-smooth)'
};
