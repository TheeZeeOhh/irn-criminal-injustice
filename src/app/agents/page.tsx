'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Lock, Scale, FileText, Send, Sparkles, Terminal, ChevronRight, Play, Search, X, CornerDownLeft } from 'lucide-react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import styles from '../criminal-injustice/page.module.css';
import searchStyles from './agents.module.css';
import { SEARCH_INDEX } from '../components/GlobalSearch';

// Styling override inline to ensure it looks extremely premium and matches the rest of the site
const agentStyles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '4rem 24px',
    display: 'grid',
    gridTemplateColumns: '320px 1fr',
    gap: '3rem',
  },
  sidebar: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '1rem',
  },
  agentTab: {
    background: 'var(--bg3)',
    border: '1px solid var(--line)',
    padding: '1.25rem',
    borderRadius: '6px',
    cursor: 'pointer',
    textAlign: 'left' as const,
    transition: 'all 0.2s ease',
  },
  agentTabActive: {
    background: 'var(--bg3)',
    borderColor: 'var(--gold)',
    boxShadow: '0 0 15px rgba(200, 149, 42, 0.15)',
  },
  tabTitle: {
    fontFamily: 'var(--font-display)',
    fontWeight: 700,
    fontSize: '1.1rem',
    color: 'var(--ink)',
    marginBottom: '0.25rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  tabSub: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.75rem',
    color: 'var(--ink2)',
  },
  terminalCard: {
    background: '#0e0b08',
    border: '1px solid var(--line)',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
    display: 'flex',
    flexDirection: 'column' as const,
    minHeight: '580px',
  },
  terminalHeader: {
    background: '#130f0b',
    borderBottom: '1px solid var(--line)',
    padding: '1rem 1.5rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dotContainer: {
    display: 'flex',
    gap: '6px',
  },
  dot: (color: string) => ({
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    backgroundColor: color,
  }),
  terminalTitle: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.8rem',
    color: 'var(--ink3)',
    letterSpacing: '0.05em',
  },
  terminalBody: {
    padding: '2rem',
    flex: 1,
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '1.5rem',
  },
  inputArea: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '0.75rem',
  },
  label: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.8rem',
    color: 'var(--ink2)',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.05em',
  },
  textarea: {
    background: 'var(--bg2)',
    border: '1px solid var(--line)',
    color: 'var(--ink)',
    borderRadius: '4px',
    padding: '1rem',
    fontFamily: 'var(--font-body)',
    fontSize: '0.9rem',
    resize: 'none' as const,
    outline: 'none',
    width: '100%',
    transition: 'border-color 0.2s',
  },
  quickSelectRow: {
    display: 'flex',
    flexWrap: 'wrap' as const,
    gap: '0.5rem',
  },
  quickSelectBtn: {
    background: 'rgba(232, 226, 214, 0.05)',
    border: '1px solid var(--line)',
    color: 'var(--ink2)',
    padding: '0.4rem 0.75rem',
    borderRadius: '4px',
    fontSize: '0.75rem',
    fontFamily: 'var(--font-body)',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  runBtn: {
    background: 'var(--ember)',
    color: 'var(--ink)',
    border: 'none',
    padding: '1rem 2rem',
    borderRadius: '4px',
    fontFamily: 'var(--font-body)',
    fontWeight: 700,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.05em',
    cursor: 'pointer',
    alignSelf: 'flex-start',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    transition: 'all 0.2s',
  },
  outputTerminal: {
    background: '#080604',
    border: '1px solid var(--line)',
    borderRadius: '4px',
    padding: '1.5rem',
    fontFamily: 'var(--font-body)',
    fontSize: '0.85rem',
    color: '#39ff14', // Matrix green color
    overflowY: 'auto' as const,
    maxHeight: '300px',
    whiteSpace: 'pre-wrap' as const,
    lineHeight: '1.5',
    flex: 1,
    position: 'relative' as const,
  },
};

