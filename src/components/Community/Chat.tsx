import { useState, useEffect, useRef } from 'react';
import { Send, Paperclip, Hash, Users, Crown } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export default function Chat({ user, profile }: { user: any, profile: any }) {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState('');
  const [activeChannel, setActiveChannel] = useState('enochian-time');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const fetchMessages = async () => {
    const { data } = await supabase
      .from('messages')
      .select('*, profiles(username, role)')
      .eq('channel', activeChannel)
      .order('created_at', { ascending: true });
    
    if (data) setMessages(data);
  };

  useEffect(() => {
    fetchMessages();

    // Subscribe to new messages
    const subscription = supabase
      .channel('public:messages')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, payload => {
        if (payload.new.channel === activeChannel) {
           fetchMessages();
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [activeChannel]);

  useEffect(() => {
    // Scroll to bottom
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !user) return;
    
    await supabase.from('messages').insert([
      { channel: activeChannel, user_id: user.id, message: input }
    ]);
    
    setInput('');
  };

  const formatTime = (isoString: string) => {
    return new Date(isoString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="page-container fade-in" style={{ height: 'calc(100vh - 120px)', display: 'flex', flexDirection: 'column' }}>
      <h2 className="glitch" data-text="The Codex" style={{ marginBottom: '1rem' }}>The Codex</h2>
      
      <div className="glass-panel" style={{ flex: 1, display: 'flex', gap: '1.5rem', padding: '1.5rem', overflow: 'hidden' }}>
        
        {/* Sidebar Channels */}
        <div style={{ width: '250px', borderRight: '1px solid var(--color-earth)', paddingRight: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h4 style={{ color: 'var(--color-bronze)' }}>Channels</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <button onClick={() => setActiveChannel('general')} style={{ ...channelBtnStyle, color: activeChannel === 'general' ? 'var(--color-gold-radiant)' : 'var(--text-secondary)', background: activeChannel === 'general' ? 'rgba(255, 204, 0, 0.1)' : 'transparent' }}><Hash size={16}/> general</button>
            <button onClick={() => setActiveChannel('enochian-time')} style={{ ...channelBtnStyle, color: activeChannel === 'enochian-time' ? 'var(--color-gold-radiant)' : 'var(--text-secondary)', background: activeChannel === 'enochian-time' ? 'rgba(255, 204, 0, 0.1)' : 'transparent' }}><Hash size={16}/> enochian-time</button>
            <button onClick={() => setActiveChannel('music-discussion')} style={{ ...channelBtnStyle, color: activeChannel === 'music-discussion' ? 'var(--color-gold-radiant)' : 'var(--text-secondary)', background: activeChannel === 'music-discussion' ? 'rgba(255, 204, 0, 0.1)' : 'transparent' }}><Hash size={16}/> music-discussion</button>
          </div>
          
          <h4 style={{ color: 'var(--color-bronze)', marginTop: '2rem' }}>Online</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {profile && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                <div style={{ width: '8px', height: '8px', background: '#00ff00', borderRadius: '50%' }}></div> You ({profile.username})
              </div>
            )}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              <div style={{ width: '8px', height: '8px', background: '#00ff00', borderRadius: '50%' }}></div> Darak iBar <Crown size={12} color="var(--color-gold-radiant)"/>
            </div>
          </div>
        </div>

        {/* Chat Area */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <div style={{ borderBottom: '1px solid var(--color-earth)', paddingBottom: '1rem', marginBottom: '1rem' }}>
            <h3 style={{ margin: 0, color: 'var(--color-gold-radiant)' }}>#{activeChannel}</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>Discussion and revelation regarding #{activeChannel}.</p>
          </div>
          
          <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1.5rem', paddingRight: '1rem' }}>
            {messages.length === 0 ? (
              <div style={{ textAlign: 'center', color: 'var(--text-secondary)', marginTop: '2rem' }}>The silence is deafening... Speak your truth.</div>
            ) : null}
            {messages.map((msg) => {
              const username = msg.profiles?.username || 'Unknown Soul';
              const isAdmin = msg.profiles?.role === 'admin';
              
              return (
                 <div key={msg.id} style={{ display: 'flex', gap: '1rem' }}>
                  <div style={{ width: '40px', height: '40px', background: isAdmin ? 'var(--color-bronze)' : 'var(--color-earth)', borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Users size={20} color="var(--color-obsidian)" />
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
                      <span style={{ fontWeight: 'bold', color: isAdmin ? 'var(--color-gold-radiant)' : 'var(--color-parchment)' }}>
                        {username} {isAdmin && <Crown size={12} style={{ display: 'inline', marginLeft: '4px' }}/>}
                      </span>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{formatTime(msg.created_at)}</span>
                    </div>
                    <p style={{ color: 'var(--text-primary)', marginTop: '0.25rem', lineHeight: '1.5' }}>{msg.message}</p>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSend} style={{ marginTop: '1rem', display: 'flex', gap: '1rem', alignItems: 'center', background: 'rgba(0,0,0,0.8)', padding: '0.5rem 1rem', borderRadius: '12px', border: '1px solid var(--color-gold-radiant)' }}>
            <button type="button" style={{ background: 'transparent', border: 'none', color: 'var(--color-bronze)', cursor: 'pointer', padding: '0.5rem' }}>
              <Paperclip size={20} />
            </button>
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={`Contribute to #${activeChannel}...`}
              style={{ flex: 1, background: 'transparent', border: 'none', color: 'var(--color-gold-radiant)', outline: 'none', fontSize: '1.05rem', fontFamily: 'var(--font-ui)' }}
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
  textAlign: 'left' as const,
  padding: '0.6rem 1rem',
  borderRadius: '8px',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  fontSize: '1rem',
  transition: 'all 0.2s ease',
  fontFamily: 'var(--font-ui)'
};
