/**
 * High-quality editorial culinary photography mapped by cuisine genre.
 * Photos are curated from Unsplash hospitality collections with clean aesthetic lighting.
 */
const CUISINE_IMAGE_COLLECTIONS = {
    Mexican: [
        'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1504544750208-dc0358e63f7f?auto=format&fit=crop&w=800&q=80'
    ],
    Bar: [
        'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=800&q=80'
    ],
    Bar_Pub_Brewery: [
        'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1584225064785-c62a8b43d148?auto=format&fit=crop&w=800&q=80'
    ],
    Cafeteria: [
        'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80'
    ],
    Fast_Food: [
        'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80'
    ],
    Italian: [
        'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1579684947550-22e945225d9a?auto=format&fit=crop&w=800&q=80'
    ],
    Pizzeria: [
        'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=80'
    ],
    Seafood: [
        'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1535400255456-984241443b29?auto=format&fit=crop&w=800&q=80'
    ],
    Japanese: [
        'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1611143669185-af224c5e3252?auto=format&fit=crop&w=800&q=80'
    ],
    Burgers: [
        'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=800&q=80'
    ],
    International: [
        'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=80'
    ],
    Contemporary: [
        'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=800&q=80'
    ],
    Default: [
        'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=800&q=80'
    ]
};

/**
 * Deterministically pick an editorial food image for a restaurant based on its primary cuisine and place_id
 */
export function getRestaurantImage(restaurant) {
    if (!restaurant) return CUISINE_IMAGE_COLLECTIONS.Default[0];
    
    const cuisines = Array.isArray(restaurant.cuisines) && restaurant.cuisines.length > 0 
        ? restaurant.cuisines 
        : [];
    
    // Look for a matching cuisine collection
    let pool = CUISINE_IMAGE_COLLECTIONS.Default;
    for (const c of cuisines) {
        if (CUISINE_IMAGE_COLLECTIONS[c]) {
            pool = CUISINE_IMAGE_COLLECTIONS[c];
            break;
        }
    }

    const idNum = Number(restaurant.place_id) || 135000;
    const index = Math.abs(idNum) % pool.length;
    return pool[index];
}

/**
 * Editorial cuisine card banner
 */
export function getCuisineImage(cuisineName) {
    const pool = CUISINE_IMAGE_COLLECTIONS[cuisineName] || CUISINE_IMAGE_COLLECTIONS.Default;
    return pool[0];
}
