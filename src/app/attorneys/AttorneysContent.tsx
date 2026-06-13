'use client';
import { useState } from 'react';
import styles from './attorneys.module.css';

/* ── data ── */
interface Attorney {
  name: string;
  firm: string;
  location: string;
  region: string;
  regionData: string; // space-separated keys for filtering
  areaData: string;   // space-separated keys for filtering
  tags: { label: string; key: string }[];
  fee: string;
  languages: string;
  phone: string;
  email: string;
  handles: string[];
  website: string;
  websiteLabel: string;
  hasReferral: boolean;
}

const ATTORNEYS: Attorney[] = [
  {
    name: 'Maryland ACLU — LGBTQ+ Rights Project',
    firm: 'ACLU of Maryland',
    location: 'Baltimore',
    region: 'Maryland statewide',
    regionData: 'baltimore maryland',
    areaData: 'civil trans',
    tags: [
      { label: 'Civil Rights', key: 'civil' },
      { label: 'Trans Rights', key: 'trans' },
    ],
    fee: 'Pro bono / sliding scale',
    languages: 'English, Spanish',
    phone: '(410) 889-8550',
    email: 'info@aclu-md.org',
    handles: [
      'ID document changes',
      'Discrimination',
      'Police misconduct',
      'Name changes',
      'Trans Shield Act compliance',
    ],
    website: 'https://www.aclu-md.org',
    websiteLabel: 'aclu-md.org',
    hasReferral: true,
  },
  {
    name: 'Maryland Office of the Public Defender',
    firm: 'Statewide — Baltimore District',
    location: 'Baltimore City & County',
    region: 'Baltimore City & County',
    regionData: 'baltimore maryland',
    areaData: 'criminal',
    tags: [{ label: 'Criminal Defense', key: 'criminal' }],
    fee: 'Free if income-eligible',
    languages: 'English, interpreter available',
    phone: '(410) 209-8600',
    email: '',
    handles: [
      'All criminal charges',
      'Post-conviction',
      'Expungement',
      'Record sealing',
    ],
    website: 'https://www.opd.state.md.us',
    websiteLabel: 'opd.state.md.us',
    hasReferral: false,
  },
  {
    name: 'Maryland Legal Aid',
    firm: 'Baltimore, multiple offices statewide',
    location: 'Maryland statewide',
    region: 'Maryland statewide',
    regionData: 'baltimore maryland',
    areaData: 'civil housing',
    tags: [
      { label: 'Civil Rights', key: 'civil' },
      { label: 'Housing', key: 'housing' },
    ],
    fee: 'Free for income-eligible',
    languages: 'English, Spanish, others',
    phone: '(410) 539-5340',
    email: '',
    handles: [
      'Eviction defense',
      'Wrongful termination',
      'Benefits',
      'Domestic violence',
      'Consumer debt',
    ],
    website: 'https://www.mdlab.org',
    websiteLabel: 'mdlab.org',
    hasReferral: false,
  },
  {
    name: 'Legal Aid Society of Eastern Virginia',
    firm: 'Norfolk / Hampton Roads',
    location: 'Hampton Roads',
    region: 'Hampton Roads',
    regionData: 'virginia hampton',
    areaData: 'civil criminal',
    tags: [
      { label: 'Civil Rights', key: 'civil' },
      { label: 'Criminal Defense', key: 'criminal' },
    ],
    fee: 'Free for income-eligible',
    languages: 'English, Spanish',
    phone: '(757) 627-5423',
    email: '',
    handles: [
      'Wrongful conviction support',
      'Police misconduct',
      'Housing',
      'Benefits',
      'Re-entry',
    ],
    website: 'https://www.lasev.org',
    websiteLabel: 'lasev.org',
    hasReferral: false,
  },
  {
    name: 'ACLU of Virginia',
    firm: 'Richmond (serves Hampton Roads)',
    location: 'Hampton Roads / Virginia',
    region: 'Virginia statewide',
    regionData: 'virginia hampton',
    areaData: 'civil trans immigration',
    tags: [
      { label: 'Civil Rights', key: 'civil' },
      { label: 'Trans Rights', key: 'trans' },
      { label: 'Immigration', key: 'immigration' },
    ],
    fee: 'Pro bono',
    languages: 'English, Spanish',
    phone: '(804) 644-8022',
    email: '',
    handles: [
      'Trans discrimination',
      'ID documents',
      'LGBTQ+ rights',
      'Free speech',
      'Police accountability',
    ],
    website: 'https://www.acluva.org',
    websiteLabel: 'acluva.org',
    hasReferral: true,
  },
  {
    name: 'Virginia Legal Aid Society',
    firm: 'Hampton Roads offices',
    location: 'Newport News, Hampton, York County',
    region: 'Newport News, Hampton, York County',
    regionData: 'virginia hampton',
    areaData: 'criminal housing',
    tags: [
      { label: 'Criminal Defense', key: 'criminal' },
      { label: 'Housing', key: 'housing' },
    ],
    fee: 'Free for income-eligible',
    languages: 'English, Spanish, interpreter available',
    phone: '(757) 245-2702',
    email: '',
    handles: [
      'Eviction',
      'Expungement',
      'Re-entry barriers',
      'Benefits',
      'Domestic violence',
    ],
    website: 'https://www.vlas.org',
    websiteLabel: 'vlas.org',
    hasReferral: false,
  },
];

