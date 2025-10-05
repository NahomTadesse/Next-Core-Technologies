

'use client'
import { useState, useEffect } from 'react';
import { fetchHomeData } from './service/homeService';
import { fetchCards } from './service/contactService'; // Reuse from contact service
import { XMarkIcon, UserGroupIcon, CodeBracketIcon, DocumentTextIcon, ChatBubbleLeftIcon } from '@heroicons/react/24/outline'; // Assuming Heroicons installed

export default function Home() {
  const [homeData, setHomeData] = useState(null);
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedService, setSelectedService] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const [homeRes, cardsRes] = await Promise.all([fetchHomeData(), fetchCards()]);
      setHomeData(homeRes);
      setCards(cardsRes || []);
      setLoading(false);
    };
    loadData();
  }, []);

  const openModal = (service) => {
    setSelectedService(service);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedService(null);
  };

  const homeCard = cards.find(card => card.type === 'home' && card.isActive);

  if (loading) {
    return (
      <section className="w-full flex items-center justify-center min-h-screen bg-gradient-to-br from-[#e0e7ff] via-[#f0f4ff] to-[#c7d2fe] dark:from-[#0a0a23] dark:via-[#1e293b] dark:to-[#0a0a23]">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-700"></div>
      </section>
    );
  }

  // Icon mapping for services (extend as needed)
  const getServiceIcon = (iconName) => {
    const icons = {
      mobile: <ChatBubbleLeftIcon className="w-6 h-6" />,
      // Add more: web: <GlobeAltIcon />, etc.
    };
    return icons[iconName] || <CodeBracketIcon className="w-6 h-6" />;
  };

  // Stat icons
  const getStatIcon = (key) => {
    const icons = {
      projects: <DocumentTextIcon className="w-8 h-8 mx-auto mb-2 text-blue-700 dark:text-blue-400" />,
      services: <CodeBracketIcon className="w-8 h-8 mx-auto mb-2 text-blue-700 dark:text-blue-400" />,
      blogPosts: <ChatBubbleLeftIcon className="w-8 h-8 mx-auto mb-2 text-blue-700 dark:text-blue-400" />,
      happyClients: <UserGroupIcon className="w-8 h-8 mx-auto mb-2 text-blue-700 dark:text-blue-400" />,
    };
    return icons[key] || <DocumentTextIcon className="w-8 h-8 mx-auto mb-2 text-blue-700 dark:text-blue-400" />;
  };

  return (
    <section className="w-full flex flex-col items-center px-4 pt-16 pb-24 min-h-screen bg-gradient-to-br from-[#e0e7ff] via-[#f0f4ff] to-[#c7d2fe] dark:from-[#0a0a23] dark:via-[#1e293b] dark:to-[#0a0a23]">
      {/* Hero Section - Enhanced with animations */}
      <div className="max-w-5xl text-center mb-20 animate-fade-in-up">
        <h1 className="text-5xl sm:text-7xl font-extrabold mb-6 leading-tight tracking-tight text-neutral-900 dark:text-white drop-shadow-xl bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent">
          {homeData?.hero?.title || 'Welcome to Our Platform'}
        </h1>
        {homeData?.hero?.subtitle && (
          <p className="text-2xl sm:text-3xl font-semibold mb-4 text-blue-700 dark:text-blue-400 animate-fade-in-up animation-delay-200">
            {homeData.hero.subtitle}
          </p>
        )}
        <p className="text-xl sm:text-2xl text-neutral-700 dark:text-neutral-300 mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in-up animation-delay-400">
          {homeData?.hero?.description || 'We create innovative solutions that drive business growth and deliver exceptional user experiences.'}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8 animate-fade-in-up animation-delay-600">
          <a 
            href={homeData?.hero?.primaryButton?.link || '#'} 
            className="group bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-full font-semibold shadow-xl hover:shadow-2xl hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300 transform hover:-translate-y-1"
          >
            <span className="flex items-center gap-2">
              {homeData?.hero?.primaryButton?.text || 'Get Started'}
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </a>
          <a 
            href={homeData?.hero?.secondaryButton?.link || '#'} 
            className="group bg-white/80 dark:bg-neutral-900/80 backdrop-blur-sm border border-blue-700 text-blue-700 px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300 dark:border-blue-400 dark:text-blue-300"
          >
            {homeData?.hero?.secondaryButton?.text || 'View Our Work'}
          </a>
        </div>
      </div>

      {/* Home Card if exists - Enhanced styling */}
      {homeCard && (
        <div className="max-w-6xl w-full mb-20 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 lg:p-12 border border-white/20 hover:border-blue-400/50 hover:shadow-blue-500/10 transition-all duration-500 animate-slide-in-up">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6 text-blue-700 dark:text-blue-400">{homeCard.title}</h2>
            <p className="text-neutral-700 dark:text-neutral-300 mb-8 text-lg leading-relaxed max-w-4xl mx-auto">{homeCard.description}</p>
            {homeCard.features?.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {homeCard.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl">
                    <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">{feature}</span>
                  </div>
                ))}
              </div>
            )}
            {homeCard.buttonText && (
              <a
                href={homeCard.buttonLink}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                {homeCard.buttonText}
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            )}
          </div>
        </div>
      )}

      {/* Services Section - Enhanced cards with modal trigger */}
      {homeData?.services?.allServices?.length > 0 && (
        <div className="max-w-7xl w-full mb-24">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-neutral-900 dark:text-white bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent">
              {homeData.services.title || 'Our Services'}
            </h2>
            <p className="text-xl text-neutral-700 dark:text-neutral-300 max-w-2xl mx-auto">
              {homeData.services.subtitle || 'What we can do for you'}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {homeData.services.allServices.map((service, idx) => (
              <div
                key={service._id}
                className="group bg-white/95 dark:bg-neutral-900/95 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/20 hover:border-blue-400/50 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 cursor-pointer overflow-hidden relative"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10 flex flex-col items-center text-center">
                  {service.icon && (
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      {getServiceIcon(service.icon)}
                    </div>
                  )}
                  <h3 className="font-bold text-xl mb-4 text-blue-700 dark:text-blue-400 group-hover:underline underline-offset-4">
                    {service.title}
                  </h3>
                  <p className="text-neutral-700 dark:text-neutral-300 mb-6 leading-relaxed">{service.shortDescription}</p>
                  {service.features?.length > 0 && (
                    <ul className="text-neutral-600 dark:text-neutral-400 text-sm space-y-2 mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {service.features.slice(0, 3).map((feature, fIdx) => (
                        <li key={fIdx} className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  )}
                  <button
                    onClick={() => openModal(service)}
                    className="group/btn inline-flex items-center gap-2 text-blue-700 dark:text-blue-400 font-semibold hover:text-blue-900 dark:hover:text-blue-300 transition-colors duration-200 underline underline-offset-2"
                  >
                    Learn More
                    <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Stats Section - With icons and animations */}
      {homeData?.stats && (
        <div className="max-w-6xl w-full mb-24 py-16 bg-white/50 dark:bg-neutral-900/30 rounded-3xl backdrop-blur-sm animate-fade-in-up">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {Object.entries(homeData.stats).map(([key, value]) => (
              <div key={key} className="group bg-white/80 dark:bg-neutral-900/80 rounded-2xl shadow-lg p-6 border border-white/20 hover:border-blue-400/50 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                {getStatIcon(key)}
                <p className="text-3xl font-bold text-blue-700 dark:text-blue-400 mb-2 animate-pulse">{value}</p>
                <p className="text-neutral-700 dark:text-neutral-300 capitalize text-sm font-medium">
                  {key.replace(/([A-Z])/g, ' $1').trim() || 'Stat'}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Call to Action Section - Enhanced gradient */}
      {homeData?.cta && (
        <div className="max-w-4xl w-full text-center py-16 rounded-3xl bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white shadow-2xl mb-12 animate-slide-in-up">
          <h2 className="text-4xl font-bold mb-6 drop-shadow-lg">
            {homeData.cta.title || 'Ready to Start Your Project?'}
          </h2>
          <p className="text-xl mb-8 leading-relaxed opacity-95">
            {homeData.cta.description || "Let's work together to bring your ideas to life"}
          </p>
          <a
            href={homeData.cta.buttonLink || '#'}
            className="inline-flex items-center gap-2 bg-white text-blue-700 font-semibold px-10 py-4 rounded-full shadow-lg hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-4 focus:ring-white/30 transition-all duration-300"
          >
            {homeData.cta.buttonText || 'Contact Us'}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      )}

      {/* Modal for Service Details */}
      {showModal && selectedService && (
        <div className="fixed inset-0 z-50 overflow-y-auto animate-fade-in bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-2xl w-full max-h-[90vh] overflow-y-auto bg-white/95 dark:bg-neutral-900/95 rounded-3xl shadow-2xl border border-white/20 animate-slide-in-up">
            <div className="p-6 lg:p-8">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-3">
                  {selectedService.icon && (
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      {getServiceIcon(selectedService.icon)}
                    </div>
                  )}
                  <div>
                    <h3 className="text-2xl font-bold text-blue-700 dark:text-blue-400">{selectedService.title}</h3>
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
                <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">{selectedService.description}</p>
              </div>
              {selectedService.features?.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">Key Features</h4>
                  <ul className="space-y-3">
                    {selectedService.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-neutral-800/50 rounded-xl">
                        <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-neutral-700 dark:text-neutral-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {selectedService.buttonLink && (
                <div className="pt-4 border-t border-neutral-200 dark:border-neutral-700">
                  <a
                    href={selectedService.buttonLink}
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                  >
                    Get Started
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Placeholder Sections (if data available in future) */}
      {homeData?.featuredProducts?.items?.length > 0 && (
        <div className="max-w-6xl w-full mb-20">
          {/* Render featured products similarly to services */}
        </div>
      )}
      {homeData?.about?.items?.length > 0 && (
        <div className="max-w-6xl w-full mb-20">
          {/* Render about items */}
        </div>
      )}
      {homeData?.insights?.items?.length > 0 && (
        <div className="max-w-6xl w-full mb-20">
          {/* Render insights/blog posts */}
        </div>
      )}
    </section>
  );
}