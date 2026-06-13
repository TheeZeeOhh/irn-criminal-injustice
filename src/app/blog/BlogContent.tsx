'use client';
import { useState } from 'react';
import Link from 'next/link';
import styles from './blog.module.css';

type Category = 'all' | 'foia' | 'kyr' | 'case' | 'campaign' | 'community';

const CATEGORIES: { id: Category; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'foia', label: 'FOIA' },
  { id: 'kyr', label: 'Know Your Rights' },
  { id: 'case', label: 'Cases' },
  { id: 'campaign', label: 'Campaigns' },
  { id: 'community', label: 'Community' },
];

const ARCHIVE = [
  {
    date: 'Mar 2026',
    tag: 'FOIA',
    title: 'Virginia State Police Responded to Our FOIA. Sort Of.',
    href: '/blog/vsp-foia-response/',
  },
  {
    date: 'Feb 2026',
    tag: 'KYR',
    title: 'CHRT Is Coming: Here\'s What It Does and Doesn\'t Do',
    href: '/blog/chrt-launch-announcement/',
  },
  {
    date: 'Feb 2026',
    tag: 'Community',
    title: 'Ember Roll — Trans Day of Visibility, Station North, Baltimore',
    href: '/blog/ember-roll-march-31/',
  },
  {
    date: 'Jan 2026',
    tag: 'Campaign',
    title: 'Baltimore Community Safety & Equity Act: Full Text + Fiscal Note',
    href: '/blog/baltimore-cse-act-introduction/',
  },
];

const FOIA_STATUS = [
  { agency: 'Newport News PD', status: 'Appealing', statusClass: styles.statusEmber },
  { agency: 'Hampton Sheriff', status: 'Pending', statusClass: styles.statusGold },
  { agency: 'VA State Police', status: 'Partial', statusClass: styles.statusGreen },
  { agency: 'Norfolk Schools', status: 'Pending', statusClass: styles.statusGold },
];

const RESOURCES = [
  { label: 'Report Anonymously (CHRT)', href: '/chrt/' },
  { label: 'Know Your Rights', href: '/know-your-rights/' },
  { label: 'Generate a FOIA Request', href: '/foia/' },
  { label: 'Find Legal Help', href: '/attorneys/' },
  { label: 'Active Campaigns', href: '/campaigns/' },
  { label: 'Volunteer with IRN', href: '/volunteer/' },
];

const TOPICS = [
  'FOIA', 'Wrongful Prosecution', 'Trans Rights', 'Hampton Roads',
  'Baltimore', 'Ebony Parker', 'CSE Act', 'NAACP', 'Re-entry',
  'Housing', 'Police Accountability',
];

