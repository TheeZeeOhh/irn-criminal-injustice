'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './Footer.module.css';

function FacebookIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function XSocialIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function YoutubeIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
      <polygon points="9.75,15.02 15.5,12 9.75,8.98 9.75,15.02" fill="var(--bg2)" />
    </svg>
  );
}

const footerTranslations = {
  en: {
    mission: 'Documenting harm, fighting wrongful prosecution, and building the infrastructure communities need to hold institutions accountable.',
    programs: 'Programs',
    criminalInjustice: 'Criminal Injustice',
    environmental: 'Environmental',
    familyPolicing: 'Family Policing',
    chrtPortal: 'CHRT Portal',
    getInvolved: 'Get Involved',
    donate: 'Donate',
    volunteer: 'Volunteer',
    campaigns: 'Campaigns',
    events: 'Events',
    resources: 'Resources',
    knowYourRights: 'Know Your Rights',
    attorneys: 'Attorneys',
    foiaGenerator: 'FOIA Generator',
    impactData: 'Impact & Data',
    chapters: 'Chapters',
    blog: 'Blog',
    press: 'Press',
    legal: 'Legal',
    privacyPolicy: 'Privacy Policy',
    termsOfService: 'Terms of Service',
    accessibility: 'AccessibilityStatement',
    contact: 'Contact',
    copyright: '© 2024–2026 Injustice Reform Network · EIN 41-4321283 · 501(c)(3) Nonprofit · Virginia, Maryland, North Carolina & DC · All Rights Reserved',
    disclaimer: 'IRN is not a law firm. Nothing on this site constitutes legal advice or creates an attorney-client relationship.',
  },
  es: {
    mission: 'Documentando daños, luchando contra procesamientos injustos y construyendo la infraestructura que las comunidades necesitan para responsabilizar a las instituciones.',
    programs: 'Programas',
    criminalInjustice: 'Injusticia Criminal',
    environmental: 'Injusticia Ambiental',
    familyPolicing: 'Vigilancia Familiar',
    chrtPortal: 'Portal CHRT',
    getInvolved: 'Participe',
    donate: 'Donar',
    volunteer: 'Voluntariado',
    campaigns: 'Campañas',
    events: 'Eventos',
    resources: 'Recursos',
    knowYourRights: 'Conoce Tus Derechos',
    attorneys: 'Abogados',
    foiaGenerator: 'Generador de FOIA',
    impactData: 'Impacto y Datos',
    chapters: 'Capítulos',
    blog: 'Blog',
    press: 'Prensa',
    legal: 'Legal',
    privacyPolicy: 'Política de Privacidad',
    termsOfService: 'Términos de Servicio',
    accessibility: 'Accesibilidad',
    contact: 'Contacto',
    copyright: '© 2024–2026 Injustice Reform Network · EIN 41-4321283 · Entidad 501(c)(3) sin fines de lucro · Virginia, Maryland, Carolina del Norte y DC · Todos los derechos reservados',
    disclaimer: 'IRN no es un bufete de abogados. Nada en este sitio constituye asesoría legal ni crea una relación abogado-cliente.',
  }
};

