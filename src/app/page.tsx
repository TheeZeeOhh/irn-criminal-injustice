export default function RootPage() {
  return (
    <div style={{ padding: '2rem', textAlign: 'center', background: '#0a0a0a', color: '#fff', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <meta httpEquiv="refresh" content="0; url=/criminal-injustice" />
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Injustice Reform Network</h1>
      <p style={{ color: '#888', marginBottom: '2rem' }}>Redirecting to the main platform...</p>
      <a href="/criminal-injustice" style={{ color: '#D4A843', textDecoration: 'none', border: '1px solid #D4A843', padding: '10px 20px', borderRadius: '4px' }}>
        Enter Site
      </a>
      <script dangerouslySetInnerHTML={{ __html: `window.location.replace('/criminal-injustice');` }} />
    </div>
  );
}
