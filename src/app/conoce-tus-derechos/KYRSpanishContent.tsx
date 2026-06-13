'use client';
import { useState } from 'react';
import Link from 'next/link';
import styles from './kyr-es.module.css';

type Scenario = 'trafico' | 'pie' | 'puerta' | 'arrestado' | 'migracion';

const SCENARIOS: { id: Scenario; label: string }[] = [
  { id: 'trafico', label: 'Parada de tráfico' },
  { id: 'pie', label: 'Detenido/a a pie' },
  { id: 'puerta', label: 'Policía en su puerta' },
  { id: 'arrestado', label: 'Bajo arresto' },
  { id: 'migracion', label: 'ICE / Migración' },
];

const RIGHTS = [
  {
    num: '01',
    right: 'Derecho a guardar silencio',
    phrase: 'Estoy ejerciendo mi derecho a guardar silencio.',
    context:
      'Usted no está obligado/a a responder preguntas sobre adónde va, dónde ha estado, ni qué está haciendo. Esto aplica en Virginia, Maryland y a nivel federal.',
  },
  {
    num: '02',
    right: 'Derecho a negarse a un registro',
    phrase: 'No doy mi consentimiento para un registro.',
    context:
      'Un oficial puede registrar de todas formas si alega causa probable — pero su negativa queda documentada y es legalmente significativa.',
  },
  {
    num: '03',
    right: 'Derecho a preguntar si puede irse',
    phrase: '¿Estoy detenido/a, o puedo irme?',
    context:
      'Si la respuesta es que puede irse, aléjese calmadamente. Si está detenido/a, la situación cambia y sus otros derechos entran en juego.',
  },
  {
    num: '04',
    right: 'Derecho a un abogado',
    phrase: 'Quiero un abogado.',
    context:
      'Después de decir esto, guarde silencio. No explique. No argumente. Espere a su abogado/a antes de responder cualquier pregunta.',
  },
  {
    num: '05',
    right: 'Derecho a grabar a la policía',
    phrase:
      'En Virginia y Maryland, grabar es legal en espacios públicos.',
    context: (
      <>
        Tiene el derecho de la Primera Enmienda de grabar a oficiales en el desempeño de sus funciones en espacios públicos.{' '}
        <span className={styles.contextEmphasis}>No interfiera físicamente.</span>{' '}
        Bloquee su teléfono con PIN, no biometría, si va a protestar.
      </>
    ),
  },
  {
    num: '06',
    right: 'Derecho a no abrir la puerta',
    phrase: '¿Tiene una orden judicial firmada por un juez?',
    context:
      'Una orden administrativa de ICE NO es suficiente para obligarle a abrir la puerta. Solo una orden firmada por un juez federal o estatal lo requiere.',
  },
];

type StepItem = {
  text: string;
  say?: string;
};

const SCENARIO_PANELS: Record<
  Scenario,
  { title: string; steps: StepItem[]; warn?: string }
