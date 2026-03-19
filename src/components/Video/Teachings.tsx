import { PlayCircle, Lock, BookOpen } from 'lucide-react';

export default function Teachings({ user }: { user: any, profile?: any }) {
  const videos = [
    { id: 1, title: 'The True Sabbaths & Feasts', duration: '45:20', locked: false, thumbnail: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=600&auto=format&fit=crop' },
    { id: 2, title: 'Book of Enoch: The Watchers', duration: '1:12:05', locked: false, thumbnail: 'https://images.unsplash.com/photo-1519074069444-1ba4fff66d16?q=80&w=600&auto=format&fit=crop' },
    { id: 3, title: 'Mysteries of the Ethereal Realm', duration: '58:10', locked: true, thumbnail: 'https://images.unsplash.com/photo-1473172084534-73895eadd23b?q=80&w=600&auto=format&fit=crop' },
    { id: 4, title: 'Decoding the Firmament', duration: '1:30:45', locked: true, thumbnail: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?q=80&w=600&auto=format&fit=crop' },
  ];

  return (
    <div className="page-container fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h2 className="glitch" data-text="Esoteric Teachings">Esoteric Teachings</h2>
      </div>
      
      <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', marginBottom: '2rem', maxWidth: '800px' }}>
        A vault of ancient wisdom. Break down time according to the Book of Enoch and explore truths hidden from the masses. Support the creator to unlock premium teachings.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
        {videos.map(video => (
          <div key={video.id} className="glass-panel" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{ position: 'relative', height: '180px' }}>
              <img src={video.thumbnail} alt={video.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(to top, var(--color-obsidian), transparent)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {video.locked && (!user || user.role !== 'admin') ? (
                  <div style={{ background: 'rgba(0,0,0,0.6)', padding: '15px', borderRadius: '50%', color: 'var(--color-bronze)' }}>
                    <Lock size={40} />
                  </div>
                ) : (
                  <div style={{ background: 'rgba(230, 184, 0, 0.4)', padding: '15px', borderRadius: '50%', color: 'var(--color-gold-radiant)', cursor: 'pointer', transition: 'var(--transition-smooth)' }} className="play-btn">
                    <PlayCircle size={40} />
                  </div>
                )}
              </div>
              <span style={{ position: 'absolute', bottom: '10px', right: '10px', background: 'rgba(0,0,0,0.8)', padding: '2px 8px', borderRadius: '4px', fontSize: '0.8rem', color: 'var(--color-parchment)' }}>
                {video.duration}
              </span>
            </div>
            
            <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ fontSize: '1.2rem', color: 'var(--color-parchment)', marginBottom: '0.5rem' }}>{video.title}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem', flex: 1 }}>
                Deep dive into the prophetic timeline and scriptural mysteries.
              </p>
              
              {video.locked && (!user || user.role !== 'admin') ? (
                <button className="btn btn-primary" style={{ width: '100%', fontSize: '0.9rem', padding: '0.6rem' }}>
                  <BookOpen size={16} /> Unlock Premium ($5.99)
                </button>
              ) : (
                <button className="btn btn-secondary" style={{ width: '100%', fontSize: '0.9rem', padding: '0.6rem' }}>
                  <PlayCircle size={16} /> Watch Now
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
