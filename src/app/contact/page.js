


'use client'
import { useState, useEffect } from 'react';
import { fetchCompanyInfo, fetchCards, submitContactForm } from '../service/contactService';
import { XMarkIcon, EnvelopeIcon, PhoneIcon, MapPinIcon, BuildingOfficeIcon, UserIcon, ClockIcon, TagIcon, CurrencyDollarIcon, CalendarIcon, CheckCircleIcon, SparklesIcon, ChatBubbleLeftIcon } from '@heroicons/react/24/outline';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    position: '',
    subject: '',
    message: '',
    serviceInterest: [],
    budget: '',
    timeline: '',
    privacyConsent: false
  });
  const [formStatus, setFormStatus] = useState(null);
  const [companyInfo, setCompanyInfo] = useState(null);
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [services, setServices] = useState([]); // Filtered service cards for form options

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const [companyRes, cardsRes] = await Promise.all([fetchCompanyInfo(), fetchCards()]);
      setCompanyInfo(companyRes);
      setCards(cardsRes || []);
      const serviceCards = (cardsRes || []).filter(card => card.type === 'service' && card.isActive);
      setServices(serviceCards);
      setLoading(false);
    };
    loadData();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox' && name === 'privacyConsent') {
      setFormData({ ...formData, [name]: checked });
    } else if (type === 'checkbox' && name.startsWith('serviceInterest')) {
      const serviceId = name.replace('serviceInterest-', '');
      const interests = checked
        ? [...formData.serviceInterest, serviceId]
        : formData.serviceInterest.filter(id => id !== serviceId);
      setFormData({ ...formData, serviceInterest: interests });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Basic validation
    if (!formData.name || !formData.email || !formData.message || !formData.privacyConsent) {
      setFormStatus('Please fill in all required fields and consent to privacy policy.');
      return;
    }
    setFormStatus('Submitting...');
    const result = await submitContactForm(formData);
    if (result.success) {
      setFormStatus('Your message has been sent successfully!');
      setFormData({
        name: '', email: '', phone: '', company: '', position: '', subject: '', message: '',
        serviceInterest: [], budget: '', timeline: '', privacyConsent: false
      });
    } else {
      setFormStatus(`Error: ${result.error}`);
    }
    setTimeout(() => setFormStatus(null), 5000);
  };

  const contactCards = cards.filter(card => card.type === 'contact' && card.isActive);

  if (loading) {
    return (
      <section className="w-full flex items-center justify-center min-h-screen bg-gradient-to-br from-[#e0e7ff] via-[#f0f4ff] to-[#c7d2fe] dark:from-[#0a0a23] dark:via-[#1e293b] dark:to-[#0a0a23]">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-700"></div>
      </section>
    );
  }

  return (
    <section className="w-full flex flex-col items-center px-4 pt-16 pb-24 min-h-screen bg-gradient-to-br from-[#e0e7ff] via-[#f0f4ff] to-[#c7d2fe] dark:from-[#0a0a23] dark:via-[#1e293b] dark:to-[#0a0a23] overflow-hidden">
      {/* Hero Section - Enhanced with gradient text and animations */}
      <div className="max-w-7xl text-center mb-20 animate-fade-in-up">
        <h1 className="text-5xl sm:text-7xl font-extrabold mb-6 leading-tight tracking-tight text-neutral-900 dark:text-white drop-shadow-xl bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent">
          Get in Touch
        </h1>
        <p className="text-xl sm:text-2xl text-neutral-700 dark:text-neutral-300 mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in-up animation-delay-200">
          {companyInfo?.tagline || 'Ready to transform your ideas into reality? Start with our 10-day discovery sprint to plan, prototype, and estimate your project.'}
        </p>
      </div>

      {/* Contact Cards - Full width grid with breathing room and glow */}
      {contactCards.length > 0 && (
        <div className="max-w-7xl w-full mb-20 animate-fade-in-up animation-delay-200">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {contactCards.map((contactCard, idx) => (
              <div key={contactCard._id} className="bg-white/95 dark:bg-neutral-900/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 lg:p-12 border border-white/20 hover:border-blue-400/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-blue-500/20 transition-all duration-700" style={{ animationDelay: `${idx * 150}ms` }}>
                <div className="max-w-4xl mx-auto text-center">
                  <h2 className="text-3xl font-bold mb-6 text-blue-700 dark:text-blue-400">{contactCard.title}</h2>
                  <p className="text-neutral-700 dark:text-neutral-300 mb-8 text-lg leading-relaxed">{contactCard.description}</p>
                  {contactCard.features?.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      {contactCard.features.map((feature, featureIdx) => (
                        <div key={featureIdx} className="flex items-start gap-3 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl">
                          <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">{feature}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  {contactCard.buttonText && (
                    <a
                      href={contactCard.buttonLink}
                      className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-500/50 transition-all duration-300"
                    >
                      {contactCard.buttonText}
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="max-w-7xl w-full flex flex-col lg:flex-row gap-10 mb-24">
        {/* Contact Information - Balanced height with enhanced icons and glows */}
        <div className="lg:w-2/5 flex-1 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20 hover:border-blue-400/70 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-blue-500/20 hover:-translate-y-2 transition-all duration-700 animate-slide-in-left min-h-[400px] flex flex-col relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10 opacity-0 hover:opacity-100 transition-opacity duration-700"></div>
          <div className="relative z-10 flex-1">
            <h2 className="text-2xl font-bold mb-6 text-blue-700 dark:text-blue-400 flex items-center gap-2">
              <svg className="w-6 h-6 text-blue-700 dark:text-blue-400 hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Contact Information
            </h2>
            <div className="space-y-4">
              {companyInfo?.email && (
                <div className="group flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl transition-all duration-300 hover:from-blue-100 hover:to-indigo-100 dark:hover:from-blue-800/30 dark:hover:to-indigo-800/30">
                  <EnvelopeIcon className="w-6 h-6 text-blue-700 dark:text-blue-400 flex-shrink-0 group-hover:rotate-12 transition-transform duration-300" />
                  <a href={`mailto:${companyInfo.email}`} className="text-neutral-700 dark:text-neutral-300 hover:text-blue-700 dark:hover:text-blue-400 transition-colors break-all">
                    {companyInfo.email}
                  </a>
                </div>
              )}
              {(companyInfo?.phone || companyInfo?.alternatePhone) && (
                <>
                  {companyInfo?.phone && (
                    <div className="group flex items-center gap-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl transition-all duration-300 hover:from-green-100 hover:to-emerald-100 dark:hover:from-green-800/30 dark:hover:to-emerald-800/30">
                      <PhoneIcon className="w-6 h-6 text-green-700 dark:text-green-400 flex-shrink-0 group-hover:rotate-12 transition-transform duration-300" />
                      <a href={`tel:${companyInfo.phone}`} className="text-neutral-700 dark:text-neutral-300 hover:text-green-700 dark:hover:text-green-400 transition-colors">
                        {companyInfo.phone}
                      </a>
                    </div>
                  )}
                  {companyInfo?.alternatePhone && (
                    <div className="group flex items-center gap-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl transition-all duration-300 hover:from-green-100 hover:to-emerald-100 dark:hover:from-green-800/30 dark:hover:to-emerald-800/30">
                      <PhoneIcon className="w-6 h-6 text-green-700 dark:text-green-400 flex-shrink-0 group-hover:rotate-12 transition-transform duration-300" />
                      <a href={`tel:${companyInfo.alternatePhone}`} className="text-neutral-700 dark:text-neutral-300 hover:text-green-700 dark:hover:text-green-400 transition-colors">
                        {companyInfo.alternatePhone}
                      </a>
                    </div>
                  )}
                </>
              )}
              {companyInfo?.fullAddress && (
                <div className="group flex items-start gap-4 p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800/20 dark:to-gray-700/20 rounded-xl transition-all duration-300 hover:from-gray-100 hover:to-gray-200 dark:hover:from-gray-700/30 dark:hover:to-gray-600/30">
                  <MapPinIcon className="w-6 h-6 text-gray-700 dark:text-gray-400 flex-shrink-0 mt-1 group-hover:rotate-12 transition-transform duration-300" />
                  <a href={companyInfo.googleMapsLink} target="_blank" rel="noopener noreferrer" className="text-neutral-700 dark:text-neutral-300 hover:text-blue-700 dark:hover:text-blue-400 transition-colors break-words">
                    {companyInfo.fullAddress}
                  </a>
                </div>
              )}
            </div>
          </div>
          {/* Social media section - Enhanced with icons and hovers */}
          {companyInfo?.socialMedia && (
            <div className="mt-8 pt-6 border-t border-neutral-200 dark:border-neutral-700">
              <h3 className="text-sm font-semibold text-neutral-600 dark:text-neutral-400 mb-4 flex items-center justify-center gap-2">
                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Connect With Us
              </h3>
              <div className="flex flex-wrap justify-center gap-4">
                {companyInfo.socialMedia.website && (
                  <a href={companyInfo.socialMedia.website} target="_blank" rel="noopener noreferrer" className="group text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1 p-2 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/20 transition-all duration-300">
                    <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 1.982-.82 3.242H10c.334 0 .59-.032.465-.262-.238-.234-.497-.623-.737-1.182-.389-.907-.673-1.982-.82-3.242zm0 14a6 6 0 100-12 6 6 0 000 12z" clipRule="evenodd" />
                    </svg>
                    Website
                  </a>
                )}
                {companyInfo.socialMedia.linkedin && (
                  <a href={companyInfo.socialMedia.linkedin} target="_blank" rel="noopener noreferrer" className="group text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1 p-2 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/20 transition-all duration-300">
                    <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.338 16.038H13.67V12.16c.001-1.568-.36-2.56-2.4-2.56-1.281 0-2.08.866-2.42 1.664v1.646h-2.5v3.188h2.5v4.85h3.31v-4.85h2.5v-3.188zM2.5 9.693a1.193 1.193 0 100 2.385 1.193 1.193 0 000-2.385zM3.75 0a.937.937 0 11-.001 1.874.937.937 0 010-1.874z" clipRule="evenodd" />
                    </svg>
                    LinkedIn
                  </a>
                )}
                {companyInfo.socialMedia.twitter && (
                  <a href={companyInfo.socialMedia.twitter} target="_blank" rel="noopener noreferrer" className="group text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1 p-2 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/20 transition-all duration-300">
                    <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                    Twitter
                  </a>
                )}
                {companyInfo.socialMedia.github && (
                  <a href={companyInfo.socialMedia.github} target="_blank" rel="noopener noreferrer" className="group text-gray-800 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 text-sm flex items-center gap-1 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800/20 transition-all duration-300">
                    <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    GitHub
                  </a>
                )}
                {companyInfo.socialMedia.facebook && (
                  <a href={companyInfo.socialMedia.facebook} target="_blank" rel="noopener noreferrer" className="group text-blue-800 hover:text-blue-900 text-sm flex items-center gap-1 p-2 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/20 transition-all duration-300">
                    <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.789h-2.33v6.989C16.343 19.128 20 14.991 20 10z" clipRule="evenodd" />
                    </svg>
                    Facebook
                  </a>
                )}
                {companyInfo.socialMedia.instagram && (
                  <a href={companyInfo.socialMedia.instagram} target="_blank" rel="noopener noreferrer" className="group text-pink-600 hover:text-pink-700 text-sm flex items-center gap-1 p-2 rounded-full hover:bg-pink-100 dark:hover:bg-pink-900/20 transition-all duration-300">
                    <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 5a2 2 0 012-2h3.582A2 2 0 0111 2h4a2 2 0 012 2v3.582a2 2 0 01-2 2H9.582a2 2 0 01-2-2H5a2 2 0 01-2-2zM2 13a2 2 0 002 2h3.582a2 2 0 002 2v-2.582A2 2 0 009.582 13H14a2 2 0 002-2V9.582a2 2 0 00-2-2H9.582A2 2 0 007.582 9V5.582A2 2 0 005.582 7H2a2 2 0 00-2 2v3z" clipRule="evenodd" />
                    </svg>
                    Instagram
                  </a>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Contact Form - Flexible height, better alignment with icons and gradients */}
        <div className="lg:w-3/5 flex-1 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20 hover:border-blue-400/70 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-blue-500/20 hover:-translate-y-2 transition-all duration-700 animate-slide-in-right min-h-[400px] relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10 opacity-0 hover:opacity-100 transition-opacity duration-700"></div>
          <div className="relative z-10">
            <h2 className="text-2xl font-bold mb-6 text-blue-700 dark:text-blue-400 flex items-center gap-2">
              <svg className="w-6 h-6 text-blue-700 dark:text-blue-400 hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              Send Us a Message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-2">Full Name *</label>
                  <div className="relative">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 pl-11 rounded-xl border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all duration-200 placeholder-neutral-500"
                      placeholder="Your name"
                      required
                    />
                    <UserIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400 pointer-events-none" />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-2">Email *</label>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 pl-11 rounded-xl border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all duration-200 placeholder-neutral-500"
                      placeholder="your.email@example.com"
                      required
                    />
                    <EnvelopeIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400 pointer-events-none" />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-2">Phone</label>
                  <div className="relative">
                    <input
                      type="tel"
                      name="phone"
                      id="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 pl-11 rounded-xl border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all duration-200 placeholder-neutral-500"
                      placeholder="+1 (555) 123-4567"
                    />
                    <PhoneIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400 pointer-events-none" />
                  </div>
                </div>
                <div>
                  <label htmlFor="company" className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-2">Company</label>
                  <div className="relative">
                    <input
                      type="text"
                      name="company"
                      id="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 pl-11 rounded-xl border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all duration-200 placeholder-neutral-500"
                      placeholder="Your company name"
                    />
                    <BuildingOfficeIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400 pointer-events-none" />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="position" className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-2">Position</label>
                  <div className="relative">
                    <input
                      type="text"
                      name="position"
                      id="position"
                      value={formData.position}
                      onChange={handleChange}
                      className="w-full px-4 py-3 pl-11 rounded-xl border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all duration-200 placeholder-neutral-500"
                      placeholder="Your role"
                    />
                    <UserIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400 pointer-events-none" />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-2">Subject</label>
                  <div className="relative">
                    <input
                      type="text"
                      name="subject"
                      id="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 pl-11 rounded-xl border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all duration-200 placeholder-neutral-500"
                      placeholder="Brief subject"
                    />
                    <TagIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400 pointer-events-none" />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="budget" className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-2">Budget</label>
                  <div className="relative">
                    <select
                      name="budget"
                      id="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="w-full px-4 py-3 pl-11 rounded-xl border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all duration-200 appearance-none"
                    >
                      <option value="">Select budget range</option>
                      <option value="$10k-$25k">$10k - $25k</option>
                      <option value="$25k-$50k">$25k - $50k</option>
                      <option value="$50k+">$50k+</option>
                    </select>
                    <CurrencyDollarIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400 pointer-events-none" />
                  </div>
                </div>
                <div>
                  <label htmlFor="timeline" className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-2">Timeline</label>
                  <div className="relative">
                    <select
                      name="timeline"
                      id="timeline"
                      value={formData.timeline}
                      onChange={handleChange}
                      className="w-full px-4 py-3 pl-11 rounded-xl border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all duration-200 appearance-none"
                    >
                      <option value="">Select timeline</option>
                      <option value="1-3 months">1-3 months</option>
                      <option value="3-6 months">3-6 months</option>
                      <option value="6+ months">6+ months</option>
                    </select>
                    <CalendarIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400 pointer-events-none" />
                  </div>
                </div>
              </div>
              {/* Service Interests - Enhanced with gradient backgrounds and icons */}
              {services.length > 0 && (
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300 flex items-center gap-2">
                    <SparklesIcon className="w-4 h-4 text-blue-600" />
                    Service Interests
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-40 overflow-y-auto pr-1 bg-white/50 dark:bg-neutral-800/30 rounded-xl p-3">
                    {services.map((service) => (
                      <label key={service._id} className="group flex items-center gap-2 p-3 rounded-lg bg-gradient-to-r from-gray-50 to-gray-100 dark:from-neutral-800/50 dark:to-neutral-700/50 hover:from-blue-50 hover:to-indigo-50 dark:hover:from-blue-900/20 dark:hover:to-indigo-900/20 transition-all duration-300 cursor-pointer text-sm border border-transparent hover:border-blue-200 dark:hover:border-blue-800">
                        <input
                          type="checkbox"
                          name={`serviceInterest-${service._id}`}
                          checked={formData.serviceInterest.includes(service._id)}
                          onChange={handleChange}
                          className="rounded border-neutral-300 dark:border-neutral-600 text-blue-600 focus:ring-blue-500 h-4 w-4"
                        />
                        <span className="text-neutral-700 dark:text-neutral-300">{service.title}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-2 flex items-center gap-2">
                  <ChatBubbleLeftIcon className="w-4 h-4 text-blue-600" />
                  Message *
                </label>
                <textarea
                  name="message"
                  id="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-3 rounded-xl border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all duration-200 placeholder-neutral-500 resize-none"
                  placeholder="Tell us about your project..."
                  required
                ></textarea>
              </div>
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  name="privacyConsent"
                  id="privacyConsent"
                  checked={formData.privacyConsent}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-neutral-300 dark:border-neutral-600 rounded mt-1 flex-shrink-0"
                  required
                />
                <label htmlFor="privacyConsent" className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed flex-1">
                  I consent to the <a href="#" className="text-blue-600 hover:underline">privacy policy</a> *
                </label>
              </div>
              {formStatus && (
                <div className={`p-4 rounded-xl text-sm font-medium border ${
                  formStatus.includes('successfully') || formStatus === 'Submitting...'
                    ? 'bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800'
                    : 'bg-gradient-to-r from-red-50 to-rose-50 dark:from-red-900/20 dark:to-rose-900/20 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800'
                }`}>
                  {formStatus}
                </div>
              )}
              <button
                type="submit"
                className="w-full group bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white font-semibold py-4 px-6 rounded-xl shadow-xl hover:shadow-2xl hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-blue-500/50 transition-all duration-300 transform hover:-translate-y-1"
              >
                <span className="flex items-center justify-center gap-2">
                  Send Message
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Business Hours - Enhanced with icons, colors, and stagger */}
      {companyInfo?.businessHours && (
        <div className="max-w-7xl w-full text-center mt-20 animate-fade-in-up animation-delay-600">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-blue-700 dark:text-blue-400 flex items-center justify-center gap-2 mx-auto">
            <ClockIcon className="w-6 h-6" />
            Business Hours
          </h2>
          <div className="w-full max-w-5xl mx-auto bg-white/90 dark:bg-neutral-900/90 rounded-3xl shadow-2xl overflow-hidden">
            <div className="divide-y divide-neutral-200 dark:divide-neutral-700">
              {Object.entries(companyInfo.businessHours).map(([day, hours], idx) => (
                <div key={day} className={`grid grid-cols-2 items-center p-6 text-left ${hours === 'Closed' ? 'bg-red-50 dark:bg-red-900/10' : 'bg-white dark:bg-neutral-800/20'} animate-fade-in-up` } style={{ animationDelay: `${idx * 100}ms` }}>
                  <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300 capitalize flex items-center gap-2">
                    <svg className={`w-4 h-4 ${hours === 'Closed' ? 'text-red-600' : 'text-blue-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {day}
                  </p>
                  <p className={`text-lg font-semibold text-right ${hours === 'Closed' ? 'text-red-600 dark:text-red-400' : 'text-neutral-600 dark:text-neutral-400'}`}>
                    {hours}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-10">
            <a
              href="#"
              className="group inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white font-semibold px-10 py-4 rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-500/50 transition-all duration-300 transform hover:-translate-y-1"
            >
              Book a Discovery Sprint
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      )}
    </section>
  );
}