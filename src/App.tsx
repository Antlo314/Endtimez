import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { Crown, Calendar, MessageSquare, Music, UserCircle } from 'lucide-react';

import Login from './components/Auth/Login';
import UserProfile from './components/Profile/UserProfile';
import GodMode from './components/Admin/GodMode';
import Store from './components/Music/Store';
import Chat from './components/Community/Chat';
import TrueCalendar from './components/Community/TrueCalendar';
import Teachings from './components/Video/Teachings';
import { BookOpen } from 'lucide-react';

function Navigation({ user }: { user: any }) {
// ... omitting unchanged navigation ...
  return (
    <nav className="glass-panel main-nav">
      <div className="nav-logo">
        <Link to="/">
          <h2>Endtimez</h2>
        </Link>
      </div>
      <div className="nav-links">
        <Link to={user ? "/profile" : "/login"}>
          <UserCircle size={20}/> {user ? 'Profile' : 'Login'}
        </Link>
        <Link to="/chat"><MessageSquare size={20}/> Chat</Link>
        <Link to="/calendar"><Calendar size={20}/> Time</Link>
        <Link to="/music"><Music size={20}/> Store</Link>
        <Link to="/teachings"><BookOpen size={20}/> Teachings</Link>
        {user?.role === 'admin' && (
          <Link to="/admin" className="accent-link"><Crown size={20}/> God Mode</Link>
        )}
      </div>
    </nav>
  );
}

function Home() {
// ... omitted Home ...
  return (
    <div className="page-container fade-in">
      <div style={{
        backgroundImage: 'url(/assets/images/hero_bg.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '6rem 2rem',
        borderRadius: '20px',
        border: '1px solid var(--color-earth)',
        boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(to top, var(--color-obsidian), transparent)' }}></div>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h1 className="glitch" data-text="Holy Music">Holy Music</h1>
          <p className="subtitle" style={{ marginTop: '1rem', color: 'var(--color-sand)' }}>Experience the sound of the end times.</p>
          
          <div className="glass-panel welcome-panel" style={{ marginTop: '4rem', background: 'rgba(10,10,9,0.7)' }}>
            <h3 style={{ color: 'var(--color-gold-radiant)' }}>Welcome to the Sanctum</h3>
            <p style={{ color: 'var(--color-parchment)' }}>This is more than a platform. It is an economy, a community, and a testament to the Ancient Ways.</p>
            <Link to="/login" className="btn btn-primary" style={{ textDecoration: 'none' }}>Initiate Account</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [user, setUser] = useState<any>(null); // Mock single-state auth

  return (
    <Router>
      <div className="app-layout">
        <Navigation user={user} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={user ? <Navigate to="/profile" /> : <Login onLogin={setUser} />} />
            <Route path="/profile" element={user ? <UserProfile user={user} onLogout={() => setUser(null)} /> : <Navigate to="/login" />} />
            <Route path="/admin" element={<GodMode user={user} />} />
            <Route path="/music" element={<Store />} />
            <Route path="/chat" element={user ? <Chat /> : <Navigate to="/login" />} />
            <Route path="/calendar" element={<TrueCalendar />} />
            <Route path="/teachings" element={<Teachings user={user} />} />
            {/* Further routes will be added here */}
            <Route path="*" element={<div className="page-container"><h2>404 - Not Found</h2></div>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
