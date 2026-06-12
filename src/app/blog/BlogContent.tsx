'use client';
import { motion } from 'framer-motion';
import { FileText, ArrowRight, ExternalLink } from 'lucide-react';
import styles from './blog.module.css';

const posts = [
  {
    category: 'The Dispatch',
    vol: 'Vol. 01 · June 2026',
    title: 'The People\'s Intelligence Brief',
    excerpt: 'Priority briefing on Case File 001, The Watchlist (11 agencies), IRN OS v2, the Ebony Parker vindication, and field notes from Baltimore Bureau.',
    href: '/irn-dispatch-vol01.html',
    external: true,
    featured: true,
  },
  {
    category: 'Case File',
    vol: 'June 2026',
    title: 'All Charges Dismissed: The Case of Dr. Ebony Parker',
    excerpt: 'Circuit Court Judge Rebecca Robinson dismissed all eight charges. IRN documented this case from intake through vindication — what accountability actually looks like.',
    href: '/ebony-parker',
    external: false,
  },
  {
    category: 'Policy',
    vol: 'June 2026',
    title: 'Virginia\'s Clean Slate Law Takes Effect July 1, 2026',
    excerpt: 'What you need to know about automatic record sealing, who qualifies, and how IRN\'s free expungement clinic can help you navigate the new law.',
    href: '/events',
    external: false,
  },
];

export default function BlogContent() {
  return (
    <main id="main-content" className={styles.main}>
      <div className={styles.accentBar} aria-hidden="true" />

      <header className={styles.hero}>
        <div className={styles.container}>
          <motion.span className={styles.kicker} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            IRN Intelligence
          </motion.span>
          <motion.h1 className={styles.heroTitle} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
            Blog & Dispatch
          </motion.h1>
          <motion.p className={styles.heroSubtitle} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
            Case files, policy analysis, and field notes. Because power hates witnesses.
          </motion.p>
        </div>
      </header>

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.postList}>
            {posts.map((post, i) => (
              <motion.a
                key={post.title}
                href={post.href}
                target={post.external ? '_blank' : undefined}
                rel={post.external ? 'noopener noreferrer' : undefined}
                className={`${styles.postCard} ${post.featured ? styles.postFeatured : ''}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.07 }}
              >
                <div className={styles.postMeta}>
                  <span className={styles.postCategory}>{post.category}</span>
                  <span className={styles.postVol}>{post.vol}</span>
                  {post.featured && <span className={styles.featuredBadge}>Latest</span>}
                </div>
                <h2 className={styles.postTitle}>{post.title}</h2>
                <p className={styles.postExcerpt}>{post.excerpt}</p>
                <span className={styles.postCta}>
                  {post.external ? <><ExternalLink size={13} aria-hidden="true" /> Read Issue</> : <><ArrowRight size={13} aria-hidden="true" /> Read More</>}
                </span>
              </motion.a>
            ))}
          </div>

          <div className={styles.dispatchCta}>
            <FileText size={20} className={styles.dispatchIcon} aria-hidden="true" />
            <div>
              <p className={styles.dispatchText}>Get new issues as they drop.</p>
              <a href="/newsletter" className={styles.dispatchLink}>Subscribe to The Dispatch →</a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
