'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './BookingSystem.module.css';
import { Calendar, Clock, ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';

type ServiceCategory = {
  id: string;
  name: string;
  description: string;
  duration: string;
};

const services: ServiceCategory[] = [
  {
    id: 'stories-of-resilience',
    name: 'Stories of Resilience Interview',
    description: 'Ongoing interview project recording testimonies from formerly and currently incarcerated women and young girls to support legislative reform and state appropriations.',
    duration: '1.0 hr'
  },
  {
    id: 'kyr-sro',
    name: 'Know Your Rights & Copwatch Training',
    description: 'Interactive group training on school-based rights, documenting policing (Copwatch), and SRO defense.',
    duration: '2.0 hrs'
  },
  {
    id: 'restorative',
    name: 'Restorative Circles & De-escalation',
    description: 'On-the-ground training for peer mediation, healing circles, and alternatives to calling SROs.',
    duration: '3.0 hrs'
  },
  {
    id: 'mobilization',
    name: 'School Board Mobilization Workshop',
    description: 'Coordinating parent/student cohorts for testimonies, public comments, and budget actions.',
    duration: '1.5 hrs'
  },
  {
    id: 'foia-sprint',
    name: 'FOIA & Budget Audit Sprint',
    description: 'Group training and live sprint to compile public records requests auditing school SRO agreements.',
    duration: '2.5 hrs'
  }
];

const availableDates = [
  { date: 'Oct 15', available: true },
  { date: 'Oct 16', available: true },
  { date: 'Oct 17', available: false },
  { date: 'Oct 18', available: true },
  { date: 'Oct 19', available: false },
];

const availableTimes = ['10:00 AM', '11:30 AM', '1:00 PM', '3:30 PM', '5:00 PM'];

export default function BookingSystem() {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState<ServiceCategory | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [formData, setFormData] = useState({ name: '', contact: '', method: 'signal', notes: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNext = () => setStep(s => s + 1);
  const handlePrev = () => setStep(s => s - 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate network request
    setTimeout(() => {
      setIsSubmitting(false);
      setStep(4);
    }, 1500);
  };

  return (
    <div className={styles.bookingWrapper}>
      <div className={styles.progressTracker}>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className={`${styles.progressStep} ${step >= i ? styles.active : ''}`}>
            <div className={styles.stepCircle}>{i}</div>
            <span className={styles.stepLabel}>
              {i === 1 ? 'Service' : i === 2 ? 'Time' : i === 3 ? 'Details' : 'Done'}
            </span>
          </div>
        ))}
      </div>

      <div className={styles.contentArea}>
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className={styles.stepContainer}
            >
              <h2 className={styles.stepTitle}>Select a Training or Action Workshop</h2>
              <p className={styles.stepSubtitle}>IRN facilitators coordinate group workshops, restorative audits, and field trainings.</p>
              
              <div className={styles.servicesGrid}>
                {services.map(service => (
                  <button
                    key={service.id}
                    className={`${styles.serviceCard} ${selectedService?.id === service.id ? styles.selected : ''}`}
                    onClick={() => setSelectedService(service)}
                  >
                    <h3 className={styles.serviceName}>{service.name}</h3>
                    <p className={styles.serviceDesc}>{service.description}</p>
                    <span className={styles.duration}><Clock size={14} /> {service.duration}</span>
                  </button>
                ))}
              </div>

              <div className={styles.buttonRow}>
                <div></div>
                <button 
                  className={styles.primaryBtn} 
                  disabled={!selectedService}
                  onClick={handleNext}
                >
                  Continue <ArrowRight size={18} />
                </button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className={styles.stepContainer}
            >
              <h2 className={styles.stepTitle}>Select Date & Time</h2>
              <p className={styles.stepSubtitle}>Times are shown in Eastern Time (ET). Selected training: <strong>{selectedService?.name}</strong></p>
              
              <div className={styles.dateTimeLayout}>
                <div className={styles.dateSelection}>
                  <h3 className={styles.colTitle}><Calendar size={18} /> Dates</h3>
                  <div className={styles.dateGrid}>
                    {availableDates.map((d, i) => (
                      <button
                        key={i}
                        disabled={!d.available}
                        className={`${styles.dateBtn} ${selectedDate === d.date ? styles.selected : ''} ${!d.available ? styles.disabled : ''}`}
                        onClick={() => { setSelectedDate(d.date); setSelectedTime(''); }}
                      >
                        <span className={styles.dateDay}>{d.date.split(' ')[0]}</span>
                        <span className={styles.dateNum}>{d.date.split(' ')[1]}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className={styles.timeSelection}>
                  <h3 className={styles.colTitle}><Clock size={18} /> Available Times</h3>
                  {!selectedDate ? (
                    <p className={styles.emptyState}>Select a date to view times</p>
                  ) : (
                    <div className={styles.timeGrid}>
                      {availableTimes.map((time, i) => (
                        <button
                          key={i}
                          className={`${styles.timeBtn} ${selectedTime === time ? styles.selected : ''}`}
                          onClick={() => setSelectedTime(time)}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className={styles.buttonRow}>
                <button className={styles.secondaryBtn} onClick={handlePrev}>
                  <ArrowLeft size={18} /> Back
                </button>
                <button 
                  className={styles.primaryBtn} 
                  disabled={!selectedDate || !selectedTime}
                  onClick={handleNext}
                >
                  Continue <ArrowRight size={18} />
                </button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className={styles.stepContainer}
            >
              <h2 className={styles.stepTitle}>Cohort & Organization Details</h2>
              <p className={styles.stepSubtitle}>Please provide details about your group or community space.</p>
              
              <form className={styles.intakeForm} onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                  <label>Group, Organization, or Cohort Name</label>
                  <input 
                    type="text" 
                    required 
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    placeholder="e.g. East End Mutual Aid, Parent-Student Collective" 
                  />
                </div>
                
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label>Preferred Contact Method</label>
                    <select 
                      value={formData.method}
                      onChange={e => setFormData({...formData, method: e.target.value})}
                    >
                      <option value="signal">Signal (Encrypted)</option>
                      <option value="proton">ProtonMail (Encrypted)</option>
                      <option value="phone">Standard Phone/SMS</option>
                      <option value="email">Standard Email</option>
                    </select>
                  </div>
                  <div className={styles.formGroup}>
                    <label>Contact Info</label>
                    <input 
                      type="text" 
                      required 
                      value={formData.contact}
                      onChange={e => setFormData({...formData, contact: e.target.value})}
                      placeholder="Number or Handle" 
                    />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label>Session Goals & Target Audience</label>
                  <textarea 
                    rows={4} 
                    value={formData.notes}
                    onChange={e => setFormData({...formData, notes: e.target.value})}
                    placeholder="Provide details on expected group size, target issue/school division, and location preferences."
                  ></textarea>
                </div>

                <div className={styles.summaryBox}>
                  <strong>Session Summary:</strong> {selectedService?.name} on {selectedDate} at {selectedTime}
                </div>

                <div className={styles.buttonRow}>
                  <button type="button" className={styles.secondaryBtn} onClick={handlePrev} disabled={isSubmitting}>
                    <ArrowLeft size={18} /> Back
                  </button>
                  <button type="submit" className={styles.primaryBtn} disabled={isSubmitting || !formData.name || !formData.contact}>
                    {isSubmitting ? 'Confirming...' : 'Request Session'}
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className={styles.successContainer}
            >
              <div className={styles.successIcon}><CheckCircle2 size={64} /></div>
              <h2 className={styles.successTitle}>Request Submitted.</h2>
              <p className={styles.successText}>
                Your field workshop request for <strong>{selectedService?.name}</strong> has been received for <strong>{selectedDate} at {selectedTime}</strong>.
              </p>
              
              <div className={styles.trackingBox}>
                <span>Secure Request ID</span>
                <strong>IRN-{Math.floor(Math.random() * 1000000)}</strong>
              </div>

              <p className={styles.nextStepsText}>
                Our regional organizers will reach out to you via {formData.method === 'signal' ? 'Signal' : formData.method === 'proton' ? 'ProtonMail' : 'your preferred contact method'} within 24 hours to finalize training space, material printouts, and cohort coordinates.
              </p>

              <button className={styles.secondaryBtn} onClick={() => window.location.href = '/irn-criminal-injustice/'}>
                Return to Home
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
