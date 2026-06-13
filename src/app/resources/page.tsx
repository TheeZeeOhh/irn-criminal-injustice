'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import { 
  Search, X, Briefcase, Heart, Activity, Home, Users, Scale, 
  GraduationCap, Calendar, Award, HeartHandshake, Sparkles, 
  ExternalLink, Download, Send, Info
} from 'lucide-react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import styles from '../criminal-injustice/page.module.css';
import rStyles from './resources.module.css';
import resourcesDataRaw from '../data/lgbtqia-resources.json';
import { getSupabase } from '../lib/supabase';

interface ResourceItem {
  title: string;
  url: string;
  download: boolean;
  external: boolean;
  description: string;
}

interface ResourceSection {
  section_title: string;
  items: ResourceItem[];
}

interface CategoryData {
  page_title: string;
  sections: ResourceSection[];
}

type ResourcesData = Record<string, CategoryData>;

const resourcesData = resourcesDataRaw as ResourcesData;

const translations: Record<string, Record<string, string>> = {
  en: {
    kicker: "Mutual Aid & Community Resources",
    title: "Maryland Community Resource Library",
    subtitle: "A comprehensive, community-vetted directory of public healthcare, legal aid, housing programs, youth networks, senior support, and mutual aid across Maryland for all residents.",
    searchPlaceholder: "Search resources by name, keywords, or service description...",
    categories: "Categories",
    searchResults: "Search Results",
    found: "Found",
    resource: "resource",
    resources: "resources",
    noResults: "No resources found matching",
    tryAnother: "Try another term.",
    available: "resources available",
    visitWebsite: "Visit Website",
    resourceGuide: "Resource Guide",
    proposeTitle: "Propose a Public Resource",
    proposeDesc: "Are we missing a valuable advocacy tool, community center, legal clinics, or support service? Submit a proposal to enrich our public mutual-aid library.",
    formTitle: "Resource Name",
    formUrl: "Website URL",
    formCategory: "Category",
    formDesc: "Resource Description",
    formPlaceholder: "Detail the scope of services, eligibility criteria, locations, or support formats offered...",
    submitting: "Submitting...",
    submitBtn: "Submit Resource Proposal",
    importantNote: "Important: All submissions are reviewed by IRN coordinators prior to publication.",
    successToast: "Resource proposal submitted successfully!",
    errorToast: "Database connection unavailable, caching proposal in localStorage:",
    cacheToast: "Proposal cached in local storage!",
  },
  es: {
    kicker: "Ayuda Mutua y Recursos Comunitarios",
    title: "Biblioteca de Recursos Comunitarios de Maryland",
    subtitle: "Un directorio completo y examinado por la comunidad de salud pública, ayuda legal, programas de vivienda, redes de jóvenes, apoyo para personas mayores y ayuda mutua en todo Maryland para todos los residentes.",
    searchPlaceholder: "Buscar recursos por nombre, palabras clave o descripción...",
    categories: "Categorías",
    searchResults: "Resultados de la Búsqueda",
    found: "Encontrado",
    resource: "recurso",
    resources: "recursos",
    noResults: "No se encontraron recursos que coincidan con",
    tryAnother: "Intente con otro término.",
    available: "recursos disponibles",
    visitWebsite: "Visitar Sitio Web",
    resourceGuide: "Guía de Recursos",
    proposeTitle: "Proponer un Recurso Público",
    proposeDesc: "¿Nos falta alguna herramienta valiosa de defensa, centro comunitario, clínicas legales o servicio de apoyo? Envíe una propuesta para enriquecer nuestra biblioteca pública de ayuda mutua.",
    formTitle: "Nombre del Recurso",
    formUrl: "URL del Sitio Web",
    formCategory: "Categoría",
    formDesc: "Descripción del Recurso",
    formPlaceholder: "Detalle el alcance de los servicios, los criterios de elegibilidad, las ubicaciones o los formatos de apoyo ofrecidos...",
    submitting: "Enviando...",
    submitBtn: "Enviar Propuesta de Recurso",
    importantNote: "Importante: Todas las propuestas son revisadas por los coordinadores de IRN antes de su publicación.",
    successToast: "¡Propuesta de recurso enviada con éxito!",
    errorToast: "Conexión a la base de datos no disponible, guardando en almacenamiento local:",
    cacheToast: "¡Propuesta guardada en el almacenamiento local!",
  }
};

