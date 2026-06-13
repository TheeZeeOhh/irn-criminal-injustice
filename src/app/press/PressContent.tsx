'use client';
import { useState } from 'react';
import styles from './press.module.css';

const SHORT_BOILERPLATE =
  'The Injustice Reform Network (IRN) is a Baltimore-based civil rights nonprofit building accountability infrastructure for Trans and Gender-Expansive People of Color and re-entry communities across Baltimore, Hampton Roads, and Virginia. IRN operates the Community Harm Reporting Tool (CHRT) — an encrypted, anonymous incident reporting system — alongside FOIA-driven documentation campaigns, Know Your Rights programming, and direct policy advocacy. Founded and led by Aziza \u201cZee\u201d Okoro. EIN: 41-4321283 · 501(c)(3).';

const LONG_BOILERPLATE =
  'The Injustice Reform Network (IRN) is a Baltimore-based 501(c)(3) nonprofit organization building the civic technology and advocacy infrastructure that communities need to document harm, demand accountability, and drive legislative change. Founded by Aziza \u201cZee\u201d Okoro \u2014 a Baltimore community organizer with over two decades of experience spanning housing, harm reduction, peer support, and workforce development \u2014 IRN centers the safety and sovereignty of Trans and Gender-Expansive People of Color (TGEPOC) and re-entry populations across Baltimore, Hampton Roads, and Virginia.\n\nIRN\u2019s core programs include the Community Harm Reporting Tool (CHRT), an encrypted anonymous reporting system operating under a Technical Incapacity posture that prevents compelled data disclosure; a public FOIA documentation campaign generating and tracking public records requests against law enforcement and government agencies; Know Your Rights programming in English and Spanish; and direct policy advocacy, including the Community Safety and Equity Act \u2014 an ordinance package introduced in Baltimore and Newport News designed to establish civilian oversight, use-of-force standards, and equitable community reinvestment.\n\nIRN operates in coalition with its affiliated organizations: Radiant Threshold Staffing Solutions, ThriveBMore, Trans Care Baltimore, The Love Squad, Beyond Health PRP, and Project Sanctuary. EIN: 41-4321283.';

const FACTS = [
  { label: 'Legal Name', value: 'Injustice Reform Network' },
  { label: 'EIN', value: '41-4321283', gold: true },
  { label: 'Status', value: '501(c)(3) Public Charity' },
  { label: 'Founded', value: 'Baltimore, Maryland' },
  { label: 'Executive Director', value: 'Aziza \u201cZee\u201d Okoro (she/her)' },
  { label: 'Geographic Focus', value: 'Baltimore \xb7 Hampton Roads \xb7 Virginia \xb7 Maryland \xb7 DC' },
  { label: 'Primary Populations Served', value: 'TGEPOC \xb7 Re-entry \xb7 Unhoused \xb7 Harm reduction communities' },
  { label: 'Core Programs', value: 'CHRT \xb7 FOIA Campaigns \xb7 Know Your Rights \xb7 Policy Advocacy \xb7 Attorney Referral' },
  { label: 'Website', value: 'injusticereformnetwork.org' },
  { label: 'Report Anonymously', value: 'injusticereformnetwork.org/chrt' },
  { label: 'Affiliate Orgs', value: 'RTSS \xb7 ThriveBMore \xb7 Trans Care Baltimore \xb7 The Love Squad \xb7 Beyond Health PRP \xb7 Project Sanctuary' },
  { label: 'Motto', value: '\u201cAequitas et justitia erit nobis victoriam!\u201d', italic: true },
];

const SWATCHES = [
  { color: '#181818', name: 'Charcoal', hex: '#181818' },
  { color: '#D4A843', name: 'Gold', hex: '#D4A843' },
  { color: '#C2452D', name: 'Ember', hex: '#C2452D' },
  { color: '#F5F0E6', name: 'Bone', hex: '#F5F0E6' },
  { color: '#CFC8B8', name: 'Bone Dim', hex: '#CFC8B8' },
];

