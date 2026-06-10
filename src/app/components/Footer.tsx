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

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <div className={styles.brand}>
          <Link href="/" className={styles.logo} aria-label="Injustice Reform Network — home">
            IRN
          </Link>
          <p className={styles.mission}>
            Documenting harm, fighting wrongful prosecution, and building the infrastructure
            communities need to hold institutions accountable.
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
            <span className={styles.colTitle}>Programs</span>
            <Link href="/criminal-injustice" className={styles.link} aria-label="Criminal Injustice program">
              Criminal Injustice
            </Link>
            <Link href="/environmental" className={styles.link} aria-label="Environmental Injustice program">
              Environmental
            </Link>
            <Link href="/family" className={styles.link} aria-label="Family Policing and Reproductive Health">
              Family Policing
            </Link>
            <Link href="/chrt" className={styles.link} aria-label="CHRT — Community Harm Reporting Tool">
              CHRT Portal
            </Link>
          </div>
          <div className={styles.col}>
            <span className={styles.colTitle}>Get Involved</span>
            <Link href="/donate" className={styles.link} aria-label="Donate to IRN">Donate</Link>
            <Link href="/volunteer" className={styles.link} aria-label="Volunteer with IRN">Volunteer</Link>
            <Link href="/campaigns" className={styles.link} aria-label="IRN Campaigns">Campaigns</Link>
            <Link href="/events" className={styles.link} aria-label="IRN Events">Events</Link>
          </div>
          <div className={styles.col}>
            <span className={styles.colTitle}>Resources</span>
            <Link href="/know-your-rights" className={styles.link} aria-label="Know Your Rights guide">
              Know Your Rights
            </Link>
            <Link href="/reports" className={styles.link} aria-label="IRN Annual Reports">Annual Reports</Link>
            <Link href="/blog" className={styles.link} aria-label="IRN Blog">Blog</Link>
            <Link href="/press" className={styles.link} aria-label="IRN Press">Press</Link>
          </div>
          <div className={styles.col}>
            <span className={styles.colTitle}>Legal</span>
            <Link href="/privacy" className={styles.link} aria-label="Privacy Policy">Privacy Policy</Link>
            <Link href="/terms" className={styles.link} aria-label="Terms of Service">Terms of Service</Link>
            <Link href="/accessibility" className={styles.link} aria-label="Accessibility statement">
              Accessibility
            </Link>
            <Link href="/contact" className={styles.link} aria-label="Contact IRN">Contact</Link>
          </div>
        </nav>
      </div>

      <div className={styles.bottom}>
        <p className={styles.copyright}>
          &copy; 2024&ndash;2026 Injustice Reform Network &middot; EIN 41-4321283 &middot; Virginia
          501(c)(3) &middot; All Rights Reserved
        </p>
        <p className={styles.disclaimer}>
          IRN is not a law firm. Nothing on this site constitutes legal advice or creates an
          attorney-client relationship.
        </p>
      </div>
    </footer>
  );
}
