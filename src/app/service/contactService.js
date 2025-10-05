// lib/services/contactService.js
const API_BASE = 'https://cms-89ymw0xak-kidus2s-projects.vercel.app';
const SUBMIT_URL = 'https://cms-89ymw0xak-kidus2s-projects.vercel.app/api/contacts/submit';


export async function fetchCompanyInfo() {
  try {
    const response = await fetch(`${API_BASE}/api/contacts/company`);
    if (!response.ok) throw new Error('Failed to fetch company info');
    const data = await response.json();
    if (!data.success) throw new Error('Invalid response');
    return data.data;
  } catch (error) {
    console.error('Error fetching company info:', error);
    return null;
  }
}

export async function fetchCards() {
  try {
    const response = await fetch(`${API_BASE}/api/cards`); // Note: Original has double slash, but fixed here
    if (!response.ok) throw new Error('Failed to fetch cards');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching cards:', error);
    return [];
  }
}

export async function submitContactForm(formData) {
  try {
    const response = await fetch(SUBMIT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${AUTH_TOKEN}`,
      },
      body: JSON.stringify(formData),
    });
    if (!response.ok) throw new Error('Failed to submit form');
    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error('Error submitting form:', error);
    return { success: false, error: error.message };
  }
}