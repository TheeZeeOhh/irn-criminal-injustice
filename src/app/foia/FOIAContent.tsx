'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './foia.module.css';

/* ── constants ── */
const VA_LAW = 'Virginia Freedom of Information Act, Va. Code § 2.2-3700 et seq.';
const MD_LAW = 'Maryland Public Information Act, Md. Code Ann., GP § 4-101 et seq.';
const VA_DAYS = '5 business days';
const MD_DAYS = '10 business days';

/* ── letter generation ── */
interface LetterFields {
  stateLaw: 'virginia' | 'maryland';
  reqName: string;
  reqContact: string;
  agencyName: string;
  custodian: string;
  agencyAddress: string;
  recordsDesc: string;
  dateRange: string;
  reqType: 'both' | 'copy' | 'inspect';
  feeWaiver: 'none' | 'nonprofit' | 'journalist' | 'indigent';
  todayDate: string;
}

function buildLetter(f: LetterFields): string {
  const law = f.stateLaw === 'virginia' ? VA_LAW : MD_LAW;
  const days = f.stateLaw === 'virginia' ? VA_DAYS : MD_DAYS;
  const custodian = f.custodian || 'Records Custodian / FOIA Officer';
  const agency = f.agencyName || '[AGENCY NAME]';
  const address = f.agencyAddress || '[AGENCY ADDRESS]';
  const desc = f.recordsDesc || '[DESCRIBE THE SPECIFIC RECORDS YOU ARE REQUESTING]';

  const typeClause =
    f.reqType === 'both'
      ? 'I request both the opportunity to inspect these records and to receive copies of all responsive documents.'
      : f.reqType === 'copy'
      ? 'I request that copies of all responsive records be provided to me.'
      : 'I request the opportunity to inspect these records in person.';

  const feeClause =
    f.feeWaiver === 'nonprofit'
      ? `\nFEE WAIVER REQUEST: I hereby request a waiver of all fees associated with this request. This request is made on behalf of a nonprofit organization for purposes of public interest research and community advocacy, not for commercial use.`
      : f.feeWaiver === 'journalist'
      ? `\nFEE WAIVER REQUEST: I hereby request a waiver of all fees associated with this request. This request is made for news-gathering and journalistic purposes in the public interest.`
      : f.feeWaiver === 'indigent'
      ? `\nFEE WAIVER REQUEST: I hereby request a waiver of all fees associated with this request due to financial hardship. Please contact me before incurring any fees.`
      : '';

  return `${f.todayDate || '[DATE]'}

${custodian}
${agency}
${address}

RE: Public Records Request Under the ${law}

Dear ${custodian},

Pursuant to the ${law}, I respectfully request access to and copies of the following public records maintained by ${agency}:

RECORDS REQUESTED:
${desc}${f.dateRange ? `\nThe requested records should cover the following time period: ${f.dateRange}.\n` : ''}
${typeClause}

I request that you respond to this request within ${days}, as required by law. If any portion of this request is denied, I request that you:

  1. Identify each document or record withheld;
  2. State the specific statutory exemption claimed for each withheld record; and
  3. Explain why the exemption applies to the withheld material.

If you determine that some portions of a responsive document are exempt from disclosure, I request that all non-exempt portions be released.${feeClause}

If you need clarification regarding this request, please contact me promptly so that we may expedite the response. Please acknowledge receipt of this request in writing.

Thank you for your attention to this matter.

Respectfully,

${f.reqName || '[YOUR NAME]'}
${f.reqContact || '[YOUR CONTACT]'}

---
This request was generated using IRN's public FOIA tool.
injusticereformnetwork.org/foia-generator/
Injustice Reform Network · EIN 41-4321283`;
}

const STEPS = [
  '1  Fill the form',
  '2  Review the letter',
  '3  Copy or download',
  '4  Send via certified mail or email',
];

