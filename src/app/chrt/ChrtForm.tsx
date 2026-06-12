'use client';
import { useState, useRef } from 'react';
import { Shield, Lock, Download, ChevronDown, ChevronUp, AlertTriangle, CheckCircle, Eye, EyeOff } from 'lucide-react';
import styles from './ChrtForm.module.css';

// ─── Types ────────────────────────────────────────────────────────────────────

type Step = 'type' | 'details' | 'encrypt' | 'done';

interface ReportData {
  reportType: string;
  incidentDate: string;
  incidentLocation: string;
  agencyOrEntity: string;
  officersOrIndividuals: string;
  witnessCount: string;
  narrative: string;
  evidenceDescription: string;
  priorReports: string;
  contactMethod: string; // 'none' | 'email' | 'phone' | 'signal'
  contactValue: string;
  alias: string;
  submittedAt: string;
}

const REPORT_TYPES = [
  { id: 'police-misconduct', label: 'Police Misconduct', desc: 'Use of force, false arrest, harassment, intimidation' },
  { id: 'wrongful-conviction', label: 'Wrongful Conviction', desc: 'False evidence, ineffective counsel, Brady violations' },
  { id: 'cps-family', label: 'CPS / Family Policing', desc: 'Unlawful removal, coercion, discriminatory investigation' },
  { id: 'environmental', label: 'Environmental Harm', desc: 'Contamination, violations, regulatory negligence' },
  { id: 'school-discipline', label: 'School Discipline / Pipeline', desc: 'Suspension, expulsion, MDR violations, police in schools' },
  { id: 'housing-homelessness', label: 'Housing / Homelessness', desc: 'Unlawful eviction, shelter abuse, criminalization of poverty' },
  { id: 'retaliation', label: 'Retaliation / Targeting', desc: 'Harassment after reporting, surveillance, intimidation' },
  { id: 'other', label: 'Other Civil Rights Harm', desc: 'Doesn\'t fit above — describe in your own words' },
];

// ─── AES-256-GCM encryption (Web Crypto API) ──────────────────────────────────

async function encryptReport(data: ReportData): Promise<{ encrypted: string; keyHex: string }> {
  const plaintext = new TextEncoder().encode(JSON.stringify(data, null, 2));

  // Generate a random 256-bit key
  const key = await crypto.subtle.generateKey(
    { name: 'AES-GCM', length: 256 },
    true,
    ['encrypt', 'decrypt']
  );

  // Generate a random 96-bit IV
  const iv = crypto.getRandomValues(new Uint8Array(12));

  const ciphertext = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    plaintext
  );

  // Export key as hex for the user to save
  const rawKey = await crypto.subtle.exportKey('raw', key);
  const keyHex = Array.from(new Uint8Array(rawKey))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');

  // Pack: iv (12 bytes) || ciphertext, base64-encoded
  const combined = new Uint8Array(iv.byteLength + ciphertext.byteLength);
  combined.set(iv, 0);
  combined.set(new Uint8Array(ciphertext), iv.byteLength);
  const encrypted = btoa(String.fromCharCode(...combined));

  return { encrypted, keyHex };
}

