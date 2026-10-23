/**
 * Surveyed Cities Helper
 * Grounded in CENIDET research dataset geographic coordinates:
 * - San Luis Potosí, SLP (approx. 22.15° N, 100.98° W) -> 84 restaurants
 * - Cuernavaca, Morelos (approx. 18.92° N, 99.23° W) -> 23 restaurants
 * - Ciudad Victoria, Tamaulipas (approx. 23.73° N, 99.14° W) -> 23 restaurants
 * Total: 130 restaurants across 3 surveyed metropolitan regions.
 */

export function getCanonicalCity(restaurant) {
  if (!restaurant) return 'Unknown';

  const lat = Number(restaurant.latitude);
  const city = (restaurant.city || '').trim().toLowerCase();
  const state = (restaurant.state || '').trim().toLowerCase();

  // 1. Geographic Ground Truth via Latitude
  if (lat >= 21.0 && lat <= 22.8) return 'San Luis Potosí';
  if (lat >= 18.0 && lat <= 19.8) return 'Cuernavaca';
  if (lat >= 23.0 && lat <= 24.8) return 'Ciudad Victoria';

  // 2. Fallback via String Matching
  if (
    city.includes('luis') ||
    city === 'slp' ||
    city === 's.l.p.' ||
    city === 's.l.p' ||
    city.includes('soledad') ||
    state.includes('slp') ||
    state.includes('san luis')
  ) {
    return 'San Luis Potosí';
  }

  if (
    city.includes('cuernavaca') ||
    city.includes('jiutepec') ||
    state.includes('morelos')
  ) {
    return 'Cuernavaca';
  }

  if (
    city.includes('victoria') ||
    state.includes('tamaulipas')
  ) {
    return 'Ciudad Victoria';
  }

  return restaurant.city || 'Other';
}

export function matchesCity(restaurant, selectedCity) {
  if (!selectedCity || selectedCity === 'ALL') return true;

  const canonical = getCanonicalCity(restaurant);
  const sel = selectedCity.trim().toLowerCase();

  if (
    sel.includes('luis') ||
    sel === 'slp' ||
    sel === 's.l.p.' ||
    sel === 's.l.p' ||
    sel.includes('soledad')
  ) {
    return canonical === 'San Luis Potosí';
  }

  if (sel.includes('cuernavaca') || sel.includes('jiutepec')) {
    return canonical === 'Cuernavaca';
  }

  if (sel.includes('victoria')) {
    return canonical === 'Ciudad Victoria';
  }

  return (
    canonical.toLowerCase() === sel ||
    (restaurant.city && restaurant.city.toLowerCase() === sel)
  );
}
