'use client';
import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, Shield, Phone, ArrowRight } from 'lucide-react';
import styles from './contact.module.css';

export default function ContactContent() {
  const [sent, setSent] = useState(false);
  const [fields, setFields] = useState({ name: '', email: '', subject: '', message: '' });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const { name, email, subject, message } = fields;
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    window.location.href = `mailto:info@injusticereformnetwork.org?subject=${encodeURIComponent(subject || 'IRN Contact Form')}&body=${body}`;
    setSent(true);
  }

  return (
    <main id="main-content" className={styles.main}>
      <div className={styles.accentBar} aria-hidden="true" />

      <header className={styles.hero}>
        <div className={styles.container}>
          <motion.span className={styles.kicker} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            Reach Out
          </motion.span>
          <motion.h1 className={styles.heroTitle} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
            Contact Us
          </motion.h1>
          <motion.p className={styles.heroSubtitle} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
            General inquiries, media requests, partnership proposals. For civil rights incidents, use CHRT — it's encrypted and anonymous.
          </motion.p>
        </div>
      </header>

      <section className={styles.section}>
        <div className={styles.grid}>

          <motion.div
            className={styles.infoCol}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className={styles.infoCard}>
              <Mail size={18} className={styles.infoIcon} aria-hidden="true" />
              <div>
                <p className={styles.infoLabel}>General Inquiries</p>
                <a href="mailto:info@injusticereformnetwork.org" className={styles.infoValue}>
                  info@injusticereformnetwork.org
                </a>
              </div>
            </div>
            <div className={styles.infoCard}>
              <Mail size={18} className={styles.infoIcon} aria-hidden="true" />
              <div>
                <p className={styles.infoLabel}>Press & Media</p>
                <a href="mailto:press@injusticereformnetwork.org" className={styles.infoValue}>
                  press@injusticereformnetwork.org
                </a>
              </div>
            </div>
            <div className={styles.infoCard}>
              <Phone size={18} className={styles.infoIcon} aria-hidden="true" />
              <div>
                <p className={styles.infoLabel}>Crisis Line</p>
                <p className={styles.infoValue}>(757) IRN-HELP</p>
                <p className={styles.infoNote}>Mon–Fri 9am–6pm ET</p>
              </div>
            </div>

            <div className={styles.chrtAlert}>
              <Shield size={18} className={styles.chrtIcon} aria-hidden="true" />
              <div>
                <p className={styles.chrtTitle}>Reporting a civil rights incident?</p>
                <p className={styles.chrtBody}>
                  Don't use this form. Use CHRT — it's encrypted on your device before it ever reaches us.
                </p>
                <Link href="/chrt" className={styles.chrtLink}>
                  Go to CHRT <ArrowRight size={12} aria-hidden="true" style={{ display: 'inline', verticalAlign: 'middle' }} />
                </Link>
              </div>
            </div>
          </motion.div>

          <motion.div
            className={styles.formCol}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {sent ? (
              <div className={styles.successMsg}>
                <p className={styles.successTitle}>Email client opened.</p>
                <p className={styles.successBody}>If it didn't open, email us directly at info@injusticereformnetwork.org</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.fieldGroup}>
                  <label className={styles.label} htmlFor="contact-name">Name</label>
                  <input
                    id="contact-name"
                    type="text"
                    className={styles.input}
                    required
                    value={fields.name}
                    onChange={e => setFields(f => ({ ...f, name: e.target.value }))}
                  />
                </div>
                <div className={styles.fieldGroup}>
                  <label className={styles.label} htmlFor="contact-email">Email</label>
                  <input
                    id="contact-email"
                    type="email"
                    className={styles.input}
                    required
                    value={fields.email}
                    onChange={e => setFields(f => ({ ...f, email: e.target.value }))}
                  />
                </div>
                <div className={styles.fieldGroup}>
                  <label className={styles.label} htmlFor="contact-subject">Subject</label>
                  <input
                    id="contact-subject"
                    type="text"
                    className={styles.input}
                    value={fields.subject}
                    onChange={e => setFields(f => ({ ...f, subject: e.target.value }))}
                  />
                </div>
                <div className={styles.fieldGroup}>
                  <label className={styles.label} htmlFor="contact-message">Message</label>
                  <textarea
                    id="contact-message"
                    rows={6}
                    className={styles.textarea}
                    required
                    value={fields.message}
                    onChange={e => setFields(f => ({ ...f, message: e.target.value }))}
                  />
                </div>
                <button type="submit" className={styles.submitBtn}>
                  Send Message <ArrowRight size={14} aria-hidden="true" />
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </section>
    </main>
  );
}
