'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import styles from './gallery.module.css';

const photos = [
  {
    src: '/gallery/gallery-rally.jpg',
    tag: 'Direct Action',
    caption: 'Community rally — Hampton Roads, VA',
  },
  {
    src: '/gallery/gallery-climate.jpg',
    tag: 'Environmental Justice',
    caption: 'Climate action demonstration',
  },
  {
    src: '/gallery/gallery-homelessness.jpg',
    tag: 'Homelessness Prevention',
    caption: 'The crisis our neighbors face every day',
  },
  {
    src: '/gallery/gallery-family.jpg',
    tag: 'Family Policing',
    caption: 'Families targeted by state surveillance',
  },
];

export default function GalleryContent() {
  const [lightbox, setLightbox] = useState<number | null>(null);

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === 'Escape') setLightbox(null);
    if (e.key === 'ArrowRight' && lightbox !== null) setLightbox((lightbox + 1) % photos.length);
    if (e.key === 'ArrowLeft' && lightbox !== null) setLightbox((lightbox - 1 + photos.length) % photos.length);
  }

  return (
    <main id="main-content" className={styles.main} onKeyDown={handleKey}>
      <div className={styles.accentBar} aria-hidden="true" />

      <header className={styles.hero}>
        <div className={styles.container}>
          <motion.span className={styles.kicker} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            Media
          </motion.span>
          <motion.h1 className={styles.heroTitle} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
            Community in Action
          </motion.h1>
          <motion.p className={styles.heroSubtitle} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
            Photos from our campaigns, workshops, rallies, and direct action across Virginia, Maryland, North Carolina, and DC.
          </motion.p>
        </div>
      </header>

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.grid}>
            {photos.map((photo, i) => (
              <motion.div
                key={photo.src}
                className={styles.photoCard}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                onClick={() => setLightbox(i)}
                role="button"
                tabIndex={0}
                aria-label={`View ${photo.caption}`}
                onKeyDown={e => e.key === 'Enter' && setLightbox(i)}
              >
                <img src={photo.src} alt={photo.caption} loading="lazy" />
                <div className={styles.photoOverlay}>
                  <div className={styles.photoCaption}>
                    <span className={styles.photoTag}>{photo.tag}</span>
                    {photo.caption}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            className={styles.lightbox}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setLightbox(null)}
          >
            <button
              className={styles.lightboxClose}
              onClick={() => setLightbox(null)}
              aria-label="Close"
            >
              <X size={28} />
            </button>
            <img
              src={photos[lightbox].src}
              alt={photos[lightbox].caption}
              className={styles.lightboxImg}
              onClick={e => e.stopPropagation()}
            />
            <p className={styles.lightboxCaption}>{photos[lightbox].caption}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
