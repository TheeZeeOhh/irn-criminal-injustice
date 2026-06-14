'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Search, Sun, Moon, Globe } from 'lucide-react';
import styles from './Nav.module.css';
import GlobalSearch from './GlobalSearch';

const navTranslations = {
  en: {
    home: 'Home',
    surveillanceMap: 'Surveillance Map',
    mutualAid: 'Mutual Aid',
    whatWeDo: 'What We Do',
    criminalInjustice: 'Criminal Injustice',
    environmentalInjustice: 'Environmental Injustice',
    familyPolicing: 'Family Policing & Reproductive Health',
    homelessnessPrevention: 'Homelessness Prevention',
    resources: 'Resources',
    resourceLibrary: 'Resource Library',
    knowYourRights: 'Know Your Rights',
    conoceTusDerechos: 'Conoce Tus Derechos',
    attorneys: 'Attorney Directory',
    foia: 'FOIA Generator',
    ebonyParker: 'Case File: Ebony Parker',
    impact: 'Impact & Data',
    services: 'Services',
    bookIntake: 'Book Intake',
    aiAgents: 'AI Agents',
    campaigns: 'Campaigns',
    events: 'Events',
    blog: 'Blog',
    chapters: 'Chapters',
    about: 'About',
    contact: 'Contact',
    newsletter: 'Newsletter',
    search: 'Search',
    donate: 'Donate',
    openSearch: 'Open global search',
    openMobile: 'Open mobile menu',
    closeMobile: 'Close mobile menu',
    lightTheme: 'Light',
    darkTheme: 'Dark',
    changeLang: 'Change language to Español',
  },
  es: {
    home: 'Inicio',
    surveillanceMap: 'Mapa de Vigilancia',
    mutualAid: 'Ayuda Mutua',
    whatWeDo: 'Qué Hacemos',
    criminalInjustice: 'Injusticia Criminal',
    environmentalInjustice: 'Injusticia Ambiental',
    familyPolicing: 'Vigilancia Familiar y Salud Reproductiva',
    homelessnessPrevention: 'Prevención de la Indigencia',
    resources: 'Recursos',
    resourceLibrary: 'Biblioteca de Recursos',
    knowYourRights: 'Know Your Rights (EN)',
    conoceTusDerechos: 'Conoce Tus Derechos (ES)',
    attorneys: 'Directorio de Abogados',
    foia: 'Generador de FOIA',
    ebonyParker: 'Archivo del Caso: Ebony Parker',
    impact: 'Impacto y Datos',
    services: 'Servicios',
    bookIntake: 'Registrar Caso',
    aiAgents: 'Agentes IA',
    campaigns: 'Campañas',
    events: 'Eventos',
    blog: 'Blog',
    chapters: 'Capítulos',
    about: 'Acerca de',
    contact: 'Contacto',
    newsletter: 'Boletín',
    search: 'Buscar',
    donate: 'Donar',
    openSearch: 'Abrir búsqueda global',
    openMobile: 'Abrir menú móvil',
    closeMobile: 'Cerrar menú móvil',
    lightTheme: 'Claro',
    darkTheme: 'Oscuro',
    changeLang: 'Cambiar idioma a Inglés',
  }
};

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [lang, setLang] = useState<'en' | 'es'>('en');

  // Sync theme and language from localStorage on mount and listen to changes
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'dark' | 'light' || 'dark';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);

    // Initial language detection
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
    localStorage.setItem('lang', initialLang);

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

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const toggleLang = () => {
    const newLang = lang === 'en' ? 'es' : 'en';
    setLang(newLang);
    localStorage.setItem('lang', newLang);
    window.dispatchEvent(new Event('langchange'));

    // Auto-redirection for Know Your Rights pages
    if (window.location.pathname.includes('/know-your-rights') && newLang === 'es') {
      window.location.href = '/irn-criminal-injustice/conoce-tus-derechos/';
    } else if (window.location.pathname.includes('/conoce-tus-derechos') && newLang === 'en') {
      window.location.href = '/irn-criminal-injustice/know-your-rights/';
    }
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  // Handle hotkeys (Cmd+K / Ctrl+K or /) to open search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const isInput = target.tagName === 'INPUT' || 
                      target.tagName === 'TEXTAREA' || 
                      target.isContentEditable;
      if (isInput) return;

      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      } else if (e.key === '/') {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const t = navTranslations[lang];

  return (
    <nav className={`${styles.nav} ${(scrolled || theme === 'light') ? styles.scrolled : ''}`}>
      <Link href="/" className={styles.logo} aria-label="Injustice Reform Network Home">
        <img src="/irn-criminal-injustice/logo.png" alt="" aria-hidden="true" style={{ height: '44px', width: 'auto' }} />
        <span className={styles.logoText}>IRN</span>
      </Link>

      <div className={styles.links}>
        <Link href="/" className={styles.link}>{t.home}</Link>
        <Link href="/surveillance-map" className={styles.link}>{t.surveillanceMap}</Link>
        <Link href="/mutual-aid" className={styles.link}>{t.mutualAid}</Link>

        <div className={styles.dropdown}>
          <button className={styles.link} aria-haspopup="true" aria-expanded="false">{t.whatWeDo}</button>
          <div className={styles.dropdownMenu}>
            <Link href="/criminal-injustice" className={styles.dropdownItem}>{t.criminalInjustice}</Link>
            <Link href="/environmental" className={styles.dropdownItem}>{t.environmentalInjustice}</Link>
            <Link href="/family" className={styles.dropdownItem}>{t.familyPolicing}</Link>
            <Link href="/homelessness" className={styles.dropdownItem}>{t.homelessnessPrevention}</Link>
          </div>
        </div>

        <div className={styles.dropdown}>
          <button className={styles.link} aria-haspopup="true" aria-expanded="false">{t.resources}</button>
          <div className={styles.dropdownMenu}>
            <Link href="/resources" className={styles.dropdownItem}>{t.resourceLibrary}</Link>
            <Link href="/know-your-rights" className={styles.dropdownItem}>{t.knowYourRights}</Link>
            <Link href="/conoce-tus-derechos" className={styles.dropdownItem}>{t.conoceTusDerechos}</Link>
            <Link href="/attorneys" className={styles.dropdownItem}>{t.attorneys}</Link>
            <Link href="/foia" className={styles.dropdownItem}>{t.foia}</Link>
            <Link href="/ebony-parker" className={styles.dropdownItem}>{t.ebonyParker}</Link>
            <Link href="/impact" className={styles.dropdownItem}>{t.impact}</Link>
          </div>
        </div>

        <Link href="/services" className={styles.link}>{t.services}</Link>
        <Link href="/booking" className={styles.link}>{t.bookIntake}</Link>
        <Link href="/agents" className={styles.link}>{t.aiAgents}</Link>
        <Link href="/campaigns" className={styles.link}>{t.campaigns}</Link>
        <Link href="/events" className={styles.link}>{t.events}</Link>
        <Link href="/blog" className={styles.link}>{t.blog}</Link>
        <Link href="/chapters" className={styles.link}>{t.chapters}</Link>
        <Link href="/about" className={styles.link}>{t.about}</Link>
        <Link href="/contact" className={styles.link}>{t.contact}</Link>
        <Link href="/newsletter" className={styles.link}>{t.newsletter}</Link>
        <button 
          onClick={() => setSearchOpen(true)} 
          className={styles.link}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', cursor: 'pointer', border: 'none', background: 'none' }}
          aria-label={t.openSearch}
        >
          <Search size={16} /> {t.search}
        </button>
        <div className={styles.controls}>
          <button 
            onClick={toggleTheme} 
            className={styles.controlBtn} 
            aria-label={theme === 'dark' ? `Switch to light theme` : `Switch to dark theme`}
          >
            {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
            <span style={{ textTransform: 'capitalize' }}>{theme === 'dark' ? t.lightTheme : t.darkTheme}</span>
          </button>
          <button 
            onClick={toggleLang} 
            className={styles.controlBtn} 
            aria-label={t.changeLang}
          >
            <Globe size={14} />
            <span>{lang === 'en' ? 'ES' : 'EN'}</span>
          </button>
        </div>
      </div>

      <Link href="/donate" className={styles.donateBtn}>{t.donate}</Link>

      <button 
        className={styles.mobileSearchBtn} 
        onClick={() => setSearchOpen(true)}
        aria-label={t.openSearch}
      >
        <Search size={24} />
      </button>

      <button 
        className={styles.mobileMenuBtn} 
        onClick={() => setMobileOpen(true)}
        aria-label={t.openMobile}
      >
        <Menu size={28} />
      </button>

      <div className={`${styles.mobileOverlay} ${mobileOpen ? styles.open : ''}`}>
        <button className={styles.mobileCloseBtn} onClick={() => setMobileOpen(false)} aria-label={t.closeMobile}>
          <X size={32} />
        </button>
        <div className={styles.mobileLinks}>
          <Link href="/" className={styles.mobileLink} onClick={() => setMobileOpen(false)}>{t.home}</Link>
          <Link href="/surveillance-map" className={styles.mobileLink} onClick={() => setMobileOpen(false)}>{t.surveillanceMap}</Link>
          <Link href="/mutual-aid" className={styles.mobileLink} onClick={() => setMobileOpen(false)}>{t.mutualAid}</Link>

          <div className={styles.mobileLink}>{t.whatWeDo}
            <div className={styles.mobileSublinks}>
              <Link href="/criminal-injustice" className={styles.mobileSublink} onClick={() => setMobileOpen(false)}>{t.criminalInjustice}</Link>
              <Link href="/environmental" className={styles.mobileSublink} onClick={() => setMobileOpen(false)}>{t.environmentalInjustice}</Link>
              <Link href="/family" className={styles.mobileSublink} onClick={() => setMobileOpen(false)}>{t.familyPolicing}</Link>
              <Link href="/homelessness" className={styles.mobileSublink} onClick={() => setMobileOpen(false)}>{t.homelessnessPrevention}</Link>
            </div>
          </div>

          <div className={styles.mobileLink}>{t.resources}
            <div className={styles.mobileSublinks}>
              <Link href="/resources" className={styles.mobileSublink} onClick={() => setMobileOpen(false)}>{t.resourceLibrary}</Link>
              <Link href="/know-your-rights" className={styles.mobileSublink} onClick={() => setMobileOpen(false)}>{t.knowYourRights}</Link>
              <Link href="/conoce-tus-derechos" className={styles.mobileSublink} onClick={() => setMobileOpen(false)}>{t.conoceTusDerechos}</Link>
              <Link href="/attorneys" className={styles.mobileSublink} onClick={() => setMobileOpen(false)}>{t.attorneys}</Link>
              <Link href="/foia" className={styles.mobileSublink} onClick={() => setMobileOpen(false)}>{t.foia}</Link>
              <Link href="/ebony-parker" className={styles.mobileSublink} onClick={() => setMobileOpen(false)}>{t.ebonyParker}</Link>
              <Link href="/impact" className={styles.mobileSublink} onClick={() => setMobileOpen(false)}>{t.impact}</Link>
            </div>
          </div>

          <Link href="/services" className={styles.mobileLink} onClick={() => setMobileOpen(false)}>{t.services}</Link>
          <Link href="/booking" className={styles.mobileLink} onClick={() => setMobileOpen(false)}>{t.bookIntake}</Link>
          <Link href="/agents" className={styles.mobileLink} onClick={() => setMobileOpen(false)}>{t.aiAgents}</Link>
          <Link href="/campaigns" className={styles.mobileLink} onClick={() => setMobileOpen(false)}>{t.campaigns}</Link>
          <Link href="/events" className={styles.mobileLink} onClick={() => setMobileOpen(false)}>{t.events}</Link>
          <Link href="/blog" className={styles.mobileLink} onClick={() => setMobileOpen(false)}>{t.blog}</Link>
          <Link href="/gallery" className={styles.mobileLink} onClick={() => setMobileOpen(false)}>Gallery</Link>
          <Link href="/chapters" className={styles.mobileLink} onClick={() => setMobileOpen(false)}>{t.chapters}</Link>
          <Link href="/about" className={styles.mobileLink} onClick={() => setMobileOpen(false)}>{t.about}</Link>
          <Link href="/contact" className={styles.mobileLink} onClick={() => setMobileOpen(false)}>{t.contact}</Link>
          <Link href="/newsletter" className={styles.mobileLink} onClick={() => setMobileOpen(false)}>{t.newsletter}</Link>
          <button 
            className={styles.mobileLink} 
            onClick={() => { setMobileOpen(false); setSearchOpen(true); }}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%', textAlign: 'left', cursor: 'pointer', border: 'none', background: 'none' }}
          >
            <Search size={22} /> {t.search}
          </button>
          <div className={styles.controls} style={{ marginTop: '1.5rem', padding: '0.5rem 0', justifyContent: 'flex-start' }}>
            <button 
              onClick={toggleTheme} 
              className={styles.controlBtn} 
              style={{ padding: '10px 16px', fontSize: '1rem' }}
              aria-label={theme === 'dark' ? `Switch to light theme` : `Switch to dark theme`}
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              <span style={{ textTransform: 'capitalize' }}>{theme === 'dark' ? t.lightTheme : t.darkTheme}</span>
            </button>
            <button 
              onClick={toggleLang} 
              className={styles.controlBtn} 
              style={{ padding: '10px 16px', fontSize: '1rem' }}
              aria-label={t.changeLang}
            >
              <Globe size={18} />
              <span>{lang === 'en' ? 'ES' : 'EN'}</span>
            </button>
          </div>
          <Link href="/donate" className={`${styles.donateBtn} mt-8 text-center`} onClick={() => setMobileOpen(false)} style={{ display: 'block' }}>{t.donate}</Link>
        </div>
      </div>
      <GlobalSearch isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </nav>
  );
}
