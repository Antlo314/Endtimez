import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { Crown, Calendar, MessageSquare, Music, UserCircle } from 'lucide-react';
import { supabase } from './lib/supabase';

import Login from './components/Auth/Login';
import UserProfile from './components/Profile/UserProfile';
import GodMode from './components/Admin/GodMode';
import Store from './components/Music/Store';
import Chat from './components/Community/Chat';
import TrueCalendar from './components/Community/TrueCalendar';
import Teachings from './components/Video/Teachings';
import { BookOpen } from 'lucide-react';

function Navigation({ user, profile }: { user: any, profile: any }) {
  return (
    <nav>
      <div className="logo-container">
        <Link to="/">
          <img src="/assets/endtimez.png" alt="Endtimez Muzik Logo" className="nav-logo" />
        </Link>
      </div>
      <div className="nav-links">
        <Link to={user ? "/profile" : "/login"}>
          <UserCircle size={18}/> {user ? 'Sanctum' : 'Enter'}
        </Link>
        <Link to="/chat"><MessageSquare size={18}/> Codex</Link>
        <Link to="/calendar"><Calendar size={18}/> Epoch</Link>
        <Link to="/music"><Music size={18}/> Hymns</Link>
        <Link to="/teachings"><BookOpen size={18}/> Vault</Link>
        {profile?.role === 'admin' && (
          <Link to="/admin" className="accent-link"><Crown size={18}/> The Prophet's Watch</Link>
        )}
      </div>
    </nav>
  );
}

function Home({ user }: { user: any }) {
  if (user) return <Navigate to="/profile" />;

  return (
    <main>
      <section id="hero" className="fade-in" style={{ paddingBottom: '0rem' }}>
        <div className="hero-content">
          <img src="/assets/endtimez.png" alt="Endtimez Muzik Logo" className="main-logo" />
          <h1 className="glitch" data-text="Holy Music">Holy Music</h1>
          <p className="subtitle" style={{ marginBottom: '0' }}>Experience the sound of the end times.</p>
        </div>
      </section>
      <Login />
    </main>
  );
}

function App() {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check active sessions and sets the user
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) fetchProfile(session.user);
      else setLoading(false);
    });

    // Listen for changes on auth state (logged in, signed out, etc.)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) fetchProfile(session.user);
      else setProfile(null);
    });

    return () => subscription.unsubscribe();
  }, []);

  async function fetchProfile(authUser: any) {
    const isAdminEmail = authUser.email === '12messengers@endtimezmuzik.com' || authUser.email === 'iamwhoiambook@gmail.com';
    
    // Attempt to fetch existing profile
    const { data } = await supabase.from('profiles').select('*').eq('id', authUser.id).single();
    
    if (data) {
      if (isAdminEmail && data.role !== 'admin') {
         data.role = 'admin';
         supabase.from('profiles').update({ role: 'admin' }).eq('id', authUser.id).then();
      }
      setProfile(data);
    } else {
      // Sanctum Rescue: Fallback profile if row is missing
      const fallbackProfile = { 
        id: authUser.id, 
        username: authUser.email?.split('@')[0] || 'Soul', 
        role: isAdminEmail ? 'admin' : 'user', 
        total_support: 0 
      };
      setProfile(fallbackProfile);
      supabase.from('profiles').insert([fallbackProfile]).then();
    }
    setLoading(false);
  }

  if (loading) {
    return <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-gold-radiant)' }}>Connecting to the Heavens...</div>;
  }

  return (
    <Router>
      <div className="app-layout">
        <Navigation user={user} profile={profile} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home user={user} />} />
            <Route path="/login" element={user ? <Navigate to="/profile" /> : <Login />} />
            <Route path="/profile" element={user ? <UserProfile user={user} profile={profile} onProfileUpdate={fetchProfile} /> : <Navigate to="/login" />} />
            <Route path="/admin" element={profile?.role === 'admin' ? <GodMode user={user} profile={profile} /> : <Navigate to="/" />} />
            <Route path="/music" element={<Store />} />
            <Route path="/chat" element={user ? <Chat user={user} profile={profile} /> : <Navigate to="/login" />} />
            <Route path="/calendar" element={<TrueCalendar />} />
            <Route path="/teachings" element={<Teachings user={user} profile={profile} />} />
            <Route path="*" element={<div className="page-container" style={{textAlign:'center'}}><h2>404 - Void</h2></div>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
