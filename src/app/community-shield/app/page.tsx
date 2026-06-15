'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldCheck, FileText, Camera, MapPin, Clock, PhoneCall, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './app.module.css';

import RightsPanel from './panels/RightsPanel';
import EvidencePanel from './panels/EvidencePanel';
import ResourcesPanel from './panels/ResourcesPanel';
import DeadlinesPanel from './panels/DeadlinesPanel';
import EscalatePanel from './panels/EscalatePanel';

type TabId = 'rights' | 'evidence' | 'resources' | 'deadlines' | 'escalate';

const TABS: { id: TabId; label: string; Icon: React.ComponentType<{ size?: number }> }[] = [
  { id: 'rights', label: 'Rights', Icon: ShieldCheck },
  { id: 'evidence', label: 'Evidence', Icon: Camera },
  { id: 'resources', label: 'Resources', Icon: MapPin },
  { id: 'deadlines', label: 'Deadlines', Icon: Clock },
  { id: 'escalate', label: 'Escalate', Icon: PhoneCall },
];

const PANEL_MAP: Record<TabId, React.ReactNode> = {
  rights: <RightsPanel />,
  evidence: <EvidencePanel />,
  resources: <ResourcesPanel />,
  deadlines: <DeadlinesPanel />,
  escalate: <EscalatePanel />,
};

export default function CommunityShieldApp() {
  const router = useRouter();
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [activeTab, setActiveTab] = useState<TabId>('rights');

  useEffect(() => {
    const access = localStorage.getItem('communityshield_access');
    if (access === 'true') {
      setAuthed(true);
    } else {
      router.replace('/community-shield/purchase/');
    }
  }, [router]);

  function handleExit() {
    localStorage.removeItem('communityshield_access');
    router.push('/community-shield/');
  }

  if (authed === null) {
    return (
      <div className={styles.authCheck} aria-label="Checking access…">
        Checking access…
      </div>
    );
  }

  return (
    <div className={styles.shell}>
      {/* ── Top Nav ───────────────────────────────────────── */}
      <header className={styles.topNav}>
        <div className={styles.topNavInner}>
          <div className={styles.brandWrap}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/irn-criminal-injustice/logo.png"
              alt="IRN"
              className={styles.brandLogo}
            />
            <div>
              <span className={styles.brandShield}>IRN</span>
              <span className={styles.brandName}>CommunityShield</span>
            </div>
          </div>

          <div className={styles.navRight}>
            <button
              onClick={handleExit}
              className={styles.exitBtn}
              aria-label="Exit CommunityShield"
              title="Exit and revoke access"
            >
              <LogOut size={13} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }} />
              Exit
            </button>
          </div>
        </div>
      </header>

      {/* ── Tab Bar ───────────────────────────────────────── */}
      <nav className={styles.tabBar} aria-label="CommunityShield navigation">
        <div className={styles.tabBarInner}>
          {TABS.map(({ id, label, Icon }) => (
            <button
              key={id}
              role="tab"
              aria-selected={activeTab === id}
              aria-controls={`panel-${id}`}
              onClick={() => setActiveTab(id)}
              className={`${styles.tab} ${activeTab === id ? styles.tabActive : ''}`}
            >
              <Icon size={14} />
              {label}
            </button>
          ))}
        </div>
      </nav>

      {/* ── Panel ─────────────────────────────────────────── */}
      <main className={styles.main} id="main-content">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activeTab}
            id={`panel-${activeTab}`}
            role="tabpanel"
            aria-label={`${TABS.find((t) => t.id === activeTab)?.label} panel`}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
          >
            {PANEL_MAP[activeTab]}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
