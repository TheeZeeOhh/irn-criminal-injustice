'use client';
import { useState } from 'react';
import { HeartHandshake, Shield, Gavel, Users, ExternalLink } from 'lucide-react';
import styles from './donate.module.css';

const PAYPAL_ME = 'https://paypal.me/AzizaOkoro';

const amounts = [10, 25, 50, 100];

const impacts = [
  {
    icon: Shield,
    amount: '$10',
    label: 'Covers one CHRT intake kit — documentation supplies for a civil rights report.',
  },
  {
    icon: Gavel,
    amount: '$25',
    label: 'Funds court filing fees for one expungement petition.',
  },
  {
    icon: Users,
    amount: '$50',
    label: 'Sponsors one Know Your Rights workshop seat for a returning citizen.',
  },
  {
    icon: HeartHandshake,
    amount: '$100',
    label: 'Sustains one week of rapid-response advocacy for a family in crisis.',
  },
];

export default function DonateContent() {
  const [selected, setSelected] = useState<number>(25);
  const [custom, setCustom] = useState('');

  const finalAmount = custom ? parseInt(custom, 10) || 0 : selected;
  const paypalUrl = finalAmount > 0
    ? `${PAYPAL_ME}/${finalAmount}`
    : PAYPAL_ME;

  return (
    <main id="main-content" className={styles.main}>
      <div className={styles.accentBar} aria-hidden="true" />

      {/* HERO */}
      <header className={styles.hero}>
        <div className={styles.container}>
          <span className={styles.kicker}>Support Our Work</span>
          <h1 className={styles.heroTitle}>Fund the Resistance.</h1>
          <p className={styles.heroSubtitle}>
            Your contribution sustains free expungement clinics, Know Your Rights workshops,
            and civil rights documentation for Hampton Roads communities.
          </p>
        </div>
      </header>

      {/* DONATE SECTION */}
      <section className={styles.donateSection} aria-labelledby="donate-heading">
        <div className={styles.container}>
          <div className={styles.donateGrid}>

            {/* LEFT: amount picker */}
            <div className={styles.donateCard}>
              <h2 id="donate-heading" className={styles.cardTitle}>Choose an Amount</h2>
              <p className={styles.cardSubtitle}>Every dollar goes directly to programs — no executive salaries, no overhead bloat.</p>

              <div className={styles.amountGrid}>
                {amounts.map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    className={`${styles.amountBtn} ${selected === amt && !custom ? styles.amountBtnActive : ''}`}
                    onClick={() => { setSelected(amt); setCustom(''); }}
                    aria-pressed={selected === amt && !custom}
                  >
                    ${amt}
                  </button>
                ))}
              </div>

              <div className={styles.customRow}>
                <span className={styles.customPrefix}>$</span>
                <input
                  type="number"
                  min="1"
                  placeholder="Custom amount"
                  value={custom}
                  onChange={(e) => { setCustom(e.target.value); setSelected(0); }}
                  className={styles.customInput}
                  aria-label="Custom donation amount"
                />
              </div>

              <a
                href={paypalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.donateBtn}
                aria-label={`Donate $${finalAmount || ''} via PayPal`}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c-.013.076-.026.175-.041.254-.58 2.975-2.477 4.432-5.85 4.432h-2.19c-.524 0-.968.382-1.05.9l-1.34 8.502H7.077l1.327-8.396.02-.093.12-.762.001-.005 1.04-6.594a.641.641 0 0 1 .633-.54h4.098c3.478 0 5.517 1.74 5.906 5.843z"/>
                </svg>
                Donate
                {finalAmount > 0 ? ` $${finalAmount}` : ''}
                {' '}via PayPal
                <ExternalLink size={14} aria-hidden="true" />
              </a>

              <p className={styles.secureNote}>
                Secured by PayPal · IRN never sees your payment details
              </p>

              <div className={styles.altMethods}>
                <p className={styles.altMethodsLabel}>Other ways to give</p>
                <div className={styles.altMethodsRow}>
                  <a href="mailto:cirnpresident@gmail.com?subject=Donation%20Inquiry" className={styles.altLink}>
                    Mail a check
                  </a>
                  <span className={styles.altDivider}>·</span>
                  <a href="mailto:cirnpresident@gmail.com?subject=Monthly%20Giving" className={styles.altLink}>
                    Monthly pledge
                  </a>
                  <span className={styles.altDivider}>·</span>
                  <a href="mailto:cirnpresident@gmail.com?subject=Corporate%20Partnership" className={styles.altLink}>
                    Corporate match
                  </a>
                </div>
              </div>
            </div>

            {/* RIGHT: impact breakdown */}
            <div className={styles.impactColumn}>
              <h2 className={styles.impactTitle}>Your Dollar at Work</h2>
              <div className={styles.impactList}>
                {impacts.map(({ icon: Icon, amount, label }) => (
                  <div key={amount} className={styles.impactItem}>
                    <div className={styles.impactIconWrap}>
                      <Icon size={18} aria-hidden="true" />
                    </div>
                    <div>
                      <span className={styles.impactAmount}>{amount}</span>
                      <p className={styles.impactLabel}>{label}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className={styles.taxNote}>
                <p className={styles.taxNoteText}>
                  IRN is a registered 501(c)(3) nonprofit organization. Donations are
                  tax-deductible to the extent permitted by law. EIN available upon request.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}