> = {
  trafico: {
    title: 'Parada de tráfico',
    steps: [
      {
        text: 'Orillese de forma segura, apague el motor, baje la ventana.',
        say: 'Mi licencia está en mi billetera. ¿Puedo sacarla?',
      },
      {
        text: 'El conductor debe mostrar licencia, registro y prueba de seguro cuando se lo pidan.',
      },
      {
        text: 'Los pasajeros NO tienen que identificarse en Virginia. En Maryland las reglas son diferentes (ver nota abajo).',
      },
      {
        text: 'Si preguntan si pueden revisar el vehículo, diga:',
        say: 'No doy mi consentimiento para un registro.',
      },
      {
        text: 'Si preguntan adónde va o qué hace, puede responder:',
        say: 'Prefiero no responder esa pregunta.',
      },
    ],
    warn:
      'Nota sobre Maryland: En Maryland, los pasajeros pueden estar obligados a identificarse en ciertas circunstancias. Consulte el directorio de abogados de IRN si tiene dudas.',
  },
  pie: {
    title: 'Detenido/a en la calle',
    steps: [
      {
        text: 'Primero pregunte:',
        say: '¿Estoy detenido/a, o puedo irme?',
      },
      {
        text: 'Si puede irse: aléjese calmadamente sin correr.',
      },
      {
        text: 'Si está detenido/a, si le piden que se identifique o que abra su bolsa, diga:',
        say: 'No doy mi consentimiento a ningún registro.',
      },
      {
        text: 'No tiene que responder preguntas sobre su nombre, domicilio o actividades. Puede decir:',
        say: 'Estoy ejerciendo mi derecho a guardar silencio.',
      },
    ],
  },
  puerta: {
    title: 'Policía en su puerta',
    steps: [
      {
        text: 'No tiene que abrir. Puede hablar desde adentro o a través de la puerta. Pregunte:',
        say: '¿Tienen una orden judicial firmada por un juez?',
      },
      {
        text: 'Si dicen que tienen una orden: pídales que la deslicen por debajo de la puerta o la sostengan frente a una ventana para verificar que está firmada por un juez.',
      },
      {
        text: 'Si entran sin orden, no resista físicamente. Diga claramente:',
        say: 'No doy mi consentimiento para este registro.',
      },
      {
        text: 'Abrir la puerta no es obligatorio a menos que presenten una orden judicial válida firmada por un juez estatal o federal.',
      },
    ],
  },
  arrestado: {
    title: 'Bajo arresto',
    steps: [
      {
        text: 'No resista físicamente el arresto, aunque crea que es injusto.',
      },
      {
        text: 'Declare claramente y luego guarde silencio:',
        say: 'Quiero un abogado. No voy a responder preguntas sin un abogado.',
      },
      {
        text: 'No firme ningún documento sin la presencia de su abogado/a.',
      },
      {
        text: 'Tiene derecho a realizar una llamada telefónica. Comuníquese con un abogado/a o con alguien de confianza.',
      },
      {
        text: 'Después del incidente: escriba todo lo que recuerde, tome fotos de cualquier lesión, identifique testigos, y repórtelo a IRN.',
      },
    ],
  },
  migracion: {
    title: 'ICE / Migración',
    steps: [
      {
        text: 'Sus derechos constitucionales aplican sin importar su estatus migratorio. La Cuarta y Quinta Enmienda le protegen.',
      },
      {
        text: 'Si un agente de ICE se acerca, puede decir:',
        say: 'No doy mi consentimiento a ningún registro. Quiero hablar con un abogado.',
      },
      {
        text: 'No firme documentos de ICE sin hablar primero con un abogado/a de inmigración. Firmar puede resultar en deportación acelerada.',
      },
      {
        text: 'Sin una orden judicial firmada por un juez federal, usted no está obligado/a a abrir la puerta de su casa.',
      },
      {
        text: 'Recursos de emergencia: ACLU-VA (804) 644-8022 · Legal Aid SEVA (757) 627-5423 · Directorio de abogados IRN →',
      },
    ],
    warn:
      'Las leyes de inmigración cambian rápidamente. La información aquí es orientativa. Consulte siempre con un abogado/a de inmigración para su situación específica.',
  },
};

