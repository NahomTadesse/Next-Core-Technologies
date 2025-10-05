// src/services/aboutService.js
export const fetchAbout = async () => {
  const response = await fetch('https://cms-89ymw0xak-kidus2s-projects.vercel.app/api/about');
  if (!response.ok) {
    throw new Error('Failed to fetch about data');
  }
  return await response.json();
};