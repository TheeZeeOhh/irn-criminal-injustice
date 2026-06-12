'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Shield, Scale, Home, Camera } from 'lucide-react';
import styles from './kyr-es.module.css';

const sections = [
  {
    icon: Shield,
    title: 'Encuentros con la Policía',
    items: [
      { q: 'Tus derechos básicos', a: 'Tienes el derecho de guardar silencio en todos los estados. No estás obligado a responder preguntas sobre adónde vas, dónde has estado, o qué estás haciendo. Di clara y calmadamente: "Invoco mi derecho de guardar silencio."' },
      { q: '¿Me están deteniendo?', a: 'Pregunta: "¿Soy libre de irme?" Si la respuesta es sí — vete calmamente. Si es no, estás siendo detenido. Di: "No consiento a esta detención. Invoco mi derecho de guardar silencio y mi derecho a un abogado." Mantén la calma y no resistas físicamente.' },
      { q: 'Registros (cacheos)', a: 'Puedes negar el consentimiento a un registro de tu persona, bolsa o vehículo. Di claramente: "No consiento a un registro." Un oficial puede registrar de todos modos si alega causa probable — tu negativa es legalmente importante y queda registrada.' },
      { q: 'Si te arrestan', a: 'Di claramente: "Invoco mi derecho de guardar silencio y mi derecho a un abogado." Luego deja de hablar. No expliques ni argumentes. Contacta a IRN a cirnpresident@gmail.com en cuanto puedas.' },
    ],
  },
  {
    icon: Home,
    title: 'Derechos del Inquilino',
    items: [
      { q: 'Desalojos ilegales', a: 'Los desalojos de auto-ayuda — donde un arrendador cambia las cerraduras, corta los servicios, o remueve tus pertenencias sin orden judicial — son ilegales en Virginia, Maryland y DC. Solo un alguacil puede ejecutar un desalojo después de una orden judicial.' },
      { q: 'Avisos requeridos', a: 'Virginia: 5 días para pagar o desocupar. Maryland: 4 días. DC: 30 días por falta de pago. Tienes el derecho de aparecer en el tribunal y contestar el desalojo.' },
    ],
  },
  {
    icon: Camera,
    title: 'Grabar a la Policía',
    items: [
      { q: 'Tu derecho a grabar', a: 'Tienes el derecho de la Primera Enmienda de grabar a oficiales de policía ejerciendo sus funciones en espacios públicos en los 50 estados, siempre que no interferas físicamente con sus acciones.' },
      { q: 'Si te ordenan parar', a: 'Mantén la calma. Puedes decir: "Tengo el derecho constitucional de grabar." Si exigen tu teléfono, no resistas físicamente — di claramente: "No consiento a un registro de mi dispositivo." Siempre bloquea tu teléfono con un PIN, no biometría, cuando protestes.' },
    ],
  },
  {
    icon: Scale,
    title: 'Eliminación de Antecedentes',
    items: [
      { q: 'Virginia — Ley Clean Slate (1 julio 2026)', a: 'La Ley Clean Slate de Virginia entra en vigor el 1 de julio de 2026. Los antecedentes elegibles serán sellados automáticamente. La clínica gratuita de IRN el 1 y 15 de julio te ayudará a navegar este proceso. Todo es gratis.' },
      { q: 'Maryland, Carolina del Norte y DC', a: 'Cada estado tiene sus propias vías de eliminación de antecedentes. IRN puede conectarte con abogados en cada jurisdicción. Contacta a cirnpresident@gmail.com.' },
    ],
  },
];

const walletSteps = [
  'Mantén la calma. Manos visibles.',
  '"¿Soy libre de irme?"',
  '"Invoco mi derecho a guardar silencio."',
  '"No consiento a un registro."',
  '"Quiero un abogado."',
  'No resistas físicamente. Documenta todo después.',
];

