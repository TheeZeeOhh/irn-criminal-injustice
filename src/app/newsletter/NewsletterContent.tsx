'use client';
import { useState } from 'react';
import styles from './newsletter.module.css';

const EXPECT_CARDS = [
  {
    category: 'Documentation',
    title: 'FOIA Updates',
    desc: 'What we filed, what agencies responded, what was denied, and where we are in the appeal process.',
  },
  {
    category: 'Community Education',
    title: 'Know Your Rights',
    desc: 'Legal updates affecting your rights — traffic stops, search and seizure, tenant protections, and more. In English and Spanish.',
  },
  {
    category: 'Case Tracking',
    title: 'Cases We\u2019re Watching',
    desc: 'Updates on cases IRN is documenting \u2014 including Ebony Parker, the Robinson ruling, and ongoing accountability campaigns.',
  },
  {
    category: 'Action',
    title: 'Campaign Alerts',
    desc: 'When the Community Safety & Equity Act has a hearing, when your council member needs to hear from you, when to show up.',
  },
  {
    category: 'Accountability',
    title: 'Institutional Watch',
    desc: 'Updates on the NAACP grievance, Hampton Roads Sheriff accountability, and other ongoing institutional pressure campaigns.',
  },
  {
    category: 'Frequency',
    title: 'Irregular. Intentional.',
    desc: 'The Dispatch goes out when there\u2019s something worth reporting \u2014 not on a schedule, not to fill a calendar, not to pad metrics.',
  },
];

const ARCHIVE_ISSUES = [
  {
    month: 'Jun 2026',
    headline: 'Ebony Parker vindicated \u2014 what the Robinson ruling means for Hampton Roads',
    tag: 'Case Update',
    href: '/blog/',
  },
  {
    month: 'May 2026',
    headline: 'Newport News CSE Act \u2014 what happened at the council meeting',
    tag: 'Campaign',
    href: '/blog/',
  },
  {
    month: 'Apr 2026',
    headline: 'FOIA denied: Hampton Sheriff cites exemption we\u2019re appealing',
    tag: 'FOIA',
    href: '/blog/',
  },
  {
    month: 'Mar 2026',
    headline: 'Know Your Rights \u2014 new Virginia traffic stop law and what it means for you',
    tag: 'KYR',
    href: '/blog/',
  },
];

export default function NewsletterContent() {
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState('');

  function handleSubscribe() {
    if (!email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!consent) {
      setError('Please check the consent box to subscribe.');
      return;
    }
    setError('');
    setSubscribed(true);
  }

  return (
    <div id="main-content" className={styles.newsletterWrap}>

      {/* ── MASTHEAD ── */}
      <div className={styles.mastheadOuter}>
        <div className={styles.mastheadInner}>
          <span className={styles.dispatchLabel}>Published by the Injustice Reform Network</span>
          <h1 className={styles.dispatchTitle}>The Dispatch</h1>
          <p className={styles.dispatchSub}>Documentation. Accountability. Community power.</p>
          <div className={styles.mastheadRule}>
            <span className={styles.mastheadRuleText}>EST. BALTIMORE, MD</span>
          </div>
          <div className={styles.mastheadMeta}>
            <span>Vol. 1 &middot; 2024&ndash;26</span>
            <span>Baltimore &middot; Hampton Roads &middot; Virginia</span>
            <span>Free &middot; Published when there&apos;s news worth reporting</span>
          </div>
        </div>
      </div>

      {/* ── HERO ── */}
      <div className={styles.heroOuter}>
        <div className={styles.heroInner}>
          <p className={styles.heroKicker}>
            The fight needs witnesses,&nbsp;not just{' '}
            <em className={styles.heroKickerGold}>followers</em>.
          </p>
          <p className={styles.heroBody}>
            The Dispatch is IRN&rsquo;s newsletter for people who want more than a donation button. We publish FOIA updates, case files, Know Your Rights briefings, and campaign alerts \u2014 when there&rsquo;s something worth saying.
          </p>

          {/* SIGNUP BOX */}
          <div className={styles.signupBox}>
            <h2 className={styles.signupHead}>Subscribe to The Dispatch</h2>
            <p className={styles.signupSub}>Join the community staying informed and staying ready.</p>

            {!subscribed ? (
              <>
                <div className={styles.emailRow}>
                  <input
                    type="email"
                    className={styles.emailInput}
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    aria-label="Email address"
                    disabled={subscribed}
                  />
                  <button
                    type="button"
                    className={styles.subscribeBtn}
                    onClick={handleSubscribe}
                    disabled={subscribed}
                  >
                    Subscribe &rarr;
                  </button>
                </div>
                <label className={styles.consentLabel}>
                  <input
                    type="checkbox"
                    className={styles.consentCheck}
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                  />
                  I agree to receive The Dispatch newsletter from IRN. I can unsubscribe any time.
                </label>
                {error && <p className={styles.errorMsg}>{error}</p>}
              </>
            ) : (
              <p className={styles.successMsg}>
                &#10003; You&rsquo;re subscribed. Welcome to The Dispatch. Check your inbox for a confirmation email.
              </p>
            )}

            <p className={styles.privacyMicro}>
              No tracking pixels. No sharing your email. No spam. Just The Dispatch, when it&rsquo;s ready.
            </p>
          </div>
        </div>
      </div>

      {/* ── WHAT'S IN THE DISPATCH ── */}
      <div className={styles.expectOuter}>
        <div className={styles.expectInner}>
          <h2 className={styles.expectSectionTitle}>What&rsquo;s in The Dispatch</h2>
          <div className={styles.expectGrid}>
            {EXPECT_CARDS.map((card) => (
              <div key={card.title} className={styles.expectCard}>
                <span className={styles.expectLabel}>{card.category}</span>
                <h3 className={styles.expectTitle}>{card.title}</h3>
                <p className={styles.expectDesc}>{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── ARCHIVE ── */}
      <div className={styles.archiveOuter}>
        <div className={styles.archiveInner}>
          <h2 className={styles.archiveTitle}>Recent Issues</h2>
          <div className={styles.issueList}>
            {ARCHIVE_ISSUES.map((issue) => (
              <a key={issue.month} href={issue.href} className={styles.issueRow}>
                <span className={styles.issueMonth}>{issue.month}</span>
                <span className={styles.issueHeadline}>{issue.headline}</span>
                <span className={styles.issueTag}>{issue.tag}</span>
              </a>
            ))}
          </div>
          <p className={styles.archiveNote}>
            <em>Full archive coming as issues are published. Subscribe above to get each issue when it drops.</em>
          </p>
        </div>
      </div>

    </div>
  );
}
