'use client';
import { motion, type Variants } from 'framer-motion';
import { Download, Mail, Copy } from 'lucide-react';
import { useState } from 'react';
import styles from './press.module.css';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.45, delay: i * 0.07, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
};

const boilerplates = [
  {
    label: 'Short (1 sentence)',
    text: 'The Injustice Reform Network (IRN) is a Mid-Atlantic civil rights organization that documents harm, fights wrongful prosecution, and builds accountability infrastructure for LGBTQ+ communities and marginalized people across Virginia, Maryland, North Carolina, and DC.',
  },
  {
    label: 'Standard (2–3 sentences)',
    text: 'The Injustice Reform Network (IRN) is a Mid-Atlantic systems-justice organization dedicated to dismantling inequities within the criminal legal system. IRN produces meaningful intersectional impact for LGBTQ+ communities by addressing the root causes of criminalization through secure documentation, free legal clinics, and legislative advocacy. Operating across Virginia, Maryland, North Carolina, and DC, IRN serves as both a rapid-response civil rights organization and a long-term accountability infrastructure builder.',
  },
  {
    label: 'Full (press release)',
    text: `The Injustice Reform Network (IRN) is a 501(c)(3) nonprofit organization headquartered in Hampton Roads, Virginia, with active chapters in Maryland and expanding operations in North Carolina and Washington DC.

IRN operates at the intersection of criminal justice, environmental justice, family policing, and homelessness prevention — with a particular focus on Black trans people, formerly incarcerated LGBTQ+ individuals, and other communities most targeted by state violence.

Core programs include: the Community Harm Reporting Tool (CHRT), an encrypted civil rights documentation platform; free expungement and record-sealing clinics; Know Your Rights community workshops; and the Criminal Justice Rapid Response Protocol (CJRRP), which connects clients with attorneys within 72 hours of intake.

IRN does not provide legal representation. IRN is not a law firm. Nothing on this site creates an attorney-client relationship.`,
  },
];

