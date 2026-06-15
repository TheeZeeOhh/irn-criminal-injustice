'use client';

import { useState } from 'react';
import { MapPin, Phone, Clock } from 'lucide-react';
import styles from './panels.module.css';

type Category = 'All' | 'Shelter' | 'Legal Aid' | 'Food' | 'Health' | 'Utility Assistance';

interface Resource {
  name: string;
  category: Exclude<Category, 'All'>;
  address: string;
  phone: string;
  hours: string;
  city: 'Baltimore' | 'Hampton Roads';
}

const RESOURCES: Resource[] = [
  // ── Baltimore ────────────────────────────────────────────
  {
    name: 'Health Care for the Homeless',
    category: 'Health',
    address: '421 Fallsway, Baltimore, MD 21202',
    phone: '(410) 837-5533',
    hours: 'Mon–Fri 7:30am–5pm',
    city: 'Baltimore',
  },
  {
    name: 'Maryland Legal Aid — Baltimore City',
    category: 'Legal Aid',
    address: '500 E. Lexington St., Baltimore, MD 21202',
    phone: '(410) 539-5340',
    hours: 'Mon–Fri 9am–5pm',
    city: 'Baltimore',
  },
  {
    name: 'Weinberg Housing Resource Center',
    category: 'Shelter',
    address: '620 Fallsway, Baltimore, MD 21202',
    phone: '(410) 576-9655',
    hours: 'Open 24/7 for emergency intake',
    city: 'Baltimore',
  },
  {
    name: 'Beans & Bread Outreach Center',
    category: 'Food',
    address: '402 S. Bond St., Baltimore, MD 21231',
    phone: '(410) 327-5000',
    hours: 'Mon–Sat 7am–12pm',
    city: 'Baltimore',
  },
  {
    name: 'Baltimore Gas & Electric (BGE) MEAP',
    category: 'Utility Assistance',
    address: 'P.O. Box 1475, Baltimore, MD 21203 (apply by phone)',
    phone: '(800) 685-0123',
    hours: 'Mon–Fri 7am–8pm, Sat 8am–5pm',
    city: 'Baltimore',
  },
  {
    name: 'People's Community Health Center',
    category: 'Health',
    address: '1738 E. Lafayette Ave., Baltimore, MD 21213',
    phone: '(410) 342-4151',
    hours: 'Mon–Thu 8am–6pm, Fri 8am–5pm',
    city: 'Baltimore',
  },
  {
    name: 'Baltimore City Community Action Partnership',
    category: 'Utility Assistance',
    address: '1700 N. Charles St., Baltimore, MD 21201',
    phone: '(410) 396-4835',
    hours: 'Mon–Fri 8:30am–4:30pm',
    city: 'Baltimore',
  },
  {
    name: 'Franciscan Center',
    category: 'Food',
    address: '101 W. 23rd St., Baltimore, MD 21218',
    phone: '(410) 467-5340',
    hours: 'Mon–Fri 9am–2pm',
    city: 'Baltimore',
  },
  // ── Hampton Roads ─────────────────────────────────────────
  {
    name: 'Virginia Legal Aid Society',
    category: 'Legal Aid',
    address: '912 E. Main St., Norfolk, VA 23504',
    phone: '(757) 627-5423',
    hours: 'Mon–Fri 9am–5pm',
    city: 'Hampton Roads',
  },
  {
    name: 'Union Mission Ministries',
    category: 'Shelter',
    address: '400 W. 19th St., Norfolk, VA 23517',
    phone: '(757) 627-8686',
    hours: 'Open 24/7 for emergency shelter',
    city: 'Hampton Roads',
  },
  {
    name: 'ForKids Inc.',
    category: 'Shelter',
    address: '560 Newtown Rd., Norfolk, VA 23502',
    phone: '(757) 625-4658',
    hours: 'Mon–Fri 9am–5pm (family shelter intake)',
    city: 'Hampton Roads',
  },
  {
    name: 'Foodbank of Southeastern Virginia',
    category: 'Food',
    address: '800 Tidewater Dr., Norfolk, VA 23504',
    phone: '(757) 627-6599',
    hours: 'Mon–Fri 8am–4pm; pantry hours vary by site',
    city: 'Hampton Roads',
  },
  {
    name: 'Dominion Energy Share — LIHEAP Hampton Roads',
    category: 'Utility Assistance',
    address: 'Apply at local DSS: 820 Southampton Ave., Norfolk, VA 23510',
    phone: '(757) 664-6999',
    hours: 'Mon–Fri 8am–5pm',
    city: 'Hampton Roads',
  },
  {
    name: 'Eastern Virginia Medical School Community Clinics',
    category: 'Health',
    address: '825 Fairfax Ave., Norfolk, VA 23507',
    phone: '(757) 446-5600',
    hours: 'Mon–Fri 8am–5pm; clinic hours vary',
    city: 'Hampton Roads',
  },
];