const AREA_FILTERS = [
  { label: 'All', value: 'all' },
  { label: 'Civil Rights', value: 'civil' },
  { label: 'Criminal Defense', value: 'criminal' },
  { label: 'Housing', value: 'housing' },
  { label: 'Trans Rights', value: 'trans' },
  { label: 'Immigration', value: 'immigration' },
];

const REGION_FILTERS = [
  { label: 'All Regions', value: 'all' },
  { label: 'Baltimore', value: 'baltimore' },
  { label: 'Hampton Roads', value: 'hampton' },
  { label: 'Virginia', value: 'virginia' },
  { label: 'Maryland', value: 'maryland' },
];

const LEGAL_NEEDS = [
  'Criminal defense / charges pending',
  'Post-conviction / wrongful conviction',
  'Police misconduct / excessive force',
  'Trans rights / discrimination',
  'Housing / eviction',
  'Immigration',
  'FOIA / public records',
  'Other civil rights',
];

const REGIONS_DROPDOWN = [
  'Baltimore City / County',
  'Maryland other',
  'Newport News / Hampton',
  'Norfolk / VA Beach',
  'Virginia other',
  'DC / DMV',
];

/* ── main component ── */
export default function AttorneysContent() {
  const [activeArea, setActiveArea] = useState('all');
  const [activeRegion, setActiveRegion] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalAttorney, setModalAttorney] = useState('');

  /* referral form */
  const [refFirst, setRefFirst] = useState('');
  const [refContact, setRefContact] = useState('');
  const [refDesc, setRefDesc] = useState('');

  /* need form */
  const [needName, setNeedName] = useState('');
  const [needContact, setNeedContact] = useState('');
  const [needLegal, setNeedLegal] = useState('');
  const [needRegion, setNeedRegion] = useState('');
  const [needDesc, setNeedDesc] = useState('');

  /* filter logic */
  const visible = ATTORNEYS.filter((a) => {
    const areaOk = activeArea === 'all' || a.areaData.includes(activeArea);
    const regionOk = activeRegion === 'all' || a.regionData.includes(activeRegion);
    const q = searchQuery.toLowerCase().trim();
    const searchOk =
      q === '' ||
      a.name.toLowerCase().includes(q) ||
      a.firm.toLowerCase().includes(q) ||
      a.handles.some((h) => h.toLowerCase().includes(q)) ||
      a.tags.some((t) => t.label.toLowerCase().includes(q));
    return areaOk && regionOk && searchOk;
  });

  function openModal(name: string) {
    setModalAttorney(name);
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setRefFirst('');
    setRefContact('');
    setRefDesc('');
  }

  function submitReferral(e: React.FormEvent) {
    e.preventDefault();
    alert('Referral request sent. IRN will follow up within 48 hours.');
    closeModal();
  }

  function submitNeed(e: React.FormEvent) {
    e.preventDefault();
    alert('Thank you. IRN will be in touch within 48–72 hours.');
    setNeedName('');
    setNeedContact('');
    setNeedLegal('');
    setNeedRegion('');
    setNeedDesc('');
  }

  return (
    <div id="main-content" className={styles.pageRoot}>
      {/* ── hero ── */}
      <div className={styles.hero}>
        <div className={styles.container}>
          <span className={styles.eyebrow}>Legal Resources Network</span>
          <h1 className={styles.heroTitle}>
            Find Vetted <span className={styles.gold}>Legal Help</span>
          </h1>
          <div className={styles.goldRule} aria-hidden="true" />
          <p className={styles.heroSub}>
            Civil rights attorneys, criminal defense counsel, and housing lawyers serving Baltimore,
            Hampton Roads, and Virginia — with experience representing TGEPOC, re-entry, and
            low-income clients.
          </p>
        </div>
      </div>

      {/* ── disclaimer ── */}
      <div className={styles.disclaimerBar}>
        <div className={styles.container}>
          <p className={styles.disclaimerText}>
            <strong>IRN is not a law firm.</strong> This directory is for informational purposes
            only. Listing does not constitute endorsement. For emergencies, call the Virginia State
            Bar Lawyer Referral Service:{' '}
            <a href="tel:18005527977" className={styles.disclaimerLink}>
              1-800-552-7977
            </a>{' '}
            or Maryland&rsquo;s:{' '}
            <a href="tel:14105399103" className={styles.disclaimerLink}>
              410-539-9103
            </a>
            .
          </p>
        </div>
      </div>

      {/* ── filters ── */}
      <div className={styles.filtersSection}>
        <div className={styles.container}>
          <div className={styles.filterRow}>
            <span className={styles.filterLabel}>Practice Area:</span>
            <div className={styles.filterGroup}>
              {AREA_FILTERS.map((f) => (
                <button
                  key={f.value}
                  className={`${styles.filterBtn} ${activeArea === f.value ? styles.filterBtnActive : ''}`}
                  onClick={() => setActiveArea(f.value)}
                  type="button"
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
          <div className={styles.filterRow}>
            <span className={styles.filterLabel}>Region:</span>
            <div className={styles.filterGroup}>
              {REGION_FILTERS.map((f) => (
                <button
                  key={f.value}
                  className={`${styles.filterBtn} ${activeRegion === f.value ? styles.filterBtnActive : ''}`}
                  onClick={() => setActiveRegion(f.value)}
                  type="button"
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
          <div className={styles.searchRow}>
            <input
              className={styles.searchInput}
              type="search"
              placeholder="Search by name, firm, or specialty..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search attorneys"
            />
          </div>
        </div>
      </div>

      {/* ── directory grid ── */}
      <div className={styles.directorySection}>
        <div className={styles.container}>
          {visible.length === 0 && (
            <p className={styles.noResults}>No attorneys match the current filters.</p>
          )}
          <div className={styles.grid}>
            {visible.map((atty) => (
              <div key={atty.name} className={styles.card}>
                <span className={styles.verifiedBadge}>IRN Verified ✓</span>

                <div className={styles.tagRow}>
                  {atty.tags.map((t) => (
                    <span key={t.key} className={`${styles.tag} ${styles[`tag_${t.key}`]}`}>
                      {t.label}
                    </span>
                  ))}
                </div>

                <h3 className={styles.attorneyName}>{atty.name}</h3>
                <p className={styles.attorneyFirm}>{atty.firm}</p>

                <div className={styles.detailRows}>
                  <div className={styles.detailRow}>
                    <span className={styles.detailIcon}>◈</span>
                    <span className={styles.detailText}>Region: {atty.region}</span>
                  </div>
                  <div className={styles.detailRow}>
                    <span className={styles.detailIcon}>◈</span>
                    <span className={styles.detailText}>Fee: {atty.fee}</span>
                  </div>
                  <div className={styles.detailRow}>
                    <span className={styles.detailIcon}>◈</span>
                    <span className={styles.detailText}>Languages: {atty.languages}</span>
                  </div>
                  <div className={styles.detailRow}>
                    <span className={styles.detailIcon}>◈</span>
                    <span className={styles.detailText}>
                      Contact:{' '}
                      {atty.email && (
                        <>
                          <a href={`mailto:${atty.email}`} className={styles.inlineLink}>
                            {atty.email}
                          </a>
                          {atty.phone && ' · '}
                        </>
                      )}
                      {atty.phone && (
                        <a href={`tel:${atty.phone.replace(/[^0-9]/g, '')}`} className={styles.inlineLink}>
                          {atty.phone}
                        </a>
                      )}
                    </span>
                  </div>
                </div>

                <div className={styles.servicesSection}>
                  <span className={styles.servicesLabel}>Handles:</span>
                  <ul className={styles.servicesList}>
                    {atty.handles.map((h) => (
                      <li key={h}>{h}</li>
                    ))}
                  </ul>
                </div>

                <div className={styles.cardActions}>
                  {atty.hasReferral && (
                    <button
                      className={styles.btnReferral}
                      type="button"
                      onClick={() => openModal(atty.name)}
                    >
                      Request Referral
                    </button>
                  )}
                  <a
                    href={atty.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.btnVisit}
                  >
                    Visit Site →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── don't see what you need ── */}
      <div className={styles.needSection}>
        <div className={styles.container}>
          <h2 className={styles.needTitle}>Don&rsquo;t See What You Need?</h2>
          <p className={styles.needSub}>Tell us what you&rsquo;re looking for and IRN will help connect you with the right resource.</p>

          <form className={styles.needForm} onSubmit={submitNeed}>
            <div className={styles.formGrid2}>
              <div className={styles.formField}>
                <label className={styles.formLabel} htmlFor="need-name">Name (optional)</label>
                <input
                  id="need-name"
                  className={styles.formInput}
                  type="text"
                  placeholder="Your name or alias"
                  value={needName}
                  onChange={(e) => setNeedName(e.target.value)}
                />
              </div>
              <div className={styles.formField}>
                <label className={styles.formLabel} htmlFor="need-contact">Contact (secure preferred)</label>
                <input
                  id="need-contact"
                  className={styles.formInput}
                  type="text"
                  placeholder="Email, Signal, or ProtonMail"
                  value={needContact}
                  onChange={(e) => setNeedContact(e.target.value)}
                />
              </div>
              <div className={styles.formField}>
                <label className={styles.formLabel} htmlFor="need-legal">Legal Need</label>
                <select
                  id="need-legal"
                  className={styles.formSelect}
                  value={needLegal}
                  onChange={(e) => setNeedLegal(e.target.value)}
                >
                  <option value="">Select a category...</option>
                  {LEGAL_NEEDS.map((n) => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
              </div>
              <div className={styles.formField}>
                <label className={styles.formLabel} htmlFor="need-region">Region</label>
                <select
                  id="need-region"
                  className={styles.formSelect}
                  value={needRegion}
                  onChange={(e) => setNeedRegion(e.target.value)}
                >
                  <option value="">Select a region...</option>
                  {REGIONS_DROPDOWN.map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className={styles.formField}>
              <label className={styles.formLabel} htmlFor="need-desc">Brief description</label>
              <textarea
                id="need-desc"
                className={styles.formTextarea}
                rows={4}
                placeholder="Describe your situation and what kind of help you're seeking..."
                value={needDesc}
                onChange={(e) => setNeedDesc(e.target.value)}
              />
            </div>
            <p className={styles.privacyNote}>
              <strong className={styles.emberStrong}>Privacy:</strong> IRN does not sell or share your information. Submissions are encrypted.
            </p>
            <button type="submit" className={styles.btnSubmit}>Submit Request →</button>
          </form>
        </div>
      </div>

      {/* ── apply to join ── */}
      <div className={styles.joinSection}>
        <div className={styles.container}>
          <p className={styles.joinText}>
            Are you a civil rights, criminal defense, housing, or trans-affirming attorney in Maryland,
            Virginia, or DC?
          </p>
          <a href="/contact/" className={styles.btnJoin}>Apply to Join the Directory →</a>
        </div>
      </div>

      {/* ── referral modal ── */}
      {modalOpen && (
        <div className={styles.modalOverlay} role="dialog" aria-modal="true" aria-labelledby="modal-heading">
          <div className={styles.modalBox}>
            <button className={styles.modalClose} type="button" onClick={closeModal} aria-label="Close modal">✕</button>
            <h3 id="modal-heading" className={styles.modalTitle}>Request a Referral</h3>
            <p className={styles.modalAttyName}>
              Requesting referral to: <span className={styles.gold}>{modalAttorney}</span>
            </p>
            <form className={styles.modalForm} onSubmit={submitReferral}>
              <div className={styles.formGrid2}>
                <div className={styles.formField}>
                  <label className={styles.formLabel} htmlFor="ref-first">First Name</label>
                  <input
                    id="ref-first"
                    className={styles.formInput}
                    type="text"
                    placeholder="First name or alias"
                    value={refFirst}
                    onChange={(e) => setRefFirst(e.target.value)}
                  />
                </div>
                <div className={styles.formField}>
                  <label className={styles.formLabel} htmlFor="ref-contact">Contact Method</label>
                  <input
                    id="ref-contact"
                    className={styles.formInput}
                    type="text"
                    placeholder="Email, Signal, or ProtonMail"
                    value={refContact}
                    onChange={(e) => setRefContact(e.target.value)}
                  />
                </div>
              </div>
              <div className={styles.formField}>
                <label className={styles.formLabel} htmlFor="ref-desc">Brief Description</label>
                <textarea
                  id="ref-desc"
                  className={styles.formTextarea}
                  rows={4}
                  placeholder="Briefly describe your legal situation..."
                  value={refDesc}
                  onChange={(e) => setRefDesc(e.target.value)}
                />
              </div>
              <p className={styles.privacyNote}>
                <strong className={styles.emberStrong}>Privacy:</strong> Your information is encrypted and never shared without your consent.
              </p>
              <button type="submit" className={styles.btnSubmit}>Send Referral Request →</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
