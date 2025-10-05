// lib/services/homeService.js
const API_BASE = 'https://cms-89ymw0xak-kidus2s-projects.vercel.app';

export async function fetchHomeData() {
  try {
    const response = await fetch(`${API_BASE}/api/home`);
    if (!response.ok) throw new Error('Failed to fetch home data');
    const data = await response.json();
    if (!data.success) throw new Error('Invalid response');
    return data.data;
  } catch (error) {
    console.error('Error fetching home data:', error);
    return null;
  }
}