const CATEGORIES: Category[] = ['All', 'Shelter', 'Legal Aid', 'Food', 'Health', 'Utility Assistance'];

const BADGE_CLASS: Record<Exclude<Category, 'All'>, string> = {
  Shelter: styles.badgeShelter,
  'Legal Aid': styles.badgeLegal,
  Food: styles.badgeFood,
  Health: styles.badgeHealth,
  'Utility Assistance': styles.badgeUtility,
};

export default function ResourcesPanel() {
  const [activeCategory, setActiveCategory] = useState<Category>('All');

  const filtered =
    activeCategory === 'All'
      ? RESOURCES
      : RESOURCES.filter((r) => r.category === activeCategory);

  const baltimore = filtered.filter((r) => r.city === 'Baltimore');
  const hamptonRoads = filtered.filter((r) => r.city === 'Hampton Roads');

  return (
    <div className={styles.panel}>
      <div className={styles.panelHeader}>
        <p className={styles.panelEyebrow}>Resource Radar</p>
        <h2 className={styles.panelTitle}>Find Help Near You</h2>
        <p className={styles.panelDesc}>
          Verified resources in Baltimore and Hampton Roads. Filter by what you need most right now.
        </p>
      </div>

      {/* ── Category Filters ─────────────────────── */}
      <div className={styles.filterBar} role="group" aria-label="Filter by category">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`${styles.filterBtn} ${activeCategory === cat ? styles.filterBtnActive : ''}`}
            aria-pressed={activeCategory === cat}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* ── Baltimore ──────────────────────────────── */}
      {baltimore.length > 0 && (
        <div className={styles.citySection}>
          <div className={styles.cityLabel}>
            <span className={styles.cityDot} />
            Baltimore, MD
          </div>
          <div className={styles.resourceGrid}>
            {baltimore.map((r) => (
              <ResourceCard key={r.name} resource={r} />
            ))}
          </div>
        </div>
      )}

      {/* ── Hampton Roads ──────────────────────────── */}
      {hamptonRoads.length > 0 && (
        <div className={styles.citySection}>
          <div className={styles.cityLabel}>
            <span className={styles.cityDot} />
            Hampton Roads, VA
          </div>
          <div className={styles.resourceGrid}>
            {hamptonRoads.map((r) => (
              <ResourceCard key={r.name} resource={r} />
            ))}
          </div>
        </div>
      )}

      {filtered.length === 0 && (
        <div className={styles.emptyState}>No resources match this filter yet.</div>
      )}
    </div>
  );
}

function ResourceCard({ resource }: { resource: Resource }) {
  return (
    <div className={styles.resourceCard}>
      <div className={styles.resourceTop}>
        <span className={styles.resourceName}>{resource.name}</span>
        <span className={`${styles.categoryBadge} ${BADGE_CLASS[resource.category]}`}>
          {resource.category}
        </span>
      </div>

      <div className={styles.resourceDetail}>
        <MapPin size={13} className={styles.resourceDetailIcon} aria-hidden="true" />
        <span>{resource.address}</span>
      </div>

      <div className={styles.resourceDetail}>
        <Phone size={13} className={styles.resourceDetailIcon} aria-hidden="true" />
        <a href={`tel:${resource.phone.replace(/[^\d+]/g, '')}`} className={styles.resourcePhone}>
          {resource.phone}
        </a>
      </div>

      <div className={styles.resourceDetail}>
        <Clock size={13} className={styles.resourceDetailIcon} aria-hidden="true" />
        <span>{resource.hours}</span>
      </div>
    </div>
  );
}
