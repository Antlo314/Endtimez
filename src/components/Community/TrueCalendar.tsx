import { Calendar as CalendarIcon, Clock, ChevronRight, ChevronLeft } from 'lucide-react';

export default function TrueCalendar() {
  return (
    <div className="page-container fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 className="glitch" data-text="The True Calendar">The True Calendar</h2>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', color: 'var(--color-gold-radiant)' }}>
          <Clock size={20} /> <span>Current Epoch: Day 14, Month 1</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '2rem', marginTop: '1rem' }}>
        
        {/* Main Calendar View */}
        <div className="glass-panel">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <button className="btn btn-secondary" style={{ padding: '0.5rem' }}><ChevronLeft /></button>
            <h3 style={{ fontSize: '1.5rem', letterSpacing: '0.1em' }}>Month 1 (Abib)</h3>
            <button className="btn btn-secondary" style={{ padding: '0.5rem' }}><ChevronRight /></button>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '10px', textAlign: 'center' }}>
            {['1st', '2nd', '3rd', '4th', '5th', '6th', 'Sabbath'].map(day => (
              <div key={day} style={{ color: 'var(--color-bronze)', fontWeight: 'bold', paddingBottom: '10px', borderBottom: '1px solid var(--color-earth)' }}>
                {day}
              </div>
            ))}
            
            {Array.from({ length: 30 }).map((_, i) => (
              <div key={i} style={{ 
                aspectRatio: '1', 
                background: i === 13 ? 'rgba(255, 204, 0, 0.15)' : 'rgba(10,10,9,0.5)', 
                border: i === 13 ? '1px solid var(--color-gold-radiant)' : '1px solid var(--color-earth)', 
                borderRadius: '8px', 
                padding: '10px', 
                position: 'relative',
                cursor: 'pointer',
                transition: 'var(--transition-smooth)'
              }}>
                <span style={{ color: i === 13 ? 'var(--color-gold-radiant)' : 'var(--text-primary)', fontWeight: 'bold' }}>{i + 1}</span>
                {i === 13 && (
                  <div style={{ position: 'absolute', bottom: '5px', left: '50%', transform: 'translateX(-50%)', background: 'var(--color-gold-radiant)', width: '6px', height: '6px', borderRadius: '50%' }}></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Selected Day Info */}
        <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '1px solid var(--color-earth)', paddingBottom: '1rem' }}>
            <CalendarIcon size={24} color="var(--color-bronze)" /> Day 14
          </h3>
          
          <div style={{ background: 'rgba(0,0,0,0.4)', padding: '1.5rem', borderRadius: '8px', borderLeft: '4px solid var(--color-gold-radiant)' }}>
            <h4 style={{ color: 'var(--color-gold-radiant)', marginBottom: '0.5rem' }}>Passover Memorial</h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.5 }}>
              The evening of the 14th day commemorates the passing over. 
            </p>
            <button className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.8rem', marginTop: '1rem', width: '100%' }}>View Teaching Video</button>
          </div>

          <div style={{ background: 'rgba(0,0,0,0.4)', padding: '1.5rem', borderRadius: '8px', borderLeft: '4px solid var(--color-bronze)' }}>
            <h4 style={{ color: 'var(--color-bronze)', marginBottom: '0.5rem' }}>Admin Note</h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.5 }}>
              Gathering in the chat at sundown.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