const categoryTranslations: Record<string, Record<string, string>> = {
  en: {
    'elders': 'Elders',
    'employment': 'Employment',
    'health-and-crisis-support': 'Health and Crisis Support',
    'housing': 'Housing',
    'organizations-pride-centers': 'LGBTQIA+ Organizations & Pride Centers',
    'pflag-chapters': 'PFLAG Chapters',
    'trans-and-intersex': 'Trans and Intersex',
    'veterans': 'Veterans',
    'your-rights-and-legal-help': 'Your Rights and Legal Help',
    'youth-education': 'Youth & Education',
    'events-programs': 'Events & Programs',
  },
  es: {
    'elders': 'Personas Mayores',
    'employment': 'Empleo',
    'health-and-crisis-support': 'Salud y Soporte de Crisis',
    'housing': 'Vivienda',
    'organizations-pride-centers': 'Organizaciones LGBTQIA+ y Centros de Orgullo',
    'pflag-chapters': 'Capítulos de PFLAG',
    'trans-and-intersex': 'Trans e Intersexo',
    'veterans': 'Veteranos',
    'your-rights-and-legal-help': 'Sus Derechos y Ayuda Legal',
    'youth-education': 'Juventud y Educación',
    'events-programs': 'Eventos y Programas',
  }
};

const sectionTranslations: Record<string, Record<string, string>> = {
  en: {
    "Resources for LGBTQIA+ elders": "Resources for LGBTQIA+ elders",
    "LGBTQIA+ employment resources": "LGBTQIA+ employment resources",
    "Health and crisis support resources": "Health and crisis support resources",
    "LGBTQIA+ housing resources": "LGBTQIA+ housing resources",
    "Resources": "Resources",
    "PFLAG chapters in Maryland": "PFLAG chapters in Maryland",
    "Trans and intersex resources": "Trans and intersex resources",
    "Resources for LGBTQIA+ veterans": "Resources for LGBTQIA+ veterans",
    "Rights and legal resources": "Rights and legal resources",
    "Youth & education resources": "Youth & education resources",
    "Maryland State Department of Education": "Maryland State Department of Education",
    "Maryland LGBTQIA+ Pride Observances": "Maryland LGBTQIA+ Pride Observances",
  },
  es: {
    "Resources for LGBTQIA+ elders": "Recursos para personas mayores LGBTQIA+",
    "LGBTQIA+ employment resources": "Recursos de empleo LGBTQIA+",
    "Health and crisis support resources": "Recursos de salud y soporte de crisis",
    "LGBTQIA+ housing resources": "Recursos de vivienda LGBTQIA+",
    "Resources": "Recursos",
    "PFLAG chapters in Maryland": "Capítulos de PFLAG en Maryland",
    "Trans and intersex resources": "Recursos para personas trans e intersexo",
    "Resources for LGBTQIA+ veterans": "Recursos para veteranos LGBTQIA+",
    "Rights and legal resources": "Recursos legales y de derechos",
    "Youth & education resources": "Recursos de juventud y educación",
    "Maryland State Department of Education": "Departamento de Educación del Estado de Maryland",
    "Maryland LGBTQIA+ Pride Observances": "Celebraciones del Orgullo LGBTQIA+ en Maryland",
  }
};

const categoryConfig: Record<string, { icon: React.ReactNode; color: string }> = {
  'elders': { icon: <Heart size={16} />, color: 'var(--rose)' },
  'employment': { icon: <Briefcase size={16} />, color: 'var(--sage)' },
  'health-and-crisis-support': { icon: <Activity size={16} />, color: 'var(--ember)' },
  'housing': { icon: <Home size={16} />, color: 'var(--gold)' },
  'organizations-pride-centers': { icon: <Users size={16} />, color: 'var(--violet)' },
  'pflag-chapters': { icon: <HeartHandshake size={16} />, color: 'var(--teal)' },
  'trans-and-intersex': { icon: <Sparkles size={16} />, color: 'var(--gold-l)' },
  'veterans': { icon: <Award size={16} />, color: 'var(--sage)' },
  'your-rights-and-legal-help': { icon: <Scale size={16} />, color: 'var(--gold)' },
  'youth-education': { icon: <GraduationCap size={16} />, color: 'var(--violet)' },
  'events-programs': { icon: <Calendar size={16} />, color: 'var(--ember)' },
};

