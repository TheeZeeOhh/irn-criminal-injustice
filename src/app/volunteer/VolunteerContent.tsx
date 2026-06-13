'use client';
import { useState } from 'react';
import Link from 'next/link';
import styles from './volunteer.module.css';

/* ── DATA ─────────────────────────────────────────────── */

const roles = [
  {
    id: 'organizing',
    icon: '◉',
    label: 'Community Organizing',
    desc: 'Canvassing, coalition meetings, event mobilization, door-to-door outreach',
  },
  {
    id: 'legal',
    icon: '⚖',
    label: 'Legal Advocacy',
    desc: 'FOIA filing support, court observation, legal intake assistance, paralegal skills',
  },
  {
    id: 'harm-reduction',
    icon: '♥',
    label: 'Harm Reduction',
    desc: 'Peer support, supply distribution, de-escalation, crisis navigation',
  },
  {
    id: 'tech',
    icon: '⬡',
    label: 'Tech & Data',
    desc: 'Web development, data analysis, security, FOIA data processing',
  },
  {
    id: 'translation',
    icon: '◈',
    label: 'Translation & Interpretation',
    desc: 'Spanish, Amharic, ASL, or other languages',
  },
  {
    id: 'media',
    icon: '◎',
    label: 'Media & Communications',
    desc: 'Photography, video, social media, graphic design, writing',
  },
  {
    id: 'policy',
    icon: '⊞',
    label: 'Policy & Research',
    desc: 'Legislative tracking, policy memos, public comment drafting, campaign research',
  },
  {
    id: 'events',
    icon: '◐',
    label: 'Events & Logistics',
    desc: 'Event setup, tabling, resource coordination, volunteer coordination',
  },
];

const regionOptions = [
  'Baltimore City',
  'Baltimore County / Metro',
  'Newport News / Hampton',
  'Norfolk / Virginia Beach',
  'Richmond VA',
  'DC / DMV',
  'Remote / Online Only',
  'Other',
];

const availabilityOptions = [
  '1–5 hrs/month',
  '5–10 hrs/month',
  '10–20 hrs/month',
  '20+ hrs/month',
  'One-time or project-based',
];

const values = [
  {
    marker: '◈',
    title: 'TGEPOC-centered',
    body: "IRN's work starts from and returns to trans and gender-expansive people of color. Our programs are designed with this community at the center, not as an afterthought.",
  },
  {
    marker: '◈',
    title: 'Non-carceral approach',
    body: 'We do not build systems that surveil, report, or funnel people into carceral pipelines. Our accountability work targets institutions, not individuals.',
  },
  {
    marker: '◈',
    title: 'Harm reduction framework',
    body: 'We meet people where they are — without judgment, without preconditions. Harm reduction is not a program we run; it is how we operate.',
  },
  {
    marker: '◈',
    title: 'Security culture',
    body: 'IRN operates with an awareness of surveillance risk. We use encrypted tools, limit data collection, and train volunteers to protect themselves and each other.',
  },
];

/* ── COMPONENT ────────────────────────────────────────── */

