'use client';

import { useState, useRef, useEffect } from 'react';
import { Camera, Plus, Trash2, Download, FileText, Image as ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './panels.module.css';

interface EvidenceEntry {
  id: string;
  timestamp: string;
  note: string;
  photoDataUrl?: string;
}

const STORAGE_KEY = 'communityshield_evidence';

function loadEntries(): EvidenceEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as EvidenceEntry[]) : [];
  } catch {
    return [];
  }
}

function saveEntries(entries: EvidenceEntry[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

export default function EvidencePanel() {
  const [entries, setEntries] = useState<EvidenceEntry[]>([]);
  const [note, setNote] = useState('');
  const [photoDataUrl, setPhotoDataUrl] = useState<string | undefined>(undefined);
  const [selectedFileName, setSelectedFileName] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setEntries(loadEntries());
  }, []);

  function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setSelectedFileName(file.name);
    const reader = new FileReader();
    reader.onload = () => {
      setPhotoDataUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  }

  function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!note.trim()) return;

    const newEntry: EvidenceEntry = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      timestamp: new Date().toLocaleString('en-US', {
        dateStyle: 'medium',
        timeStyle: 'short',
      }),
      note: note.trim(),
      photoDataUrl,
    };

    const updated = [newEntry, ...entries];
    setEntries(updated);
    saveEntries(updated);
    setNote('');
    setPhotoDataUrl(undefined);
    setSelectedFileName('');
    if (fileRef.current) fileRef.current.value = '';
  }

  function handleDelete(id: string) {
    const updated = entries.filter((e) => e.id !== id);
    setEntries(updated);
    saveEntries(updated);
  }

  function handleExport() {
    const blob = new Blob([JSON.stringify(entries, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `communityshield-evidence-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className={styles.panel}>
      <div className={styles.panelHeader}>
        <p className={styles.panelEyebrow}>Evidence Locker</p>
        <h2 className={styles.panelTitle}>Document Everything</h2>
        <p className={styles.panelDesc}>
          Timestamped notes and photos saved to your device. Share with attorneys, IRN, or courts.
        </p>
      </div>

      {/* ── Add Form ──────────────────────────────── */}
      <form onSubmit={handleAdd} className={styles.evidenceForm}>
        <div className={styles.formGroup}>
          <label htmlFor="evidence-note" className={styles.formLabel}>
            What happened?
          </label>
          <textarea
            id="evidence-note"
            className={styles.textarea}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Describe the incident, damage, or conversation in detail…"
            rows={4}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.fileInputLabel}>
            <ImageIcon size={15} />
            Attach a photo (optional)
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              capture="environment"
              className={styles.fileInput}
              onChange={handlePhotoChange}
            />
          </label>
          {selectedFileName && (
            <span className={styles.selectedFile}>{selectedFileName}</span>
          )}
        </div>

        <div className={styles.formActions}>
          <button
            type="submit"
            className={styles.btnPrimary}
            disabled={!note.trim()}
          >
            <Plus size={15} />
            Save Entry
          </button>
        </div>
      </form>

      {/* ── Entry List ────────────────────────────── */}
      <div className={styles.entriesHeader}>
        <span className={styles.entriesTitle}>
          <FileText size={16} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle' }} />
          Saved Entries
        </span>
        <span className={styles.entryCount}>{entries.length} record{entries.length !== 1 ? 's' : ''}</span>
        {entries.length > 0 && (
          <button onClick={handleExport} className={styles.btnSecondary}>
            <Download size={14} />
            Export JSON
          </button>
        )}
      </div>

      {entries.length === 0 ? (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>
            <Camera size={36} />
          </div>
          No entries yet. Add your first note above.
        </div>
      ) : (
        <div className={styles.entriesList}>
          <AnimatePresence initial={false}>
            {entries.map((entry) => (
              <motion.div
                key={entry.id}
                className={styles.entryCard}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.18 }}
                layout
              >
                {entry.photoDataUrl && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={entry.photoDataUrl}
                    alt="Evidence photo"
                    className={styles.entryThumb}
                  />
                )}
                <div className={styles.entryContent}>
                  <p className={styles.entryTimestamp}>{entry.timestamp}</p>
                  <p className={styles.entryNote}>{entry.note}</p>
                </div>
                <button
                  onClick={() => handleDelete(entry.id)}
                  className={styles.entryDelete}
                  aria-label={`Delete entry from ${entry.timestamp}`}
                >
                  <Trash2 size={15} />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