const FAQ = [
  {
    q: '¿Tengo que dar mi nombre a la policía?',
    a: 'En Virginia, los conductores deben identificarse, pero los pasajeros generalmente no están obligados durante una parada de tráfico. En Maryland, las reglas pueden variar según las circunstancias. Si está siendo detenido/a por sospecha de un delito, las reglas son diferentes. Cuando tenga duda, puede preguntar: "¿Estoy obligado/a por ley a identificarme en esta situación?"',
  },
  {
    q: '¿Pueden registrar mi teléfono?',
    a: 'No, según Riley v. California (2014), la Corte Suprema de EE.UU. estableció que los oficiales necesitan una orden judicial para registrar su teléfono celular. No proporcione su contraseña o PIN. Si le exigen el teléfono, diga: "No consiento al registro de mi dispositivo."',
  },
  {
    q: '¿Qué pasa si miento a la policía?',
    a: 'Mentir a agentes federales es un delito federal (18 U.S.C. § 1001). Mentir a agentes estatales también puede tener consecuencias legales. Es mucho más seguro ejercer su derecho a guardar silencio que arriesgarse mintiendo. Diga simplemente: "Estoy ejerciendo mi derecho a guardar silencio."',
  },
  {
    q: '¿Puedo filmar a la policía?',
    a: 'Sí. En Virginia y Maryland tiene el derecho de la Primera Enmienda de grabar a oficiales de policía en el desempeño de sus funciones en espacios públicos, siempre que no interfiera físicamente con sus acciones. Este derecho ha sido respaldado por múltiples tribunales federales.',
  },
  {
    q: '¿Qué derechos tengo si soy trans o no binario/a?',
    a: 'Todos los derechos constitucionales descritos aquí aplican sin importar su identidad de género. En Maryland, la Ley Maryland Trans Shield Act ofrece protecciones adicionales. Si experimenta un trato discriminatorio durante un encuentro con la policía basado en su identidad de género, repórtelo a IRN a través de CHRT.',
  },
  {
    q: '¿Qué hago después de un encuentro con la policía?',
    a: '1. Anote el número de placa y número de placa del vehículo policial. 2. Escriba todo lo que recuerde del encuentro lo antes posible. 3. Tome fotos de cualquier lesión o daño a su propiedad. 4. Identifique y contacte a testigos si los hay. 5. Reporte el incidente a IRN de forma anónima a través de CHRT en /chrt/',
  },
];

const RESOURCES_CARDS = [
  { icon: '⚖', label: 'Directorio de Abogados', href: '/attorneys/' },
  { icon: '◉', label: 'Reportar un Incidente (CHRT)', href: '/chrt/' },
  { icon: '◈', label: 'Tarjeta de Bolsillo', href: '/know-your-rights/#wallet-card' },
  { icon: '♥', label: 'Trans Care Baltimore', href: '/services/' },
  { icon: '⬡', label: 'ACLU de Virginia', href: 'https://www.acluva.org' },
  { icon: '⊞', label: 'ACLU de Maryland', href: 'https://www.aclu-md.org' },
];

