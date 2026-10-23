import React, { useState, useEffect, useMemo, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TopRated from './components/TopRated';
import CuisineSection from './components/CuisineSection';
import FilterBar from './components/FilterBar';
import RestaurantGrid from './components/RestaurantGrid';
import RestaurantDetails from './components/RestaurantDetails';
import Footer from './components/Footer';
import { fetchRestaurants, fetchCuisines, fetchPlatformStats } from './services/api';
import { matchesCity, getCanonicalCity } from './utils/cityHelper';

export default function App() {
  const [restaurants, setRestaurants] = useState([]);
  const [cuisines, setCuisines] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters & Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('ALL');
  const [selectedPrice, setSelectedPrice] = useState('ALL');
  const [selectedRatingTier, setSelectedRatingTier] = useState('ALL');
  const [selectedCuisine, setSelectedCuisine] = useState('ALL');
  const [sortBy, setSortBy] = useState('name_asc');

  // Modal detail view state
  const [selectedPlaceId, setSelectedPlaceId] = useState(null);

  // Reference for focusing search input
  const searchInputRef = useRef(null);

  // Initial Data Fetch
  const loadInitialData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [restData, cuisData, statsData] = await Promise.all([
        fetchRestaurants(),
        fetchCuisines(),
        fetchPlatformStats(),
      ]);

      setRestaurants(restData);
      setCuisines(cuisData);
      setStats(statsData);
      setLoading(false);
    } catch (err) {
      console.error('Initialization error:', err);
      setError('Could not connect to the restaurant database API. Please ensure the backend is running at http://localhost:5000.');
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInitialData();
  }, []);

  // Keyboard shortcut listener: press '/' to focus search input
  useEffect(() => {
    const handleGlobalKeyDown = (e) => {
      if (
        e.key === '/' &&
        document.activeElement.tagName !== 'INPUT' &&
        document.activeElement.tagName !== 'TEXTAREA'
      ) {
        e.preventDefault();
        if (searchInputRef.current) {
          searchInputRef.current.focus();
          searchInputRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  // Deduplicate and format cities for filter dropdown
  const cities = useMemo(() => {
    const citySet = new Set();
    restaurants.forEach((r) => {
      if (r.city && r.city.trim() !== '' && r.city !== '?') {
        citySet.add(r.city.trim());
      }
    });
    return Array.from(citySet).sort();
  }, [restaurants]);

  // Featured top restaurant for hero showcase
  const featuredRestaurant = useMemo(() => {
    if (!restaurants || restaurants.length === 0) return null;
    const sorted = [...restaurants].filter(
      (r) => r.avg_overall_rating && Number(r.avg_overall_rating) >= 1.5
    );
    return sorted.length > 0 ? sorted[0] : restaurants[0];
  }, [restaurants]);

  // Filter and sort restaurants
  const filteredRestaurants = useMemo(() => {
    return restaurants
      .filter((r) => {
        // Search text matching (name, city, canonical city, state, cuisines, price)
        if (searchQuery.trim() !== '') {
          const query = searchQuery.toLowerCase().trim();
          const nameMatch = r.name?.toLowerCase().includes(query);
          const cityMatch = r.city?.toLowerCase().includes(query);
          const canonicalCity = getCanonicalCity(r).toLowerCase();
          const canonicalCityMatch = canonicalCity.includes(query);
          const stateMatch = r.state?.toLowerCase().includes(query);
          const cuisineMatch = r.cuisines?.some((c) =>
            c.toLowerCase().replace(/_/g, ' ').includes(query)
          );
          const priceMatch = r.price?.toLowerCase() === query;

          if (!nameMatch && !cityMatch && !canonicalCityMatch && !stateMatch && !cuisineMatch && !priceMatch) {
            return false;
          }
        }

        // Canonical Surveyed City filter
        if (!matchesCity(r, selectedCity)) {
          return false;
        }

        // Price filter
        if (selectedPrice !== 'ALL') {
          if (!r.price || r.price.toLowerCase() !== selectedPrice.toLowerCase()) {
            return false;
          }
        }

        // Cuisine filter
        if (selectedCuisine !== 'ALL') {
          if (!r.cuisines || !r.cuisines.includes(selectedCuisine)) {
            return false;
          }
        }

        // Rating tier filter
        if (selectedRatingTier !== 'ALL') {
          const rating = r.avg_overall_rating ? Number(r.avg_overall_rating) : null;
          const reviews = Number(r.total_reviews) || 0;

          if (selectedRatingTier === 'UNRATED') {
            if (reviews > 0 && rating !== null) return false;
          } else if (selectedRatingTier === 'HIGH') {
            if (rating === null || rating < 1.5) return false;
          } else if (selectedRatingTier === 'MODERATE') {
            if (rating === null || rating < 1.0 || rating >= 1.5) return false;
          } else if (selectedRatingTier === 'LOW') {
            if (rating === null || rating >= 1.0) return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'name_asc') {
          return a.name.localeCompare(b.name);
        }
        if (sortBy === 'name_desc') {
          return b.name.localeCompare(a.name);
        }
        if (sortBy === 'rating_desc') {
          const rateA = a.avg_overall_rating !== null ? Number(a.avg_overall_rating) : -1;
          const rateB = b.avg_overall_rating !== null ? Number(b.avg_overall_rating) : -1;
          if (rateB !== rateA) return rateB - rateA;
          return (Number(b.total_reviews) || 0) - (Number(a.total_reviews) || 0);
        }
        if (sortBy === 'rating_asc') {
          const rateA = a.avg_overall_rating !== null ? Number(a.avg_overall_rating) : 999;
          const rateB = b.avg_overall_rating !== null ? Number(b.avg_overall_rating) : 999;
          return rateA - rateB;
        }
        if (sortBy === 'reviews_desc') {
          return (Number(b.total_reviews) || 0) - (Number(a.total_reviews) || 0);
        }
        return 0;
      });
  }, [
    restaurants,
    searchQuery,
    selectedCity,
    selectedPrice,
    selectedRatingTier,
    selectedCuisine,
    sortBy,
  ]);

  // Clear all filters handler
  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCity('ALL');
    setSelectedPrice('ALL');
    setSelectedRatingTier('ALL');
    setSelectedCuisine('ALL');
    setSortBy('name_asc');
  };

  // Cuisine card click handler
  const handleSelectCuisine = (cuisineName) => {
    setSelectedCuisine(cuisineName);
    const el = document.getElementById('discover');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const focusSearch = () => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
      searchInputRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Navigation */}
      <Navbar onSearchFocus={focusSearch} totalCount={restaurants.length || 130} />

      {/* Main Page Body */}
      <main style={{ flex: 1 }}>
        {/* Hero Section */}
        <Hero
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onSearchClear={() => setSearchQuery('')}
          searchInputRef={searchInputRef}
          stats={stats}
          featuredRestaurant={featuredRestaurant}
          onSelectRestaurant={(id) => setSelectedPlaceId(id)}
        />

        {/* Top-Rated Section */}
        <TopRated
          restaurants={restaurants}
          onSelectRestaurant={(id) => setSelectedPlaceId(id)}
        />

        {/* Cuisine Exploration Section */}
        <CuisineSection
          cuisines={cuisines}
          onSelectCuisine={handleSelectCuisine}
        />

        {/* Restaurant Discovery Section */}
        <section id="discover" className="section-wrapper">
          <div className="container">
            <div style={{ marginBottom: '2.5rem' }}>
              <div className="section-eyebrow">THE RESTAURANT CATALOG</div>
              <h2 className="section-title">Places worth discovering</h2>
              <p className="section-subtitle">
                Explore the restaurants that make every meal memorable. Filter by culinary
                style, city, price tier, or authentic community rating score.
              </p>
            </div>

            {/* Filter and Control Bar */}
            <FilterBar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              selectedCity={selectedCity}
              onCityChange={setSelectedCity}
              cities={cities}
              selectedPrice={selectedPrice}
              onPriceChange={setSelectedPrice}
              selectedRatingTier={selectedRatingTier}
              onRatingTierChange={setSelectedRatingTier}
              selectedCuisine={selectedCuisine}
              onCuisineChange={setSelectedCuisine}
              cuisines={cuisines}
              sortBy={sortBy}
              onSortChange={setSortBy}
              onClearFilters={handleClearFilters}
              totalResults={filteredRestaurants.length}
              totalCount={restaurants.length}
            />

            {/* Restaurant Cards Grid */}
            <RestaurantGrid
              restaurants={filteredRestaurants}
              loading={loading}
              error={error}
              onRetry={loadInitialData}
              onClearFilters={handleClearFilters}
              onSelectRestaurant={(id) => setSelectedPlaceId(id)}
              selectedRatingTier={selectedRatingTier}
            />
          </div>
        </section>
      </main>

      {/* Detail Modal */}
      {selectedPlaceId && (
        <RestaurantDetails
          placeId={selectedPlaceId}
          onClose={() => setSelectedPlaceId(null)}
        />
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
}
