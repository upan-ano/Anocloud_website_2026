'use client';

import { useActionState, useEffect, useState, useRef } from 'react';
import { validateContactForm } from '@/app/actions/submit';
import { CheckCircle, X, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const initialState = {
  valid: false,
  error: '',
  successMessage: '',
  emailFailed: false,
  timestamp: 0,
};

export default function ContactForm() {
  const [state, formAction, isPending] = useActionState(validateContactForm, initialState);
  const [showToast, setShowToast] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if ((state?.successMessage || state?.emailFailed) && state?.timestamp) {
      setShowToast(true);
      if (state.valid && !state.emailFailed) {
        formRef.current?.reset();
      }
      const timer = setTimeout(() => setShowToast(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [state?.successMessage, state?.emailFailed, state?.timestamp, state?.valid]);

  return (
    <div className="w-full max-w-6xl mx-auto px-6 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        
        {/* Left Column - Form */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-100 shadow-xl shadow-gray-200/50">
          <h2 className="text-3xl font-extrabold text-[#1a1a1a] mb-6 tracking-tight font-outfit"> Let&apos;s get in touch </h2>
          <p className="text-gray-500 mb-8 max-w-md">
            We value your feedback and inquiries. Whether you have questions about our services, need assistance, or want to explore potential collaborations,
            our team is ready to assist you. Please feel free to reach out to us via the contact form below.
          </p>
          
          <form ref={formRef} action={formAction} className="space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="firstName" className="sr-only">First name</label>
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  placeholder="First name"
                  className="w-full bg-[#fcfcfc] border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-[#005241] focus:border-[#005241] block p-4 font-medium placeholder-gray-500 transition-all hover:border-gray-300"
                  required
                />
              </div>
              <div>
                <label htmlFor="lastName" className="sr-only">Last name</label>
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  placeholder="Last name"
                  className="w-full bg-[#fcfcfc] border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-[#005241] focus:border-[#005241] block p-4 font-medium placeholder-gray-500 transition-all hover:border-gray-300"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="email" className="sr-only">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  className="w-full bg-[#fcfcfc] border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-[#005241] focus:border-[#005241] block p-4 font-medium placeholder-gray-500 transition-all hover:border-gray-300"
                  required
                />
              </div>
              <div>
                <label htmlFor="phone" className="sr-only">Phone number</label>
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  placeholder="Phone number"
                  className="w-full bg-[#fcfcfc] border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-[#005241] focus:border-[#005241] block p-4 font-medium placeholder-gray-500 transition-all hover:border-gray-300"
                />
              </div>
            </div>

            <fieldset className="space-y-4 rounded-3xl border border-gray-200 bg-[#fcfcfc] p-6">
              <legend className="sr-only">Service Selection</legend>
              <p className="text-sm font-medium text-gray-900">What service are you interested in?</p>

              <div className="grid gap-3">
                <label className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium transition-all hover:border-[#005241] hover:bg-[#f8fff8]">
                  <input
                    type="checkbox"
                    name="services"
                    value="product"
                    defaultChecked
                    required
                    className="h-5 w-5 rounded border-gray-300 text-[#005241] focus:ring-[#005241]"
                  />
                  Product Development
                </label>
                <label className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium transition-all hover:border-[#005241] hover:bg-[#f8fff8]">
                  <input
                    type="checkbox"
                    name="services"
                    value="cloud"
                    className="h-5 w-5 rounded border-gray-300 text-[#005241] focus:ring-[#005241]"
                  />
                  Cloud Services
                </label>
                <label className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium transition-all hover:border-[#005241] hover:bg-[#f8fff8]">
                  <input
                    type="checkbox"
                    name="services"
                    value="ai"
                    className="h-5 w-5 rounded border-gray-300 text-[#005241] focus:ring-[#005241]"
                  />
                  Artificial Intelligence
                </label>
                <label className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium transition-all hover:border-[#005241] hover:bg-[#f8fff8]">
                  <input
                    type="checkbox"
                    name="services"
                    value="cybersecurity"
                    className="h-5 w-5 rounded border-gray-300 text-[#005241] focus:ring-[#005241]"
                  />
                  Cybersecurity
                </label>
              </div>
            </fieldset>

            <div>
              <label htmlFor="message" className="sr-only">Message</label>
              <textarea
                name="message"
                id="message"
                rows={4}
                placeholder="Message"
                className="w-full bg-[#fcfcfc] border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-[#005241] focus:border-[#005241] block p-4 font-medium placeholder-gray-500 transition-all hover:border-gray-300"
                required
              ></textarea>
            </div>

            {state?.error && (
              <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm font-medium">
                {state.error}
              </div>
            )}

            <button
              type="submit"
              disabled={isPending}
              className="w-full text-white bg-[#005241] hover:bg-[#003b2d] focus:ring-4 focus:ring-green-300 font-bold rounded-xl text-base px-5 py-4 text-center transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? 'Sending...' : 'Send request'}
            </button>
          </form>
        </div>

        {/* Right Column - Text & Info */}
        <div className="flex flex-col justify-center lg:pl-10">
          <h2 className="text-3xl lg:text-4xl font-extrabold text-[#1a1a1a] mb-8 tracking-tight font-outfit">
            Let&apos;s discuss your project
          </h2>
          
          <p className="text-[#333333] text-[1.35rem] leading-snug font-medium mb-12">
            &quot;Our dedicated team of IT experts is committed to understanding your unique requirements and crafting tailored solutions that align with your business objectives.&quot;
          </p>

          <div className="mt-6">
            <h3 className="text-xl font-bold text-[#1a1a1a]">Vishal Kumar Gupta</h3>
            <p className="text-gray-600 mt-1">Founder, AnoCloud</p>
          </div>
        </div>

      </div>

      {/* Toast Notification */}
      <div className="fixed top-48 right-6 z-[100] pointer-events-none">
        <AnimatePresence>
          {showToast && (
            <motion.div 
              initial={{ opacity: 0, x: 40, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.95 }}
              className={`pointer-events-auto relative overflow-hidden text-white px-5 py-4 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.2)] flex items-start gap-4 border border-white/20 backdrop-blur-md w-full max-w-sm ${
                state.emailFailed 
                  ? "bg-gradient-to-r from-red-600 to-rose-600 shadow-red-500/20" 
                  : "bg-gradient-to-r from-indigo-600 to-purple-600 shadow-indigo-500/20"
              }`}
            >
              {state.emailFailed ? (
                <AlertCircle className="w-5 h-5 text-red-100 mt-0.5 shrink-0" strokeWidth={2.5} />
              ) : (
                <CheckCircle className="w-5 h-5 text-purple-200 mt-0.5 shrink-0" strokeWidth={2.5} />
              )}
              
              <div className="flex-1 pr-6 relative top-[-1px]">
                <h4 className="font-bold text-[15px] tracking-wide">
                  {state.emailFailed ? "FAILED TO FILL" : "SUCCESS"}
                </h4>
                <p className={`text-[14px] mt-0.5 font-medium opacity-90 leading-tight ${
                  state.emailFailed ? "text-red-50" : "text-purple-100"
                }`}>
                  {state.emailFailed 
                    ? "Confirmation email failed. Entry rolled back." 
                    : "A confirmation email has been sent."
                  }
                </p>
              </div>
              <button 
                onClick={() => setShowToast(false)}
                className="text-white/70 hover:text-white transition-colors mt-0.5 z-10"
              >
                <X className="w-4 h-4" strokeWidth={2.5} />
              </button>

              {/* Glassy Multicolored Loader with Glow */}
              <motion.div 
                key={state.timestamp} 
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 5, ease: "linear" }}
                className={`absolute bottom-0 left-0 h-1.5 backdrop-blur-md ${
                  state.emailFailed 
                    ? "bg-gradient-to-r from-orange-400 via-rose-400 to-red-400" 
                    : "bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-yellow-400"
                }`}
                style={{ 
                  boxShadow: state.emailFailed 
                    ? "0 0 15px rgba(244, 63, 94, 0.4), 0 0 5px rgba(255, 255, 255, 0.8)"
                    : "0 0 15px rgba(34, 211, 238, 0.4), 0 0 5px rgba(255, 255, 255, 0.8)",
                  zIndex: 20
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}
