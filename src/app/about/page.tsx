"use client"

import { useState, useEffect, JSXElementConstructor, ReactElement, ReactNode, ReactPortal } from 'react';
import { fetchAbout } from '../service/aboutService';
import { fetchCards } from '../service/contactService'; // Reuse from contact service
import { XMarkIcon, StarIcon, UsersIcon, DocumentTextIcon, ChatBubbleLeftIcon, BuildingOfficeIcon, LightBulbIcon, HeartIcon } from '@heroicons/react/24/outline';

export default function About() {

 
  const [loading, setLoading] = useState(true);
interface Card {
  type: string;
  isActive: boolean;
  title?: string;
  description?: string;
  features?: string[];
  buttonText?: string;
  buttonLink?: string;
}
interface AboutData {
  heroImage: string;
  heroTitle: string;
  heroSubtitle: string;
  tagline: string;
  story: string;
  mission: string;
  vision: string;
  values: {
    _id: string;
    icon: string;
    title: string;
    description: string;
  }[];
  achievements: {
    _id: string;
    number: number;
    suffix?: string;
    label: string;
  }[];
  projectsCompleted: number;
  employeesCount: number;
  ctaTitle: string;
  ctaDescription: string;
  ctaButtonText: string;
  ctaButtonLink: string;
}
const [aboutData, setAboutData] = useState<AboutData | null>(null);

const [cards, setCards] = useState<Card[]>([]);
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [aboutRes, cardsRes] = await Promise.all([fetchAbout(), fetchCards()]);
        if (aboutRes.success) {
          setAboutData(aboutRes.data);
        }
        setCards(cardsRes || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) {
    return (
      <section className="w-full flex items-center justify-center min-h-screen bg-gradient-to-br from-[#e0e7ff] via-[#f0f4ff] to-[#c7d2fe] dark:from-[#0a0a23] dark:via-[#1e293b] dark:to-[#0a0a23]">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-700"></div>
      </section>
    );
  }

  if (!aboutData) {
    return (
      <section className="w-full flex flex-col items-center px-4 pt-16 pb-24 min-h-screen bg-gradient-to-br from-[#e0e7ff] via-[#f0f4ff] to-[#c7d2fe] dark:from-[#0a0a23] dark:via-[#1e293b] dark:to-[#0a0a23]">
        <div className="text-center text-xl text-neutral-700 dark:text-neutral-300">Failed to load data.</div>
      </section>
    );
  }

  const aboutCard = cards.find(card => card.type === 'about' && card.isActive);

  // // Icon mapping for values (extend as needed; fallback to text/emoji)
  // const getValueIcon = (icon: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined) => {
  //   const icons = {
  //     star: <StarIcon className="w-6 h-6" />,
  //     users: <UsersIcon className="w-6 h-6" />,
  //     document: <DocumentTextIcon className="w-6 h-6" />,
  //     chat: <ChatBubbleLeftIcon className="w-6 h-6" />,
  //     building: <BuildingOfficeIcon className="w-6 h-6" />,
  //     lightbulb: <LightBulbIcon className="w-6 h-6" />,
  //     heart: <HeartIcon className="w-6 h-6" />,
  //   };
  //   return icons[icon] || <span className="text-xl">{icon}</span>; // Fallback to original emoji/text
  // };

  const getValueIcon = (icon: string) => {
  const icons: Record<string, React.ReactNode> = {
    star: <StarIcon className="w-6 h-6" />,
    users: <UsersIcon className="w-6 h-6" />,
    document: <DocumentTextIcon className="w-6 h-6" />,
    chat: <ChatBubbleLeftIcon className="w-6 h-6" />,
    building: <BuildingOfficeIcon className="w-6 h-6" />,
    lightbulb: <LightBulbIcon className="w-6 h-6" />,
    heart: <HeartIcon className="w-6 h-6" />,
  };

  return icons[icon] || <span className="text-xl">{icon}</span>; // fallback
};

  return (
    <section className="w-full flex flex-col items-center px-4 pt-16 pb-24 min-h-screen bg-gradient-to-br from-[#e0e7ff] via-[#f0f4ff] to-[#c7d2fe] dark:from-[#0a0a23] dark:via-[#1e293b] dark:to-[#0a0a23] overflow-hidden">
      {/* Hero Section - Enhanced with subtle parallax effect via bg-fixed (if image supports) */}
      <div className="relative w-full max-w-7xl mb-20 animate-fade-in-up">
        <img
          src={aboutData.heroImage}
          alt="Hero"
          className="w-full h-96 lg:h-[500px] object-cover rounded-3xl shadow-2xl brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent rounded-3xl flex flex-col items-center justify-center text-center p-8">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-purple-900/20 animate-pulse"></div>
          <div className="relative z-10">
            <h1 className="text-4xl sm:text-6xl font-extrabold mb-6 leading-tight tracking-tight text-white drop-shadow-2xl bg-gradient-to-r from-blue-300 via-white to-purple-300 bg-clip-text text-transparent animate-slide-in-up animation-delay-200">
              {aboutData.heroTitle}
            </h1>
            <p className="text-xl sm:text-2xl text-white/95 max-w-4xl mx-auto leading-relaxed animate-slide-in-up animation-delay-400">
              {aboutData.heroSubtitle}
            </p>
          </div>
        </div>
      </div>

      {/* Company Story and Mission - Enhanced with subtle border glow on hover */}
      <div className="max-w-6xl w-full text-center mb-24 animate-fade-in-up animation-delay-200">
        <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-neutral-900 dark:text-white bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent drop-shadow-lg">
          {aboutData.tagline}
        </h2>
        <p className="text-lg text-neutral-600 dark:text-neutral-300 mb-12 leading-relaxed max-w-4xl mx-auto opacity-90">
          {aboutData.story}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="group bg-white/95 dark:bg-neutral-900/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20 hover:border-blue-400/70 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-blue-500/20 hover:-translate-y-2 transition-all duration-700 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div className="relative z-10">
              <h3 className="font-bold text-2xl mb-6 text-blue-700 dark:text-blue-400 flex items-center justify-center gap-2">
                <svg className="w-6 h-6 text-blue-700 dark:text-blue-400 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Our Mission
              </h3>
              <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed">{aboutData.mission}</p>
            </div>
          </div>
          <div className="group bg-white/95 dark:bg-neutral-900/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20 hover:border-purple-400/70 hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:shadow-purple-500/20 hover:-translate-y-2 transition-all duration-700 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/10 dark:to-indigo-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div className="relative z-10">
              <h3 className="font-bold text-2xl mb-6 text-purple-700 dark:text-purple-400 flex items-center justify-center gap-2">
                <svg className="w-6 h-6 text-purple-700 dark:text-purple-400 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Our Vision
              </h3>
              <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed">{aboutData.vision}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section - Enhanced with glow and micro-animations */}
      <div className="max-w-7xl w-full mb-24 animate-fade-in-up animation-delay-400">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16 text-neutral-900 dark:text-white bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent drop-shadow-lg">
          Our Values
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {aboutData.values.map((value, idx) => (
            <div
              key={value._id}
              className="group bg-white/95 dark:bg-neutral-900/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 flex flex-col items-center border border-white/20 hover:border-blue-400/70 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-blue-500/20 hover:-translate-y-2 transition-all duration-700 cursor-pointer overflow-hidden relative"
              style={{ animationDelay: `${idx * 150}ms` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="relative z-10 w-16 h-16 mb-6 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                {getValueIcon(value.icon)}
              </div>
              <h3 className="font-bold text-xl mb-4 text-blue-700 dark:text-blue-400 group-hover:underline underline-offset-4 text-center">
                {value.title}
              </h3>
              <p className="text-neutral-600 dark:text-neutral-300 text-center leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements Section - Compact with counter animation (simulated via Tailwind) */}
      <div className="max-w-7xl w-full mb-16 py-16 bg-white/60 dark:bg-neutral-900/40 rounded-3xl backdrop-blur-sm animate-fade-in-up animation-delay-600">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-neutral-900 dark:text-white bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent drop-shadow-lg">
          Our Achievements
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {aboutData.achievements.map((achievement, idx) => (
            <div
              key={achievement._id}
              className="group bg-white/95 dark:bg-neutral-900/95 backdrop-blur-sm rounded-3xl shadow-2xl p-6 border border-white/20 hover:border-blue-400/50 hover:shadow-blue-500/20 hover:-translate-y-2 transition-all duration-700 text-center"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="w-12 h-12 mb-4 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <StarIcon className="w-6 h-6 text-blue-700 dark:text-blue-400" />
              </div>
              <h3 className="text-3xl lg:text-4xl font-extrabold text-blue-700 dark:text-blue-400 mb-2 animate-pulse">
                {achievement.number}{achievement.suffix}
              </h3>
              <p className="text-neutral-600 dark:text-neutral-300 text-base font-medium">
                {achievement.label}
              </p>
            </div>
          ))}
          <div className="group bg-white/95 dark:bg-neutral-900/95 backdrop-blur-sm rounded-3xl shadow-2xl p-6 border border-white/20 hover:border-green-400/50 hover:shadow-green-500/20 hover:-translate-y-2 transition-all duration-700 text-center">
            <div className="w-12 h-12 mb-4 bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <DocumentTextIcon className="w-6 h-6 text-green-700 dark:text-green-400" />
            </div>
            <h3 className="text-3xl lg:text-4xl font-extrabold text-green-700 dark:text-green-400 mb-2 animate-pulse">
              {aboutData.projectsCompleted}+
            </h3>
            <p className="text-neutral-600 dark:text-neutral-300 text-base font-medium">Projects Completed</p>
          </div>
          <div className="group bg-white/95 dark:bg-neutral-900/95 backdrop-blur-sm rounded-3xl shadow-2xl p-6 border border-white/20 hover:border-purple-400/50 hover:shadow-purple-500/20 hover:-translate-y-2 transition-all duration-700 text-center">
            <div className="w-12 h-12 mb-4 bg-gradient-to-br from-purple-100 to-indigo-100 dark:from-purple-900/30 dark:to-indigo-900/30 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <UsersIcon className="w-6 h-6 text-purple-700 dark:text-purple-400" />
            </div>
            <h3 className="text-3xl lg:text-4xl font-extrabold text-purple-700 dark:text-purple-400 mb-2 animate-pulse">
              {aboutData.employeesCount}+
            </h3>
            <p className="text-neutral-600 dark:text-neutral-300 text-base font-medium">Team Members</p>
          </div>
        </div>
      </div>

      {/* About Card - Smaller size, positioned below achievements */}
      {aboutCard && (
        <div className="max-w-5xl w-full mb-16 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 lg:p-8 border border-white/20 hover:border-blue-400/50 hover:shadow-2xl transition-all duration-500 animate-fade-in-up animation-delay-800">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4 text-blue-700 dark:text-blue-400">{aboutCard.title}</h2>
            <p className="text-neutral-700 dark:text-neutral-300 mb-6 text-base leading-relaxed max-w-3xl mx-auto">{aboutCard.description}</p>
            {aboutCard.features && aboutCard.features.length > 0 && (
              <div className="grid grid-cols-1 gap-4 mb-6">
                {aboutCard.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg">
                    <svg className="w-4 h-4 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">{feature}</span>
                  </div>
                ))}
              </div>
            )}
            {aboutCard.buttonText && (
              <a
                href={aboutCard.buttonLink}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold px-6 py-2 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                {aboutCard.buttonText}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            )}
          </div>
        </div>
      )}

      {/* CTA Section - Enhanced with ring focus and lift */}
      <div className="max-w-4xl w-full text-center mt-16 animate-slide-in-up animation-delay-1000">
        <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-neutral-900 dark:text-white bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent drop-shadow-lg">
          {aboutData.ctaTitle}
        </h2>
        <p className="text-lg text-neutral-600 dark:text-neutral-300 mb-8 leading-relaxed max-w-3xl mx-auto opacity-90">
          {aboutData.ctaDescription}
        </p>
        <a
          href={aboutData.ctaButtonLink}
          className="group inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white font-semibold px-10 py-4 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300/50 transition-all duration-500 transform hover:-translate-y-1"
        >
          {aboutData.ctaButtonText}
          <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </div>
    </section>
  );
}