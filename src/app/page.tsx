'use client';
import { useState, useEffect } from 'react';
import { ArrowRight, Activity, MapPin, Scale, ChevronRight } from 'lucide-react';

export default function Home() {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({ what: '', where: '' });
  
  // Tickers
  const [cases, setCases] = useState(0);
  const [actions, setActions] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCases(prev => prev < 427 ? prev + Math.ceil((427 - prev) * 0.1) : 427);
      setActions(prev => prev < 184 ? prev + Math.ceil((184 - prev) * 0.1) : 184);
    }, 50);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full">
      {/* Editorial Masthead */}
      <section className="relative min-h-[70vh] flex flex-col justify-end p-8 md:p-16 border-b border-navy-light animate-fade-in">
        <div className="max-w-4xl">
          <div className="text-ember font-mono uppercase tracking-widest text-xs font-bold mb-4">Investigative Report</div>
          <h1 className="text-5xl md:text-8xl font-serif text-cream leading-[1.1] mb-6">
            Criminal <br/><span className="text-amber italic">Injustice.</span>
          </h1>
          <p className="text-lg md:text-xl text-cream/70 max-w-2xl font-sans font-light leading-relaxed">
            The systemic failures within Hampton Roads are not accidents. They are deeply entrenched patterns of excessive force, inequitable pretrial detention, and lack of accountability. We are documenting the harm, block by block.
          </p>
        </div>
      </section>

      {/* Live Impact Tickers */}
      <section className="bg-navy-light border-b border-navy-light p-8 md:p-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="animate-slide-up" style={{animationDelay: '0.1s'}}>
          <div className="text-4xl md:text-5xl font-serif text-ember mb-2">{cases}</div>
          <div className="text-xs font-mono uppercase tracking-widest text-cream/50">Active Cases Tracked</div>
        </div>
        <div className="animate-slide-up" style={{animationDelay: '0.2s'}}>
          <div className="text-4xl md:text-5xl font-serif text-amber mb-2">{actions}</div>
          <div className="text-xs font-mono uppercase tracking-widest text-cream/50">Legislative Actions Supported</div>
        </div>
        <div className="animate-slide-up" style={{animationDelay: '0.3s'}}>
          <div className="text-4xl md:text-5xl font-serif text-sage mb-2">3,120+</div>
          <div className="text-xs font-mono uppercase tracking-widest text-cream/50">Community Members Assisted</div>
        </div>
      </section>

      {/* Scrollytelling Section */}
      <section className="flex flex-col md:flex-row relative">
        <div className="w-full md:w-1/2 p-8 md:p-16 lg:p-24 space-y-32">
          <div className="max-w-md">
            <h2 className="text-3xl font-serif text-cream mb-4">A Pattern of Harm</h2>
            <p className="text-cream/70 leading-relaxed font-light">
              When we map the incidents across the 757, a clear concentration emerges. These aren't isolated interactions; they represent a coordinated failure of oversight in specific precincts.
            </p>
          </div>
          <div className="max-w-md">
            <h2 className="text-3xl font-serif text-cream mb-4">The Pretrial Trap</h2>
            <p className="text-cream/70 leading-relaxed font-light">
              Cash bail disproportionately destabilizes working families. Even three days in detention can result in job loss, eviction, and a cascading crisis that the state ignores.
            </p>
          </div>
          <div className="max-w-md pb-32">
            <h2 className="text-3xl font-serif text-cream mb-4">Building Accountability</h2>
            <p className="text-cream/70 leading-relaxed font-light">
              By crowdsourcing civilian reports and aggregating the data through our Community Harm Reporting Tool (CHRT), we arm legislative advocates with undeniable evidence.
            </p>
          </div>
        </div>
        <div className="w-full md:w-1/2 bg-navy-light md:sticky top-0 h-[50vh] md:h-screen flex items-center justify-center p-8 border-l border-navy border-opacity-50">
          {/* Abstract Data Viz Representation */}
          <div className="relative w-full max-w-md aspect-square">
            <div className="absolute inset-0 border border-white/10 rounded-full animate-pulse"></div>
            <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-ember rounded-full shadow-[0_0_15px_rgba(217,72,51,0.6)]"></div>
            <div className="absolute top-1/2 left-2/3 w-4 h-4 bg-amber rounded-full shadow-[0_0_15px_rgba(226,155,39,0.6)]"></div>
            <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-sage rounded-full shadow-[0_0_15px_rgba(107,142,120,0.6)]"></div>
            <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-ember rounded-full"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <MapPin className="text-white/20 w-32 h-32" strokeWidth={1} />
            </div>
          </div>
        </div>
      </section>

      {/* Human Cost Carousel */}
      <section className="bg-[#050B16] py-24 px-8 md:px-16 flex flex-col md:flex-row items-center gap-12 border-y border-white/5">
        <div className="w-full md:w-1/2 aspect-[4/5] bg-gray-900 overflow-hidden relative grayscale contrast-125 rounded-sm">
          {/* Mockup for image, using a generic colored block since we lack external images */}
          <div className="absolute inset-0 bg-gradient-to-br from-navy to-black opacity-80 mix-blend-multiply"></div>
          <div className="absolute inset-0 flex items-center justify-center text-white/10 font-serif text-2xl">[Portrait Photography]</div>
        </div>
        <div className="w-full md:w-1/2">
          <div className="text-amber font-serif text-8xl leading-none opacity-50 mb-4">"</div>
          <h3 className="text-3xl md:text-5xl font-serif leading-tight mb-8">
            They don't just take your freedom for a night. They take your job, your apartment, your stability. It's a system designed to extract.
          </h3>
          <div className="text-sm font-mono uppercase tracking-widest text-cream/50">— Marcus V., Newport News</div>
        </div>
      </section>

      {/* Progressive Intake Form */}
      <section className="py-24 px-8 md:px-16 max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 text-ember">
            <Activity size={24} />
          </div>
          <h2 className="text-4xl font-serif mb-4">Report an Incident</h2>
          <p className="text-cream/50 font-light">Your report builds our collective case. Information is kept secure and anonymized.</p>
        </div>

        <div className="bg-navy-light border border-white/10 rounded-2xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
          {activeStep === 0 && (
            <div className="animate-fade-in">
              <label className="block text-xl font-serif mb-6">What happened?</label>
              <textarea 
                value={formData.what}
                onChange={e => setFormData({...formData, what: e.target.value})}
                placeholder="Describe the interaction in your own words..."
                className="w-full bg-navy border border-white/10 rounded-xl p-4 min-h-[120px] text-cream outline-none focus:border-amber focus:ring-1 focus:ring-amber transition-all resize-none"
              ></textarea>
              <div className="mt-8 flex justify-end">
                <button 
                  onClick={() => setActiveStep(1)}
                  disabled={!formData.what}
                  className="bg-cream text-navy px-8 py-3 rounded-full font-bold uppercase tracking-wider text-xs flex items-center gap-2 hover:bg-amber transition-colors disabled:opacity-50"
                >
                  Next <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {activeStep === 1 && (
            <div className="animate-fade-in">
              <label className="block text-xl font-serif mb-6">Where did this take place?</label>
              <input 
                value={formData.where}
                onChange={e => setFormData({...formData, where: e.target.value})}
                placeholder="City, intersection, or precinct..."
                className="w-full bg-navy border border-white/10 rounded-xl p-4 text-cream outline-none focus:border-amber focus:ring-1 focus:ring-amber transition-all"
              />
              <div className="mt-8 flex justify-between">
                <button 
                  onClick={() => setActiveStep(0)}
                  className="text-cream/50 hover:text-cream px-4 py-3 font-mono uppercase tracking-wider text-xs transition-colors"
                >
                  Back
                </button>
                <button 
                  onClick={() => setActiveStep(2)}
                  disabled={!formData.where}
                  className="bg-ember text-cream px-8 py-3 rounded-full font-bold uppercase tracking-wider text-xs flex items-center gap-2 hover:bg-red-600 transition-colors disabled:opacity-50"
                >
                  Submit Securely
                </button>
              </div>
            </div>
          )}

          {activeStep === 2 && (
            <div className="animate-fade-in text-center py-8">
              <div className="w-16 h-16 bg-sage/20 text-sage rounded-full flex items-center justify-center mx-auto mb-6">
                <Scale size={32} />
              </div>
              <h3 className="text-2xl font-serif mb-2">Report Secured</h3>
              <p className="text-cream/50 font-light mb-8">Thank you. Your voice is critical to the reform network.</p>
              <button 
                onClick={() => { setActiveStep(0); setFormData({what: '', where: ''}); }}
                className="text-amber hover:underline font-mono uppercase text-xs tracking-wider"
              >
                Submit another report
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Sticky Action Footer */}
      <div className="fixed bottom-0 left-0 w-full bg-[#050B16]/90 backdrop-blur-md border-t border-white/10 p-4 z-50 flex items-center justify-between md:justify-center md:gap-8 px-6 transform transition-transform">
        <span className="font-serif italic text-lg hidden md:block opacity-80">Take Action.</span>
        <div className="flex gap-4 w-full md:w-auto">
          <button className="flex-1 md:flex-none bg-cream text-navy px-6 py-2.5 rounded-full font-bold uppercase tracking-widest text-[10px] hover:bg-amber transition-colors text-center">
            Donate
          </button>
          <button className="flex-1 md:flex-none bg-transparent border border-white/20 text-cream px-6 py-2.5 rounded-full font-bold uppercase tracking-widest text-[10px] hover:bg-white/10 transition-colors text-center">
            Sign Petition
          </button>
        </div>
      </div>
    </div>
  );
}
