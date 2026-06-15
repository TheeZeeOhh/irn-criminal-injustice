'use client';

import { useState } from 'react';
import { PhoneCall, Mail, MapPin, AlertTriangle, CheckCircle, ExternalLink } from 'lucide-react';
import styles from './panels.module.css';

type IncidentType = '' | 'Eviction' | 'Utility Shutoff' | 'Blight' | 'Police Misconduct' | 'Other';
type ContactPref = '' | 'Email' | 'Phone' | 'Anonymous';

const IRN_EMAIL = 'info@injusticereformnetwork.org';

function buildMailto(
  name: string,
  incidentType: IncidentType,
  description: string,
  contactPref: ContactPref
): string {
  const subject = encodeURIComponent(`CommunityShield Escalation: ${incidentType || 'General'}`);
  const body = encodeURIComponent(
    [
      `Incident Type: ${incidentType || 'Not specified'}`,
      `Name: ${name || 'Anonymous'}`,
      `Contact Preference: ${contactPref || 'Not specified'}`,
      '',
      'Description:',
      description,
      '',
      '---',
      'Submitted via CommunityShield by IRN',
    ].join('\n')
  );
  return `mailto:${IRN_EMAIL}?subject=${subject}&body=${body}`;
}

export default function EscalatePanel() {
  const [name, setName] = useState('');
  const [incidentType, setIncidentType] = useState<IncidentType>('');
  const [description, setDescription] = useState('');
  const [contactPref, setContactPref] = useState<ContactPref>('');
  const [submitted, setSubmitted] = useState(false);
  const [mailtoUrl, setMailtoUrl] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!incidentType || !description.trim()) return;

    const url = buildMailto(name, incidentType, description, contactPref);
    setMailtoUrl(url);
    setSubmitted(true);
  }

  function handleReset() {
    setName('');
    setIncidentType('');
    setDescription('');
    setContactPref('');
    setSubmitted(false);
    setMailtoUrl('');
  }

  return (
    <div className={styles.panel}>
      <div className={styles.panelHeader}>
        <p className={styles.panelEyebrow}>IRN Escalation</p>
        <h2 className={styles.panelTitle}>Get IRN Involved</h2>
        <p className={styles.panelDesc}>
          Report your situation directly to IRN advocates. Real people who fight for housing
          and civil rights in Baltimore and Hampton Roads.
        </p>
      </div>

      <div className={styles.escalateLayout}>
        {/* ── Form ───────────────────────────────────── */}
        <div>
          {!submitted ? (
            <form onSubmit={handleSubmit} className={styles.escalateForm}>
              <div className={styles.formGroup}>
                <label htmlFor="esc-name" className={styles.formLabel}>
                  Your name (optional)
                </label>
                <input
                  id="esc-name"
                  type="text"
                  className={styles.formInput}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Leave blank to stay anonymous"
                  maxLength={80}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="esc-type" className={styles.formLabel}>
                  Incident type <span style={{ color: 'var(--ember)' }}>*</span>
                </label>
                <select
                  id="esc-type"
                  className={styles.selectInput}
                  value={incidentType}
                  onChange={(e) => setIncidentType(e.target.value as IncidentType)}
                  required
                >
                  <option value="">Select an incident type…</option>
                  <option value="Eviction">Eviction</option>
                  <option value="Utility Shutoff">Utility Shutoff</option>
                  <option value="Blight">Blight</option>
                  <option value="Police Misconduct">Police Misconduct</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="esc-desc" className={styles.formLabel}>
                  Describe the incident <span style={{ color: 'var(--ember)' }}>*</span>
                </label>
                <textarea
                  id="esc-desc"
                  className={styles.textarea}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Include dates, addresses, names of officials involved, and what happened. The more detail, the better IRN can help."
                  rows={6}
                  required
                  minLength={20}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="esc-contact" className={styles.formLabel}>
                  How should IRN reach you?
                </label>
                <select
                  id="esc-contact"
                  className={styles.selectInput}
                  value={contactPref}
                  onChange={(e) => setContactPref(e.target.value as ContactPref)}
                >
                  <option value="">Select a preference…</option>
                  <option value="Email">Email</option>
                  <option value="Phone">Phone</option>
                  <option value="Anonymous">Anonymous — do not contact</option>
                </select>
              </div>

              <button
                type="submit"
                className={styles.sendBtn}
                disabled={!incidentType || !description.trim()}
              >
                <PhoneCall size={18} />
                Send to IRN
              </button>
            </form>
          ) : (
            <div className={styles.escalateForm}>
              <div className={styles.confirmBox}>
                <div className={styles.confirmTitle}>
                  <CheckCircle size={18} />
                  Your report is ready
                </div>
                <p className={styles.confirmText}>
                  Click the link below to open your email client with your report pre-filled.
                  IRN will receive it at{' '}
                  <strong style={{ color: 'var(--gold)' }}>{IRN_EMAIL}</strong>.
                  <br /><br />
                  If you prefer not to use email, call or visit IRN directly using the contact
                  information in the sidebar.
                </p>
                <a
                  href={mailtoUrl}
                  className={styles.mailtoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Mail size={15} />
                  Open pre-filled email to IRN
                  <ExternalLink size={12} />
                </a>
              </div>

              <button
                type="button"
                className={styles.btnSecondary}
                onClick={handleReset}
                style={{ marginTop: '1rem' }}
              >
                Submit another report
              </button>
            </div>
          )}
        </div>

        {/* ── Sidebar ─────────────────────────────────── */}
        <div className={styles.escalateSidebar}>
          <div className={styles.sidebarCard}>
            <div className={styles.sidebarTitle}>Contact IRN Directly</div>

            <div className={styles.sidebarItem}>
              <Mail size={14} className={styles.sidebarItemIcon} aria-hidden="true" />
              <a href={`mailto:${IRN_EMAIL}`} className={styles.sidebarLink}>
                {IRN_EMAIL}
              </a>
            </div>

            <div className={styles.sidebarItem}>
              <PhoneCall size={14} className={styles.sidebarItemIcon} aria-hidden="true" />
              <a href="tel:+14438940105" className={styles.sidebarLink}>
                (443) 894-0105
              </a>
            </div>

            <div className={styles.sidebarItem}>
              <MapPin size={14} className={styles.sidebarItemIcon} aria-hidden="true" />
              <span>
                Injustice Reform Network
                <br />
                Baltimore, MD &amp; Hampton Roads, VA
              </span>
            </div>
          </div>

          <div className={styles.urgentNote}>
            <div className={styles.urgentNoteTitle}>
              <AlertTriangle size={14} />
              Emergency?
            </div>
            If you are in immediate danger, call <strong>911</strong>. For civil rights
            emergencies during business hours, call IRN directly — do not wait for email.
          </div>

          <div className={styles.sidebarCard}>
            <div className={styles.sidebarTitle}>What Happens Next</div>
            <div className={styles.sidebarItem}>
              <span style={{ color: 'var(--ember)', fontSize: '0.8rem', marginTop: '1px' }}>01</span>
              <span>IRN reviews your report within 2 business days.</span>
            </div>
            <div className={styles.sidebarItem}>
              <span style={{ color: 'var(--ember)', fontSize: '0.8rem', marginTop: '1px' }}>02</span>
              <span>An advocate may reach out via your preferred contact method.</span>
            </div>
            <div className={styles.sidebarItem}>
              <span style={{ color: 'var(--ember)', fontSize: '0.8rem', marginTop: '1px' }}>03</span>
              <span>IRN may refer your case to legal aid, media, or direct action.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
