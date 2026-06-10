'use client';
import { useState, useId } from 'react';
import { motion } from 'framer-motion';
import { Check, AlertCircle } from 'lucide-react';
import styles from './NewsletterStrip.module.css';

function getInitialSubscribed(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem('irn_newsletter_subscribed') === 'true';
}

export default function NewsletterStrip() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(getInitialSubscribed);
  const [error, setError] = useState('');
  const inputId = useId();

  const isValidEmail = (val: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (error) setError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setError('Please enter your email address.');
      return;
    }
    if (!isValidEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    localStorage.setItem('irn_newsletter_subscribed', 'true');
    setIsSubscribed(true);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.inner}>
        <p className={styles.text}>
          Stay informed on IRN&apos;s work — cases, campaigns, and legislative updates.
        </p>

        {isSubscribed ? (
          <motion.div
            className={styles.successMessage}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            role="status"
            aria-live="polite"
          >
            <Check size={24} aria-hidden="true" />
            You&apos;re in. Watch for our next dispatch.
          </motion.div>
        ) : (
          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <label htmlFor={inputId} className={styles.label}>
              Email address
            </label>
            <div className={styles.inputGroup}>
              <input
                id={inputId}
                type="email"
                placeholder="you@example.com"
                className={`${styles.input} ${error ? styles.inputError : ''}`}
                value={email}
                onChange={handleEmailChange}
                aria-describedby={error ? `${inputId}-error` : undefined}
                aria-invalid={!!error}
                autoComplete="email"
              />
              <button
                type="submit"
                className={styles.submit}
                aria-label="Subscribe to IRN newsletter"
              >
                Subscribe
              </button>
            </div>
            {error && (
              <p id={`${inputId}-error`} className={styles.errorMsg} role="alert" aria-live="assertive">
                <AlertCircle size={14} aria-hidden="true" />
                {error}
              </p>
            )}
            <p className={styles.note}>
              IRN does not share your email. Unsubscribe anytime.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
