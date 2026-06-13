'use client';
import { useState } from 'react';
import Link from 'next/link';
import { motion, type Variants } from 'framer-motion';
import { Download, ChevronDown, ChevronUp, Shield, Scale, Home, Camera, GraduationCap, Globe } from 'lucide-react';
import styles from './kyr.module.css';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.45, delay: i * 0.07, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
};

const sections = [
  {
    icon: Shield,
    title: 'Police Encounters & Stops',
    content: [
      {
        heading: 'Your core rights',
        body: 'You have the right to remain silent in all states. You are not required to answer questions about where you are going, where you have been, or what you are doing. Clearly and calmly say: "I am invoking my right to remain silent."',
      },
      {
        heading: 'Am I being detained?',
        body: 'Ask: "Am I free to go?" If yes — leave calmly. If no, you are being detained. State: "I do not consent to this stop. I am invoking my right to remain silent and my right to an attorney." Then stay calm and do not physically resist.',
      },
      {
        heading: 'Searches',
        body: 'You can refuse consent to a search of your person, bag, or vehicle. Say clearly: "I do not consent to a search." An officer may search anyway if they claim probable cause — your refusal is still legally important and goes on record.',
      },
      {
        heading: 'If you are arrested',
        body: 'Clearly state: "I am invoking my right to remain silent and my right to an attorney." Then stop talking. Do not explain, argue, or try to talk your way out. Contact IRN at cirnpresident@gmail.com as soon as you are able.',
      },
    ],
    color: 'ember',
  },
  {
    icon: Home,
    title: 'Tenant & Housing Rights',
    content: [
      {
        heading: 'Illegal lockouts',
        body: 'Self-help evictions — where a landlord changes locks, shuts off utilities, or removes your belongings without a court order — are illegal in Virginia, Maryland, and DC. Only a Sheriff can execute an eviction after a court order.',
      },
      {
        heading: 'Notice requirements',
        body: 'Virginia: Landlords must give 5-day notice to pay or quit before filing. Maryland: 4-day notice. DC: 30-day notice for nonpayment. You have the right to appear in court and contest the eviction.',
      },
      {
        heading: 'If you face an illegal lockout',
        body: 'Document everything with photos and video. Call police and report the illegal lockout. Contact IRN immediately — we provide rapid-response accompaniment and legal referral.',
      },
    ],
    color: 'gold',
  },
  {
    icon: Camera,
    title: 'Recording Police',
    content: [
      {
        heading: 'Your right to record',
        body: 'You have a First Amendment right to record police officers performing their duties in public spaces in all 50 states, as long as you do not physically interfere. This includes Virginia, Maryland, North Carolina, and DC.',
      },
      {
        heading: 'If ordered to stop recording',
        body: 'Stay calm. You may state: "I have a constitutional right to record." If they demand your phone, do not physically resist — state clearly: "I do not consent to a search of my device." Always lock your phone with a PIN, not biometrics, when protesting.',
      },
      {
        heading: 'DC-specific',
        body: 'DC has a police accountability board with enforcement power. You can submit recording-based complaints directly. IRN can help you file.',
      },
    ],
    color: 'ember',
  },
  {
    icon: GraduationCap,
    title: 'School Discipline & MDR',
    content: [
      {
        heading: 'Manifestation Determination Review',
        body: 'If your child has a disability (IEP or 504 plan) and faces suspension of more than 10 days or expulsion, the school must hold an MDR within 10 school days. The team reviews whether the behavior was caused by the disability. If it was, different protections apply.',
      },
      {
        heading: 'Your rights at an MDR',
        body: 'You have the right to bring an advocate or attorney. IRN provides free accompaniment at MDR meetings. Contact us before the meeting date — we prepare you for what to expect and help you ask the right questions.',
      },
      {
        heading: 'Zero tolerance & police in schools',
        body: 'Schools cannot call police for minor disciplinary matters under Virginia law. If your child was arrested at school for a minor infraction, contact IRN — this may be grounds for a civil rights complaint.',
      },
    ],
    color: 'gold',
  },
  {
    icon: Scale,
    title: 'Expungement & Clean Slate',
    content: [
      {
        heading: 'Virginia — Clean Slate Law (July 1, 2026)',
        body: 'Virginia\'s Clean Slate Law takes effect July 1, 2026. Eligible convictions will be automatically sealed. IRN\'s free expungement clinic on July 1 & July 15 will help you navigate this. Attend the Pearl Bailey Library clinic — everything is free.',
      },
      {
        heading: 'Maryland',
        body: 'Maryland\'s Second Chance Act expanded expungement eligibility for nonviolent offenses. Acquittals and dismissed charges are generally expungeable. Contact our Maryland chapter for referral.',
      },
      {
        heading: 'North Carolina & DC',
        body: 'NC has multiple expunction pathways for nonviolent felonies and misdemeanors. DC has broad expungement and sealing options. IRN can connect you with attorneys in both jurisdictions.',
      },
    ],
    color: 'ember',
  },
  {
    icon: Globe,
    title: 'Immigration Encounters',
    content: [
      {
        heading: 'Your rights regardless of status',
        body: 'You have the right to remain silent with ICE or CBP. You do not have to open your door without a warrant signed by a judge (an ICE administrative warrant is not enough). Say: "I do not consent to entry. I am invoking my right to remain silent."',
      },
      {
        heading: 'If you are detained',
        body: 'You have the right to contact a consulate. You have the right to an immigration attorney (though the government does not have to provide one for free). Do not sign anything you do not understand. Contact IRN — we have referral attorneys.',
      },
    ],
    color: 'gold',
  },
];

