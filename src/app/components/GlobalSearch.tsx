'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X } from 'lucide-react';
import styles from './GlobalSearch.module.css';

export const SEARCH_INDEX = [
  {
    title: "Criminal Justice Reform",
    path: "/criminal-injustice/",
    category: "Main Page",
    tags: "home splash system broken, Virginia, Maryland, North Carolina, DC",
    snippet: "IRN documents harm, fights wrongful prosecution, and builds the intersectional infrastructure needed to protect marginalized communities."
  },
  {
    title: "Know Your Rights (KYR)",
    path: "/know-your-rights/",
    category: "Guides",
    tags: "miranda right to remain silent refuse search police stop traffic recording",
    snippet: "Understand your rights during traffic stops, police encounters, street questioning, and public protests."
  },
  {
    title: "Conoce Tus Derechos (KYR Spanish)",
    path: "/conoce-tus-derechos/",
    category: "Guides",
    tags: "derechos policia silencio registro grabacion español",
    snippet: "Conozca sus derechos constitucionales en encuentros con la policía y protestas."
  },
  {
    title: "Case File: Dr. Ebony Parker",
    path: "/ebony-parker/",
    category: "Case Studies",
    tags: "ebony parker court judge charges dismissed vindication",
    snippet: "Circuit Court Judge Rebecca Robinson dismisses all eight criminal charges against Dr. Ebony Parker. Ruling: no criminal act occurred."
  },
  {
    title: "FOIA Request Generator",
    path: "/foia/",
    category: "Tools",
    tags: "foia public records request letter agency sheriff police bodycam dispatch",
    snippet: "Draft legally precise Freedom of Information Act (FOIA) or state-specific requests for bodycam footage and arrest logs."
  },
  {
    title: "AI Agent Command Center",
    path: "/agents/",
    category: "Tools",
    tags: "ai agent command center analysis triage attorney matching press release",
    snippet: "Interact with our specialized AI agents: Intake Analyst, FOIA Generator, Attorney Matcher, and Campaign Press Writer."
  },
  {
    title: "Community Resource Library",
    path: "/resources/",
    category: "Resources",
    tags: "resource library directory community elders support legal help housing youth education pflag lgbtqia",
    snippet: "Find public resources, housing programs, legal help, crisis support, and community organizations across Maryland for all residents."
  },
  {
    title: "Book Intake Callback",
    path: "/booking/",
    category: "Services",
    tags: "booking intake callback contact attorney representation assistance",
    snippet: "Request a callback from IRN coordinators. If your case triggers the CJRRP, an attorney referral follows within 72 hours."
  },
  {
    title: "CHRT Secure Reporting Protocol",
    path: "/chrt/",
    category: "Services",
    tags: "chrt secure report police misconduct corporate abuse encrypt aes-256",
    snippet: "File a secure, encrypted report. Client-side AES-256-GCM encryption ensures your evidence is locked before leaving your device."
  },
  {
    title: "Active Campaigns",
    path: "/campaigns/",
    category: "Campaigns",
    tags: "campaign legislative voting rights mandatory reporting jfv pipeline",
    snippet: "Join IRN in active campaigns: No More Bars Voting Initiative, JFV Legislative Pipeline, and End Mandatory Reporting."
  },
  {
    title: "Events & Clinics",
    path: "/events/",
    category: "Community",
    tags: "events expungement clinic attorney consultations volunteer workshops",
    snippet: "Attend our upcoming events, including free legal expungement clinics, attorney consults, and community workshops."
  },
  {
    title: "About Injustice Reform Network",
    path: "/about/",
    category: "About",
    tags: "about irn mission values TGEPOC care team staff contact history",
    snippet: "Learn about our non-carceral framework, care-centered approach, and our team serving the mid-Atlantic region."
  },
  {
    title: "Volunteer Intake",
    path: "/volunteer/",
    category: "Get Involved",
    tags: "volunteer register skills fight community organizing legal advocacy tech data",
    snippet: "Plug into the network as an organizer, legal advocate, tech developer, translator, or media coordinator."
  },
  {
    title: "Chapters & Locations",
    path: "/chapters/",
    category: "Community",
    tags: "chapters baltimore Richmond hampton roads Norfolk Virginia beach",
    snippet: "Find a local IRN chapter or coordinate organizing in Baltimore, Richmond, Newport News, Norfolk, or DC."
  },
  {
    title: "Attorney Directory",
    path: "/attorneys/",
    category: "Directory",
    tags: "attorneys lawyer directory civil rights pro bono defense virginia md nc dc",
    snippet: "Browse and search our directory of partner civil rights attorneys in Virginia, Maryland, North Carolina, and Washington DC."
  },
  {
    title: "News & Blog",
    path: "/blog/",
    category: "Media",
    tags: "blog news updates press releases court victories dispatch newsletter",
    snippet: "Read the latest news, press releases, court victory statements, and updates from our community organizers."
  }
];