export default function KYRSpanishContent() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <main id="main-content" className={styles.main}>
      <div className={styles.accentBar} aria-hidden="true" />

      <header className={styles.hero}>
        <div className={styles.container}>
          <motion.span className={styles.kicker} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            Conoce Tus Derechos
          </motion.span>
          <motion.h1 className={styles.heroTitle} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
            Conoce Lo Que Tienes Derecho.
          </motion.h1>
          <motion.p className={styles.heroSubtitle} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
            Virginia · Maryland · Carolina del Norte · DC — tus derechos durante encuentros con la policía, desalojos, disciplina escolar y más.
            Esto no es asesoramiento legal. Para tu situación, <a href="/chrt" className={styles.heroLink}>reporta a través de CHRT</a>.
          </motion.p>
          <motion.div className={styles.heroActions} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, delay: 0.3 }}>
            <a href="#tarjeta" className={styles.btnPrimary}><Download size={15} aria-hidden="true" /> Descargar Tarjeta</a>
            <a href="/know-your-rights" className={styles.btnGhost}>English →</a>
          </motion.div>
        </div>
      </header>

      {/* ACCORDION */}
      <section className={styles.section}>
        <div className={styles.container}>
          <span className={styles.sectionKicker}>Tus Derechos</span>
          <h2 className={styles.sectionTitle}>Cuatro Áreas Más Importantes</h2>
          <div className={styles.accordion}>
            {sections.map((sec, i) => {
              const Icon = sec.icon;
              const isOpen = open === i;
              return (
                <div key={sec.title} className={styles.accItem}>
                  <button className={styles.accBtn} onClick={() => setOpen(isOpen ? null : i)} aria-expanded={isOpen}>
                    <div className={styles.accBtnLeft}><Icon size={18} aria-hidden="true" className={styles.accIcon} /><span className={styles.accTitle}>{sec.title}</span></div>
                    <span aria-hidden="true">{isOpen ? '▲' : '▼'}</span>
                  </button>
                  {isOpen && (
                    <div className={styles.accBody}>
                      {sec.items.map(item => (
                        <div key={item.q} className={styles.accBlock}>
                          <h3 className={styles.accBlockTitle}>{item.q}</h3>
                          <p className={styles.accBlockBody}>{item.a}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* WALLET CARD */}
      <section className={styles.walletSection} id="tarjeta">
        <div className={styles.container}>
          <span className={styles.sectionKicker}>Imprimible</span>
          <h2 className={styles.sectionTitle}>Tarjeta de Bolsillo</h2>
          <p className={styles.sectionBody}>Dobla y guarda en tu billetera. Imprime en ambos lados de una hoja, dobla en tercios.</p>
          <div className={styles.walletCard}>
            <div className={styles.walletHeader}>
              <span className={styles.walletOrg}>INJUSTICE REFORM NETWORK</span>
              <span className={styles.walletTitle}>CONOCE TUS DERECHOS</span>
              <span className={styles.walletSub}>Encuentro con Policía · 6 Pasos</span>
            </div>
            <ol className={styles.walletSteps}>
              {walletSteps.map((step, i) => (
                <li key={i} className={styles.walletStep}>
                  <span className={styles.walletNum}>{i + 1}</span>
                  <span className={styles.walletStepText}>{step}</span>
                </li>
              ))}
            </ol>
            <div className={styles.walletFooter}>
              <span>Reporta incidentes anónimamente:</span>
              <span className={styles.walletUrl}>injusticereformnetwork.org/chrt</span>
              <span>cirnpresident@gmail.com · 804-602-9166</span>
            </div>
          </div>
          <button className={styles.btnPrimary} onClick={() => window.print()}>
            <Download size={15} aria-hidden="true" /> Imprimir Tarjeta
          </button>
        </div>
      </section>

      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <div className={styles.ctaBlock}>
            <h2 className={styles.ctaTitle}>¿Violaron tus derechos?</h2>
            <p className={styles.ctaBody}>Usa CHRT para documentar lo que pasó — de forma anónima, cifrada, sin necesidad de dar tu nombre.</p>
            <a href="/chrt" className={styles.btnPrimary}>Reportar a través de CHRT →</a>
          </div>
        </div>
      </section>
    </main>
  );
}
