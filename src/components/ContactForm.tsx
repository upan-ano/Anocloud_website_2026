'use client';

import { useActionState } from 'react';
import { validateContactForm } from '@/app/actions/submit';

const initialState = {
  valid: false,
  error: '',
  successMessage: '',
};

export default function ContactForm() {
  const [state, formAction, isPending] = useActionState(validateContactForm, initialState);

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
          
          <form action={formAction} className="space-y-6">
            
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
            
            {state?.successMessage && (
              <div className="p-4 rounded-xl bg-green-50 border border-green-200 text-green-700 text-sm font-medium">
                {state.successMessage}
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
    </div>
  );
}
