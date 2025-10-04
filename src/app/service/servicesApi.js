export async function getServices() {
  const response = await fetch('https://cms-phl1z345y-kidus2s-projects.vercel.app/api/services');
  const data = await response.json();
  return data.success ? data.data : [];
}