const walletSteps = [
  { en: 'Stay calm. Keep hands visible.', es: 'Mantén la calma. Manos visibles.' },
  { en: '"Am I free to go?"', es: '"¿Soy libre de irme?"' },
  { en: '"I am invoking my right to remain silent."', es: '"Invoco mi derecho a guardar silencio."' },
  { en: '"I do not consent to a search."', es: '"No consiento a un registro."' },
  { en: '"I want an attorney."', es: '"Quiero un abogado."' },
  { en: 'Do not physically resist. Document everything after.', es: 'No resistas físicamente. Documenta todo después.' },
];

export default function KYRContent() {
  const [open, setOpen] = useState<number | null>(0);
  const [lang, setLang] = useState<'en' | 'es'>('en');

  return (
    <main id="main-content" className={styles.main}>
      <div className={styles.accentBar} aria-hidden="true" />

      {/* HERO */}
      <header className={styles.hero}>
        <div className={styles.container}>
          <motion.span className={styles.kicker} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            Know Your Rights
          </motion.span>
          <motion.h1 className={styles.heroTitle} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
            Know What You&apos;re Entitled To.
          </motion.h1>
          <motion.p className={styles.heroSubtitle} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
            Virginia · Maryland · North Carolina · DC — your rights during police encounters, evictions, school discipline, and more.
            Not legal advice. For your situation, <Link href="/chrt" className={styles.heroLink}>file through CHRT</Link>.
          </motion.p>
          <motion.div className={styles.heroActions} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, delay: 0.3 }}>
            <a href="#wallet-card" className={styles.btnPrimary}>
              <Download size={15} aria-hidden="true" /> Get the Wallet Card
            </a>
            <Link href="/conoce-tus-derechos" className={styles.btnGhost}>
              En Español →
            </Link>
          </motion.div>
        </div>
      </header>

      {/* RIGHTS ACCORDION */}
      <section className={styles.section} aria-labelledby="rights-heading">
        <div className={styles.container}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <span className={styles.sectionKicker}>Your Rights</span>
            <h2 id="rights-heading" className={styles.sectionTitle}>Six Areas That Matter Most</h2>
          </motion.div>

          <div className={styles.accordion}>
            {sections.map((sec, i) => {
              const Icon = sec.icon;
              const isOpen = open === i;
              return (
                <motion.div key={sec.title} className={`${styles.accItem} ${styles[`acc${sec.color}`]}`} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                  <button
                    className={styles.accBtn}
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                  >
                    <div className={styles.accBtnLeft}>
                      <Icon size={18} className={styles.accIcon} aria-hidden="true" />
                      <span className={styles.accTitle}>{sec.title}</span>
                    </div>
                    {isOpen ? <ChevronUp size={16} aria-hidden="true" /> : <ChevronDown size={16} aria-hidden="true" />}
                  </button>
                  {isOpen && (
                    <div className={styles.accBody}>
                      {sec.content.map((item) => (
                        <div key={item.heading} className={styles.accBlock}>
                          <h3 className={styles.accBlockTitle}>{item.heading}</h3>
                          <p className={styles.accBlockBody}>{item.body}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* WALLET CARD */}
      <section className={styles.walletSection} id="wallet-card" aria-labelledby="wallet-heading">
        <div className={styles.container}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <span className={styles.sectionKicker}>Printable</span>
            <h2 id="wallet-heading" className={styles.sectionTitle}>Police Encounter Wallet Card</h2>
            <p className={styles.sectionBody}>Fold and keep in your wallet. Print on both sides of one sheet, fold into thirds.</p>
          </motion.div>

          <div className={styles.langToggle} role="group" aria-label="Language">
            <button className={`${styles.langBtn} ${lang === 'en' ? styles.langBtnActive : ''}`} onClick={() => setLang('en')}>English</button>
            <button className={`${styles.langBtn} ${lang === 'es' ? styles.langBtnActive : ''}`} onClick={() => setLang('es')}>Español</button>
          </div>

          <motion.div className={styles.walletCard} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1} aria-label="Wallet card preview">
            <div className={styles.walletHeader}>
              <span className={styles.walletOrg}>INJUSTICE REFORM NETWORK</span>
              <span className={styles.walletTitle}>{lang === 'en' ? 'KNOW YOUR RIGHTS' : 'CONOCE TUS DERECHOS'}</span>
              <span className={styles.walletSub}>{lang === 'en' ? 'Police Encounter · 6 Steps' : 'Encuentro con Policía · 6 Pasos'}</span>
            </div>
            <ol className={styles.walletSteps}>
              {walletSteps.map((step, i) => (
                <li key={i} className={styles.walletStep}>
                  <span className={styles.walletNum}>{i + 1}</span>
                  <span className={styles.walletStepText}>{lang === 'en' ? step.en : step.es}</span>
                </li>
              ))}
            </ol>
            <div className={styles.walletFooter}>
              <span>{lang === 'en' ? 'Report incidents anonymously:' : 'Reporta incidentes anónimamente:'}</span>
              <span className={styles.walletUrl}>injusticereformnetwork.org/chrt</span>
              <span className={styles.walletContact}>cirnpresident@gmail.com · 804-602-9166</span>
            </div>
          </motion.div>

          <div className={styles.printActions}>
            <button
              className={styles.btnPrimary}
              onClick={() => window.print()}
              aria-label="Print wallet card"
            >
              <Download size={15} aria-hidden="true" />
              {lang === 'en' ? 'Print Wallet Card' : 'Imprimir Tarjeta'}
            </button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.ctaSection} aria-labelledby="kyr-cta-heading">
        <div className={styles.container}>
          <motion.div className={styles.ctaBlock} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <h2 id="kyr-cta-heading" className={styles.ctaTitle}>Your rights were violated?</h2>
            <p className={styles.ctaBody}>Use CHRT to document what happened — anonymously, encrypted, no name required.</p>
            <Link href="/chrt" className={styles.btnPrimary}>Report Through CHRT →</Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
