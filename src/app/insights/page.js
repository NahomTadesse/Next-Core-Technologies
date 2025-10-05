'use client';
import { useState, useEffect } from 'react';
import { fetchInsights } from '../service/insightsService'; // Adjust the path as needed
import { fetchCards } from '../service/contactService'; // Reuse from contact service
import { XMarkIcon, BookOpenIcon, ClockIcon, TagIcon, UserIcon, EyeIcon, SparklesIcon, BoltIcon, ScaleIcon, StarIcon, LightBulbIcon, CalendarIcon } from '@heroicons/react/24/outline';

export default function Insights() {
  const [insights, setInsights] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [selectedInsight, setSelectedInsight] = useState(null);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [insightsRes, cardsRes] = await Promise.all([fetchInsights(currentPage), fetchCards()]);
        if (insightsRes.success) {
          setInsights(insightsRes.data || []);
          setTotalPages(insightsRes.totalPages || 1);
        }
        setCards(cardsRes || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const openModal = (insight) => {
    setSelectedInsight(insight);
  };

  const closeModal = () => {
    setSelectedInsight(null);
  };

  const insightCard = cards.find(card => card.type === 'insight' && card.isActive);

  if (loading) {
    return (
      <section className="w-full flex items-center justify-center min-h-screen bg-gradient-to-br from-[#e0e7ff] via-[#f0f4ff] to-[#c7d2fe] dark:from-[#0a0a23] dark:via-[#1e293b] dark:to-[#0a0a23]">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-700"></div>
      </section>
    );
  }

  return (
    <section className="w-full flex flex-col items-center px-4 pt-16 pb-24 min-h-screen bg-gradient-to-br from-[#e0e7ff] via-[#f0f4ff] to-[#c7d2fe] dark:from-[#0a0a23] dark:via-[#1e293b] dark:to-[#0a0a23] overflow-hidden">
      {/* Hero Section - Clean without typewriter */}
      <div className="max-w-5xl text-center mb-20 animate-fade-in-up relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/10 to-purple-900/10 animate-pulse opacity-30"></div>
        <h1 className="text-5xl sm:text-7xl font-extrabold mb-6 leading-tight tracking-tight text-neutral-900 dark:text-white drop-shadow-xl bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent relative z-10">
          Insights
        </h1>
        <p className="text-xl sm:text-2xl text-neutral-700 dark:text-neutral-300 mb-8 max-w-3xl mx-auto leading-relaxed relative z-10 animate-fade-in-up animation-delay-200">
          Explore our latest thoughts, guides, and stories on building reliable systems and digital transformation.
        </p>
      </div>

      {/* Insights Grid - Enhanced cards with glows, scales, and featured badge above image */}
      <div className="max-w-7xl w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mb-24 animate-fade-in-up animation-delay-200">
        {insights.map((insight, idx) => (
          <div
            key={insight._id}
            className="group relative bg-white/95 dark:bg-neutral-900/95 backdrop-blur-sm rounded-3xl shadow-2xl p-6 border border-white/20 hover:border-blue-400/70 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-blue-500/20 hover:-translate-y-2 transition-all duration-700 cursor-pointer overflow-hidden"
            style={{ animationDelay: `${idx * 150}ms` }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div className="relative mb-4">
              {insight.isFeatured && (
                <div className="absolute top-2 right-2 z-20 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg animate-bounce">
                  Featured
                </div>
              )}
              <img
                src={insight.coverImage}
                alt={insight.title}
                className="w-full h-52 object-cover rounded-xl group-hover:scale-105 transition-transform duration-700 relative z-10"
              />
            </div>
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-10 h-10 mb-4 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <BookOpenIcon className="w-5 h-5 text-blue-700 dark:text-blue-400" />
              </div>
              <h3 className="font-bold text-lg mb-3 text-blue-700 dark:text-blue-400 group-hover:underline underline-offset-4 leading-tight">
                {insight.title}
              </h3>
              <p className="text-neutral-700 dark:text-neutral-300 text-sm mb-4 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 line-clamp-2">
                {insight.excerpt}
              </p>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-4 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <ClockIcon className="w-4 h-4" />
                {insight.readTime} min read
              </p>
              <button
                onClick={() => openModal(insight)}
                className="group/btn inline-flex items-center gap-2 mt-auto bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold px-6 py-2 rounded-full shadow-lg hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-500/50 transition-all duration-300"
              >
                View Details
                <EyeIcon className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-6 mb-20 animate-fade-in-up animation-delay-400">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="group disabled:opacity-50 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-500/50 transition-all duration-300 disabled:cursor-not-allowed"
            aria-label="Previous page"
          >
            <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <span className="text-lg text-neutral-700 dark:text-neutral-300 font-medium bg-white/80 dark:bg-neutral-900/80 px-6 py-3 rounded-full shadow-md">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="group disabled:opacity-50 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-500/50 transition-all duration-300 disabled:cursor-not-allowed"
            aria-label="Next page"
          >
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}

      {/* Latest Article/How we deliver - Enhanced with icons, glows, and quote highlights */}
      <div className="max-w-6xl w-full mb-24 animate-fade-in-up animation-delay-600">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16 text-neutral-900 dark:text-white bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent drop-shadow-lg">
          Featured Reads
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="group bg-white/95 dark:bg-neutral-900/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20 hover:border-orange-400/70 hover:shadow-[0_0_20px_rgba(251,146,60,0.3)] hover:shadow-orange-500/20 hover:-translate-y-2 transition-all duration-700 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/10 dark:to-amber-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div className="relative z-10">
              <div className="w-12 h-12 mb-4 bg-gradient-to-br from-orange-100 to-amber-100 dark:from-orange-900/30 dark:to-amber-900/30 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                <LightBulbIcon className="w-6 h-6 text-orange-700 dark:text-orange-400" />
              </div>
              <h3 className="font-bold text-xl mb-3 text-orange-700 dark:text-orange-400 group-hover:underline underline-offset-4 text-center">Latest Article</h3>
              <blockquote className="text-neutral-600 dark:text-neutral-300 text-base text-center italic border-l-4 border-orange-400 pl-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
               {'"Coming soon: actionable insights and stories from our team."'}
              </blockquote>
            </div>
          </div>
          <div className="group bg-white/95 dark:bg-neutral-900/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20 hover:border-emerald-400/70 hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-emerald-500/20 hover:-translate-y-2 transition-all duration-700 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/10 dark:to-teal-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div className="relative z-10">
              <div className="w-12 h-12 mb-4 bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                <ScaleIcon className="w-6 h-6 text-emerald-700 dark:text-emerald-400" />
              </div>
              <h3 className="font-bold text-xl mb-3 text-emerald-700 dark:text-emerald-400 group-hover:underline underline-offset-4 text-center">How we deliver</h3>
              <blockquote className="text-neutral-600 dark:text-neutral-300 text-base text-center italic border-l-4 border-emerald-400 pl-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                {'"Discovery → Implementation → AMS - a clear path. Small, certain wins compound. Confidence you can defend in the boardroom."'}
              </blockquote>
            </div>
          </div>
        </div>
      </div>

      {/* Insight Card - Compact, below featured reads */}
      {insightCard && (
        <div className="max-w-5xl w-full mb-16 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 lg:p-8 border border-white/20 hover:border-blue-400/50 hover:shadow-2xl transition-all duration-500 animate-fade-in-up animation-delay-800">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4 text-blue-700 dark:text-blue-400">{insightCard.title}</h2>
            <p className="text-neutral-700 dark:text-neutral-300 mb-6 text-base leading-relaxed max-w-3xl mx-auto">{insightCard.description}</p>
            {insightCard.features?.length > 0 && (
              <div className="grid grid-cols-1 gap-4 mb-6">
                {insightCard.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg">
                    <svg className="w-4 h-4 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">{feature}</span>
                  </div>
                ))}
              </div>
            )}
            {insightCard.buttonText && (
              <a
                href={insightCard.buttonLink}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold px-6 py-2 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                {insightCard.buttonText}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            )}
          </div>
        </div>
      )}

      {/* CTA Section - Clean without typewriter */}
      <div className="max-w-4xl w-full text-center mt-16 animate-slide-in-up animation-delay-1000">
        <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-neutral-900 dark:text-white bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent drop-shadow-lg">
          Ready to turn complexity into clarity?
        </h2>
        <p className="text-lg text-neutral-600 dark:text-neutral-300 mb-4 opacity-90">
          Start with a 10-day discovery sprint - plan, prototype, estimate.
        </p>
        <a 
          href="#" 
          className="group inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white font-semibold px-10 py-4 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-500/50 transition-all duration-300 transform hover:-translate-y-1"
          aria-label="Book discovery"
        >
          Book Discovery
          <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </div>

      {/* Enhanced Modal for Insight Details - With animated tags */}
      {selectedInsight && (
        <div className="fixed inset-0 z-50 overflow-y-auto animate-fade-in bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-4xl w-full max-h-[90vh] overflow-y-auto bg-white/95 dark:bg-neutral-900/95 rounded-3xl shadow-2xl border border-white/20 animate-slide-in-up">
            <div className="p-6 lg:p-8">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <BookOpenIcon className="w-8 h-8 text-blue-700 dark:text-blue-400" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-blue-700 dark:text-blue-400">{selectedInsight.title}</h2>
                  </div>
                </div>
                <button
                  onClick={closeModal}
                  className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>
              <img
                src={selectedInsight.coverImage}
                alt={selectedInsight.title}
                className="w-full h-80 object-cover rounded-2xl mb-8 shadow-xl"
              />
              <div className="prose prose-lg dark:prose-invert max-w-none mb-8">
                <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">{selectedInsight.excerpt}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 text-neutral-700 dark:text-neutral-300">
                <div className="space-y-4">
                  <p className="flex items-center gap-2"><UserIcon className="w-5 h-5 text-blue-600" /><strong className="text-blue-600 dark:text-blue-400">Author:</strong> {selectedInsight.author.username}</p>
                  <p className="flex items-center gap-2"><TagIcon className="w-5 h-5 text-blue-600" /><strong className="text-blue-600 dark:text-blue-400">Category:</strong> {selectedInsight.category}</p>
                  <div className="flex items-center gap-2">
                    <TagIcon className="w-5 h-5 text-blue-600" />
                    <strong className="text-blue-600 dark:text-blue-400">Tags:</strong>
                    <div className="flex flex-wrap gap-2 ml-2">
                      {selectedInsight.tags.map((tag, idx) => (
                        <span key={idx} className="bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-sm font-medium animate-bounce" style={{ animationDelay: `${idx * 100}ms` }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <p className="flex items-center gap-2"><ClockIcon className="w-5 h-5 text-blue-600" /><strong className="text-blue-600 dark:text-blue-400">Read Time:</strong> {selectedInsight.readTime} minutes</p>
                  <p className="flex items-center gap-2"><EyeIcon className="w-5 h-5 text-blue-600" /><strong className="text-blue-600 dark:text-blue-400">Views:</strong> {selectedInsight.views}</p>
                  <p className="flex items-center gap-2"><StarIcon className="w-5 h-5 text-blue-600" /><strong className="text-blue-600 dark:text-blue-400">Featured:</strong> {selectedInsight.isFeatured ? 'Yes' : 'No'}</p>
                  <p className="flex items-center gap-2"><CalendarIcon className="w-5 h-5 text-blue-600" /><strong className="text-blue-600 dark:text-blue-400">Published At:</strong> {new Date(selectedInsight.publishedAt).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="pt-6 border-t border-neutral-200 dark:border-neutral-700 space-y-4">
                <p className="flex items-center gap-2"><SparklesIcon className="w-5 h-5 text-blue-600" /><strong className="text-blue-600 dark:text-blue-400">Meta Title:</strong> {selectedInsight.metaTitle}</p>
                <p className="flex items-center gap-2"><BoltIcon className="w-5 h-5 text-blue-600" /><strong className="text-blue-600 dark:text-blue-400">Meta Description:</strong> {selectedInsight.metaDescription}</p>
              </div>
              <div className="pt-6 border-t border-neutral-200 dark:border-neutral-700 flex justify-end">
                <button
                  onClick={closeModal}
                  className="group inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-500/50 transition-all duration-300"
                >
                  Close
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}