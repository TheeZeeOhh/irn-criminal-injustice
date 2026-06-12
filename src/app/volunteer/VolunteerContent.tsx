'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckSquare, Send, CheckCircle } from 'lucide-react';
import styles from './volunteer.module.css';

const roles = [
  { id: 'legal-obs', label: 'Legal Observer / Court Accompaniment', desc: 'Attend hearings, document proceedings, provide support presence.' },
  { id: 'organizing', label: 'Community Organizing & Canvassing', desc: 'Outreach, coalition building, neighborhood engagement.' },
  { id: 'mutual-aid', label: 'Mutual Aid / Logistics', desc: 'Supply drives, transportation, resource coordination.' },
  { id: 'foia', label: 'Research & FOIA Filing', desc: 'Public records requests, data analysis, documentation.' },
  { id: 'kyr', label: 'Know Your Rights Facilitation', desc: 'Lead or co-facilitate KYR workshops in schools and communities.' },
  { id: 'tech', label: 'Technical / Design', desc: 'Web development, graphic design, data visualization.' },
  { id: 'translation', label: 'Language Access / Translation', desc: 'Spanish, ASL, or other languages for community outreach.' },
  { id: 'media', label: 'Media & Communications', desc: 'Photography, video, social media, writing.' },
];

const availability = ['Weekdays', 'Evenings', 'Weekends', 'Flexible / Remote only'];

export default function VolunteerContent() {
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [selectedAvail, setSelectedAvail] = useState<string[]>([]);
  const [fields, setFields] = useState({ name: '', contact: '', location: '', why: '' });
  const [submitted, setSubmitted] = useState(false);

  function toggleRole(id: string) {
    setSelectedRoles(prev => prev.includes(id) ? prev.filter(r => r !== id) : [...prev, id]);
  }
  function toggleAvail(a: string) {
    setSelectedAvail(prev => prev.includes(a) ? prev.filter(x => x !== a) : [...prev, a]);
  }
  function set(k: string, v: string) { setFields(p => ({ ...p, [k]: v })); }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const roleLabels = selectedRoles.map(id => roles.find(r => r.id === id)?.label).join(', ');
    const body = encodeURIComponent(
      `Name/Alias: ${fields.name}\nContact: ${fields.contact}\nLocation: ${fields.location}\nRoles: ${roleLabels}\nAvailability: ${selectedAvail.join(', ')}\n\nWhy they want to volunteer:\n${fields.why}`
    );
    window.location.href = `mailto:cirnpresident@gmail.com?subject=Volunteer%20Interest%20—%20IRN&body=${body}`;
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <main id="main-content" className={styles.main}>
        <div className={styles.accentBar} aria-hidden="true" />
        <div className={styles.successPage}>
          <div className={styles.successBlock}>
            <CheckCircle size={48} className={styles.successIcon} aria-hidden="true" />
            <h1 className={styles.successTitle}>Thank you.</h1>
            <p className={styles.successBody}>Your email client should have opened with your intake information. Send it to cirnpresident@gmail.com — IRN will follow up within 5 business days.</p>
            <a href="/criminal-injustice" className={styles.btnGhost}>Return to Site</a>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main id="main-content" className={styles.main}>
      <div className={styles.accentBar} aria-hidden="true" />

      <header className={styles.hero}>
        <div className={styles.container}>
          <motion.span className={styles.kicker} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>Get Involved</motion.span>
          <motion.h1 className={styles.heroTitle} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>Join the Network.</motion.h1>
          <motion.p className={styles.heroSubtitle} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
            IRN is built by and for the community. Legal observers, organizers, researchers, translators, and tech contributors — every skill has a place here.
          </motion.p>
        </div>
      </header>

      <section className={styles.section}>
        <div className={styles.container}>
          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <div className={styles.formGrid}>

              {/* LEFT */}
              <div className={styles.formLeft}>
                <div className={styles.formCard}>
                  <h2 className={styles.cardTitle}>About You</h2>

                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="vol-name">Name or alias <span className={styles.req}>*</span></label>
                    <input id="vol-name" type="text" className={styles.input} required placeholder="Your name or a name you go by" value={fields.name} onChange={e => set('name', e.target.value)} />
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="vol-contact">Email or Signal number <span className={styles.req}>*</span></label>
                    <input id="vol-contact" type="text" className={styles.input} required placeholder="How should IRN reach you?" value={fields.contact} onChange={e => set('contact', e.target.value)} />
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="vol-location">City / region</label>
                    <input id="vol-location" type="text" className={styles.input} placeholder="Hampton Roads, Baltimore, DC..." value={fields.location} onChange={e => set('location', e.target.value)} />
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label}>Availability</label>
                    <div className={styles.checkGrid}>
                      {availability.map(a => (
                        <button key={a} type="button" className={`${styles.checkBtn} ${selectedAvail.includes(a) ? styles.checkBtnActive : ''}`} onClick={() => toggleAvail(a)}>
                          <CheckSquare size={12} aria-hidden="true" /> {a}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="vol-why">Why do you want to organize with IRN?</label>
                    <textarea id="vol-why" className={styles.textarea} rows={5} placeholder="Tell us about yourself, your experience, and what draws you to this work." value={fields.why} onChange={e => set('why', e.target.value)} />
                  </div>
                </div>
              </div>

              {/* RIGHT */}
              <div className={styles.formRight}>
                <div className={styles.formCard}>
                  <h2 className={styles.cardTitle}>How You Want to Contribute</h2>
                  <p className={styles.cardSubtitle}>Select all that apply.</p>
                  <div className={styles.roleGrid}>
                    {roles.map(role => (
                      <button
                        key={role.id}
                        type="button"
                        className={`${styles.roleCard} ${selectedRoles.includes(role.id) ? styles.roleCardActive : ''}`}
                        onClick={() => toggleRole(role.id)}
                        aria-pressed={selectedRoles.includes(role.id)}
                      >
                        <span className={styles.roleLabel}>{role.label}</span>
                        <span className={styles.roleDesc}>{role.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

            </div>

            <div className={styles.submitRow}>
              <button type="submit" className={styles.submitBtn} disabled={!fields.name || !fields.contact}>
                <Send size={15} aria-hidden="true" /> Submit Interest
              </button>
              <p className={styles.submitNote}>Opens your email client — no data is stored on this site.</p>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
