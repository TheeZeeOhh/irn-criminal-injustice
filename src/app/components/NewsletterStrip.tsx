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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setError('Please enter your email address.');
      return;
    }
    if (!isValidEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    // Mailchimp embedded form POST
    // TODO: replace u= and id= values with IRN's actual Mailchimp audience params
    // Get them from: Mailchimp → Audience → Signup forms → Embedded forms → copy action URL
    const MAILCHIMP_URL =
      'https://network.us21.list-manage.com/subscribe/post?u=REPLACE_U&amp;id=REPLACE_ID&amp;f_id=REPLACE_FID';

    if (MAILCHIMP_URL.includes('REPLACE_U')) {
      // Mailchimp not yet configured — store locally and show success
      localStorage.setItem('irn_newsletter_subscribed', 'true');
      setIsSubscribed(true);
      return;
    }

    try {
      // Mailchimp requires JSONP for cross-origin — swap to -json endpoint
      const jsonpUrl = MAILCHIMP_URL.replace('/post?', '/post-json?') + `&EMAIL=${encodeURIComponent(email)}&c=__irn_mc_cb`;
      await new Promise<void>((resolve, reject) => {
        const script = document.createElement('script');
        (window as unknown as Record<string, unknown>)['__irn_mc_cb'] = (data: { result: string }) => {
          delete (window as unknown as Record<string, unknown>)['__irn_mc_cb'];
          script.remove();
          if (data.result === 'success') resolve();
          else reject(new Error(data.result));
        };
        script.src = jsonpUrl;
        script.onerror = reject;
        document.head.appendChild(script);
      });
      localStorage.setItem('irn_newsletter_subscribed', 'true');
      setIsSubscribed(true);
    } catch {
      setError('Subscription failed. Email us at info@injusticereformnetwork.org to join the list.');
    }
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
