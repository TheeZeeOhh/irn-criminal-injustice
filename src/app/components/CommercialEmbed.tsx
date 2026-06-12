import styles from '../criminal-injustice/page.module.css';

export default function CommercialEmbed() {
  return (
    <section className={`${styles.section} ${styles.sectionTextured}`} id="commercial">
      <div className={styles.container}>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '2rem' }}>The System is Broken. Let's Fix It.</h2>
        <div style={{ width: '100%', maxWidth: '900px', margin: '0 auto', borderRadius: '12px', overflow: 'hidden', border: '1px solid #333', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
          <iframe 
            src="/irn-criminal-injustice/commercial.html" 
            title="IRN 30-Second Commercial Animatic"
            style={{ width: '100%', aspectRatio: '16/9', border: 'none', display: 'block' }}
            scrolling="no"
          />
        </div>
        <p style={{ textAlign: 'center', marginTop: '1rem', color: '#888', fontSize: '0.9rem' }}>
          Watch our 30-second animatic outlining the mission of the Injustice Reform Network.
        </p>
      </div>
    </section>
  );
}
