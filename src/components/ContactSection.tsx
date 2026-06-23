import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, HelpCircle, ChevronDown, ChevronUp, CheckCircle } from 'lucide-react';
import { faqs } from '../utils/mockData';

export const ContactSection: React.FC = () => {
  const [activeFaqIdx, setActiveFaqIdx] = useState<number | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleFaq = (idx: number) => {
    setActiveFaqIdx(activeFaqIdx === idx ? null : idx);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setName('');
      setEmail('');
      setMessage('');
      
      // Auto reset success message after 5s
      setTimeout(() => setSubmitted(false), 5000);
    }, 1200);
  };

  return (
    <section id="contact-section" className="py-16 bg-slate-50 dark:bg-slate-950 border-t border-slate-200/50 dark:border-slate-800/50 font-sans select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl tracking-tight">
            Get in Touch & FAQ Support
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">
            We are here to answer your technical and security questions
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-teal-500 to-blue-500 mx-auto rounded-full mt-2"></div>
        </div>

        {/* Contact and FAQ Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Columns: FAQ Accordion */}
          <div className="lg:col-span-7 space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center mb-6">
              <HelpCircle className="w-5 h-5 text-teal-500 mr-2" /> Frequently Asked Questions
            </h3>

            <div className="space-y-3.5">
              {faqs.map((faq, idx) => {
                const isOpen = activeFaqIdx === idx;
                return (
                  <div 
                    key={idx}
                    className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 rounded-2xl overflow-hidden shadow-sm transition-all"
                  >
                    <button
                      onClick={() => toggleFaq(idx)}
                      className="w-full flex items-center justify-between p-4 text-left font-bold text-xs text-slate-850 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-850/50 transition-colors focus:outline-none"
                    >
                      <span className="pr-4">{faq.q}</span>
                      {isOpen ? <ChevronUp className="w-4 h-4 text-teal-500 flex-shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-400 flex-shrink-0" />}
                    </button>
                    
                    {isOpen && (
                      <div className="p-4 pt-0 border-t border-slate-100 dark:border-slate-800/60 text-[11px] text-slate-655 dark:text-slate-400 leading-relaxed font-medium">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Columns: Contact Card / Form */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 rounded-3xl p-6 shadow-md space-y-6">
              
              <div className="space-y-2">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">Inquire Genomic Support</h3>
                <p className="text-[10px] text-slate-500 dark:text-slate-450 leading-relaxed">
                  Have a question about genomic parsing formats or enterprise integration? Send us a quick note.
                </p>
              </div>

              {submitted && (
                <div className="flex items-center space-x-2.5 p-3.5 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900/50 rounded-2xl text-xs text-green-650 dark:text-green-400 font-semibold animate-bounce">
                  <CheckCircle className="w-4 h-4 flex-shrink-0" />
                  <span>Thank you! Your message was submitted successfully.</span>
                </div>
              )}

              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Marcus Vance"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 focus:border-teal-500 dark:focus:border-teal-500 focus:outline-none transition-colors"
                  />
                </div>
                
                <div className="space-y-1">
                  <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="marcus@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 focus:border-teal-500 dark:focus:border-teal-500 focus:outline-none transition-colors"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide">Message Content</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Explain your inquiry details here..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 focus:border-teal-500 dark:focus:border-teal-500 focus:outline-none transition-colors resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 disabled:from-slate-350 disabled:to-slate-350 text-white font-bold text-xs rounded-xl shadow-lg transition-all flex items-center justify-center space-x-2"
                >
                  {loading ? (
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  ) : (
                    <>
                      <span>Transmit Message</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </form>

              {/* Direct Channels */}
              <div className="pt-4 border-t border-slate-150 dark:border-slate-800/80 space-y-3 text-xs select-none">
                <div className="flex items-center space-x-3 text-slate-650 dark:text-slate-400">
                  <Mail className="w-4.5 h-4.5 text-teal-500" />
                  <span>support@geneguard.ai</span>
                </div>
                <div className="flex items-center space-x-3 text-slate-650 dark:text-slate-400">
                  <Phone className="w-4.5 h-4.5 text-teal-500" />
                  <span>+1 (800) 555-GENE</span>
                </div>
                <div className="flex items-center space-x-3 text-slate-650 dark:text-slate-400">
                  <MapPin className="w-4.5 h-4.5 text-teal-500" />
                  <span>Medical Center Boulevard, San Francisco, CA</span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