export default function Footer() {
  const [lang, setLang] = useState<'en' | 'es'>('en');

  useEffect(() => {
    // Detect initial language
    let initialLang: 'en' | 'es' = 'en';
    if (window.location.pathname.includes('/conoce-tus-derechos')) {
      initialLang = 'es';
    } else if (window.location.pathname.includes('/know-your-rights')) {
      initialLang = 'en';
    } else {
      const savedLang = localStorage.getItem('lang');
      if (savedLang === 'en' || savedLang === 'es') {
        initialLang = savedLang;
      }
    }
    setLang(initialLang);

    const handleLangChange = () => {
      const currentLang = localStorage.getItem('lang') as 'en' | 'es' || 'en';
      setLang(currentLang);
    };

    window.addEventListener('langchange', handleLangChange);
    window.addEventListener('storage', handleLangChange);

    return () => {
      window.removeEventListener('langchange', handleLangChange);
      window.removeEventListener('storage', handleLangChange);
    };
  }, []);

  const t = footerTranslations[lang];

  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <div className={styles.brand}>
          <Link href="/" className={styles.logo} aria-label="Injustice Reform Network — home">
            IRN
          </Link>
          <p className={styles.mission}>
            {t.mission}
          </p>
          <div className={styles.socials}>
            <a
              href="https://facebook.com/IRN"
              className={styles.socialLink}
              aria-label="Visit IRN on Facebook"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FacebookIcon />
            </a>
            <a
              href="https://twitter.com/IRN"
              className={styles.socialLink}
              aria-label="Visit IRN on X (formerly Twitter)"
              target="_blank"
              rel="noopener noreferrer"
            >
              <XSocialIcon />
            </a>
            <a
              href="https://youtube.com/IRN"
              className={styles.socialLink}
              aria-label="Visit IRN on YouTube"
              target="_blank"
              rel="noopener noreferrer"
            >
              <YoutubeIcon />
            </a>
          </div>
        </div>

        <nav className={styles.grid} aria-label="Footer navigation">
          <div className={styles.col}>
            <span className={styles.colTitle}>{t.programs}</span>
            <Link href="/criminal-injustice" className={styles.link} aria-label="Criminal Injustice program">
              {t.criminalInjustice}
            </Link>
            <Link href="/environmental" className={styles.link} aria-label="Environmental Injustice program">
              {t.environmental}
            </Link>
            <Link href="/family" className={styles.link} aria-label="Family Policing and Reproductive Health">
              {t.familyPolicing}
            </Link>
            <Link href="/chrt" className={styles.link} aria-label="CHRT — Community Harm Reporting Tool">
              {t.chrtPortal}
            </Link>
          </div>
          <div className={styles.col}>
            <span className={styles.colTitle}>{t.getInvolved}</span>
            <Link href="/donate" className={styles.link} aria-label="Donate to IRN">{t.donate}</Link>
            <Link href="/volunteer" className={styles.link} aria-label="Volunteer with IRN">{t.volunteer}</Link>
            <Link href="/campaigns" className={styles.link} aria-label="IRN Campaigns">{t.campaigns}</Link>
            <Link href="/events" className={styles.link} aria-label="IRN Events">{t.events}</Link>
          </div>
          <div className={styles.col}>
            <span className={styles.colTitle}>{t.resources}</span>
            <Link href="/know-your-rights" className={styles.link} aria-label="Know Your Rights guide">{t.knowYourRights}</Link>
            <Link href="/attorneys" className={styles.link} aria-label="Attorney Directory">{t.attorneys}</Link>
            <Link href="/foia" className={styles.link} aria-label="FOIA Generator">{t.foiaGenerator}</Link>
            <Link href="/impact" className={styles.link} aria-label="Impact & Data">{t.impactData}</Link>
            <Link href="/chapters" className={styles.link} aria-label="IRN Chapters & Locations">{t.chapters}</Link>
            <Link href="/blog" className={styles.link} aria-label="IRN Blog">{t.blog}</Link>
            <Link href="/press" className={styles.link} aria-label="IRN Press">{t.press}</Link>
          </div>
          <div className={styles.col}>
            <span className={styles.colTitle}>{t.legal}</span>
            <Link href="/privacy" className={styles.link} aria-label="Privacy Policy">{t.privacyPolicy}</Link>
            <Link href="/terms" className={styles.link} aria-label="Terms of Service">{t.termsOfService}</Link>
            <Link href="/accessibility" className={styles.link} aria-label="Accessibility statement">
              {t.accessibility}
            </Link>
            <Link href="/contact" className={styles.link} aria-label="Contact IRN">{t.contact}</Link>
          </div>
        </nav>
      </div>

      <div className={styles.bottom}>
        <p className={styles.copyright}>
          {t.copyright}
        </p>
        <p className={styles.disclaimer}>
          {t.disclaimer}
        </p>
      </div>
    </footer>
  );
}