export default function PressContent() {
  const [copied, setCopied] = useState<number | null>(null);

  function handleCopy(i: number, text: string) {
    navigator.clipboard.writeText(text);
    setCopied(i);
    setTimeout(() => setCopied(null), 2500);
  }

  return (
    <main id="main-content" className={styles.main}>
      <div className={styles.accentBar} aria-hidden="true" />

      <header className={styles.hero}>
        <div className={styles.container}>
          <motion.span className={styles.kicker} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>Press</motion.span>
          <motion.h1 className={styles.heroTitle} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>Press Kit</motion.h1>
          <motion.p className={styles.heroSubtitle} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
            Official resources for journalists, producers, and media partners.
            For press inquiries: <a href="mailto:cirnpresident@gmail.com" className={styles.heroLink}>cirnpresident@gmail.com</a>
          </motion.p>
        </div>
      </header>

      {/* MEDIA CONTACT */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.grid2}>

            <motion.div className={styles.card} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
              <span className={styles.cardKicker}>Media Contact</span>
              <h2 className={styles.cardTitle}>Aziza Okoro</h2>
              <p className={styles.cardSubtitle}>Founder & Executive Director, Injustice Reform Network</p>
              <p className={styles.cardBody}>
                Available for interviews, expert commentary on civil rights, criminal justice reform,
                LGBTQ+ advocacy, and community accountability infrastructure.
              </p>
              <div className={styles.contactList}>
                <a href="mailto:cirnpresident@gmail.com" className={styles.contactLink}>
                  <Mail size={13} aria-hidden="true" /> cirnpresident@gmail.com
                </a>
              </div>
              <div className={styles.tagRow}>
                <span className={styles.tag}>Criminal Justice</span>
                <span className={styles.tag}>LGBTQ+ Rights</span>
                <span className={styles.tag}>Civil Rights</span>
                <span className={styles.tag}>Community Organizing</span>
              </div>
            </motion.div>

            <motion.div className={styles.card} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1}>
              <span className={styles.cardKicker}>Organization Facts</span>
              <h2 className={styles.cardTitle}>IRN at a Glance</h2>
              <ul className={styles.factList}>
                <li><span className={styles.factLabel}>Founded</span><span>2024</span></li>
                <li><span className={styles.factLabel}>Status</span><span>501(c)(3) Nonprofit</span></li>
                <li><span className={styles.factLabel}>EIN</span><span>41-4321283</span></li>
                <li><span className={styles.factLabel}>HQ</span><span>Hampton Roads, Virginia</span></li>
                <li><span className={styles.factLabel}>Chapters</span><span>VA (HQ) · MD · NC · DC (expanding)</span></li>
                <li><span className={styles.factLabel}>Focus</span><span>Criminal Justice, Environmental, Family Policing, Housing</span></li>
                <li><span className={styles.factLabel}>Key Tool</span><span>CHRT — encrypted civil rights reporting</span></li>
              </ul>
            </motion.div>

          </div>
        </div>
      </section>

      {/* BOILERPLATE */}
      <section className={`${styles.section} ${styles.sectionDark}`}>
        <div className={styles.container}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <span className={styles.sectionKicker}>Approved Copy</span>
            <h2 className={styles.sectionTitle}>Organization Boilerplate</h2>
            <p className={styles.sectionBody}>Use these descriptions as-is. Do not alter without approval from IRN.</p>
          </motion.div>

          <div className={styles.boilerplateList}>
            {boilerplates.map((b, i) => (
              <motion.div key={b.label} className={styles.bpCard} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <div className={styles.bpHeader}>
                  <span className={styles.bpLabel}>{b.label}</span>
                  <button type="button" className={styles.copyBtn} onClick={() => handleCopy(i, b.text)}>
                    <Copy size={13} aria-hidden="true" /> {copied === i ? 'Copied!' : 'Copy'}
                  </button>
                </div>
                <p className={styles.bpText}>{b.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ASSETS */}
      <section className={styles.section}>
        <div className={styles.container}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <span className={styles.sectionKicker}>Brand Assets</span>
            <h2 className={styles.sectionTitle}>Logos & Media</h2>
          </motion.div>

          <div className={styles.assetGrid}>
            <motion.div className={styles.assetCard} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
              <div className={styles.assetPreview} style={{ background: '#0d0b08' }}>
                <img src="/logo.png" alt="IRN Logo" className={styles.assetImg} />
              </div>
              <div className={styles.assetMeta}>
                <span className={styles.assetName}>IRN Logo — Dark</span>
                <a href="/logo.png" download className={styles.downloadLink}>
                  <Download size={12} aria-hidden="true" /> Download PNG
                </a>
              </div>
            </motion.div>

            <motion.div className={styles.assetCard} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1}>
              <div className={styles.assetPreview} style={{ background: '#0d0b08' }}>
                <img src="/irn-crest.png" alt="IRN Crest" className={styles.assetImg} />
              </div>
              <div className={styles.assetMeta}>
                <span className={styles.assetName}>IRN Crest</span>
                <a href="/irn-crest.png" download className={styles.downloadLink}>
                  <Download size={12} aria-hidden="true" /> Download PNG
                </a>
              </div>
            </motion.div>
          </div>

          <motion.div className={styles.colorRow} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={2}>
            <span className={styles.colorLabel}>Brand Colors</span>
            <div className={styles.swatches}>
              <div className={styles.swatch}><div className={styles.swatchColor} style={{ background: '#D46229' }} /><span>Ember #D46229</span></div>
              <div className={styles.swatch}><div className={styles.swatchColor} style={{ background: '#C8952A' }} /><span>Gold #C8952A</span></div>
              <div className={styles.swatch}><div className={styles.swatchColor} style={{ background: '#0d0b08' }} /><span>Ink #0d0b08</span></div>
              <div className={styles.swatch}><div className={styles.swatchColor} style={{ background: '#4a7c59' }} /><span>Sage #4a7c59</span></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* COVERAGE */}
      <section className={`${styles.section} ${styles.sectionDark}`}>
        <div className={styles.container}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <span className={styles.sectionKicker}>Media</span>
            <h2 className={styles.sectionTitle}>Press Inquiries</h2>
            <p className={styles.sectionBody}>
              To arrange an interview, request comment, or obtain additional materials, contact:
            </p>
          </motion.div>
          <motion.div className={styles.pressContact} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1}>
            <a href="mailto:cirnpresident@gmail.com?subject=Press%20Inquiry" className={styles.pressContactBtn}>
              <Mail size={16} aria-hidden="true" /> cirnpresident@gmail.com
            </a>
            <p className={styles.pressNote}>IRN responds to press inquiries within 24 hours on business days.</p>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