/* ── component ── */
export default function FOIAContent() {
  const [todayDate, setTodayDate] = useState('');

  useEffect(() => {
    setTodayDate(
      new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    );
  }, []);

  const [stateLaw, setStateLaw] = useState<'virginia' | 'maryland'>('virginia');
  const [reqName, setReqName] = useState('');
  const [reqContact, setReqContact] = useState('');
  const [agencyName, setAgencyName] = useState('');
  const [custodian, setCustodian] = useState('');
  const [agencyAddress, setAgencyAddress] = useState('');
  const [recordsDesc, setRecordsDesc] = useState('');
  const [dateRange, setDateRange] = useState('');
  const [reqType, setReqType] = useState<'both' | 'copy' | 'inspect'>('both');
  const [feeWaiver, setFeeWaiver] = useState<'none' | 'nonprofit' | 'journalist' | 'indigent'>('none');
  const [copied, setCopied] = useState(false);

  const fields: LetterFields = {
    stateLaw,
    reqName,
    reqContact,
    agencyName,
    custodian,
    agencyAddress,
    recordsDesc,
    dateRange,
    reqType,
    feeWaiver,
    todayDate,
  };

  const letter = buildLetter(fields);

  function handleCopy() {
    navigator.clipboard.writeText(letter);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }

  function handleDownload() {
    const safeAgency = agencyName.replace(/[^a-zA-Z0-9]/g, '-') || 'Agency';
    const safeDate = todayDate.replace(/[^a-zA-Z0-9]/g, '-') || 'Date';
    const blob = new Blob([letter], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `FOIA-Request-${safeAgency}-${safeDate}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div id="main-content" className={styles.pageRoot}>
      {/* ── hero ── */}
      <div className={styles.hero}>
        <div className={styles.container}>
          <span className={styles.eyebrow}>Public Records Tool</span>
          <h1 className={styles.heroTitle}>
            Generate Your <span className={styles.gold}>FOIA Request</span> Letter
          </h1>
          <div className={styles.goldRule} aria-hidden="true" />
          <p className={styles.heroSub}>
            Virginia and Maryland public records law give you the right to access government
            documents. Build a legally sound request letter in under 2 minutes — free, no account
            needed.
          </p>
          <div className={styles.stepPills}>
            {STEPS.map((s, i) => (
              <span key={s} className={`${styles.stepPill} ${i === 0 ? styles.stepPillActive : ''}`}>
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── generator ── */}
      <div className={styles.generatorSection}>
        <div className={styles.container}>
          <div className={styles.generatorGrid}>
            {/* LEFT — form panel */}
            <div className={styles.formPanel}>
              <h2 className={styles.panelTitle}>Build Your Request</h2>

              {/* state law */}
              <div className={styles.formField}>
                <label className={styles.formLabel} htmlFor="state-law">State Law</label>
                <select
                  id="state-law"
                  className={styles.formSelect}
                  value={stateLaw}
                  onChange={(e) => setStateLaw(e.target.value as 'virginia' | 'maryland')}
                >
                  <option value="virginia">Virginia FOIA (Va. Code § 2.2-3700 et seq.)</option>
                  <option value="maryland">Maryland PIA (GP § 4-101 et seq.)</option>
                </select>
              </div>

              <div className={styles.sectionDivider}>Your Information</div>

              <div className={styles.fieldRow}>
                <div className={styles.formField}>
                  <label className={styles.formLabel} htmlFor="req-name">
                    Your Name (optional)
                  </label>
                  <input
                    id="req-name"
                    className={styles.formInput}
                    type="text"
                    placeholder="Any name, alias, or 'A Virginia Resident'"
                    value={reqName}
                    onChange={(e) => setReqName(e.target.value)}
                  />
                </div>
                <div className={styles.formField}>
                  <label className={styles.formLabel} htmlFor="req-contact">
                    Your Contact
                  </label>
                  <input
                    id="req-contact"
                    className={styles.formInput}
                    type="text"
                    placeholder="Email or mailing address"
                    value={reqContact}
                    onChange={(e) => setReqContact(e.target.value)}
                  />
                </div>
              </div>

              <div className={styles.sectionDivider}>Agency Information</div>

              <div className={styles.formField}>
                <label className={styles.formLabel} htmlFor="agency-name">
                  Agency Name <span className={styles.req}>*</span>
                </label>
                <input
                  id="agency-name"
                  className={styles.formInput}
                  type="text"
                  placeholder="e.g. Newport News Police Department"
                  value={agencyName}
                  onChange={(e) => setAgencyName(e.target.value)}
                />
              </div>

              <div className={styles.formField}>
                <label className={styles.formLabel} htmlFor="custodian">
                  Agency Records Custodian (optional but recommended)
                </label>
                <input
                  id="custodian"
                  className={styles.formInput}
                  type="text"
                  placeholder="FOIA Officer or Records Custodian"
                  value={custodian}
                  onChange={(e) => setCustodian(e.target.value)}
                />
              </div>

              <div className={styles.formField}>
                <label className={styles.formLabel} htmlFor="agency-address">
                  Agency Address
                </label>
                <input
                  id="agency-address"
                  className={styles.formInput}
                  type="text"
                  placeholder="9710 Jefferson Ave, Newport News, VA 23605"
                  value={agencyAddress}
                  onChange={(e) => setAgencyAddress(e.target.value)}
                />
              </div>

              <div className={styles.sectionDivider}>Records Requested</div>

              <div className={styles.formField}>
                <label className={styles.formLabel} htmlFor="records-desc">
                  Description of Records <span className={styles.req}>*</span>
                </label>
                <textarea
                  id="records-desc"
                  className={styles.formTextarea}
                  rows={4}
                  placeholder="e.g. All use-of-force reports, body camera footage, and incident reports involving Officer [Name/Badge #] from January 1, 2025 to present."
                  value={recordsDesc}
                  onChange={(e) => setRecordsDesc(e.target.value)}
                />
              </div>

              <div className={styles.fieldRow}>
                <div className={styles.formField}>
                  <label className={styles.formLabel} htmlFor="date-range">Date Range</label>
                  <input
                    id="date-range"
                    className={styles.formInput}
                    type="text"
                    placeholder="January 1, 2024 to present"
                    value={dateRange}
                    onChange={(e) => setDateRange(e.target.value)}
                  />
                </div>
                <div className={styles.formField}>
                  <label className={styles.formLabel} htmlFor="req-type">Request Type</label>
                  <select
                    id="req-type"
                    className={styles.formSelect}
                    value={reqType}
                    onChange={(e) => setReqType(e.target.value as 'both' | 'copy' | 'inspect')}
                  >
                    <option value="both">Records + Inspection</option>
                    <option value="copy">Copies Only</option>
                    <option value="inspect">Inspection Only</option>
                  </select>
                </div>
              </div>

              <div className={styles.formField}>
                <label className={styles.formLabel} htmlFor="fee-waiver">Fee Waiver Basis</label>
                <select
                  id="fee-waiver"
                  className={styles.formSelect}
                  value={feeWaiver}
                  onChange={(e) => setFeeWaiver(e.target.value as 'none' | 'nonprofit' | 'journalist' | 'indigent')}
                >
                  <option value="none">No fee waiver</option>
                  <option value="nonprofit">Nonprofit</option>
                  <option value="journalist">Journalist</option>
                  <option value="indigent">Financial hardship</option>
                </select>
              </div>

              <div className={styles.tipsBox}>
                <p className={styles.tipsText}>
                  <strong>Tips for better requests:</strong> Be specific about dates, names, and
                  locations. Reference the officer's badge number or case number when known.
                  Agencies must respond but can charge for searches — a fee waiver request is worth
                  including.
                </p>
              </div>

              <div className={styles.formField}>
                <label className={styles.formLabel} htmlFor="today-date">Today&rsquo;s Date</label>
                <input
                  id="today-date"
                  className={styles.formInput}
                  type="text"
                  value={todayDate}
                  readOnly
                />
              </div>
            </div>

            {/* RIGHT — preview panel */}
            <div className={styles.previewCol}>
              <div className={styles.previewPanel}>
                <div className={styles.previewHeader}>
                  <span className={styles.previewLabel}>Letter Preview</span>
                  <div className={styles.previewActions}>
                    <button
                      type="button"
                      className={styles.previewBtn}
                      onClick={handleCopy}
                    >
                      {copied ? 'Copied!' : 'Copy Text'}
                    </button>
                    <button
                      type="button"
                      className={styles.previewBtn}
                      onClick={handleDownload}
                    >
                      Download .txt
                    </button>
                  </div>
                </div>
                <pre className={styles.letterOutput}>{letter}</pre>
              </div>

              <div className={styles.trackingNote}>
                <p className={styles.trackingText}>
                  <strong>After sending:</strong> Note the date sent, method (email / certified
                  mail), and tracking number. Virginia agencies must respond within{' '}
                  <strong>5 business days</strong>. Maryland agencies within{' '}
                  <strong>10 business days</strong>. IRN tracks community FOIA requests —{' '}
                  <Link href="/reports" className={styles.trackingLink}>
                    see our public tracker →
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── FOIA rights guide ── */}
      <div className={styles.guideSection}>
        <div className={styles.container}>
          <h2 className={styles.guideTitle}>Your FOIA Rights</h2>
          <div className={styles.guideGrid}>
            <div className={styles.guideCard}>
              <h3 className={styles.guideCardTitle}>Virginia FOIA</h3>
              <p className={styles.guideCardBody}>
                All public records are presumed open under Va. Code § 2.2-3700. Agencies bear the
                burden of proving an exemption applies. You can request records in any medium the
                agency has them in.
              </p>
              <p className={styles.guideTimeline}>
                Response: 5 business days · Appeal: circuit court
              </p>
            </div>

            <div className={styles.guideCard}>
              <h3 className={styles.guideCardTitle}>Maryland PIA</h3>
              <p className={styles.guideCardBody}>
                Broad right of access under Md. Code Ann., GP § 4-101. Custodians must grant or
                deny access in writing. You can appeal to the Maryland Public Access Ombudsman at no
                cost before going to circuit court.
              </p>
              <p className={styles.guideTimeline}>
                Response: 10 business days · Appeal: Circuit Court
              </p>
            </div>

            <div className={styles.guideCard}>
              <h3 className={styles.guideCardTitle}>Common Exemptions</h3>
              <p className={styles.guideCardBody}>
                Agencies may withhold ongoing investigation records, personal privacy information,
                attorney-client privileged material, and personnel files. Exemptions are narrow —
                partial release is required when only portions qualify.
              </p>
              <p className={styles.guideTimeline}>
                Demand the specific code section in writing
              </p>
            </div>

            <div className={styles.guideCard}>
              <h3 className={styles.guideCardTitle}>If Denied</h3>
              <p className={styles.guideCardBody}>
                Request a written explanation citing the exact statutory exemption. Virginia: appeal
                to the Virginia FOIA Council (free) or circuit court. Maryland: contact the Public
                Access Ombudsman or file in circuit court.
              </p>
              <p className={styles.guideTimeline}>
                <Link href="/chrt" className={styles.guideLink}>
                  Document a denial with IRN →
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
