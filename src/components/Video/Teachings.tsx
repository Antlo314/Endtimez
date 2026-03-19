import { useState, useEffect } from 'react';
import { PlayCircle, Lock, Crown, TrendingUp, Clock } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export default function Teachings({ user }: { user: any, profile?: any }) {
  const [dynRecent, setDynRecent] = useState<any[]>([]);
  const [dynPopular, setDynPopular] = useState<any[]>([]);
  const [dynPremium, setDynPremium] = useState<any[]>([]);
  
  const [showAllPopular, setShowAllPopular] = useState(false);
  const [showAllRecent, setShowAllRecent] = useState(false);
  const [showAllStudy, setShowAllStudy] = useState(false);

  useEffect(() => {
    supabase.from('app_videos').select('*').order('created_at', { ascending: false })
      .then(({ data }) => {
        if (data) {
          const mapVideo = (v: any) => ({
            id: v.id, title: v.title, views: v.views + ' views', 
            link: `https://www.youtube.com/watch?v=${v.youtube_id}`, 
            thumbnail: `https://img.youtube.com/vi/${v.youtube_id}/mqdefault.jpg`,
            locked: v.category === 'premium'
          });
          setDynRecent(data.filter(v => v.category === 'recent').map(mapVideo));
          setDynPopular(data.filter(v => v.category === 'popular').map(mapVideo));
          setDynPremium(data.filter(v => v.category === 'premium').map(mapVideo));
        }
      });
  }, []);

  const freeVideos = [
    { id: 1, title: 'The True Sabbaths & Feasts', duration: '45:20', locked: false, link: '#', thumbnail: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=600&auto=format&fit=crop' },
    { id: 2, title: 'Book of Enoch: The Watchers', duration: '1:12:05', locked: false, link: '#', thumbnail: 'https://images.unsplash.com/photo-1519074069444-1ba4fff66d16?q=80&w=600&auto=format&fit=crop' },
  ];

  const recentReleases = [
    { id: 11, title: 'Praise Ahba 2', views: '59K views', link: 'https://www.youtube.com/watch?v=RlRE_UT-Bxc', thumbnail: 'https://img.youtube.com/vi/RlRE_UT-Bxc/mqdefault.jpg' },
    { id: 12, title: 'Road To Purim', views: '12K views', link: 'https://www.youtube.com/watch?v=cHVuDPg23Aw', thumbnail: 'https://img.youtube.com/vi/cHVuDPg23Aw/mqdefault.jpg' },
    { id: 13, title: 'Qam (Prod. By Bandit Luce)', views: '9.4K views', link: 'https://www.youtube.com/watch?v=CUQMhi41EYI', thumbnail: 'https://img.youtube.com/vi/CUQMhi41EYI/mqdefault.jpg' },
    { id: 14, title: 'Last Dayz 2027', views: '6.3K views', link: 'https://www.youtube.com/watch?v=__MSag3MnW4', thumbnail: 'https://img.youtube.com/vi/__MSag3MnW4/mqdefault.jpg' },
    { id: 15, title: 'Board The Ark', views: '6K views', link: 'https://www.youtube.com/watch?v=urBAvm539c8', thumbnail: 'https://img.youtube.com/vi/urBAvm539c8/mqdefault.jpg' },
  ];

  const popularReleases = [
    { id: 21, title: 'Endtimez Ambitionz', views: '367K views', link: 'https://www.youtube.com/watch?v=ciMKtWzgLB8', thumbnail: 'https://img.youtube.com/vi/ciMKtWzgLB8/mqdefault.jpg' },
    { id: 22, title: 'The Vent Part 3: WOE', views: '356K views', link: 'https://www.youtube.com/watch?v=VYkoVk8CKUM', thumbnail: 'https://img.youtube.com/vi/VYkoVk8CKUM/mqdefault.jpg' },
    { id: 23, title: 'Guard Your Light', views: '274K views', link: 'https://www.youtube.com/watch?v=FhyCdT6x-Js', thumbnail: 'https://img.youtube.com/vi/FhyCdT6x-Js/mqdefault.jpg' },
    { id: 24, title: 'EZRA & NEHEMIAH', views: '226K views', link: 'https://www.youtube.com/watch?v=Mck-dSz6df8', thumbnail: 'https://img.youtube.com/vi/Mck-dSz6df8/mqdefault.jpg' },
    { id: 25, title: 'Wake Up The Tribez', views: '207K views', link: 'https://www.youtube.com/watch?v=ElfIVaBfNIY', thumbnail: 'https://img.youtube.com/vi/ElfIVaBfNIY/mqdefault.jpg' },
  ];

  const premiumPlaceholders = [
    { id: 101, title: 'Origin of the Nephilim (Coming Soon)', duration: 'Premium Drop', locked: true, link: '', thumbnail: '/assets/endtimez.png' },
    { id: 102, title: 'Classified Transmission 02', duration: 'Locked', locked: true, link: '', thumbnail: '/assets/endtimez.png' },
    { id: 103, title: 'Vault Archives 03', duration: 'Locked', locked: true, link: '', thumbnail: '/assets/endtimez.png' },
  ];

  const isPremiumUnlocked = user && user.role === 'admin';

  const renderVideoCard = (video: any, isPremium: boolean = false, isPlaceholder: boolean = false) => (
    <div key={video.id} className="glass-panel vault-card" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column', border: isPremium ? '1px solid var(--gold)' : '1px solid var(--glass-border)' }}>
      <div className="thumbnail-container" style={{ position: 'relative', height: '180px', background: isPlaceholder ? 'rgba(0,0,0,0.5)' : 'transparent', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <img 
          src={video.thumbnail} 
          alt={video.title} 
          style={{ width: '100%', height: '100%', objectFit: isPlaceholder ? 'contain' : 'cover', padding: isPlaceholder ? '2rem' : '0' }} 
        />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(to top, var(--color-obsidian), transparent)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {isPremium && !isPremiumUnlocked ? (
            <div style={{ background: 'rgba(0,0,0,0.6)', padding: '15px', borderRadius: '50%', color: 'var(--color-bronze)' }}>
              <Lock size={40} />
            </div>
          ) : (
             <a href={video.link || '#'} target={video.link ? '_blank' : '_self'} rel="noreferrer" style={{ textDecoration: 'none' }} title={`Watch ${video.title}`}>
              <div style={{ background: isPremium ? 'rgba(212, 175, 55, 0.4)' : 'rgba(230, 184, 0, 0.4)', padding: '15px', borderRadius: '50%', color: isPremium ? 'var(--gold)' : 'var(--color-gold-radiant)', cursor: 'pointer', transition: 'var(--transition-smooth)' }} className="play-btn">
                <PlayCircle size={40} />
              </div>
            </a>
          )}
        </div>
        <span style={{ position: 'absolute', bottom: '10px', right: '10px', background: 'rgba(0,0,0,0.8)', padding: '2px 8px', borderRadius: '4px', fontSize: '0.8rem', color: isPremium ? 'var(--gold)' : 'var(--color-parchment)' }}>
          {video.views || video.duration}
        </span>
      </div>
      
      <div className="info-container" style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <h3 style={{ fontSize: '1.2rem', color: isPremium ? 'var(--gold)' : 'var(--color-parchment)', marginBottom: '0.5rem' }}>{video.title}</h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem', flex: 1 }}>
          {isPremium ? 'Exclusive cinematic experience from DarakiBar. Unlocks soon.' : 'Deep dive into the prophetic timeline and scriptural mysteries.'}
        </p>
        
        {isPremium && !isPremiumUnlocked ? (
          <button className="btn btn-primary" style={{ width: '100%', fontSize: '0.9rem', padding: '0.6rem', border: '1px solid var(--gold)', background: 'rgba(212,175,55,0.1)' }}>
            <Crown size={16} /> Unlock Premium ($5.99/mo)
          </button>
        ) : (
          <a href={video.link || '#'} target={video.link ? '_blank' : '_self'} rel="noreferrer" className={isPremium ? "btn gold-btn" : "btn btn-secondary"} style={{ width: '100%', fontSize: '0.9rem', padding: '0.6rem', textDecoration: 'none' }}>
            <PlayCircle size={16} /> Watch Now
          </a>
        )}
      </div>
    </div>
  );

  return (
    <div className="page-container fade-in">
      {/* Intro Section */}
      <div style={{ width: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h2 className="glitch" data-text="Esoteric Teachings">Esoteric Teachings</h2>
        </div>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', marginBottom: '2rem', maxWidth: '800px', textAlign: 'left' }}>
          A vault of ancient wisdom. Break down time according to the Book of Enoch and explore truths hidden from the masses.
        </p>
      </div>

      <div style={{ width: '100%' }}>
        {/* Popular Videos Row (UNLOCKED) */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-color)', fontSize: '1.5rem' }}><TrendingUp size={24} color="var(--gold)"/> Most Viewed Wisdom</h3>
          <button onClick={() => setShowAllPopular(!showAllPopular)} className="btn btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}>{showAllPopular ? 'Collapse' : 'Show All'}</button>
        </div>
        <div className="vault-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
          {(showAllPopular ? [...dynPopular, ...popularReleases] : [...dynPopular, ...popularReleases].slice(0, 3)).map(v => renderVideoCard(v, false))}
        </div>

        {/* Recent Videos Row (UNLOCKED) */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-color)', fontSize: '1.5rem' }}><Clock size={24} color="var(--gold)"/> Latest Prophetic Releases</h3>
          <button onClick={() => setShowAllRecent(!showAllRecent)} className="btn btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}>{showAllRecent ? 'Collapse' : 'Show All'}</button>
        </div>
        <div className="vault-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
          {(showAllRecent ? [...dynRecent, ...recentReleases] : [...dynRecent, ...recentReleases].slice(0, 3)).map(v => renderVideoCard(v, false))}
        </div>
        
        {/* Additional Vault Resources */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-color)', fontSize: '1.5rem' }}>Foundational Study</h3>
          <button onClick={() => setShowAllStudy(!showAllStudy)} className="btn btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}>{showAllStudy ? 'Collapse' : 'Show All'}</button>
        </div>
        <div className="vault-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
          {(showAllStudy ? freeVideos : freeVideos.slice(0, 3)).map(v => renderVideoCard(v, false))}
        </div>
      </div>

      {/* Premium Content Section (PLACEHOLDERS) */}
      <div style={{ width: '100%', borderTop: '1px solid rgba(212, 175, 55, 0.3)', paddingTop: '4rem', marginTop: '2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2.5rem', color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: '4px', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
            <Crown size={40} /> Premium Experience
          </h2>
          <p style={{ color: 'var(--color-parchment)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto', opacity: 0.8 }}>
            Unlock exclusive high-production content, cinematic deep dives, and the pinnacle of Endtimez truth from our Master Architect, DarakiBar. Coming soon.
          </p>
        </div>

        <div className="vault-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
          {[...dynPremium, ...premiumPlaceholders].map((v, i) => renderVideoCard(v, true, i >= dynPremium.length))}
        </div>
      </div>
    </div>
  );
}