export default function BlogContent() {
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [sideEmail, setSideEmail] = useState('');

  function handleSubscribe() {
    if (!sideEmail || !sideEmail.includes('@')) {
      alert('Please enter a valid email address.');
      return;
    }
    alert('Subscribed. Check your inbox for a confirmation email.');
    setSideEmail('');
  }

  function isVisible(cat: string): boolean {
    return activeCategory === 'all' || activeCategory === cat;
  }

  return (
    <main id="main-content" className={styles.main}>

      {/* BLOG HEADER */}
      <div className={styles.blogHeader}>
        <div className={styles.headerInner}>
          <p className={styles.eyebrow}>Field Dispatches from the Injustice Reform Network</p>
          <h1 className={styles.blogTitle}>
            The <em className={styles.titleEmphasis}>Dispatch</em>
          </h1>
          <p className={styles.blogSub}>
            FOIA updates, case tracking, Know Your Rights briefings, and community accountability
            reporting — sent when there&apos;s something worth reporting.
          </p>
          <div className={styles.headerBottom}>
            <div className={styles.catTabs} role="tablist" aria-label="Filter by category">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  role="tab"
                  aria-selected={activeCategory === cat.id}
                  className={`${styles.catTab} ${activeCategory === cat.id ? styles.catTabActive : ''}`}
                  onClick={() => setActiveCategory(cat.id)}
                >
                  {cat.label}
                </button>
              ))}
            </div>
            <Link href="/newsletter/" className={styles.subscribeLink}>
              Subscribe to The Dispatch →
            </Link>
          </div>
        </div>
      </div>

      {/* MAIN LAYOUT */}
      <div className={styles.layoutGrid}>

        {/* LEFT COLUMN */}
        <div className={styles.mainCol}>

          {/* FEATURED POST */}
          {isVisible('case') && (
            <article className={styles.featuredPost} data-cat="case">
              <span className={styles.latestBadge}>Latest</span>
              <p className={styles.postCategory} data-type="case">Case Update</p>
              <h2 className={styles.featuredTitle}>
                Ebony Parker Vindicated: What the Robinson Ruling Means for Community Oversight
              </h2>
              <p className={styles.postMeta}>
                <span className={styles.metaAuthor}>Aziza &ldquo;Zee&rdquo; Okoro</span>
                <span className={styles.metaDivider}>|</span>
                <span className={styles.metaDate}>June 2026</span>
                <span className={styles.metaDivider}>|</span>
                <span className={styles.metaRead}>8 min read</span>
              </p>
              <p className={styles.postExcerpt}>
                Judge Rebecca Robinson&rsquo;s ruling in the Ebony Parker case closes one chapter and opens
                the question every community organization should be asking...
              </p>
              <Link href="/blog/ebony-parker-robinson-ruling/" className={styles.readLink}>
                Read the Full Dispatch →
              </Link>
            </article>
          )}

          {/* POST GRID */}
          <div className={styles.postGrid}>

            {isVisible('foia') && (
              <article className={styles.postCard} data-cat="foia">
                <span className={`${styles.postTag} ${styles.tagFoia}`}>FOIA</span>
                <h3 className={styles.cardTitle}>
                  Hampton Sheriff Denied Our Request. We&apos;re Appealing.
                </h3>
                <p className={styles.cardMeta}>May 2026 · IRN Staff · 5 min</p>
                <p className={styles.cardExcerpt}>
                  The sheriff&rsquo;s office cited a blanket exemption under the Virginia Freedom of
                  Information Act. Our attorneys say the statute doesn&rsquo;t support it — and we&rsquo;re
                  taking it to appeal.
                </p>
              </article>
            )}

            {isVisible('campaign') && (
              <article className={styles.postCard} data-cat="campaign">
                <span className={`${styles.postTag} ${styles.tagCampaign}`}>Campaign</span>
                <h3 className={styles.cardTitle}>
                  Newport News CSE Act: What Happened at the Council Meeting
                </h3>
                <p className={styles.cardMeta}>May 2026 · BeKura Shabazz · 6 min</p>
                <p className={styles.cardExcerpt}>
                  Forty community members showed up. Council members were unprepared. Here&rsquo;s a
                  full account of what was said, who pushed back, and what comes next.
                </p>
              </article>
            )}

            {isVisible('kyr') && (
              <article className={styles.postCard} data-cat="kyr">
                <span className={`${styles.postTag} ${styles.tagKyr}`}>Know Your Rights</span>
                <h3 className={styles.cardTitle}>
                  New Virginia Traffic Stop Law: What Changed and What Didn&apos;t
                </h3>
                <p className={styles.cardMeta}>Apr 2026 · Aziza Okoro · 4 min</p>
                <p className={styles.cardExcerpt}>
                  The updated statute limits pretextual stops — but enforcement is uneven. We break
                  down the plain-language version and what you should still say at a stop.
                </p>
              </article>
            )}

            {isVisible('community') && (
              <article className={styles.postCard} data-cat="community">
                <span className={`${styles.postTag} ${styles.tagCommunity}`}>Community</span>
                <h3 className={styles.cardTitle}>
                  IRN Files Formal NAACP Grievance Against Pat Hines
                </h3>
                <p className={styles.cardMeta}>Mar 2026 · IRN Staff · 3 min</p>
                <p className={styles.cardExcerpt}>
                  After months of documented misconduct, IRN submitted a formal grievance to the
                  Virginia State Conference NAACP. This is what the record shows.
                </p>
              </article>
            )}

          </div>

          {/* ARCHIVE */}
          <div className={styles.archiveSection}>
            <h2 className={styles.archiveHeading}>Archive</h2>
            <ul className={styles.archiveList}>
              {ARCHIVE.map((item) => (
                <li key={item.href} className={styles.archiveItem}>
                  <span className={styles.archiveDate}>{item.date}</span>
                  <div className={styles.archiveRight}>
                    <span className={styles.archiveTag}>{item.tag}</span>
                    <Link href={item.href} className={styles.archiveTitle}>{item.title}</Link>
                  </div>
                </li>
              ))}
            </ul>
            <button
              className={styles.loadMoreBtn}
              onClick={() => alert('CMS integration coming soon — more posts will load here.')}
            >
              Load More →
            </button>
          </div>

        </div>

        {/* RIGHT SIDEBAR */}
        <aside className={styles.sidebar}>

          {/* WIDGET 1: Subscribe */}
          <div className={styles.widget}>
            <h3 className={styles.widgetTitle}>Subscribe to The Dispatch</h3>
            <div className={styles.subscribeForm}>
              <input
                type="email"
                placeholder="your@email.com"
                value={sideEmail}
                onChange={(e) => setSideEmail(e.target.value)}
                className={styles.emailInput}
                aria-label="Email address"
              />
              <button className={styles.subscribeBtn} onClick={handleSubscribe}>
                Subscribe →
              </button>
            </div>
            <p className={styles.subscribeMeta}>
              No spam. Sent when there&apos;s something worth reporting.{' '}
              <Link href="/newsletter/" className={styles.widgetLink}>More info</Link>
            </p>
          </div>

          {/* WIDGET 2: FOIA Status Board */}
          <div className={styles.widget}>
            <h3 className={styles.widgetTitle}>FOIA Status Board</h3>
            <ul className={styles.foiaList}>
              {FOIA_STATUS.map((row) => (
                <li key={row.agency} className={styles.foiaRow}>
                  <span className={styles.foiaAgency}>{row.agency}</span>
                  <span className={`${styles.foiaBadge} ${row.statusClass}`}>{row.status}</span>
                </li>
              ))}
            </ul>
            <Link href="/reports/" className={styles.widgetLinkGold}>Full tracker →</Link>
          </div>

          {/* WIDGET 3: Resources */}
          <div className={styles.widget}>
            <h3 className={styles.widgetTitle}>Resources</h3>
            <ul className={styles.resourceList}>
              {RESOURCES.map((r) => (
                <li key={r.href}>
                  <Link href={r.href} className={styles.resourceLink}>
                    {r.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* WIDGET 4: Topics */}
          <div className={styles.widget}>
            <h3 className={styles.widgetTitle}>Topics</h3>
            <div className={styles.tagCloud}>
              {TOPICS.map((topic) => (
                <span key={topic} className={styles.topicTag}>{topic}</span>
              ))}
            </div>
          </div>

        </aside>
      </div>
    </main>
  );
}
