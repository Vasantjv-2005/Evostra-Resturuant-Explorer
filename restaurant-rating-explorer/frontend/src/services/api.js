const API_BASE_URL = import.meta.env.VITE_API_URL || '';

async function apiRequest(path) {
  const primaryUrl = `${API_BASE_URL}${path}`;
  try {
    const response = await fetch(primaryUrl);
    if (!response.ok) {
      throw new Error(`Server returned HTTP ${response.status}: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    // If relative fetch failed and no explicit base URL was specified, fallback directly to http://localhost:5000
    if (!API_BASE_URL) {
      try {
        const fallbackResponse = await fetch(`http://localhost:5000${path}`);
        if (fallbackResponse.ok) {
          return await fallbackResponse.json();
        }
      } catch (fallbackError) {
        // preserve original error
      }
    }
    throw error;
  }
}

/**
 * Fetch all restaurants with rating summaries and cuisines
 */
export async function fetchRestaurants() {
  try {
    const result = await apiRequest('/api/restaurants');
    return result.data || [];
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    throw error;
  }
}

/**
 * Fetch detailed profile for a single restaurant by place_id
 */
export async function fetchRestaurantDetails(placeId) {
  try {
    const result = await apiRequest(`/api/restaurants/${placeId}`);
    return result.data;
  } catch (error) {
    console.error(`Error fetching restaurant details for place_id ${placeId}:`, error);
    throw error;
  }
}

/**
 * Fetch cuisines metadata with restaurant counts
 */
export async function fetchCuisines() {
  try {
    const result = await apiRequest('/api/cuisines');
    return result.data || [];
  } catch (error) {
    console.error('Error fetching cuisines:', error);
    return [];
  }
}

/**
 * Fetch overall platform stats (total restaurants, ratings, cities, cuisines)
 */
export async function fetchPlatformStats() {
  try {
    const result = await apiRequest('/api/stats');
    return result.data || null;
  } catch (error) {
    console.error('Error fetching platform stats:', error);
    return null;
  }
}