export default function VolunteerContent() {
  const [selectedRoles, setSelectedRoles] = useState<Set<string>>(new Set());
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Form fields
  const [name, setName] = useState('');
  const [pronouns, setPronouns] = useState('');
  const [contactPrimary, setContactPrimary] = useState('');
  const [contactSecure, setContactSecure] = useState('');
  const [region, setRegion] = useState('');
  const [availability, setAvailability] = useState('');
  const [whyDrawn, setWhyDrawn] = useState('');
  const [skills, setSkills] = useState('');
  const [consentNewsletter, setConsentNewsletter] = useState(false);
  const [consentText, setConsentText] = useState(false);
  const [consentPhoto, setConsentPhoto] = useState(false);

  function toggleRole(id: string) {
    setSelectedRoles(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !contactPrimary.trim()) return;
    setFormSubmitted(true);
  }

  return (
    <div id="main-content">

      {/* HERO */}
      <section className={styles.hero}>
        <div className={`${styles.container} ${styles.heroFlex}`}>
          <div className={styles.heroText}>
            <span className={styles.eyebrow}>Get Involved</span>
            <h1 className={styles.heroTitle}>
              Your Skills Belong in{' '}
              <span className={styles.gold}>This Fight</span>
            </h1>
            <div className={styles.goldRule} aria-hidden="true" />
            <p className={styles.heroSub}>
              IRN is a living network — not a nonprofit bureaucracy. Community organizers,
              attorneys, translators, coders, documentarians, and care workers are all
              part of this infrastructure. If you show up, there is a role for you.
            </p>
          </div>
          <div className={styles.heroImageWrapper}>
            <img 
              src="/irn-criminal-injustice/campaign-image.jpg" 
              alt="Wanted: Rebels, Reformers, and Whistleblowers flyer"
              className={styles.heroImage}
            />
          </div>
        </div>
      </section>

      {/* ROLES SECTION */}
      <section className={styles.rolesSection}>
        <div className={styles.container}>
          <h2 className={styles.rolesSectionTitle}>Where Do You Want to Plug In?</h2>
          <p className={styles.rolesSectionSub}>
            Select all that apply — this helps us route your intake to the right team.
          </p>
          <div className={styles.rolesGrid}>
            {roles.map(role => {
              const selected = selectedRoles.has(role.id);
              return (
                <button
                  key={role.id}
                  type="button"
                  className={`${styles.roleCard} ${selected ? styles.roleCardSelected : ''}`}
                  onClick={() => toggleRole(role.id)}
                  aria-pressed={selected}
                >
                  <span className={styles.roleCardTop}>
                    <span className={styles.roleIcon} aria-hidden="true">{role.icon}</span>
                    <span className={styles.roleLabel}>{role.label}</span>
                    {selected && (
                      <span className={styles.roleCheck} aria-hidden="true">✓</span>
                    )}
                  </span>
                  <span className={styles.roleDesc}>{role.desc}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* FORM SECTION */}
      <section className={styles.formSection} id="intake-form">
        <div className={styles.container}>

          {formSubmitted ? (
            <div className={styles.successScreen}>
              <h2 className={styles.successTitle}>You&apos;re in the network.</h2>
              <p className={styles.successBody}>
                IRN will be in touch within 72 hours.{' '}
                <a
                  href="mailto:volunteer@injusticereformnetwork.org"
                  className={styles.goldLink}
                >
                  volunteer@injusticereformnetwork.org
                </a>
              </p>
              <Link href="/campaigns/" className={styles.btnEmber}>
                See Active Campaigns →
              </Link>
            </div>
          ) : (
            <>
              <span className={styles.eyebrow}>Volunteer Intake</span>
              <p className={styles.formIntro}>
                IRN responds to all intake forms within 72 hours. You will not be added
                to a mailing list without your explicit consent below.
              </p>

              <form
                className={styles.intakeForm}
                onSubmit={handleSubmit}
                noValidate
              >
                <div className={styles.formGrid}>

                  {/* Row 1 */}
                  <div className={styles.fieldGroup}>
                    <label className={styles.fieldLabel} htmlFor="vol-name">
                      Name <span className={styles.req}>*</span>
                    </label>
                    <input
                      id="vol-name"
                      type="text"
                      className={styles.fieldInput}
                      placeholder="First only is fine"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      required
                    />
                  </div>

                  <div className={styles.fieldGroup}>
                    <label className={styles.fieldLabel} htmlFor="vol-pronouns">
                      Pronouns
                    </label>
                    <input
                      id="vol-pronouns"
                      type="text"
                      className={styles.fieldInput}
                      placeholder="she/her · he/him · they/them · etc."
                      value={pronouns}
                      onChange={e => setPronouns(e.target.value)}
                    />
                  </div>

                  {/* Row 2 */}
                  <div className={styles.fieldGroup}>
                    <label className={styles.fieldLabel} htmlFor="vol-contact-primary">
                      Contact — Primary <span className={styles.req}>*</span>
                    </label>
                    <input
                      id="vol-contact-primary"
                      type="text"
                      className={styles.fieldInput}
                      placeholder="Email or phone"
                      value={contactPrimary}
                      onChange={e => setContactPrimary(e.target.value)}
                      required
                    />
                  </div>

                  <div className={styles.fieldGroup}>
                    <label className={styles.fieldLabel} htmlFor="vol-contact-secure">
                      Contact — Secure (optional)
                    </label>
                    <input
                      id="vol-contact-secure"
                      type="text"
                      className={styles.fieldInput}
                      placeholder="Signal username or ProtonMail"
                      value={contactSecure}
                      onChange={e => setContactSecure(e.target.value)}
                    />
                  </div>

                  {/* Row 3 */}
                  <div className={styles.fieldGroup}>
                    <label className={styles.fieldLabel} htmlFor="vol-region">
                      Region
                    </label>
                    <select
                      id="vol-region"
                      className={styles.fieldSelect}
                      value={region}
                      onChange={e => setRegion(e.target.value)}
                    >
                      <option value="">Select region…</option>
                      {regionOptions.map(r => (
                        <option key={r} value={r}>{r}</option>
                      ))}
                    </select>
                  </div>

                  <div className={styles.fieldGroup}>
                    <label className={styles.fieldLabel} htmlFor="vol-availability">
                      Availability
                    </label>
                    <select
                      id="vol-availability"
                      className={styles.fieldSelect}
                      value={availability}
                      onChange={e => setAvailability(e.target.value)}
                    >
                      <option value="">Select availability…</option>
                      {availabilityOptions.map(a => (
                        <option key={a} value={a}>{a}</option>
                      ))}
                    </select>
                  </div>

                  {/* Full-width: Why drawn */}
                  <div className={`${styles.fieldGroup} ${styles.fieldFull}`}>
                    <label className={styles.fieldLabel} htmlFor="vol-why">
                      What draws you to IRN&apos;s work?
                    </label>
                    <textarea
                      id="vol-why"
                      className={styles.fieldTextarea}
                      rows={4}
                      placeholder="Tell us what brought you here — your experience, your community, your why."
                      value={whyDrawn}
                      onChange={e => setWhyDrawn(e.target.value)}
                    />
                  </div>

                  {/* Full-width: Skills */}
                  <div className={`${styles.fieldGroup} ${styles.fieldFull}`}>
                    <label className={styles.fieldLabel} htmlFor="vol-skills">
                      Skills, experience, or languages
                    </label>
                    <textarea
                      id="vol-skills"
                      className={styles.fieldTextarea}
                      rows={3}
                      placeholder="Anything relevant — professional, lived, or both."
                      value={skills}
                      onChange={e => setSkills(e.target.value)}
                    />
                  </div>

                  {/* Full-width: Consent */}
                  <fieldset className={`${styles.consentBlock} ${styles.fieldFull}`}>
                    <legend className={styles.fieldLabel}>Communication &amp; Consent</legend>
                    <div className={styles.consentList}>
                      <label className={styles.consentRow}>
                        <input
                          type="checkbox"
                          className={styles.consentCheck}
                          checked={consentNewsletter}
                          onChange={e => setConsentNewsletter(e.target.checked)}
                        />
                        <span>
                          Add me to IRN&apos;s volunteer mailing list (the Dispatch newsletter, volunteer opportunities)
                        </span>
                      </label>
                      <label className={styles.consentRow}>
                        <input
                          type="checkbox"
                          className={styles.consentCheck}
                          checked={consentText}
                          onChange={e => setConsentText(e.target.checked)}
                        />
                        <span>
                          IRN may text or Signal me about volunteer opportunities
                        </span>
                      </label>
                      <label className={styles.consentRow}>
                        <input
                          type="checkbox"
                          className={styles.consentCheck}
                          checked={consentPhoto}
                          onChange={e => setConsentPhoto(e.target.checked)}
                        />
                        <span>
                          I consent to being photographed or recorded at public IRN events (you may say no)
                        </span>
                      </label>
                    </div>
                  </fieldset>

                </div>

                {/* Privacy note */}
                <p className={styles.privacyNote}>
                  <strong className={styles.emberStrong}>Privacy:</strong>{' '}
                  IRN treats volunteer intake data as confidential. We do not share
                  your information with third parties, law enforcement, or outside
                  organizations without your explicit consent. Intake data is stored
                  securely and used only to route you to the right team.
                </p>

                <button
                  type="submit"
                  className={styles.btnSubmit}
                  disabled={!name.trim() || !contactPrimary.trim()}
                >
                  Submit Intake →
                </button>

              </form>
            </>
          )}
        </div>
      </section>

      {/* VALUES */}
      <section className={styles.valuesSection}>
        <div className={styles.container}>
          <span className={styles.eyebrow}>Our Standards</span>
          <h2 className={styles.valuesSectionTitle}>Who We Volunteer With</h2>
          <div className={styles.valuesList}>
            {values.map(v => (
              <div key={v.title} className={styles.valueItem}>
                <span className={styles.valueMarker} aria-hidden="true">{v.marker}</span>
                <div className={styles.valueContent}>
                  <p className={styles.valueTitle}>{v.title}</p>
                  <p className={styles.valueBody}>{v.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
