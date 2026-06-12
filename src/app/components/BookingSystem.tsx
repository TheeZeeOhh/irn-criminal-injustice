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
    id: 'legal-bail',
    name: 'Legal & Bail Navigation',
    description: 'Intake for urgent bail support, court accompaniment, or legal referrals.',
    duration: '45 min'
  },
  {
    id: 'eviction',
    name: 'Tenant & Eviction Defense',
    description: 'Rapid-response consultation for illegal lockouts, mold/lead issues, or eviction notices.',
    duration: '30 min'
  },
  {
    id: 'name-gender',
    name: 'Name & Gender Marker Update',
    description: 'Free legal clinic for navigating document updates in Virginia.',
    duration: '60 min'
  },
  {
    id: 'kyr',
    name: 'Know Your Rights Workshop',
    description: 'Request an IRN facilitator to train your community organization or mutual aid group.',
    duration: '1.5 hrs'
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
              <h2 className={styles.stepTitle}>Select a Service</h2>
              <p className={styles.stepSubtitle}>All consultations are free, confidential, and run by community advocates.</p>
              
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
              <p className={styles.stepSubtitle}>Times are shown in Eastern Time (ET). Your selection: <strong>{selectedService?.name}</strong></p>
              
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
              <h2 className={styles.stepTitle}>Client Details</h2>
              <p className={styles.stepSubtitle}>We prioritize your safety. Only share what is necessary.</p>
              
              <form className={styles.intakeForm} onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                  <label>Name or Alias</label>
                  <input 
                    type="text" 
                    required 
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    placeholder="How should we refer to you?" 
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
                  <label>Brief Description (Optional)</label>
                  <textarea 
                    rows={4} 
                    value={formData.notes}
                    onChange={e => setFormData({...formData, notes: e.target.value})}
                    placeholder="Provide a general idea of your need. Do NOT include sensitive legal admissions or confessions."
                  ></textarea>
                </div>

                <div className={styles.summaryBox}>
                  <strong>Booking Summary:</strong> {selectedService?.name} on {selectedDate} at {selectedTime}
                </div>

                <div className={styles.buttonRow}>
                  <button type="button" className={styles.secondaryBtn} onClick={handlePrev} disabled={isSubmitting}>
                    <ArrowLeft size={18} /> Back
                  </button>
                  <button type="submit" className={styles.primaryBtn} disabled={isSubmitting || !formData.name || !formData.contact}>
                    {isSubmitting ? 'Confirming...' : 'Confirm Booking'}
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
              <h2 className={styles.successTitle}>Booking Confirmed.</h2>
              <p className={styles.successText}>
                Your intake appointment for <strong>{selectedService?.name}</strong> has been secured for <strong>{selectedDate} at {selectedTime}</strong>.
              </p>
              
              <div className={styles.trackingBox}>
                <span>Secure Tracking ID</span>
                <strong>IRN-{Math.floor(Math.random() * 1000000)}</strong>
              </div>

              <p className={styles.nextStepsText}>
                Our advocates will reach out to you via {formData.method === 'signal' ? 'Signal' : formData.method === 'proton' ? 'ProtonMail' : 'your preferred contact method'} within 24 hours to confirm any final details prior to the meeting.
              </p>

              <button className={styles.secondaryBtn} onClick={() => window.location.href = '/'}>
                Return to Home
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
