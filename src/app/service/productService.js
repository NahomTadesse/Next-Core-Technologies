

export const fetchProducts = async (page = 1) => {
  try {
    const response = await fetch(
      `https://cms-89ymw0xak-kidus2s-projects.vercel.app/api/products`,
      {
        method: 'GET',
        headers: {
          'Accept': '*/*',
        
        },
      }
    );
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    return await response.json();
  } catch (error) {
    console.error('Fetch products error:', error);
    throw error;
  }
};