export default function PressContent() {
  const [copiedShort, setCopiedShort] = useState(false);
  const [copiedLong, setCopiedLong] = useState(false);

  function copyShort() {
    navigator.clipboard.writeText(SHORT_BOILERPLATE);
    setCopiedShort(true);
    setTimeout(() => setCopiedShort(false), 2000);
  }

  function copyLong() {
    navigator.clipboard.writeText(LONG_BOILERPLATE);
    setCopiedLong(true);
    setTimeout(() => setCopiedLong(false), 2000);
  }

  return (
    <div id="main-content" className={styles.pressWrap}>
      {/* HERO */}
      <div className={styles.hero}>
        <div className={styles.heroGrid}>
          <div className={styles.heroLeft}>
            <span className={styles.eyebrow}>Media Resources</span>
            <h1 className={styles.heroTitle}>
              <em className={styles.heroTitleGold}>Press</em> Kit
            </h1>
            <div className={styles.goldRule} aria-hidden="true" />
            <p className={styles.heroSub}>
              Official boilerplate copy, leadership bios, logos, and brand assets for journalists and media partners covering the Injustice Reform Network.
            </p>
          </div>
          <div className={styles.deadlineBox}>
            <span className={styles.deadlineLabel}>Press Inquiries</span>
            <a href="mailto:press@injusticereformnetwork.org" className={styles.deadlineContact}>
              press@<br />injusticereformnetwork.org
            </a>
            <p className={styles.deadlineSub}>Response within 24 hours / Signal available on request</p>
          </div>
        </div>
      </div>

      {/* BOILERPLATE */}
      <div className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.sectionHead}>Boilerplate</h2>

          <div className={styles.bpBlock}>
            <div className={styles.bpMeta}>
              <span className={styles.bpWordCount}>SHORT (100 words)</span>
              <button type="button" className={styles.copyBtn} onClick={copyShort}>
                {copiedShort ? 'Copied \u2713' : 'Copy'}
              </button>
            </div>
            <p className={styles.bpText}>{SHORT_BOILERPLATE}</p>
          </div>

          <div className={styles.bpBlock}>
            <div className={styles.bpMeta}>
              <span className={styles.bpWordCount}>LONG (200 words)</span>
              <button type="button" className={styles.copyBtn} onClick={copyLong}>
                {copiedLong ? 'Copied \u2713' : 'Copy'}
              </button>
            </div>
            <p className={styles.bpText}>{LONG_BOILERPLATE}</p>
          </div>
        </div>
      </div>

      {/* FACT SHEET */}
      <div className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.sectionHead}>Fact Sheet</h2>
          <div className={styles.factGrid}>
            {FACTS.map((f) => (
              <div key={f.label} className={styles.factCard}>
                <span className={styles.factLabel}>{f.label}</span>
                <span className={f.gold ? styles.factValueGold : f.italic ? styles.factValueItalic : styles.factValue}>
                  {f.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* LEADERSHIP */}
      <div className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.sectionHead}>Leadership</h2>
          <div className={styles.bioGrid}>
            <div className={styles.bioCard}>
              <h3 className={styles.bioName}>Aziza &ldquo;Zee&rdquo; Okoro</h3>
              <span className={styles.bioRole}>Executive Director &amp; Founder</span>
              <p className={styles.bioPronoun}>Pronouns: she/her</p>
              <p className={styles.bioText}>
                Aziza &ldquo;Zee&rdquo; Okoro is a Baltimore community organizer with over two decades of experience in housing advocacy, harm reduction, peer support, and workforce development. She founded the Injustice Reform Network to build durable accountability infrastructure for Trans and Gender-Expansive People of Color and re-entry communities. Zee is available for interviews, expert commentary, and panel participation on topics including civilian oversight, FOIA litigation strategy, transgender rights, and community safety.
              </p>
            </div>
            <div className={styles.bioCard}>
              <h3 className={styles.bioName}>BeKura Shabazz</h3>
              <span className={styles.bioRole}>Co-Leader, Hampton Roads Operations</span>
              <p className={styles.bioPronoun}>Pronouns: she/her</p>
              <p className={styles.bioText}>
                BeKura Shabazz leads IRN&rsquo;s Hampton Roads chapter, coordinating Know Your Rights programming, community outreach, and coalition work with affiliated organizations in the Virginia Beach and Newport News regions. She brings deep roots in harm reduction and grassroots organizing to IRN&rsquo;s operational infrastructure in Hampton Roads.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* LOGOS & BRAND ASSETS */}
      <div className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.sectionHead}>Logos &amp; Brand Assets</h2>
          <div className={styles.logoGrid}>
            <div className={styles.logoItem}>
              <div className={styles.logoPreviewDark}>
                <img src="/irn-criminal-injustice/logo.png" alt="IRN Crest — Gold on Black" className={styles.logoImg} />
              </div>
              <div className={styles.logoMeta}>
                <span className={styles.logoName}>Crest&mdash;Gold on Black</span>
                <a href="/irn-criminal-injustice/logo.png" download className={styles.downloadLink}>Download PNG &rarr;</a>
              </div>
            </div>
            <div className={styles.logoItem}>
              <div className={styles.logoPreviewLight}>
                <img src="/irn-criminal-injustice/logo.png" alt="IRN Crest — Dark on Light" className={styles.logoImgInverted} />
              </div>
              <div className={styles.logoMeta}>
                <span className={styles.logoName}>Crest&mdash;Dark on Light</span>
                <a href="/irn-criminal-injustice/logo.png" download className={styles.downloadLink}>Download PNG &rarr;</a>
              </div>
            </div>
            <div className={styles.logoItem}>
              <div className={styles.logoPreviewDark}>
                <span className={styles.wordmarkText}>IRN</span>
              </div>
              <div className={styles.logoMeta}>
                <span className={styles.logoName}>Wordmark</span>
                <a href="mailto:press@injusticereformnetwork.org?subject=SVG%20Request" className={styles.downloadLink}>Request SVG &rarr;</a>
              </div>
            </div>
          </div>

          <div className={styles.brandSubsection}>
            <h3 className={styles.brandSubHead}>Brand Colors</h3>
            <div className={styles.swatchRow}>
              {SWATCHES.map((s) => (
                <div key={s.hex} className={styles.swatch}>
                  <div className={styles.swatchBlock} style={{ background: s.color }} />
                  <span className={styles.swatchName}>{s.name}</span>
                  <span className={styles.swatchHex}>{s.hex}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.brandSubsection}>
            <h3 className={styles.brandSubHead}>Typography</h3>
            <p className={styles.typeNote}>
              <strong className={styles.typeLabel}>Display/Headlines:</strong> Playfair Display
              &nbsp;&nbsp;&middot;&nbsp;&nbsp;
              <strong className={styles.typeLabel}>Body/Data/Captions:</strong> DM Mono
            </p>
          </div>
        </div>
      </div>

      {/* PRESS COVERAGE */}
      <div className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.sectionHead}>Press Coverage</h2>
          <div className={styles.coverageList}>
            <div className={styles.coverageItem}>
              <span className={styles.coverageOutlet}>WBAL / WYPR</span>
              <span className={styles.coverageDesc}>Coverage of CHRT launch and IRN accountability infrastructure</span>
              <span className={styles.coverageDate}>2025&ndash;26</span>
            </div>
            <div className={styles.coverageItem}>
              <span className={styles.coverageOutlet}>Baltimore Banner</span>
              <span className={styles.coverageDesc}>Community Safety and Equity Act introduction and Baltimore City Council coverage</span>
              <span className={styles.coverageDate}>2025&ndash;26</span>
            </div>
            <div className={styles.coverageItem}>
              <span className={styles.coverageOutlet}>Daily Press (Newport News)</span>
              <span className={styles.coverageDesc}>Newport News ordinance campaign and Hampton Roads organizing</span>
              <span className={styles.coverageDate}>2025&ndash;26</span>
            </div>
          </div>
          <p className={styles.coveragePlaceholder}><em>Real links and coverage records will be added as articles are published.</em></p>
        </div>
      </div>

      {/* PRESS CONTACT */}
      <div className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.sectionHead}>Press Contact</h2>
          <div className={styles.contactBox}>
            <div className={styles.contactGrid}>
              <div className={styles.contactField}>
                <span className={styles.contactFieldLabel}>Email</span>
                <a href="mailto:press@injusticereformnetwork.org" className={styles.contactFieldValue}>
                  press@injusticereformnetwork.org
                </a>
              </div>
              <div className={styles.contactField}>
                <span className={styles.contactFieldLabel}>Response Time</span>
                <span className={styles.contactFieldValue}>Within 24 hours</span>
              </div>
              <div className={styles.contactField}>
                <span className={styles.contactFieldLabel}>Secure Contact</span>
                <span className={styles.contactFieldValue}>Signal available on request</span>
              </div>
              <div className={styles.contactField}>
                <span className={styles.contactFieldLabel}>Interview Requests</span>
                <span className={styles.contactFieldValue}>Zee Okoro available for comment</span>
              </div>
            </div>
            <p className={styles.contactNote}>
              IRN is committed to working with journalists covering civil rights, policing, and community accountability. Source protection practices are available on request. We do not comment on ongoing litigation without authorization from affected parties.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
