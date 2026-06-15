'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, CreditCard, CheckCircle, AlertCircle, Lock } from 'lucide-react';
import styles from './page.module.css';

// Access codes valid for unlocking the app.
// In production these are issued by Stripe webhook after purchase.
// Stripe integration is coming — this code-gate is a temporary bridge.
const VALID_CODES = ['IRN-2026', 'SHIELD-BETA', 'COMMUNITY1'];

export default function PurchasePage() {
  const router = useRouter();
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleCodeSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    const trimmed = code.trim().toUpperCase();

    setTimeout(() => {
      if (VALID_CODES.includes(trimmed)) {
        localStorage.setItem('communityshield_access', 'true');
        setSuccess(true);
        setTimeout(() => {
          router.push('/community-shield/app/');
        }, 1200);
      } else {
        setError('That code is not valid. Check your purchase confirmation email or try again.');
        setLoading(false);
      }
    }, 600);
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        {/* Back link */}
        <Link href="/community-shield/" className={styles.backLink}>
          <ArrowLeft size={14} />
          Back to CommunityShield
        </Link>

        {/* Logo */}
        <div className={styles.logoWrap}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/irn-criminal-injustice/logo.png"
            alt="IRN"
            className={styles.logoImg}
          />
          <span className={styles.logoText}>CommunityShield</span>
        </div>

        {/* Heading */}
        <h1 className={styles.heading}>Get CommunityShield</h1>
        <p className={styles.subheading}>
          One-time purchase. Instant access. No subscriptions, ever.
        </p>

        {/* Price */}
        <div className={styles.priceDisplay}>
          <span className={styles.priceCurrency}>$</span>
          <span className={styles.priceAmount}>9.99</span>
          <span className={styles.priceLabel}>one-time</span>
        </div>

        {/*
          TODO: Replace href="#" with real Stripe payment link once
          Stripe integration is configured for this product.
          e.g., href="https://buy.stripe.com/your-link-here"
        */}
        <a
          href="#"
          className={styles.buyBtn}
          onClick={(e) => {
            e.preventDefault();
            alert(
              'Stripe payment is coming soon. Use an access code below to get in during beta.'
            );
          }}
        >
          <CreditCard size={18} />
          Buy Now — $9.99
        </a>

        <p className={styles.stripeBadge}>
          <Lock size={11} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} />
          Secure checkout · Stripe integration coming soon
        </p>

        {/* Code divider */}
        <div className={styles.divider}>or enter your access code</div>

        {/* Access code form */}
        <form onSubmit={handleCodeSubmit} className={styles.codeForm}>
          <label htmlFor="access-code" className={styles.codeLabel}>
            Access Code
          </label>

          <div className={styles.codeInputWrap}>
            <input
              id="access-code"
              type="text"
              value={code}
              onChange={(e) => {
                setCode(e.target.value);
                setError('');
              }}
              placeholder="e.g. IRN-2026"
              className={`${styles.codeInput} ${error ? styles.error : ''}`}
              autoComplete="off"
              spellCheck={false}
              maxLength={24}
              disabled={loading || success}
            />
            <button
              type="submit"
              className={styles.codeSubmit}
              disabled={loading || success || !code.trim()}
            >
              {loading ? 'Checking…' : 'Unlock'}
            </button>
          </div>

          {error && (
            <p className={styles.errorMsg} role="alert">
              <AlertCircle size={14} />
              {error}
            </p>
          )}

          {success && (
            <p className={styles.successMsg} role="status">
              <CheckCircle size={14} />
              Access granted — taking you in now…
            </p>
          )}
        </form>

        <div className={styles.footer}>
          Your access code is included in your purchase confirmation email.
          <br />
          Questions? Email{' '}
          <a
            href="mailto:info@injusticereformnetwork.org"
            style={{ color: 'var(--gold)' }}
          >
            info@injusticereformnetwork.org
          </a>
        </div>
      </div>
    </div>
  );
}
