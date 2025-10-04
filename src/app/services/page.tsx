'use client'
import { useState, useEffect } from 'react';
import { getServices } from '../service/servicesApi';
import { fetchCards } from '../service/contactService'; // Reuse from contact service
import { XMarkIcon, CheckCircleIcon, ClockIcon, ShieldCheckIcon, SparklesIcon, BoltIcon, ScaleIcon } from '@heroicons/react/24/outline';

export default function Services() {
  const [services, setServices] = useState([]);
  const [cards, setCards] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [servicesRes, cardsRes] = await Promise.all([getServices(), fetchCards()]);
        setServices(servicesRes || []);
        setCards(cardsRes || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const openModal = (service) => {
    setSelectedService(service);
  };

  const closeModal = () => {
    setSelectedService(null);
  };

  const serviceCard = cards.find(card => card.type === 'service' && card.isActive);

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
      <div className="max-w-5xl text-center mb-20 animate-fade-in-up">
        <h1 className="text-5xl sm:text-7xl font-extrabold mb-6 leading-tight tracking-tight text-neutral-900 dark:text-white drop-shadow-xl bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent">
          We ship reliable software — fast
        </h1>
        <p className="text-xl sm:text-2xl text-neutral-700 dark:text-neutral-300 mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in-up animation-delay-200">
          We turn messy processes into measurable outcomes on ERPNext/Frappe and modern stacks. When systems stall, we make them work — and keep them working.
        </p>
      </div>

      {/* Services Grid - Enhanced cards with images, glows, and hovers */}
      <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 mb-24 animate-fade-in-up animation-delay-200">
        {services.map((service, idx) => (
          <div
            key={service._id}
            className="group relative bg-white/95 dark:bg-neutral-900/95 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-white/20 hover:border-blue-400/70 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-blue-500/20 hover:-translate-y-2 transition-all duration-700 cursor-pointer"
            style={{ animationDelay: `${idx * 150}ms` }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 to-purple-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <img 
              src={service.coverImage} 
              alt={service.title} 
              className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-700" 
            />
            <div className="relative z-10 p-8 flex flex-col items-center flex-grow">
              <div className="w-12 h-12 mb-4 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <BoltIcon className="w-6 h-6 text-blue-700 dark:text-blue-400" />
              </div>
              <h3 className="font-bold text-xl mb-4 text-blue-700 dark:text-blue-400 group-hover:underline underline-offset-4 text-center">
                {service.title}
              </h3>
              <p className="text-neutral-700 dark:text-neutral-300 text-base mb-6 text-center leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                {service.description}
              </p>
              <button 
                onClick={() => openModal(service)}
                className="group/btn inline-flex items-center gap-2 mt-auto text-blue-700 dark:text-blue-400 font-semibold hover:text-blue-900 dark:hover:text-blue-300 transition-colors duration-300 underline underline-offset-2"
              >
                View More
                <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Stats/Guarantees Grid - With icons and enhanced hovers */}
      <div className="max-w-7xl w-full mb-24 py-16 bg-white/50 dark:bg-neutral-900/30 rounded-3xl backdrop-blur-sm animate-fade-in-up animation-delay-400">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-neutral-900 dark:text-white bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent drop-shadow-lg">
          Our Guarantees
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="group bg-white/95 dark:bg-neutral-900/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20 hover:border-green-400/70 hover:shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:shadow-green-500/20 hover:-translate-y-2 transition-all duration-700 text-center">
            <div className="w-16 h-16 mb-4 bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
              <CheckCircleIcon className="w-8 h-8 text-green-700 dark:text-green-400" />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-green-700 dark:text-green-400">92% Go-Live</h3>
            <p className="text-neutral-600 dark:text-neutral-300 text-base">We fix failing rollouts</p>
          </div>
          <div className="group bg-white/95 dark:bg-neutral-900/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20 hover:border-blue-400/70 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-blue-500/20 hover:-translate-y-2 transition-all duration-700 text-center">
            <div className="w-16 h-16 mb-4 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
              <ClockIcon className="w-8 h-8 text-blue-700 dark:text-blue-400" />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-blue-700 dark:text-blue-400">&lt; 24h Response</h3>
            <p className="text-neutral-600 dark:text-neutral-300 text-base">Support that shows up</p>
          </div>
          <div className="group bg-white/95 dark:bg-neutral-900/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20 hover:border-purple-400/70 hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:shadow-purple-500/20 hover:-translate-y-2 transition-all duration-700 text-center">
            <div className="w-16 h-16 mb-4 bg-gradient-to-br from-purple-100 to-indigo-100 dark:from-purple-900/30 dark:to-indigo-900/30 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
              <ShieldCheckIcon className="w-8 h-8 text-purple-700 dark:text-purple-400" />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-purple-700 dark:text-purple-400">Deep Integration</h3>
            <p className="text-neutral-600 dark:text-neutral-300 text-base">WhatsApp native, Security-first, Permissions & audits</p>
          </div>
        </div>
      </div>

      {/* Principles Section - Enhanced with icons and glows */}
      <div className="max-w-6xl w-full mb-24 animate-fade-in-up animation-delay-600">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16 text-neutral-900 dark:text-white bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent drop-shadow-lg">
          Principles
        </h2>
        <div className="flex flex-col md:flex-row gap-10 justify-center">
          <div className="group flex-1 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20 hover:border-orange-400/70 hover:shadow-[0_0_20px_rgba(251,146,60,0.3)] hover:shadow-orange-500/20 hover:-translate-y-2 transition-all duration-700 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/10 dark:to-amber-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div className="relative z-10 flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-amber-100 dark:from-orange-900/30 dark:to-amber-900/30 rounded-xl flex items-center justify-center flex-shrink-0 mt-1 group-hover:scale-110 transition-transform duration-300">
                <SparklesIcon className="w-6 h-6 text-orange-700 dark:text-orange-400" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-xl mb-3 text-orange-700 dark:text-orange-400 group-hover:underline underline-offset-4">Discovery in 10 Days</h4>
                <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed">Workshops, process map, prototype, and an implementation plan in two weeks or less.</p>
              </div>
            </div>
          </div>
          <div className="group flex-1 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20 hover:border-blue-400/70 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-blue-500/20 hover:-translate-y-2 transition-all duration-700 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div className="relative z-10 flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-xl flex items-center justify-center flex-shrink-0 mt-1 group-hover:scale-110 transition-transform duration-300">
                <ScaleIcon className="w-6 h-6 text-blue-700 dark:text-blue-400" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-xl mb-3 text-blue-700 dark:text-blue-400 group-hover:underline underline-offset-4">Go-Live Assurance</h4>
                <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed">UAT checklist, cut-over plan, rollback steps, and on-site/remote hand-holding until systems stabilize.</p>
              </div>
            </div>
          </div>
          <div className="group flex-1 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20 hover:border-emerald-400/70 hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-emerald-500/20 hover:-translate-y-2 transition-all duration-700 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/10 dark:to-teal-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div className="relative z-10 flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30 rounded-xl flex items-center justify-center flex-shrink-0 mt-1 group-hover:scale-110 transition-transform duration-300">
                <ShieldCheckIcon className="w-6 h-6 text-emerald-700 dark:text-emerald-400" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-xl mb-3 text-emerald-700 dark:text-emerald-400 group-hover:underline underline-offset-4">Change Without Chaos</h4>
                <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed">Small, certain releases. Feature flags and clear acceptance criteria keep momentum without disruption.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Service Card - Below principles, compact size */}
      {serviceCard && (
        <div className="max-w-5xl w-full mb-16 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 lg:p-8 border border-white/20 hover:border-blue-400/50 hover:shadow-2xl transition-all duration-500 animate-fade-in-up animation-delay-800">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4 text-blue-700 dark:text-blue-400">{serviceCard.title}</h2>
            <p className="text-neutral-700 dark:text-neutral-300 mb-6 text-base leading-relaxed max-w-3xl mx-auto">{serviceCard.description}</p>
            {serviceCard.features?.length > 0 && (
              <div className="grid grid-cols-1 gap-4 mb-6">
                {serviceCard.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg">
                    <svg className="w-4 h-4 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">{feature}</span>
                  </div>
                ))}
              </div>
            )}
            {serviceCard.buttonText && (
              <a
                href={serviceCard.buttonLink}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold px-6 py-2 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                {serviceCard.buttonText}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            )}
          </div>
        </div>
      )}

      {/* Enhanced Modal for Service Details */}
      {selectedService && (
        <div className="fixed inset-0 z-50 overflow-y-auto animate-fade-in bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-4xl w-full max-h-[90vh] overflow-y-auto bg-white/95 dark:bg-neutral-900/95 rounded-3xl shadow-2xl border border-white/20 animate-slide-in-up">
            <div className="p-6 lg:p-8">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <BoltIcon className="w-8 h-8 text-blue-700 dark:text-blue-400" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-blue-700 dark:text-blue-400">{selectedService.title}</h2>
                  </div>
                </div>
                <button
                  onClick={closeModal}
                  className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>
              <div className="prose prose-lg dark:prose-invert max-w-none mb-6">
                <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">{selectedService.fullDescription}</p>
              </div>
              
              {selectedService.features?.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-4 text-blue-700 dark:text-blue-400 flex items-center gap-2">
                    <SparklesIcon className="w-5 h-5" />
                    Features
                  </h3>
                  <ul className="space-y-3">
                    {selectedService.features.map((feature) => (
                      <li key={feature._id} className="flex items-start gap-3 p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-neutral-800/50 dark:to-neutral-700/50 rounded-xl">
                        <CheckCircleIcon className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <span className="font-semibold text-neutral-900 dark:text-white">{feature.title}:</span>
                          <p className="text-neutral-700 dark:text-neutral-300 mt-1">{feature.description}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {selectedService.technologies?.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-4 text-blue-700 dark:text-blue-400 flex items-center gap-2">
                    <BoltIcon className="w-5 h-5" />
                    Technologies
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedService.technologies.map((tech, index) => (
                      <span key={index} className="bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-full text-sm font-medium border border-blue-200 dark:border-blue-800">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {selectedService.process?.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-4 text-blue-700 dark:text-blue-400 flex items-center gap-2">
                    <ClockIcon className="w-5 h-5" />
                    Process
                  </h3>
                  <ul className="space-y-3">
                    {selectedService.process.map((step, index) => (
                      <li key={index} className="flex items-start gap-3 p-4 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-xl">
                        <div className="w-6 h-6 bg-emerald-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold text-xs">
                          {index + 1}
                        </div>
                        <span className="text-neutral-700 dark:text-neutral-300">{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {selectedService.caseStudies?.length > 0 && (
                <div>
                  <h3 className="text-xl font-bold mb-4 text-blue-700 dark:text-blue-400 flex items-center gap-2">
                    <DocumentTextIcon className="w-5 h-5" />
                    Case Studies
                  </h3>
                  <ul className="space-y-3">
                    {selectedService.caseStudies.map((study, index) => (
                      <li key={index} className="p-4 bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-xl text-neutral-700 dark:text-neutral-300">
                        {study}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}