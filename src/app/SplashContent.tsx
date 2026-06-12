'use client';
import Link from 'next/link';

const BASE = '/irn-criminal-injustice';

export default function SplashContent() {
  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#0a0a0a', padding: '2rem' }}>
      <div style={{ marginBottom: '3rem', animation: 'fadeIn 1s ease-out' }}>
        <img src={`${BASE}/logo.png`} alt="Injustice Reform Network" style={{ height: '80px', width: 'auto' }} />
      </div>
      <div style={{ width: '100%', maxWidth: '800px', marginBottom: '4rem', borderRadius: '12px', overflow: 'hidden', border: '1px solid #333', boxShadow: '0 10px 40px rgba(0,0,0,0.6)', animation: 'fadeIn 1.5s ease-out' }}>
        <iframe
          src={`${BASE}/commercial-cinematic.html`}
          title="IRN Cinematic Commercial"
          style={{ width: '100%', aspectRatio: '16/9', border: 'none', display: 'block' }}
          scrolling="no"
        />
      </div>
      <Link
        href="/criminal-injustice"
        style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', padding: '16px 36px', background: 'transparent', color: '#D4A843', border: '1px solid #D4A843', textDecoration: 'none', fontWeight: 'bold', fontSize: '1.1rem', borderRadius: '4px', textTransform: 'uppercase', letterSpacing: '0.1em', transition: 'transform 0.2s, background 0.2s, color 0.2s', animation: 'fadeIn 2s ease-out' }}
        onMouseOver={(e) => { e.currentTarget.style.background = '#D4A843'; e.currentTarget.style.color = '#000'; }}
        onMouseOut={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#D4A843'; }}
      >
        Enter Site
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
        </svg>
      </Link>
      <style dangerouslySetInnerHTML={{ __html: `@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }` }} />
    </main>
  );
}
