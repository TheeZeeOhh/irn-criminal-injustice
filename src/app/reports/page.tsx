import { Metadata } from 'next';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import styles from '../criminal-injustice/page.module.css';

export const metadata: Metadata = { title: 'Public Reports & FOIA | IRN' };

const foiaRequests = [
  { id: 'FOIA-26-042', agency: 'Newport News Police Department', date: '2026-04-12', status: 'Fulfilled', desc: 'Use of Force policies regarding minors' },
  { id: 'FOIA-26-089', agency: 'Hampton Sheriff\'s Office', date: '2026-05-01', status: 'Pending', desc: 'Eviction enforcement protocols and dispatch logs' },
  { id: 'FOIA-26-101', agency: 'Virginia State Police', date: '2026-05-15', status: 'Appealing', desc: 'Arrest demographics data 2024-2025' },
  { id: 'FOIA-26-112', agency: 'Norfolk Public Schools', date: '2026-06-02', status: 'Pending', desc: 'Manifestation Determination Review (MDR) outcome statistics' },
];

export default function ReportsPage() {
  return (
    <>
      <Nav />
      <main id="main-content" className={styles.main}>
        <section className={styles.section} style={{ paddingTop: '150px' }}>
          <div className={styles.container}>
            <h1 style={{ fontSize: '3rem', color: '#E4A853', marginBottom: '1rem' }}>Public Reports & FOIA Tracker</h1>
            <p style={{ color: '#bbb', fontSize: '1.2rem', maxWidth: '800px', marginBottom: '3rem' }}>
              Transparency is our weapon. We publish active Freedom of Information Act (FOIA) requests and public accountability reports to track systemic abuses across Virginia.
            </p>

            <h2 style={{ color: '#fff', marginBottom: '1.5rem', fontSize: '1.8rem' }}>Active FOIA Requests</h2>
            
            <div style={{ overflowX: 'auto', background: '#111', borderRadius: '8px', border: '1px solid #333' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '700px' }}>
                <thead>
                  <tr style={{ background: '#1a1a1a', borderBottom: '1px solid #333' }}>
                    <th style={{ padding: '1rem', color: '#888', fontWeight: 'normal' }}>Tracking ID</th>
                    <th style={{ padding: '1rem', color: '#888', fontWeight: 'normal' }}>Agency</th>
                    <th style={{ padding: '1rem', color: '#888', fontWeight: 'normal' }}>Date Filed</th>
                    <th style={{ padding: '1rem', color: '#888', fontWeight: 'normal' }}>Description</th>
                    <th style={{ padding: '1rem', color: '#888', fontWeight: 'normal' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {foiaRequests.map((req, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid #222' }}>
                      <td style={{ padding: '1rem', color: '#fff', fontFamily: 'var(--font-mono)' }}>{req.id}</td>
                      <td style={{ padding: '1rem', color: '#E4A853' }}>{req.agency}</td>
                      <td style={{ padding: '1rem', color: '#bbb' }}>{req.date}</td>
                      <td style={{ padding: '1rem', color: '#bbb' }}>{req.desc}</td>
                      <td style={{ padding: '1rem' }}>
                        <span style={{ 
                          padding: '4px 8px', 
                          borderRadius: '4px', 
                          fontSize: '0.85rem',
                          background: req.status === 'Fulfilled' ? 'rgba(46, 204, 113, 0.1)' : req.status === 'Pending' ? 'rgba(241, 196, 15, 0.1)' : 'rgba(231, 76, 60, 0.1)',
                          color: req.status === 'Fulfilled' ? '#2ecc71' : req.status === 'Pending' ? '#f1c40f' : '#e74c3c',
                          border: `1px solid ${req.status === 'Fulfilled' ? '#2ecc71' : req.status === 'Pending' ? '#f1c40f' : '#e74c3c'}`
                        }}>
                          {req.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