interface GlobalSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

const searchTranslations = {
  en: {
    placeholder: "Search resources, cases, rights guides...",
    noQuery: "Type keywords to search across the entire IRN platform...",
    noResults: "No results found for",
    tryAnother: "Try another search term.",
    tipNavigate: "Navigate with your mouse or keyboard",
    tipClose: "Close with",
    closeBtn: "Close search",
  },
  es: {
    placeholder: "Buscar recursos, casos, guías de derechos...",
    noQuery: "Escriba palabras clave para buscar en toda la plataforma de IRN...",
    noResults: "No se encontraron resultados para",
    tryAnother: "Intente con otro término.",
    tipNavigate: "Navegue con el ratón o el teclado",
    tipClose: "Cerrar con",
    closeBtn: "Cerrar búsqueda",
  }
};

export default function GlobalSearch({ isOpen, onClose }: GlobalSearchProps) {
  const [query, setQuery] = useState('');
  const [lang, setLang] = useState<'en' | 'es'>('en');
  const inputRef = useRef<HTMLInputElement>(null);

  // Sync language from localStorage on mount and listen to changes
  useEffect(() => {
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

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Handle escape key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const filteredResults = query.trim() === ''
    ? []
    : SEARCH_INDEX.filter(item => {
        const q = query.toLowerCase();
        return (
          item.title.toLowerCase().includes(q) ||
          item.tags.toLowerCase().includes(q) ||
          item.snippet.toLowerCase().includes(q)
        );
      });

  const t = searchTranslations[lang];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.searchOverlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className={styles.searchContainer}
            initial={{ y: -50, scale: 0.95 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ y: -50, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            onClick={e => e.stopPropagation()}
          >
            {/* Header Input */}
            <div style={{ display: 'none' }} />
            <div className={styles.searchHeader}>
              <Search className={styles.searchIcon} size={20} />
              <input
                ref={inputRef}
                type="text"
                className={styles.searchInput}
                placeholder={t.placeholder}
                value={query}
                onChange={e => setQuery(e.target.value)}
              />
              <button className={styles.closeButton} onClick={onClose} aria-label={t.closeBtn}>
                <X size={20} />
              </button>
            </div>

            {/* Results */}
            <div className={styles.searchResults}>
              {query.trim() === '' ? (
                <div className={styles.noResults}>
                  {t.noQuery}
                </div>
              ) : filteredResults.length > 0 ? (
                filteredResults.map((result, idx) => (
                  <Link
                    key={idx}
                    href={result.path}
                    className={styles.resultItem}
                    onClick={onClose}
                  >
                    <div className={styles.resultHeader}>
                      <span className={styles.resultTitle}>{result.title}</span>
                      <span className={styles.resultCategory}>{result.category}</span>
                    </div>
                    <p className={styles.resultSnippet}>{result.snippet}</p>
                  </Link>
                ))
              ) : (
                <div className={styles.noResults}>
                  {t.noResults} &ldquo;{query}&rdquo;. {t.tryAnother}
                </div>
              )}
            </div>

            {/* Footer tips */}
            <div className={styles.searchTip}>
              <span>{t.tipNavigate}</span>
              <span>
                {t.tipClose} <span className={styles.tipKey}>ESC</span>
              </span>
            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