const AGENT_DATA = [
  {
    id: 'intake',
    name: 'Intake Analyst Agent',
    role: 'Case Review & Triage',
    icon: <Shield size={18} />,
    color: 'var(--ember)',
    systemPrompt: 'Triaging raw incident narrative, parsing locations/officers, checking CJRRP eligibility...',
    samples: [
      {
        label: 'Norfolk Protest Arrest',
        text: 'On June 10 in Norfolk, VA, my brother John was holding a peaceful protest sign when Officer Davis grabbed him, threw him on the ground, and arrested him. They took his phone and did not read his Miranda rights.',
      },
      {
        label: 'Richmond Wrongful Prosecution',
        text: 'I was accused of grand larceny in Richmond. The prosecution is using cell phone location data that doesn\'t match my location. I need legal help before my trial next month.',
      },
    ],
    generateOutput: (input: string) => {
      const isNorfolk = input.toLowerCase().includes('norfolk');
      const isProtest = input.toLowerCase().includes('protest') || input.toLowerCase().includes('peaceful');
      
      return JSON.stringify({
        triage_status: 'COMPLETE',
        urgency_level: isProtest ? 'CRITICAL (1st Amendment Violation)' : 'HIGH',
        jurisdiction: isNorfolk ? 'Norfolk Circuit Court, VA' : 'Richmond, VA',
        extracted_entities: {
          victim: 'John (reported relative)',
          officer: isNorfolk ? 'Officer Davis' : 'Unknown',
          witnesses: 'Protest observers',
        },
        violations_flagged: [
          'Unlawful arrest / Excessive force',
          'Miranda rights failure',
          'Potential 1st Amendment suppression',
        ],
        cjrrp_eligible: true,
        action_required: 'ATTORNEY REFERRAL DEPLOYED - TRIGGER 72-HOUR OUTREACH DIRECTIVE',
      }, null, 2);
    },
  },
  {
    id: 'foia',
    name: 'FOIA Generator Agent',
    role: 'Public Records Builder',
    icon: <FileText size={18} />,
    color: 'var(--gold)',
    systemPrompt: 'Searching regional public records templates, generating state-specific VFOIA draft...',
    samples: [
      {
        label: 'Norfolk Arrest Records',
        text: 'Requesting body camera footage, arrest report, and dispatch logs for the arrest of John Doe on June 10, 2026, near 200 E. Main St, Norfolk.',
      },
      {
        label: 'Richmond Police Misconduct Logs',
        text: 'Internal affairs records and complaints filed against Officer Mark Robinson between 2024 and 2026.',
      },
    ],
    generateOutput: (input: string) => {
      const isNorfolk = input.toLowerCase().includes('norfolk');
      const targetAgency = isNorfolk ? 'City of Norfolk Police Department\nAttn: FOIA Officer\n300 E. Main Street\nNorfolk, VA 23510' : 'Richmond Police Department\nAttn: FOIA Manager\n200 W. Grace St\nRichmond, VA 23220';
      
      return `Date: June 12, 2026

TO:
${targetAgency}

RE: Virginia Freedom of Information Act (VFOIA) Request

Dear Public Records Officer,

Under the Virginia Freedom of Information Act (§ 2.2-3700 et seq.), I hereby request the following records:

1. Copy of the full arrest report, booking logs, and mugshots for the incident on June 10, 2026.
2. All body-worn camera (BWC) footage and dashboard camera footage of the responding officers.
3. Computer-Aided Dispatch (CAD) reports and radio audio transmissions.

Please respond within the statutory five (5) working days. If any fee is expected to exceed $25, please notify me in advance.

Respectfully submitted,
[Anonymous Reporter via Injustice Reform Network CHRT Protocol]`;
    },
  },
  {
    id: 'matcher',
    name: 'Attorney Matcher Agent',
    role: 'Referral Pipeline Coordinator',
    icon: <Scale size={18} />,
    color: 'var(--sage)',
    systemPrompt: 'Scanning directory of civil rights attorneys, verifying bar standing and capacity...',
    samples: [
      {
        label: 'Norfolk Wrongful Arrest Lawyer',
        text: 'Looking for a pro bono attorney in Norfolk, Virginia, experienced in police brutality and wrongful arrests.',
      },
      {
        label: 'Richmond Criminal Defense',
        text: 'Need a criminal defense lawyer in Richmond to file a motion to suppress invalid geolocation evidence.',
      },
    ],
    generateOutput: (input: string) => {
      const isNorfolk = input.toLowerCase().includes('norfolk');
      if (isNorfolk) {
        return `=== SCANNING PARTNER DIRECTORY (HAMPTON ROADS, VA) ===
[MATCH 1]
Attorney: Marcus Vance, Esq.
Firm: Vance & Partners Civil Rights Law
Location: Norfolk, VA
Standing: Active (Virginia State Bar)
Experience: 14 Years, Police Misconduct & Section 1983
Capacity Status: AVAILABLE
Callback window: 24 Hours

[MATCH 2]
Attorney: Sarah Lin, Esq.
Firm: Tidewater Legal Defense
Location: Virginia Beach, VA
Standing: Active (Virginia State Bar)
Experience: 9 Years, Criminal Defense & Constitutional Rights
Capacity Status: LIMITED
Callback window: 72 Hours

REFERRAL ORDER GENERATED: Vance & Partners notified via secure encrypted portal.`;
      } else {
        return `=== SCANNING PARTNER DIRECTORY (RICHMOND, VA) ===
[MATCH 1]
Attorney: David Miller, Esq.
Firm: RVA Criminal Defense & Civil Liberties
Location: Richmond, VA
Standing: Active (Virginia State Bar)
Experience: 19 Years, Evidentiary Motions & Tech Surveillance Defense
Capacity Status: AVAILABLE
Callback window: 48 Hours

REFERRAL ORDER GENERATED: RVA Defense notified via secure encrypted portal.`;
      }
    },
  },
  {
    id: 'press',
    name: 'Campaign Press Writer',
    role: 'Solidarity Narrative Draft',
    icon: <Sparkles size={18} />,
    color: 'var(--gold-l)',
    systemPrompt: 'Applying IRN tone of voice, checking legal liability parameters, drafting release...',
    samples: [
      {
        label: 'Protest Case Dismissed',
        text: 'All charges dismissed against peaceful protestor John Doe in Norfolk after IRN proved bodycam footage contradicted police reports.',
      },
      {
        label: 'Systemic Abuse Campaign',
        text: 'Launching public awareness campaign on unlawful smartphone searches by transit officers at Richmond stations.',
      },
    ],
    generateOutput: (input: string) => {
      const isNorfolk = input.toLowerCase().includes('norfolk') || input.toLowerCase().includes('john doe');
      if (isNorfolk) {
        return `FOR IMMEDIATE RELEASE
June 12, 2026

INJUSTICE REFORM NETWORK CELEBRATES DISMISSAL OF ALL CHARGES AGAINST PEACEFUL PROTESTER IN NORFOLK

NORFOLK, VA — Today, the Injustice Reform Network (IRN) celebrates the complete vindication of John Doe, who had all criminal charges dismissed in Norfolk Circuit Court. 

John Doe was arrested on June 10 during a peaceful assembly. Police claims of "disorderly conduct" were fully dismantled after IRN investigators retrieved body-worn camera footage showing no unlawful behavior. 

"This dismissal is proof that disciplined documentation and immediate legal intervention can break wrongful prosecution," said an IRN spokesperson. "The system relies on people staying quiet. We refuse to comply."

Contact: press@injusticereformnetwork.org`;
      } else {
        return `FOR IMMEDIATE RELEASE
June 12, 2026

INJUSTICE REFORM NETWORK LAUNCHES CAMPAIGN AGAINST ILLEGAL TRANSIT PHONE SEARCHES IN RICHMOND

RICHMOND, VA — The Injustice Reform Network (IRN) is launching a public campaign to expose and end systemic, warrantless smartphone searches conducted by transit officers at local stations.

IRN has documented numerous CHRT intake reports from commuters who were coerced into unlocking their devices under threat of arrest. IRN warns that these searches directly violate the Fourth Amendment.

"Your digital data is private. Officers cannot force you to unlock your phone without a warrant," said an IRN representative. "We are organizing direct actions and distributing Know Your Rights cards to commuters."

Contact: campaigns@injusticereformnetwork.org`;
      }
    },
  },
];

