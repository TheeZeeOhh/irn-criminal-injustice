'use client';

import { useState, useEffect } from 'react';
import { Plus, Trash2, Clock, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './panels.module.css';

interface Deadline {
  id: string;
  label: string;
  date: string; // ISO date string YYYY-MM-DD
}

const STORAGE_KEY = 'communityshield_deadlines';

function loadDeadlines(): Deadline[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Deadline[]) : [];
  } catch {
    return [];
  }
}

function saveDeadlines(deadlines: Deadline[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(deadlines));
}

function daysRemaining(dateStr: string): number {
  const target = new Date(dateStr + 'T00:00:00');
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const diff = target.getTime() - today.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

function badgeClass(days: number) {
  if (days <= 3) return styles.deadlineUrgent;
  if (days <= 7) return styles.deadlineWarning;
  return styles.deadlineSafe;
}

function badgeLabel(days: number): string {
  if (days < 0) return `${Math.abs(days)}d overdue`;
  if (days === 0) return 'TODAY';
  if (days === 1) return '1 day';
  return `${days} days`;
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
}

export default function DeadlinesPanel() {
  const [deadlines, setDeadlines] = useState<Deadline[]>([]);
  const [label, setLabel] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    setDeadlines(loadDeadlines());
  }, []);

  function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!label.trim() || !date) return;

    const newDeadline: Deadline = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      label: label.trim(),
      date,
    };

    const updated = [...deadlines, newDeadline].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    setDeadlines(updated);
    saveDeadlines(updated);
    setLabel('');
    setDate('');
  }

  function handleDelete(id: string) {
    const updated = deadlines.filter((d) => d.id !== id);
    setDeadlines(updated);
    saveDeadlines(updated);
  }

  const todayStr = new Date().toISOString().split('T')[0];

  return (
    <div className={styles.panel}>
      <div className={styles.panelHeader}>
        <p className={styles.panelEyebrow}>Deadline Tracker</p>
        <h2 className={styles.panelTitle}>Never Miss a Deadline</h2>
        <p className={styles.panelDesc}>
          Track court dates, appeal windows, and payment cutoffs. Color-coded by urgency.
        </p>
      </div>

      {/* ── Add Form ──────────────────────────────── */}
      <div className={styles.deadlineForm}>
        <form onSubmit={handleAdd}>
          <div className={styles.formGroup}>
            <label htmlFor="deadline-label" className={styles.formLabel}>
              Deadline label
            </label>
            <input
              id="deadline-label"
              type="text"
              className={styles.formInput}
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="e.g. Respond to eviction notice, Utility payment due…"
              maxLength={100}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="deadline-date" className={styles.formLabel}>
              Date
            </label>
            <div className={styles.deadlineInputRow}>
              <input
                id="deadline-date"
                type="date"
                className={styles.dateInput}
                value={date}
                min={todayStr}
                onChange={(e) => setDate(e.target.value)}
              />
              <button
                type="submit"
                className={styles.btnPrimary}
                disabled={!label.trim() || !date}
              >
                <Plus size={15} />
                Add
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* ── Legend ────────────────────────────────── */}
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
        <span className={`${styles.deadlineBadge} ${styles.deadlineUrgent}`} style={{ fontSize: '0.7rem' }}>
          <AlertTriangle size={11} style={{ display: 'inline', marginRight: '3px' }} />
          ≤ 3 days
        </span>
        <span className={`${styles.deadlineBadge} ${styles.deadlineWarning}`} style={{ fontSize: '0.7rem' }}>
          ≤ 7 days
        </span>
        <span className={`${styles.deadlineBadge} ${styles.deadlineSafe}`} style={{ fontSize: '0.7rem' }}>
          &gt; 7 days
        </span>
      </div>

      {/* ── Deadline List ─────────────────────────── */}
      {deadlines.length === 0 ? (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>
            <Clock size={36} />
          </div>
          No deadlines yet. Add your first above.
        </div>
      ) : (
        <div className={styles.deadlinesList}>
          <AnimatePresence initial={false}>
            {deadlines.map((d) => {
              const days = daysRemaining(d.date);
              return (
                <motion.div
                  key={d.id}
                  className={styles.deadlineItem}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 16 }}
                  transition={{ duration: 0.17 }}
                  layout
                >
                  <div className={`${styles.deadlineBadge} ${badgeClass(days)}`}>
                    {days <= 3 && days >= 0 && (
                      <AlertTriangle size={10} style={{ display: 'inline', marginRight: '3px' }} />
                    )}
                    {badgeLabel(days)}
                  </div>

                  <div className={styles.deadlineContent}>
                    <p className={styles.deadlineLabel}>{d.label}</p>
                    <p className={styles.deadlineDate}>{formatDate(d.date)}</p>
                  </div>

                  <button
                    onClick={() => handleDelete(d.id)}
                    className={styles.deadlineDelete}
                    aria-label={`Delete deadline: ${d.label}`}
                  >
                    <Trash2 size={15} />
                  </button>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
