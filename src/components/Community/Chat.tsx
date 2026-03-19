import { useState, useEffect, useRef } from 'react';
import { Send, Paperclip, Hash, User, Crown, Image } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export default function Chat({ user, profile }: { user: any, profile: any }) {
  const [messages, setMessages] = useState<any[]>([]);
  const [channels, setChannels] = useState<any[]>([]);
  const [onlineUsers, setOnlineUsers] = useState<any[]>([]);
  const [input, setInput] = useState('');
  const [mediaUrl, setMediaUrl] = useState('');
  const [showMediaInput, setShowMediaInput] = useState(false);
  const [activeChannel, setActiveChannel] = useState('general');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Fetch bindings shifted inside effect

  useEffect(() => {
    supabase.from('app_channels').select('*').order('created_at', { ascending: true })
      .then(({ data }) => {
        if (data && data.length > 0) {
           setChannels(data);
           if (!data.find(c => c.name === activeChannel)) {
             setActiveChannel(data[0].name);
           }
        }
      });
  }, []);

  useEffect(() => {
    if (!profile || !user) return;
    
    const room = supabase.channel('codex_presence', {
      config: { presence: { key: user.id } }
    });
    
    room.on('presence', { event: 'sync' }, () => {
      const state = room.presenceState();
      const users = Object.values(state).flat() as any[];
      
      // Deduplicate by userId
      const uniqueUsers = Array.from(new Map(users.map(u => [u.userId, u])).values());
      setOnlineUsers(uniqueUsers);
    }).subscribe(async (status) => {
      if (status === 'SUBSCRIBED') {
         await room.track({
           userId: user.id,
           username: profile.username || 'Unnamed Soul',
           role: profile.role || 'user'
         });
      }
    });
    
    return () => {
       supabase.removeChannel(room);
    }
  }, [profile, user]);

  const fetchMessages = async () => {
    const { data, error } = await supabase
      .from('messages')
      .select('*, profiles(username, role, avatar_url)')
      .eq('channel', activeChannel)
      .order('created_at', { ascending: true });
    
    if (error) console.error("Codex Error:", error);
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
    if ((!input.trim() && !mediaUrl.trim()) || !user) return;
    
    const { error } = await supabase.from('messages').insert([
      { channel: activeChannel, user_id: user.id, message: input, media_url: mediaUrl || null }
    ]);
    
    if (error) {
       alert("Codex Transmission Failed: " + error.message);
    } else {
       setInput('');
       setMediaUrl('');
       setShowMediaInput(false);
       fetchMessages();
    }
  };

  const formatTime = (isoString: string) => {
    return new Date(isoString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="page-container fade-in" style={{ height: 'calc(100vh - 120px)', display: 'flex', flexDirection: 'column', position: 'relative', isolation: 'isolate' }}>
      {/* Cinematic UFO Atmospheric Loop */}
      <video autoPlay loop muted playsInline style={{ 
        position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', 
        objectFit: 'contain', zIndex: -1, opacity: 0.55, pointerEvents: 'none', borderRadius: '12px',
        mixBlendMode: 'screen',
        WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 80%)',
        maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 80%)'
      }}>
        <source src="/assets/videos/end_ufo.mp4" type="video/mp4" />
      </video>
      
      <h2 className="glitch" data-text="The Codex" style={{ marginBottom: '1rem', position: 'relative', zIndex: 1 }}>The Codex</h2>
      
      <div className="glass-panel codex-container" style={{ flex: 1, display: 'flex', gap: '1.5rem', padding: '1.5rem', overflow: 'hidden', position: 'relative', zIndex: 1, background: 'rgba(10, 8, 5, 0.75)' }}>
        
        {/* Sidebar Channels */}
        <div className="codex-sidebar" style={{ width: '250px', borderRight: '1px solid var(--color-earth)', paddingRight: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h4 style={{ color: 'var(--color-bronze)' }}>Channels</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {channels.length > 0 ? channels.map(c => (
              <button key={c.id} onClick={() => setActiveChannel(c.name)} style={{ ...channelBtnStyle, color: activeChannel === c.name ? 'var(--color-gold-radiant)' : 'var(--text-secondary)', background: activeChannel === c.name ? 'rgba(255, 204, 0, 0.1)' : 'transparent' }}>
                <Hash size={16}/> {c.name}
              </button>
            )) : (
              <button onClick={() => setActiveChannel('general')} style={{ ...channelBtnStyle, color: activeChannel === 'general' ? 'var(--color-gold-radiant)' : 'var(--text-secondary)', background: activeChannel === 'general' ? 'rgba(255, 204, 0, 0.1)' : 'transparent' }}>
                 <Hash size={16}/> general
              </button>
            )}
          </div>
          
          <h4 style={{ color: 'var(--color-bronze)', marginTop: '2rem' }}>Online</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
             {onlineUsers.map(u => (
               <div key={u.userId} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: u.userId === user?.id ? 'var(--color-gold-radiant)' : 'var(--color-parchment)', fontSize: '0.9rem' }}>
                 <div style={{ width: '8px', height: '8px', background: '#00ff00', borderRadius: '50%', boxShadow: '0 0 5px #00ff00' }}></div> 
                 {u.username} 
                 {u.userId === user?.id && <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>(You)</span>}
                 {u.role === 'admin' && <Crown size={12} color="var(--color-gold-radiant)"/>}
               </div>
             ))}
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
                  {/* Avatar */}
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', background: isAdmin ? 'var(--color-bronze)' : 'var(--color-earth)', border: isAdmin ? '2px solid var(--color-gold-radiant)' : 'none' }}>
                    {msg.profiles?.avatar_url ? (
                      <img src={msg.profiles.avatar_url} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <User size={20} color={isAdmin ? 'var(--bg-color)' : 'var(--color-parchment)'} />
                    )}
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
                      <span style={{ fontWeight: 'bold', color: isAdmin ? 'var(--color-gold-radiant)' : 'var(--color-parchment)' }}>
                        {username} {isAdmin && <Crown size={12} style={{ display: 'inline', marginLeft: '4px' }}/>}
                      </span>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{formatTime(msg.created_at)}</span>
                    </div>
                    {msg.message && <p style={{ color: 'var(--text-primary)', marginTop: '0.25rem', lineHeight: '1.5' }}>{msg.message}</p>}
                    {msg.media_url && (
                      <div style={{ marginTop: '0.8rem', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--color-earth)', maxWidth: '300px' }}>
                        <img src={msg.media_url} alt="Transmission media" style={{ width: '100%', height: 'auto', display: 'block' }} />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          <div style={{ marginTop: '1rem', background: 'rgba(0,0,0,0.8)', borderRadius: '12px', border: '1px solid var(--color-gold-radiant)', overflow: 'hidden' }}>
            {showMediaInput && (
               <div style={{ padding: '0.5rem 1rem', background: 'rgba(20,20,18,0.9)', borderBottom: '1px solid var(--color-earth)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Image size={16} color="var(--color-bronze)" />
                  <input type="url" value={mediaUrl} onChange={e => setMediaUrl(e.target.value)} placeholder="https://... (Attach Image URL)" style={{ flex: 1, background: 'transparent', border: 'none', color: 'var(--color-parchment)', outline: 'none', fontSize: '0.9rem' }} />
               </div>
            )}
            <form onSubmit={handleSend} style={{ display: 'flex', gap: '1rem', alignItems: 'center', padding: '0.5rem 1rem' }}>
              <button type="button" onClick={() => setShowMediaInput(!showMediaInput)} style={{ background: 'transparent', border: 'none', color: showMediaInput ? 'var(--color-gold-radiant)' : 'var(--color-bronze)', cursor: 'pointer', padding: '0.5rem' }}>
                <Paperclip size={20} />
              </button>
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={`Contribute to #${activeChannel}...`}
                style={{ flex: 1, background: 'transparent', border: 'none', color: 'var(--color-gold-radiant)', outline: 'none', fontSize: '1.05rem', fontFamily: 'var(--font-ui)' }}
              />
              <button type="submit" disabled={(!input.trim() && !mediaUrl.trim())} style={{ background: 'transparent', border: 'none', color: (!input.trim() && !mediaUrl.trim()) ? 'var(--color-earth)' : 'var(--color-gold-radiant)', cursor: (!input.trim() && !mediaUrl.trim()) ? 'not-allowed' : 'pointer', padding: '0.5rem' }}>
                <Send size={20} />
              </button>
            </form>
          </div>
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