function downloadText(filename: string, content: string) {
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function TrustBar() {
  return (
    <div className={styles.trustBar}>
      <span className={styles.trustItem}><Lock size={13} /> AES-256-GCM encrypted in your browser</span>
      <span className={styles.trustItem}><Shield size={13} /> IRN never sees your key</span>
      <span className={styles.trustItem}><Eye size={13} /> No name required</span>
    </div>
  );
}

function StepIndicator({ step }: { step: Step }) {
  const steps: { id: Step; label: string }[] = [
    { id: 'type', label: 'Report Type' },
    { id: 'details', label: 'Incident Details' },
    { id: 'encrypt', label: 'Review & Encrypt' },
    { id: 'done', label: 'Complete' },
  ];
  const current = steps.findIndex((s) => s.id === step);
  return (
    <div className={styles.stepRow} aria-label="Progress">
      {steps.map((s, i) => (
        <div key={s.id} className={`${styles.stepItem} ${i < current ? styles.stepDone : ''} ${i === current ? styles.stepActive : ''}`}>
          <span className={styles.stepNum}>{i < current ? '✓' : i + 1}</span>
          <span className={styles.stepLabel}>{s.label}</span>
          {i < steps.length - 1 && <span className={styles.stepLine} aria-hidden="true" />}
        </div>
      ))}
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

export default function ChrtForm() {
  const [step, setStep] = useState<Step>('type');
  const [reportType, setReportType] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [keyCopied, setKeyCopied] = useState(false);
  const [encryptedPayload, setEncryptedPayload] = useState('');
  const [decryptionKey, setDecryptionKey] = useState('');
  const [encrypting, setEncrypting] = useState(false);
  const [errors, setErrors] = useState<Partial<ReportData>>({});
  const formRef = useRef<HTMLFormElement>(null);

  const [fields, setFields] = useState<ReportData>({
    reportType: '',
    incidentDate: '',
    incidentLocation: '',
    agencyOrEntity: '',
    officersOrIndividuals: '',
    witnessCount: '',
    narrative: '',
    evidenceDescription: '',
    priorReports: '',
    contactMethod: 'none',
    contactValue: '',
    alias: '',
    submittedAt: '',
  });

  function set(k: keyof ReportData, v: string) {
    setFields((prev) => ({ ...prev, [k]: v }));
    setErrors((prev) => ({ ...prev, [k]: '' }));
  }

  // ── Step 1: pick type ──────────────────────────────────────────────────────
  function handleTypeSelect(id: string) {
    setReportType(id);
    set('reportType', id);
  }

  function goToDetails() {
    if (!reportType) return;
    setStep('details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ── Step 2: validate details ───────────────────────────────────────────────
  function validateDetails(): boolean {
    const e: Partial<ReportData> = {};
    if (!fields.incidentDate) e.incidentDate = 'Required';
    if (!fields.incidentLocation.trim()) e.incidentLocation = 'Required';
    if (!fields.narrative.trim() || fields.narrative.trim().length < 50)
      e.narrative = 'Please describe what happened (at least 50 characters)';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function goToReview() {
    if (!validateDetails()) return;
    setStep('encrypt');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ── Step 3: encrypt & submit ───────────────────────────────────────────────
  async function handleEncryptAndSubmit() {
    setEncrypting(true);
    try {
      const payload: ReportData = {
        ...fields,
        submittedAt: new Date().toISOString(),
      };
      const { encrypted, keyHex } = await encryptReport(payload);
      setEncryptedPayload(encrypted);
      setDecryptionKey(keyHex);
      setStep('done');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
      alert('Encryption failed. Your browser may not support the Web Crypto API. Try Chrome, Firefox, or Safari.');
    } finally {
      setEncrypting(false);
    }
  }

  function handleCopyKey() {
    navigator.clipboard.writeText(decryptionKey);
    setKeyCopied(true);
    setTimeout(() => setKeyCopied(false), 2500);
  }

  function handleDownloadPackage() {
    const ts = new Date().toISOString().slice(0, 10);
    const packageText = [
      '═══════════════════════════════════════════════════════════',
      '  IRN CHRT — ENCRYPTED REPORT PACKAGE',
      `  Generated: ${new Date().toISOString()}`,
      '═══════════════════════════════════════════════════════════',
      '',
      'INSTRUCTIONS',
      '────────────',
      '1. Keep this file somewhere safe — it is your only copy.',
      '2. The DECRYPTION KEY below unlocks your report.',
      '   Without it, no one (including IRN) can read the report.',
      '3. If you choose to contact IRN, share the encrypted payload',
      '   and your key through a channel you trust.',
      '',
      'DECRYPTION KEY (AES-256-GCM)',
      '────────────────────────────',
      decryptionKey,
      '',
      'ENCRYPTED PAYLOAD (AES-256-GCM / base64)',
      '─────────────────────────────────────────',
      encryptedPayload,
      '',
      '═══════════════════════════════════════════════════════════',
      '  IRN cannot identify you from this file alone.',
      '  injusticereformnetwork.org',
      '═══════════════════════════════════════════════════════════',
    ].join('\n');

    downloadText(`irn-chrt-report-${ts}.txt`, packageText);
  }

  function handleDownloadEncryptedOnly() {
    const ts = new Date().toISOString().slice(0, 10);
    downloadText(`irn-chrt-encrypted-${ts}.txt`, encryptedPayload);
  }

  // ─────────────────────────────────────────────────────────────────────────

  return (
    <main id="main-content" className={styles.main}>
      <div className={styles.accentBar} aria-hidden="true" />

      {/* HERO */}
      <header className={styles.hero}>
        <div className={styles.container}>
          <span className={styles.kicker}>Community Harm Reporting Tool</span>
          <h1 className={styles.heroTitle}>CHRT Secure Portal</h1>
          <p className={styles.heroSubtitle}>
            Your report is encrypted in your browser before anything leaves your device.
            IRN receives an unreadable ciphertext. Only you hold the key.
          </p>
          <TrustBar />
        </div>
      </header>

      <div className={styles.container}>
        <StepIndicator step={step} />

        {/* ── STEP 1: Report Type ─────────────────────────────────────────── */}
        {step === 'type' && (
          <section className={styles.card} aria-labelledby="step1-heading">
            <h2 id="step1-heading" className={styles.cardTitle}>What are you reporting?</h2>
            <p className={styles.cardSubtitle}>Choose the category that best fits. You can add detail in the next step.</p>
            <div className={styles.typeGrid}>
              {REPORT_TYPES.map((rt) => (
                <button
                  key={rt.id}
                  type="button"
                  className={`${styles.typeCard} ${reportType === rt.id ? styles.typeCardSelected : ''}`}
                  onClick={() => handleTypeSelect(rt.id)}
                  aria-pressed={reportType === rt.id}
                >
                  <span className={styles.typeLabel}>{rt.label}</span>
                  <span className={styles.typeDesc}>{rt.desc}</span>
                </button>
              ))}
            </div>
            <div className={styles.cardActions}>
              <button
                type="button"
                className={styles.btnPrimary}
                onClick={goToDetails}
                disabled={!reportType}
                aria-disabled={!reportType}
              >
                Continue →
              </button>
            </div>
          </section>
        )}

        {/* ── STEP 2: Incident Details ────────────────────────────────────── */}
        {step === 'details' && (
          <section className={styles.card} aria-labelledby="step2-heading">
            <h2 id="step2-heading" className={styles.cardTitle}>Incident Details</h2>
            <p className={styles.cardSubtitle}>
              Share what you know. Blank fields are fine — partial records still matter.
              <strong className={styles.emphasisNote}> Nothing is sent to IRN until you explicitly submit the encrypted package.</strong>
            </p>

            <form ref={formRef} noValidate className={styles.form} onSubmit={(e) => e.preventDefault()}>

              {/* When / Where */}
              <fieldset className={styles.fieldset}>
                <legend className={styles.legend}>When & Where</legend>
                <div className={styles.fieldRow}>
                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="incidentDate">
                      Date of incident <span className={styles.req} aria-hidden="true">*</span>
                    </label>
                    <input
                      id="incidentDate"
                      type="date"
                      className={`${styles.input} ${errors.incidentDate ? styles.inputError : ''}`}
                      value={fields.incidentDate}
                      onChange={(e) => set('incidentDate', e.target.value)}
                      aria-required="true"
                      aria-invalid={!!errors.incidentDate}
                      aria-describedby={errors.incidentDate ? 'err-date' : undefined}
                      max={new Date().toISOString().slice(0, 10)}
                    />
                    {errors.incidentDate && <span id="err-date" className={styles.errMsg} role="alert"><AlertTriangle size={12} /> {errors.incidentDate}</span>}
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="incidentLocation">
                      Location <span className={styles.req} aria-hidden="true">*</span>
                    </label>
                    <input
                      id="incidentLocation"
                      type="text"
                      className={`${styles.input} ${errors.incidentLocation ? styles.inputError : ''}`}
                      placeholder="City, neighborhood, or address"
                      value={fields.incidentLocation}
                      onChange={(e) => set('incidentLocation', e.target.value)}
                      aria-required="true"
                      aria-invalid={!!errors.incidentLocation}
                      aria-describedby={errors.incidentLocation ? 'err-loc' : undefined}
                    />
                    {errors.incidentLocation && <span id="err-loc" className={styles.errMsg} role="alert"><AlertTriangle size={12} /> {errors.incidentLocation}</span>}
                  </div>
                </div>
              </fieldset>

              {/* Who was involved */}
              <fieldset className={styles.fieldset}>
                <legend className={styles.legend}>Who Was Involved</legend>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="agencyOrEntity">
                    Agency, department, or organization
                  </label>
                  <input
                    id="agencyOrEntity"
                    type="text"
                    className={styles.input}
                    placeholder="e.g. Newport News Police Dept., Hampton DSS, Norfolk Public Schools"
                    value={fields.agencyOrEntity}
                    onChange={(e) => set('agencyOrEntity', e.target.value)}
                  />
                </div>
                <div className={styles.fieldRow}>
                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="officersOrIndividuals">
                      Officer(s) or individual(s) — names, badge numbers, descriptions
                    </label>
                    <input
                      id="officersOrIndividuals"
                      type="text"
                      className={styles.input}
                      placeholder="Names, badge #s, physical descriptions (optional)"
                      value={fields.officersOrIndividuals}
                      onChange={(e) => set('officersOrIndividuals', e.target.value)}
                    />
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="witnessCount">
                      Approximate number of witnesses
                    </label>
                    <select
                      id="witnessCount"
                      className={styles.input}
                      value={fields.witnessCount}
                      onChange={(e) => set('witnessCount', e.target.value)}
                    >
                      <option value="">Unknown / prefer not to say</option>
                      <option value="0">None</option>
                      <option value="1-2">1–2</option>
                      <option value="3-5">3–5</option>
                      <option value="6+">6 or more</option>
                    </select>
                  </div>
                </div>
              </fieldset>

              {/* Narrative */}
              <fieldset className={styles.fieldset}>
                <legend className={styles.legend}>What Happened</legend>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="narrative">
                    Describe the incident in your own words <span className={styles.req} aria-hidden="true">*</span>
                  </label>
                  <textarea
                    id="narrative"
                    className={`${styles.textarea} ${errors.narrative ? styles.inputError : ''}`}
                    rows={8}
                    placeholder="Describe what happened, in as much detail as you feel comfortable sharing. Include the sequence of events, what was said, what force or action was taken, and the outcome."
                    value={fields.narrative}
                    onChange={(e) => set('narrative', e.target.value)}
                    aria-required="true"
                    aria-invalid={!!errors.narrative}
                    aria-describedby={errors.narrative ? 'err-narrative' : 'narrative-hint'}
                  />
                  <span id="narrative-hint" className={styles.hint}>
                    {fields.narrative.length} characters — minimum 50 required
                  </span>
                  {errors.narrative && <span id="err-narrative" className={styles.errMsg} role="alert"><AlertTriangle size={12} /> {errors.narrative}</span>}
                </div>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="evidenceDescription">
                    Evidence you have (photos, video, documents, medical records)
                  </label>
                  <textarea
                    id="evidenceDescription"
                    className={styles.textarea}
                    rows={3}
                    placeholder="Describe any evidence you have or know of. Do not upload files here — only describe them."
                    value={fields.evidenceDescription}
                    onChange={(e) => set('evidenceDescription', e.target.value)}
                  />
                </div>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="priorReports">
                    Have you reported this to any other agency?
                  </label>
                  <textarea
                    id="priorReports"
                    className={styles.textarea}
                    rows={2}
                    placeholder="e.g. Filed complaint with police internal affairs on [date], contacted NAACP, filed with EEOC"
                    value={fields.priorReports}
                    onChange={(e) => set('priorReports', e.target.value)}
                  />
                </div>
              </fieldset>

              {/* Contact (optional) */}
              <fieldset className={styles.fieldset}>
                <legend className={styles.legend}>
                  Follow-Up Contact <span className={styles.legendOptional}>(optional — increases your risk)</span>
                </legend>
                <p className={styles.fieldsetNote}>
                  IRN can follow up with you if you choose to provide contact information.
                  This is entirely optional. If you provide it, it will be included in the encrypted payload — only readable with your key.
                </p>
                <div className={styles.fieldRow}>
                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="contactMethod">Contact method</label>
                    <select
                      id="contactMethod"
                      className={styles.input}
                      value={fields.contactMethod}
                      onChange={(e) => set('contactMethod', e.target.value)}
                    >
                      <option value="none">None — remain anonymous</option>
                      <option value="email">Email</option>
                      <option value="phone">Phone / SMS</option>
                      <option value="signal">Signal (safest)</option>
                      <option value="protonmail">ProtonMail</option>
                    </select>
                  </div>
                  {fields.contactMethod !== 'none' && (
                    <div className={styles.field}>
                      <label className={styles.label} htmlFor="contactValue">
                        {fields.contactMethod === 'email' || fields.contactMethod === 'protonmail' ? 'Email address' :
                         fields.contactMethod === 'phone' ? 'Phone number' :
                         'Signal number or username'}
                      </label>
                      <input
                        id="contactValue"
                        type="text"
                        className={styles.input}
                        placeholder={
                          fields.contactMethod === 'signal' ? 'Signal phone number or username' :
                          fields.contactMethod === 'phone' ? 'Your phone number' :
                          'Your email address'
                        }
                        value={fields.contactValue}
                        onChange={(e) => set('contactValue', e.target.value)}
                      />
                    </div>
                  )}
                </div>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="alias">
                    Alias or code name <span className={styles.legendOptional}>(lets IRN reference you without your real name)</span>
                  </label>
                  <input
                    id="alias"
                    type="text"
                    className={styles.input}
                    placeholder="e.g. Cardinal, Witness-7, anything you choose"
                    value={fields.alias}
                    onChange={(e) => set('alias', e.target.value)}
                  />
                </div>
              </fieldset>

            </form>

            <div className={styles.cardActions}>
              <button type="button" className={styles.btnGhost} onClick={() => setStep('type')}>
                ← Back
              </button>
              <button type="button" className={styles.btnPrimary} onClick={goToReview}>
                Review Report →
              </button>
            </div>
          </section>
        )}

        {/* ── STEP 3: Review & Encrypt ────────────────────────────────────── */}
        {step === 'encrypt' && (
          <section className={styles.card} aria-labelledby="step3-heading">
            <h2 id="step3-heading" className={styles.cardTitle}>Review & Encrypt</h2>
            <p className={styles.cardSubtitle}>
              Read over your report. When you click <strong>Encrypt Report</strong>, AES-256-GCM encryption
              runs entirely in your browser. IRN receives an unreadable ciphertext — only you hold the decryption key.
            </p>

            <div className={styles.reviewBlock}>
              <ReviewRow label="Report type" value={REPORT_TYPES.find(r => r.id === fields.reportType)?.label ?? fields.reportType} />
              <ReviewRow label="Date" value={fields.incidentDate || '—'} />
              <ReviewRow label="Location" value={fields.incidentLocation || '—'} />
              <ReviewRow label="Agency / entity" value={fields.agencyOrEntity || '—'} />
              <ReviewRow label="Officers / individuals" value={fields.officersOrIndividuals || '—'} />
              <ReviewRow label="Witnesses" value={fields.witnessCount || '—'} />
              <ReviewRow label="Narrative" value={fields.narrative} multiline />
              <ReviewRow label="Evidence" value={fields.evidenceDescription || '—'} multiline />
              <ReviewRow label="Prior reports" value={fields.priorReports || '—'} multiline />
              <ReviewRow label="Contact method" value={fields.contactMethod === 'none' ? 'Anonymous — no contact' : fields.contactMethod} />
              {fields.contactMethod !== 'none' && <ReviewRow label="Contact value" value={fields.contactValue || '—'} redacted />}
              <ReviewRow label="Alias" value={fields.alias || '—'} />
            </div>

            <div className={styles.encryptNotice}>
              <Lock size={16} className={styles.encryptNoticeIcon} />
              <p>
                Clicking <strong>Encrypt Report</strong> generates a one-time AES-256-GCM key in your browser.
                Your report is encrypted with that key. You will download a text file containing both the
                encrypted payload and your key. <strong>IRN never receives your key.</strong>
              </p>
            </div>

            <div className={styles.cardActions}>
              <button type="button" className={styles.btnGhost} onClick={() => setStep('details')}>
                ← Edit
              </button>
              <button
                type="button"
                className={styles.btnEncrypt}
                onClick={handleEncryptAndSubmit}
                disabled={encrypting}
                aria-busy={encrypting}
              >
                {encrypting ? (
                  <><span className={styles.spinner} aria-hidden="true" /> Encrypting…</>
                ) : (
                  <><Lock size={16} /> Encrypt Report</>
                )}
              </button>
            </div>
          </section>
        )}

        {/* ── STEP 4: Done ────────────────────────────────────────────────── */}
        {step === 'done' && (
          <section className={styles.card} aria-labelledby="step4-heading">
            <div className={styles.doneIcon} aria-hidden="true">
              <CheckCircle size={48} />
            </div>
            <h2 id="step4-heading" className={styles.cardTitle}>Report Encrypted</h2>
            <p className={styles.cardSubtitle}>
              Your report has been encrypted in your browser. Nothing has been sent anywhere yet.
              Download your package — it contains your encrypted report and your decryption key.
            </p>

            {/* Key display */}
            <div className={styles.keyBlock} aria-label="Your decryption key">
              <div className={styles.keyHeader}>
                <span className={styles.keyLabel}><Lock size={13} /> Your Decryption Key</span>
                <button
                  type="button"
                  className={styles.keyToggle}
                  onClick={() => setShowKey(!showKey)}
                  aria-label={showKey ? 'Hide key' : 'Show key'}
                >
                  {showKey ? <EyeOff size={14} /> : <Eye size={14} />}
                  {showKey ? 'Hide' : 'Show'}
                </button>
              </div>
              <div className={styles.keyValue} aria-live="polite">
                {showKey ? (
                  <code className={styles.keyCode}>{decryptionKey}</code>
                ) : (
                  <span className={styles.keyRedacted} aria-label="Key hidden">{'•'.repeat(64)}</span>
                )}
              </div>
              <button type="button" className={styles.keyCopyBtn} onClick={handleCopyKey}>
                {keyCopied ? '✓ Copied' : 'Copy Key'}
              </button>
            </div>

            <div className={styles.doneWarning}>
              <AlertTriangle size={14} className={styles.doneWarningIcon} />
              <p>
                <strong>Save your key before closing this page.</strong> Once you close this window,
                IRN cannot recover your key or decrypt your report. The key is never stored on any server.
              </p>
            </div>

            {/* Download options */}
            <div className={styles.downloadGrid}>
              <div className={styles.downloadCard}>
                <h3 className={styles.downloadTitle}>Full Package <span className={styles.downloadBadge}>Recommended</span></h3>
                <p className={styles.downloadDesc}>
                  A single text file with your encrypted payload <em>and</em> your decryption key together.
                  Keep it somewhere private.
                </p>
                <button type="button" className={styles.btnDownload} onClick={handleDownloadPackage}>
                  <Download size={15} /> Download Package (.txt)
                </button>
              </div>
              <div className={styles.downloadCard}>
                <h3 className={styles.downloadTitle}>Encrypted Payload Only</h3>
                <p className={styles.downloadDesc}>
                  Just the ciphertext — safe to share with IRN. Without your key it is unreadable.
                  Only use this if you are storing your key separately.
                </p>
                <button type="button" className={styles.btnDownloadGhost} onClick={handleDownloadEncryptedOnly}>
                  <Download size={15} /> Download Payload Only (.txt)
                </button>
              </div>
            </div>

            {/* What next */}
            <div className={styles.nextSteps}>
              <h3 className={styles.nextTitle}>What happens next?</h3>
              <ol className={styles.nextList}>
                <li><strong>Keep your package safe.</strong> Store it somewhere only you can access — not cloud storage linked to your real name.</li>
                <li><strong>Contact IRN if you choose.</strong> If you want IRN to act on your report, reach out through <a href="/contact" className={styles.nextLink}>our contact page</a> and share your encrypted payload. If you want IRN to read the report, also share your key — through Signal or another secure channel.</li>
                <li><strong>You are not obligated to do anything.</strong> The encrypted record exists. That is enough for now. When you are ready, IRN is here.</li>
              </ol>
            </div>

            <div className={styles.cardActions} style={{ justifyContent: 'center' }}>
              <a href="/irn-criminal-injustice/criminal-injustice" className={styles.btnGhost}>
                Return to Site
              </a>
            </div>
          </section>
        )}

        {/* FAQ strip */}
        {step !== 'done' && <FaqStrip />}
      </div>
    </main>
  );
}

function ReviewRow({ label, value, multiline, redacted }: { label: string; value: string; multiline?: boolean; redacted?: boolean }) {
  return (
    <div className={styles.reviewRow}>
      <span className={styles.reviewLabel}>{label}</span>
      {redacted ? (
        <span className={styles.reviewValue} style={{ color: 'var(--ink3)', fontStyle: 'italic' }}>
          [included in encrypted payload]
        </span>
      ) : multiline ? (
        <p className={`${styles.reviewValue} ${styles.reviewMultiline}`}>{value}</p>
      ) : (
        <span className={styles.reviewValue}>{value}</span>
      )}
    </div>
  );
}

const FAQS = [
  {
    q: 'Can IRN be compelled to reveal who I am?',
    a: 'IRN never receives your decryption key, so IRN cannot decrypt your report even under subpoena. If you did not provide contact information, there is nothing to compel — IRN has no identifying information about you.',
  },
  {
    q: 'What does "client-side encryption" mean?',
    a: 'It means your report is encrypted on your device, in your browser, before any data leaves your computer. The Web Crypto API (built into every modern browser) generates a one-time key, encrypts your report with AES-256-GCM, and the key never touches any server.',
  },
  {
    q: 'Should I use a VPN or Tor?',
    a: 'If you are concerned about your network activity being monitored, yes — browse to this page over a VPN or Tor Browser before filling out the form. The encryption protects your report content, but it does not hide the fact that you visited this page.',
  },
  {
    q: 'What if I want IRN to act on my report?',
    a: 'Download your package. Contact IRN through our contact page — or over Signal if you have it. Share the encrypted payload file. If you want IRN to read the content, share your decryption key over Signal or ProtonMail. IRN will confirm receipt.',
  },
  {
    q: 'Is my report stored anywhere?',
    a: 'No. The encryption and everything on this page runs entirely in your browser. IRN has no server receiving this form. Nothing is stored unless you download the package yourself.',
  },
];

function FaqStrip() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className={styles.faq} aria-labelledby="faq-heading">
      <h2 id="faq-heading" className={styles.faqTitle}>Security & Privacy FAQ</h2>
      {FAQS.map((f, i) => (
        <div key={i} className={styles.faqItem}>
          <button
            className={styles.faqQ}
            onClick={() => setOpen(open === i ? null : i)}
            aria-expanded={open === i}
            aria-controls={`faq-${i}`}
          >
            {f.q}
            {open === i ? <ChevronUp size={16} aria-hidden="true" /> : <ChevronDown size={16} aria-hidden="true" />}
          </button>
          {open === i && (
            <div id={`faq-${i}`} className={styles.faqA} role="region">
              {f.a}
            </div>
          )}
        </div>
      ))}
    </section>
  );
}