export default function ResourcesPage() {
  const categoryKeys = useMemo(() => Object.keys(resourcesData), []);
  
  const [activeCategory, setActiveCategory] = useState(categoryKeys[0] || 'elders');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Proposal form state
  const [propTitle, setPropTitle] = useState('');
  const [propUrl, setPropUrl] = useState('');
  const [propCategory, setPropCategory] = useState(categoryKeys[0] || 'elders');
  const [propDesc, setPropDesc] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const [lang, setLang] = useState<'en' | 'es'>('en');

  // Sync theme and language from localStorage on mount and listen to changes
  useEffect(() => {
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

  // Update document title for SEO
  useEffect(() => {
    document.title = lang === 'es' 
      ? "Biblioteca de Recursos Comunitarios de Maryland | IRN"
      : "Maryland Community Resource Library | IRN";
  }, [lang]);

  // Flatten database for search lookup
  const allResources = useMemo(() => {
    const list: Array<{
      categoryKey: string;
      categoryName: string;
      sectionTitle: string;
      title: string;
      url: string;
      download: boolean;
      external: boolean;
      description: string;
    }> = [];

    Object.entries(resourcesData).forEach(([catKey, catData]) => {
      catData.sections.forEach(sec => {
        sec.items.forEach(item => {
          list.push({
            categoryKey: catKey,
            categoryName: catData.page_title,
            sectionTitle: sec.section_title,
            ...item
          });
        });
      });
    });

    return list;
  }, []);

  // Filter search results based on query
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    return allResources.filter(item => 
      item.title.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      item.categoryName.toLowerCase().includes(q)
    );
  }, [searchQuery, allResources]);

  // Group search results by category for categorized search view
  const groupedSearchResults = useMemo(() => {
    const groups: Record<string, typeof searchResults> = {};
    searchResults.forEach(item => {
      if (!groups[item.categoryName]) {
        groups[item.categoryName] = [];
      }
      groups[item.categoryName].push(item);
    });
    return groups;
  }, [searchResults]);

  // Submit proposed resource proposal
  const handleSubmitProposal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!propTitle.trim() || !propUrl.trim() || !propDesc.trim()) return;
    setSubmitting(true);

    const payload = {
      title: propTitle.trim(),
      url: propUrl.trim(),
      category: propCategory,
      description: propDesc.trim(),
      proposed_at: new Date().toISOString()
    };

    try {
      const sb = getSupabase();
      if (sb) {
        // Submit to Supabase table
        const { error } = await sb.from('maryland_proposed_resources').insert([
          { payload, created_at: new Date().toISOString() }
        ]);
        if (error) throw error;
      } else {
        // Fallback: Post to local API route
        const response = await fetch('/api/db/maryland_proposed_resources', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + btoa('irn_staff:IRNSanctuary2026!')
          },
          body: JSON.stringify({
            action: 'insert',
            row: {
              id: 'res_' + Math.random().toString(36).substr(2, 9),
              payload,
              created_at: new Date().toISOString()
            }
          })
        });
        if (!response.ok) {
          throw new Error('Local database endpoint not available.');
        }
      }

      setToastMessage(translations[lang].successToast);
      setPropTitle('');
      setPropUrl('');
      setPropDesc('');
    } catch (err) {
      console.warn('Database connection unavailable, caching proposal in localStorage:', err);
      // Fallback: Cache in local storage
      try {
        const cached = JSON.parse(localStorage.getItem('proposed_resources') || '[]');
        cached.push(payload);
        localStorage.setItem('proposed_resources', JSON.stringify(cached));
      } catch (storageErr) {
        console.error('LocalStorage write failed:', storageErr);
      }
      
      setToastMessage(translations[lang].cacheToast);
      setPropTitle('');
      setPropUrl('');
      setPropDesc('');
    } finally {
      setSubmitting(false);
    }
  };

  // Toast auto-clear
  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(''), 4000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  return (
    <>
      <Nav />
      <main id="main-content" className={styles.main} style={{ minHeight: '100vh', backgroundColor: 'var(--bg)' }}>
        
        {/* Hero Section */}
        <section className={rStyles.hero}>
          <div className={rStyles.container}>
            <span className={styles.sectionKicker}>{translations[lang].kicker}</span>
            <h1 className={rStyles.title}>{translations[lang].title}</h1>
            <p className={rStyles.subtitle}>
              {translations[lang].subtitle}
            </p>

            {/* Search Input */}
            <div className={rStyles.searchWrapper} ref={dropdownRef}>
              <div className={`${rStyles.searchBar} ${searchFocused ? rStyles.searchBarFocused : ''}`}>
                <Search size={18} className={rStyles.searchIcon} style={{ color: searchFocused ? 'var(--gold)' : 'var(--ink3)', flexShrink: 0 }} />
                <input
                  type="text"
                  className={rStyles.searchInput}
                  placeholder={translations[lang].searchPlaceholder}
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
                  id="resources-search-field"
                />
                {searchQuery && (
                  <button 
                    className={rStyles.clearButton} 
                    onClick={() => setSearchQuery('')}
                    aria-label="Clear search"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Directory Grid Layout */}
        <section className={styles.section} style={{ paddingTop: '0' }}>
          <div className={rStyles.container}>
            <div className={rStyles.layout}>
              
              {/* Sidebar filter list */}
              <aside className={rStyles.sidebar}>
                <h2 className={rStyles.sidebarTitle}>{translations[lang].categories}</h2>
                <nav className={rStyles.categoryList} aria-label="Resource categories">
                  {categoryKeys.map(key => {
                    const isActive = activeCategory === key && !searchQuery.trim();
                    const config = categoryConfig[key] || { icon: <Info size={16} />, color: 'var(--gold)' };
                    return (
                      <button
                        key={key}
                        className={`${rStyles.categoryButton} ${isActive ? rStyles.categoryButtonActive : ''}`}
                        onClick={() => {
                          setActiveCategory(key);
                          setSearchQuery(''); // Clear search when tab changes
                        }}
                      >
                        <span className={rStyles.categoryIcon} style={{ color: config.color }}>
                          {config.icon}
                        </span>
                        {categoryTranslations[lang][key] || resourcesData[key].page_title}
                      </button>
                    );
                  })}
                </nav>
              </aside>

              {/* Resource Content Area */}
              <div className={rStyles.contentArea}>
                {searchQuery.trim() ? (
                  // Search Results View
                  <div>
                    <div className={rStyles.sectionHeader}>
                      <h2 className={rStyles.sectionTitle}>
                        {translations[lang].searchResults}
                      </h2>
                      <span className={rStyles.sectionCount}>
                        {translations[lang].found} {searchResults.length} {searchResults.length === 1 ? translations[lang].resource : translations[lang].resources}
                      </span>
                    </div>

                    {searchResults.length > 0 ? (
                      Object.entries(groupedSearchResults).map(([catName, items]) => (
                        <div key={catName} style={{ marginBottom: '2.5rem' }}>
                          <h3 style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--gold)', letterSpacing: '0.1em', marginBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.25rem' }}>
                            {categoryTranslations[lang][Object.keys(resourcesData).find(k => resourcesData[k].page_title === catName) || ''] || catName}
                          </h3>
                          <div className={rStyles.cardsGrid}>
                            {items.map((item, idx) => (
                              <div key={idx} className={rStyles.card}>
                                <div className={rStyles.cardHeader}>
                                  <span className={rStyles.cardCategoryBadge}>{sectionTranslations[lang][item.sectionTitle] || item.sectionTitle}</span>
                                  <h4 className={rStyles.cardTitle}>
                                    {item.url ? (
                                      <a href={item.url} target="_blank" rel="noopener noreferrer" className={rStyles.cardTitleLink}>
                                        {item.title}
                                      </a>
                                    ) : item.title}
                                  </h4>
                                  <p className={rStyles.cardDescription}>{item.description}</p>
                                </div>
                                <div className={rStyles.cardActions}>
                                  {item.url && (
                                    <a
                                      href={item.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className={`${rStyles.actionButton} ${rStyles.actionButtonPrimary}`}
                                    >
                                      {translations[lang].visitWebsite} <ExternalLink size={12} />
                                    </a>
                                  )}
                                  {item.download && (
                                    <span className={`${rStyles.actionButton} ${rStyles.actionButtonSecondary}`}>
                                      {translations[lang].resourceGuide} <Download size={12} />
                                    </span>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className={rStyles.noResults}>
                        {translations[lang].noResults} &ldquo;{searchQuery}&rdquo;. {translations[lang].tryAnother}
                      </div>
                    )}
                  </div>
                ) : (
                  // Category Tab View
                  <div>
                    <div className={rStyles.sectionHeader}>
                      <h2 className={rStyles.sectionTitle}>
                        {categoryTranslations[lang][activeCategory] || resourcesData[activeCategory]?.page_title}
                      </h2>
                      <span className={rStyles.sectionCount}>
                        {resourcesData[activeCategory]?.sections.reduce((acc, sec) => acc + sec.items.length, 0)} {translations[lang].available}
                      </span>
                    </div>

                    {resourcesData[activeCategory]?.sections.map((sec, sIdx) => (
                      <div key={sIdx} style={{ marginBottom: '2.5rem' }}>
                        <h3 style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--ink3)', letterSpacing: '0.1em', marginBottom: '1.25rem' }}>
                          {sectionTranslations[lang][sec.section_title] || sec.section_title}
                        </h3>
                        <div className={rStyles.cardsGrid}>
                          {sec.items.map((item, idx) => (
                            <div key={idx} className={rStyles.card}>
                              <div className={rStyles.cardHeader}>
                                <h4 className={rStyles.cardTitle}>
                                  {item.url ? (
                                    <a href={item.url} target="_blank" rel="noopener noreferrer" className={rStyles.cardTitleLink}>
                                      {item.title}
                                    </a>
                                  ) : item.title}
                                </h4>
                                <p className={rStyles.cardDescription}>{item.description}</p>
                              </div>
                              <div className={rStyles.cardActions}>
                                {item.url && (
                                  <a
                                    href={item.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`${rStyles.actionButton} ${rStyles.actionButtonPrimary}`}
                                  >
                                    {translations[lang].visitWebsite} <ExternalLink size={12} />
                                  </a>
                                )}
                                {item.download && (
                                  <span className={`${rStyles.actionButton} ${rStyles.actionButtonSecondary}`}>
                                    {translations[lang].resourceGuide} <Download size={12} />
                                  </span>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>

            {/* Proposal Form Section */}
            <div className={rStyles.proposalSection}>
              <div className={rStyles.proposalCard}>
                <h3 className={rStyles.proposalTitle}>{translations[lang].proposeTitle}</h3>
                <p className={rStyles.proposalDesc}>
                  {translations[lang].proposeDesc}
                </p>

                <form onSubmit={handleSubmitProposal} className={rStyles.formGrid} id="proposal-form">
                  <div className={rStyles.formGroup}>
                    <label className={rStyles.label} htmlFor="prop-title">{translations[lang].formTitle}</label>
                    <input
                      id="prop-title"
                      type="text"
                      className={rStyles.input}
                      required
                      placeholder={lang === 'es' ? 'ej. Centro de Orgullo de Baltimore' : 'e.g. Baltimore Pride Center'}
                      value={propTitle}
                      onChange={e => setPropTitle(e.target.value)}
                    />
                  </div>

                  <div className={rStyles.formGroup}>
                    <label className={rStyles.label} htmlFor="prop-url">{translations[lang].formUrl}</label>
                    <input
                      id="prop-url"
                      type="url"
                      className={rStyles.input}
                      required
                      placeholder="https://example.org"
                      value={propUrl}
                      onChange={e => setPropUrl(e.target.value)}
                    />
                  </div>

                  <div className={rStyles.formGroupFull}>
                    <div className={rStyles.formGroup}>
                      <label className={rStyles.label} htmlFor="prop-category">{translations[lang].formCategory}</label>
                      <select
                        id="prop-category"
                        className={rStyles.select}
                        value={propCategory}
                        onChange={e => setPropCategory(e.target.value)}
                      >
                        {categoryKeys.map(key => (
                          <option key={key} value={key}>
                            {categoryTranslations[lang][key] || resourcesData[key].page_title}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className={rStyles.formGroupFull}>
                    <div className={rStyles.formGroup}>
                      <label className={rStyles.label} htmlFor="prop-desc">{translations[lang].formDesc}</label>
                      <textarea
                        id="prop-desc"
                        rows={4}
                        className={rStyles.textarea}
                        required
                        placeholder={translations[lang].formPlaceholder}
                        value={propDesc}
                        onChange={e => setPropDesc(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className={rStyles.formGroupFull} style={{ display: 'flex', justifyContent: 'center' }}>
                    <button
                      type="submit"
                      className={rStyles.submitButton}
                      disabled={submitting || !propTitle.trim() || !propUrl.trim() || !propDesc.trim()}
                    >
                      {submitting ? translations[lang].submitting : translations[lang].submitBtn}
                      <Send size={14} />
                    </button>
                  </div>
                </form>
              </div>
            </div>

          </div>
        </section>

      </main>
      <Footer />

      {toastMessage && (
        <div className={rStyles.toast} id="resource-toast">
          <Sparkles size={16} style={{ color: 'var(--gold)' }} />
          <span>{toastMessage}</span>
        </div>
      )}
    </>
  );
}