export default function KYRSpanishContent() {
  const [activeScenario, setActiveScenario] = useState<Scenario>('trafico');
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);

  function toggleAccordion(i: number) {
    setOpenAccordion(openAccordion === i ? null : i);
  }

  function handlePrint() {
    window.print();
  }

  function handleShare() {
    if (typeof navigator !== 'undefined' && navigator.share) {
      navigator.share({
        title: 'Conozca Sus Derechos — IRN',
        url: window.location.href,
      }).catch(() => {/* user cancelled */});
    } else {
      navigator.clipboard.writeText(window.location.href).then(() => {
        alert('Enlace copiado al portapapeles.');
      });
    }
  }

  const panel = SCENARIO_PANELS[activeScenario];

  return (
    <main id="main-content" className={styles.main}>

      {/* LANGUAGE BANNER */}
      <div className={styles.langBanner}>
        <span className={styles.langPrompt}>Seleccione su idioma / Select your language</span>
        <div className={styles.langButtons}>
          <Link href="/know-your-rights/" className={styles.langBtn}>
            English
          </Link>
          <button className={`${styles.langBtn} ${styles.langBtnActive}`} aria-current="true">
            Español
          </button>
        </div>
      </div>

      {/* HERO */}
      <div className={styles.hero}>
        <div className={styles.container}>
          <p className={styles.heroEyebrow}>Educación Legal Comunitaria · Virginia y Maryland</p>
          <h1 className={styles.heroTitle}>
            Conozca Sus <span className={styles.heroGold}>Derechos</span>
          </h1>
          <div className={styles.heroRule} aria-hidden="true" />
          <p className={styles.heroSub}>
            Usted tiene derechos legales — sin importar su estatus migratorio, identidad de género,
            o historial. Esta guía cubre sus derechos durante encuentros con la policía en Virginia y Maryland.
          </p>
          <div className={styles.disclaimerBar}>
            <strong>Nota importante:</strong> Esta guía es información educativa, no asesoría legal.
            Para su situación específica,{' '}
            <Link href="/attorneys/" className={styles.disclaimerLink}>
              consulte un abogado/a
            </Link>.
          </div>
        </div>
      </div>

      {/* QUICK RIGHTS CARDS */}
      <div className={styles.cardsSection}>
        <div className={styles.container}>
          <div className={styles.cardsGrid}>
            {RIGHTS.map((r) => (
              <div key={r.num} className={styles.rightCard}>
                <span className={styles.sayNumber}>Derecho {r.num}</span>
                <h2 className={styles.sayRight}>{r.right}</h2>
                <p className={styles.sayPhrase}>{r.phrase}</p>
                <p className={styles.sayContext}>{r.context}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SCENARIOS SECTION */}
      <div className={styles.scenariosSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>¿Qué Hacer En Cada Situación?</h2>
          <p className={styles.sectionSub}>
            Seleccione la situación que mejor describa lo que está enfrentando.
          </p>
          <div className={styles.scenarioTabs} role="tablist" aria-label="Situaciones">
            {SCENARIOS.map((sc) => (
              <button
                key={sc.id}
                role="tab"
                aria-selected={activeScenario === sc.id}
                className={`${styles.scenarioTab} ${activeScenario === sc.id ? styles.scenarioTabActive : ''}`}
                onClick={() => setActiveScenario(sc.id)}
              >
                {sc.label}
              </button>
            ))}
          </div>

          <div className={styles.scenarioPanel} role="tabpanel">
            <h3 className={styles.panelTitle}>{panel.title}</h3>
            <ol className={styles.stepList}>
              {panel.steps.map((step, i) => (
                <li key={i} className={styles.stepItem}>
                  <span className={styles.stepNumber}>{i + 1}</span>
                  <div className={styles.stepText}>
                    {step.text}
                    {step.say && (
                      <span className={styles.stepSay}>&ldquo;{step.say}&rdquo;</span>
                    )}
                  </div>
                </li>
              ))}
            </ol>
            {panel.warn && (
              <div className={styles.warnBox}>
                <strong>Nota:</strong> {panel.warn}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* FAQ ACCORDION */}
      <div className={styles.faqSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Preguntas Frecuentes</h2>
          <div className={styles.accordion}>
            {FAQ.map((item, i) => {
              const isOpen = openAccordion === i;
              return (
                <div key={i} className={styles.accItem}>
                  <button
                    className={styles.accTrigger}
                    onClick={() => toggleAccordion(i)}
                    aria-expanded={isOpen}
                  >
                    <span className={styles.accQuestion}>{item.q}</span>
                    <span
                      className={styles.accIcon}
                      aria-hidden="true"
                      style={{ transform: isOpen ? 'rotate(45deg)' : 'none' }}
                    >
                      +
                    </span>
                  </button>
                  {isOpen && (
                    <div className={styles.accBody}>
                      <p className={styles.accAnswer}>{item.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* RESOURCES SECTION */}
      <div className={styles.resourcesSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Recursos</h2>
          <div className={styles.resourcesGrid}>
            {RESOURCES_CARDS.map((r) => (
              <Link key={r.href} href={r.href} className={styles.resourceCard}>
                <span className={styles.resourceIcon} aria-hidden="true">{r.icon}</span>
                <span className={styles.resourceLabel}>{r.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* REPORT BAND */}
      <div className={styles.reportBand}>
        <div className={styles.container}>
          <h2 className={styles.reportTitle}>¿Fue víctima de abuso o violación de derechos?</h2>
          <p className={styles.reportSub}>
            Puede reportarlo de forma completamente anónima a través de CHRT, la plataforma segura
            y cifrada de IRN. No necesita dar su nombre.
          </p>
          <Link href="/chrt/" className={styles.reportBtn}>
            Reportar Anónimamente →
          </Link>
        </div>
      </div>

      {/* PRINT BAR */}
      <div className={styles.printBar}>
        <div className={styles.container}>
          <p className={styles.printPrompt}>Comparta esta guía con su comunidad:</p>
          <div className={styles.printActions}>
            <button className={styles.printBtn} onClick={handlePrint}>
              Imprimir versión
            </button>
            <button className={styles.printBtn} onClick={handleShare}>
              Compartir enlace
            </button>
          </div>
        </div>
      </div>

    </main>
  );
}
