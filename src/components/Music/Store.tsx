import { useState, useEffect } from 'react';
import { Play, Pause, ShoppingCart, Disc, Music as MusicIcon } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export default function Store() {
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [albums, setAlbums] = useState<any[]>([]);
  const [singles, setSingles] = useState<any[]>([]);
  const [, setLoading] = useState(true);
  
  const [showAllAlbums, setShowAllAlbums] = useState(false);
  const [showAllSingles, setShowAllSingles] = useState(false);

  useEffect(() => {
    const fetchCatalog = async () => {
      const { data } = await supabase.from('music_catalog').select('*').order('created_at', { ascending: false });
      
      const hardcodedAlbums = [
        { id: 'a1', title: 'MIDNIGHT', type: 'Album', price: 14.99, cover_url: '/assets/images/midnight_cover.png', is_new: true },
        { id: 'a2', title: 'THE AWAKENING', type: 'Album', price: 14.99, cover_url: '/assets/images/midnight_cover.png', is_new: false }
      ];

      const hardcodedSingles = [
        { id: 's1', title: 'Wrath of the Most High', duration: '3:45', price: 1.99 },
        { id: 's2', title: 'Enochian Days', duration: '4:12', price: 1.99 },
        { id: 's3', title: 'Pillars of Earth', duration: '2:58', price: 1.99 },
        { id: 's4', title: 'Golden Alter', duration: '5:01', price: 1.99 },
      ];

      if (data && data.length > 0) {
        setAlbums(data.filter(item => item.type === 'Album'));
        setSingles(data.filter(item => item.type === 'Single'));
      } else {
        // Fallback to mock data for presentation
        setAlbums(hardcodedAlbums);
        setSingles(hardcodedSingles);
      }
      setLoading(false);
    };

    fetchCatalog();
  }, []);

  return (
    <div className="page-container fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 className="glitch" data-text="Holy Music Catalog">Holy Music Catalog</h2>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <span style={{ color: 'var(--color-sand)' }}>Support the Economy</span>
          <button className="btn btn-secondary" style={{ padding: '0.5rem 1rem' }}>
            <ShoppingCart size={18} /> Cart (0)
          </button>
        </div>
      </div>

      {/* Hero Album - MIDNIGHT */}
      <div className="glass-panel hero-album" style={{ display: 'flex', gap: '3rem', marginTop: '2rem', alignItems: 'center', padding: '3rem' }}>
        <img src="/assets/images/midnight_cover.png" alt="Midnight Cover" style={{ width: '300px', height: '300px', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.6)', border: '2px solid var(--color-gold-radiant)' }} />
        <div>
          <span style={{ background: 'var(--color-gold-radiant)', color: 'var(--color-obsidian)', padding: '5px 10px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '1rem', display: 'inline-block' }}>New Arrival</span>
          <h1 style={{ fontSize: '4rem', margin: '0', lineHeight: 1 }}>MIDNIGHT</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', margin: '1rem 0 2rem' }}>The definitive soundtrack to the Endtimes.</p>
          
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button className="btn btn-primary"><Disc size={20} /> Pre-order / Buy Album ($14.99)</button>
            <button className="btn btn-secondary"><Play size={20} /> Preview All Snippets</button>
          </div>
        </div>
      </div>

      <div className="store-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 2fr', gap: '3rem', marginTop: '2rem' }}>
        
        {/* Albums Collection */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--color-earth)', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0 }}>
              <Disc size={24} color="var(--color-bronze)" /> Complete Works
            </h3>
            <button onClick={() => setShowAllAlbums(!showAllAlbums)} className="btn btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}>{showAllAlbums ? 'Collapse' : 'Show All'}</button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {(showAllAlbums ? albums : albums.slice(0, 3)).map(album => (
              <div key={album.id} style={{ display: 'flex', gap: '1rem', alignItems: 'center', background: 'rgba(0,0,0,0.6)', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(255,204,0,0.2)', cursor: 'pointer', transition: 'var(--transition-smooth)' }} className="album-card">
                <img src={album.cover_url || '/assets/images/midnight_cover.png'} alt={album.title} style={{ width: '80px', height: '80px', borderRadius: '8px', border: '1px solid var(--color-earth)' }} />
                <div style={{ flex: 1 }}>
                  <h4 style={{ color: 'var(--color-parchment)', fontSize: '1.2rem' }}>{album.title}</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{album.type} • ${Number(album.price).toFixed(2)}</p>
                </div>
                <button className="btn btn-secondary" style={{ padding: '0.5rem' }}><ShoppingCart size={18}/></button>
              </div>
            ))}
          </div>
        </div>

        {/* Singles & Snippets */}
        <div className="glass-panel" style={{ padding: '2.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--color-earth)', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0 }}>
              <MusicIcon size={24} color="var(--color-bronze)" /> Singles & Snippets
            </h3>
            <button onClick={() => setShowAllSingles(!showAllSingles)} className="btn btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}>{showAllSingles ? 'Collapse' : 'Show All'}</button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {(showAllSingles ? singles : singles.slice(0, 4)).map((song, i) => (
              <div key={song.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', borderBottom: '1px solid var(--color-earth)', transition: 'background 0.2s' }} className="track-row">
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1 }}>
                  <span style={{ color: 'var(--text-secondary)', width: '20px' }}>{i + 1}</span>
                  <button 
                    onClick={() => setPlayingId(playingId === song.id ? null : song.id)}
                    style={{ background: 'transparent', color: 'var(--color-gold-radiant)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', borderRadius: '50%', border: '1px solid var(--color-gold-radiant)' }}
                  >
                    {playingId === song.id ? <Pause size={14} /> : <Play size={14} style={{ marginLeft: '2px' }} />}
                  </button>
                  <span style={{ color: 'var(--text-primary)', fontWeight: playingId === song.id ? 'bold' : 'normal' }}>{song.title}</span>
                </div>
                <div style={{ color: 'var(--text-secondary)', width: '60px', textAlign: 'right', paddingRight: '1rem' }}>{song.duration || '0:00'}</div>
                <button className="btn btn-secondary" style={{ padding: '0.4rem 1rem', fontSize: '0.85rem' }}>${Number(song.price).toFixed(2)}</button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
