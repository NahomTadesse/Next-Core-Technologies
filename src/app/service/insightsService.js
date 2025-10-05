// src/services/insightsService.js
export const fetchInsights = async (page = 1, limit = 8) => {
  const url = `https://cms-89ymw0xak-kidus2s-projects.vercel.app/api/insights?page=${page}&limit=${limit}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch insights');
  }
  return await response.json();
};