interface SearchResultItem {
  id: string;
  type: 'agent' | 'template' | 'page';
  title: string;
  subtitle: string;
  snippet: string;
  path?: string;
  agentIndex?: number;
  templateText?: string;
}

export default function AgentsPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [inputText, setInputText] = useState(AGENT_DATA[0].samples[0].text);
  const [running, setRunning] = useState(false);
  const [consoleOutput, setConsoleOutput] = useState('Terminal ready. Choose a sample or enter custom text and click "Run Agent".');

  const router = useRouter();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const [activeSearchIndex, setActiveSearchIndex] = useState(0);
  const [toastMessage, setToastMessage] = useState('');

  // Build the complete search database once
  const searchDatabase = useMemo<SearchResultItem[]>(() => {
    const database: SearchResultItem[] = [];

    // 1. Add AI Agents
    AGENT_DATA.forEach((agent, idx) => {
      database.push({
        id: `agent-${idx}`,
        type: 'agent',
        title: agent.name,
        subtitle: agent.role,
        snippet: agent.systemPrompt,
        agentIndex: idx,
      });

      // 2. Add Agent Templates
      agent.samples.forEach((sample, sIdx) => {
        database.push({
          id: `template-${idx}-${sIdx}`,
          type: 'template',
          title: `Template: ${sample.label}`,
          subtitle: `Capability of ${agent.name}`,
          snippet: sample.text.substring(0, 120) + (sample.text.length > 120 ? '...' : ''),
          agentIndex: idx,
          templateText: sample.text,
        });
      });
    });

    // 3. Add Site Pages & Guides
    SEARCH_INDEX.forEach((page, idx) => {
      database.push({
        id: `page-${idx}`,
        type: 'page',
        title: page.title,
        subtitle: page.category,
        snippet: page.snippet,
        path: page.path,
      });
    });

    return database;
  }, []);

  // Filter search results based on query
  const filteredSearchResults = useMemo(() => {
    if (!searchQuery.trim()) {
      // Suggest agents when input is empty but focused
      return searchDatabase.filter(item => item.type === 'agent');
    }
    const q = searchQuery.toLowerCase();
    return searchDatabase.filter(item => 
      item.title.toLowerCase().includes(q) ||
      item.subtitle.toLowerCase().includes(q) ||
      item.snippet.toLowerCase().includes(q)
    );
  }, [searchQuery, searchDatabase]);

  // Reset index when search query changes
  useEffect(() => {
    setActiveSearchIndex(0);
  }, [searchQuery]);

  // Toast auto-clear
  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(e.target as Node) &&
        searchInputRef.current && 
        !searchInputRef.current.contains(e.target as Node)
      ) {
        setSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Capture global hotkeys to focus search input
  useEffect(() => {
    const handleGlobalShortcut = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const isInput = target.tagName === 'INPUT' || 
                      target.tagName === 'TEXTAREA' || 
                      target.isContentEditable;
      if (isInput) return;

      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        e.stopPropagation();
        setSearchFocused(true);
        searchInputRef.current?.focus();
      } else if (e.key === '/') {
        e.preventDefault();
        e.stopPropagation();
        setSearchFocused(true);
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleGlobalShortcut, true);
    return () => window.removeEventListener('keydown', handleGlobalShortcut, true);
  }, []);

  const handleSelectResult = (item: SearchResultItem) => {
    if (item.type === 'agent' && typeof item.agentIndex === 'number') {
      handleTabChange(item.agentIndex);
      setToastMessage(`Switched to ${item.title}`);
    } else if (item.type === 'template' && typeof item.agentIndex === 'number' && item.templateText) {
      handleTabChange(item.agentIndex);
      setInputText(item.templateText);
      setToastMessage(`Loaded template: "${item.title.replace('Template: ', '')}"`);
      setTimeout(() => {
        if (typeof document !== 'undefined') {
          const textarea = document.querySelector('textarea');
          if (textarea) {
            textarea.focus();
            if (typeof textarea.scrollIntoView === 'function') {
              textarea.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
          }
        }
      }, 100);
    } else if (item.type === 'page' && item.path) {
      router.push(item.path);
    }
    setSearchQuery('');
    setSearchFocused(false);
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveSearchIndex(prev => 
        prev < filteredSearchResults.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveSearchIndex(prev => 
        prev > 0 ? prev - 1 : filteredSearchResults.length - 1
      );
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredSearchResults[activeSearchIndex]) {
        handleSelectResult(filteredSearchResults[activeSearchIndex]);
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setSearchFocused(false);
      searchInputRef.current?.blur();
    }
  };

  const activeAgent = AGENT_DATA[activeTab];

  function handleTabChange(idx: number) {
    setActiveTab(idx);
    setInputText(AGENT_DATA[idx].samples[0].text);
    setConsoleOutput('Terminal ready. Choose a sample or enter custom text and click "Run Agent".');
  }

  function handleQuickSelect(text: string) {
    setInputText(text);
  }

  function runAgent() {
    if (running) return;
    setRunning(true);
    setConsoleOutput(`[SYSTEM] Initializing ${activeAgent.name}...\n[SYSTEM] ${activeAgent.systemPrompt}\n`);
    
    let dots = 0;
    const interval = setInterval(() => {
      dots++;
      setConsoleOutput(prev => prev + '.');
      if (dots >= 6) {
        clearInterval(interval);
        setConsoleOutput(prev => {
          return prev + `\n[SUCCESS] Execution complete.\n\n=== AGENT RESPONSE ===\n\n${activeAgent.generateOutput(inputText)}`;
        });
        setRunning(false);
      }
    }, 300);
  }

  return (
    <>
      <Nav />
      <main id="main-content" style={{ backgroundColor: 'var(--bg)', minHeight: '100vh' }}>
        
        {/* Splash/Hero */}
        <section className={styles.section} style={{ paddingBottom: '3rem', borderBottom: '1px solid var(--line)' }}>
          <div className={styles.container} style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span className={styles.sectionKicker}>Next-Gen Infrastructure</span>
            <h1 className={styles.sectionTitle} style={{ marginBottom: '1rem' }}>IRN AI Agent Command Center</h1>
            <p style={{ maxWidth: '700px', margin: '0 auto 1.5rem', color: 'var(--ink2)', fontFamily: 'var(--font-body)', fontSize: '0.9rem' }}>
              We have defined and built custom AI agents to assist our network operations. Tap into their capabilities below to test real-time case triaging, FOIA writing, legal matching, and press production.
            </p>

            {/* Premium Global Search Bar */}
            <div className={searchStyles.searchWrapper} ref={dropdownRef}>
              <div 
                className={`${searchStyles.searchBar} ${searchFocused ? searchStyles.searchBarFocused : ''}`}
                onClick={() => searchInputRef.current?.focus()}
              >
                <Search className={searchStyles.searchIcon} size={18} />
                <input
                  ref={searchInputRef}
                  type="text"
                  className={searchStyles.searchInput}
                  placeholder="Search agents, capabilities, legal resources..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  onKeyDown={handleSearchKeyDown}
                  id="global-agent-search"
                />
                {searchQuery ? (
                  <button 
                    className={searchStyles.clearButton} 
                    onClick={(e) => {
                      e.stopPropagation();
                      setSearchQuery('');
                      searchInputRef.current?.focus();
                    }}
                    aria-label="Clear search"
                  >
                    <X size={16} />
                  </button>
                ) : (
                  <div className={searchStyles.hotkeyBadge}>
                    <span>⌘</span><span>K</span>
                  </div>
                )}
              </div>

              {/* Search results dropdown */}
              <AnimatePresence>
                {searchFocused && (
                  <motion.div 
                    className={searchStyles.dropdownResults}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.15 }}
                  >
                    {filteredSearchResults.length > 0 ? (
                      <div>
                        {/* Grouped header depending on query state */}
                        <div className={searchStyles.resultSectionHeader}>
                          {searchQuery.trim() ? `Search Results (${filteredSearchResults.length})` : 'Suggested Actions & Agents'}
                        </div>
                        
                        {filteredSearchResults.map((result, idx) => {
                          const isActive = idx === activeSearchIndex;
                          return (
                            <div
                              key={result.id}
                              className={`${searchStyles.resultItem} ${isActive ? searchStyles.resultItemActive : ''}`}
                              onClick={() => handleSelectResult(result)}
                              onMouseEnter={() => setActiveSearchIndex(idx)}
                            >
                              <div className={searchStyles.resultTitleRow}>
                                <span className={searchStyles.resultTitle}>
                                  {result.type === 'agent' && <Shield size={14} style={{ color: 'var(--ember)' }} />}
                                  {result.type === 'template' && <Sparkles size={14} style={{ color: 'var(--gold)' }} />}
                                  {result.type === 'page' && <FileText size={14} style={{ color: 'var(--sage)' }} />}
                                  {result.title}
                                </span>
                                <span className={`${searchStyles.resultBadge} ${
                                  result.type === 'agent' ? searchStyles.badgeAgent :
                                  result.type === 'template' ? searchStyles.badgeTemplate :
                                  searchStyles.badgePage
                                }`}>
                                  {result.type === 'agent' ? 'Agent' :
                                   result.type === 'template' ? 'Template' :
                                   result.subtitle}
                                </span>
                              </div>
                              <p className={searchStyles.resultSnippet}>{result.snippet}</p>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className={searchStyles.noResults}>
                        No matches found for &ldquo;{searchQuery}&rdquo;
                      </div>
                    )}
                    
                    {/* Search Footer */}
                    <div className={searchStyles.searchFooter}>
                      <div className={searchStyles.keyboardTip}>
                        <span>Navigate:</span>
                        <span className={searchStyles.keyLabel}>↑</span>
                        <span className={searchStyles.keyLabel}>↓</span>
                      </div>
                      <div className={searchStyles.keyboardTip}>
                        <span>Select:</span>
                        <span className={searchStyles.keyLabel}>Enter</span>
                      </div>
                      <div className={searchStyles.keyboardTip}>
                        <span>Close:</span>
                        <span className={searchStyles.keyLabel}>ESC</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* Dashboard Grid */}
        <section style={{ padding: '4rem 0' }}>
          <div style={agentStyles.container}>
            
            {/* Sidebar list */}
            <div style={agentStyles.sidebar}>
              <span style={agentStyles.label}>Select Agent</span>
              {AGENT_DATA.map((agent, idx) => {
                const isActive = activeTab === idx;
                return (
                  <button
                    key={agent.id}
                    onClick={() => handleTabChange(idx)}
                    style={{
                      ...agentStyles.agentTab,
                      ...(isActive ? agentStyles.agentTabActive : {}),
                    }}
                  >
                    <div style={agentStyles.tabTitle}>
                      <span style={{ color: agent.color }}>{agent.icon}</span>
                      {agent.name}
                    </div>
                    <div style={agentStyles.tabSub}>{agent.role}</div>
                  </button>
                );
              })}
              
              <div style={{ marginTop: '2rem', padding: '1.25rem', border: '1px solid var(--line)', borderRadius: '6px', background: 'rgba(212, 98, 46, 0.03)' }}>
                <h4 style={{ fontFamily: 'var(--font-display)', color: 'var(--ink)', fontSize: '0.95rem', marginBottom: '0.5rem', fontWeight: 700 }}>
                  Solidarity Workflows
                </h4>
                <p style={{ fontFamily: 'var(--font-body)', color: 'var(--ink3)', fontSize: '0.75rem', lineHeight: '1.5' }}>
                  These agents cooperate autonomously behind the scenes during actual CHRT reports to provide a 72-hour turnaround for verified legal help.
                </p>
              </div>
            </div>

            {/* Terminal Panel */}
            <div style={agentStyles.terminalCard}>
              
              {/* Header */}
              <div style={agentStyles.terminalHeader}>
                <div style={agentStyles.dotContainer}>
                  <div style={agentStyles.dot('#ff5f56')} />
                  <div style={agentStyles.dot('#ffbd2e')} />
                  <div style={agentStyles.dot('#27c93f')} />
                </div>
                <div style={agentStyles.terminalTitle}>
                  {activeAgent.name.toUpperCase()} · TERMINAL v1.0.4
                </div>
                <Terminal size={14} style={{ color: 'var(--ink3)' }} />
              </div>

              {/* Body */}
              <div style={agentStyles.terminalBody}>
                
                {/* Inputs */}
                <div style={agentStyles.inputArea}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <label style={agentStyles.label}>Agent Input Data</label>
                    <div style={agentStyles.quickSelectRow}>
                      <span style={{ ...agentStyles.label, fontSize: '0.7rem', alignSelf: 'center', marginRight: '0.25rem' }}>Templates:</span>
                      {activeAgent.samples.map((sample, sIdx) => (
                        <button
                          key={sIdx}
                          onClick={() => handleQuickSelect(sample.text)}
                          style={agentStyles.quickSelectBtn}
                        >
                          {sample.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <textarea
                    rows={4}
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    style={agentStyles.textarea}
                    placeholder="Enter case narrative, facts, or instructions for the agent..."
                  />
                </div>

                {/* Run button */}
                <button
                  onClick={runAgent}
                  disabled={running || !inputText.trim()}
                  style={{
                    ...agentStyles.runBtn,
                    opacity: running || !inputText.trim() ? 0.6 : 1,
                    cursor: running || !inputText.trim() ? 'not-allowed' : 'pointer',
                  }}
                >
                  {running ? (
                    <>Running Agent...</>
                  ) : (
                    <>
                      <Play size={14} fill="currentColor" /> Run {activeAgent.name}
                    </>
                  )}
                </button>

                {/* Output Terminal Console */}
                <div style={agentStyles.inputArea}>
                  <label style={agentStyles.label}>Console Output & Artifact</label>
                  <div style={agentStyles.outputTerminal}>
                    {consoleOutput}
                  </div>
                </div>

              </div>

            </div>

          </div>
        </section>

      </main>
      <Footer />
      {toastMessage && (
        <div className={searchStyles.toast} id="search-toast">
          <Sparkles size={16} style={{ color: 'var(--gold)' }} />
          <span>{toastMessage}</span>
        </div>
      )}
    </>
  );
}
