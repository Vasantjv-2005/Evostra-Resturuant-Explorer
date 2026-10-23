import React, { useState, useEffect } from 'react';
import RestaurantCard from './RestaurantCard';
import { SearchX, RotateCcw, AlertCircle, ChevronDown, CheckCircle2 } from 'lucide-react';

export default function RestaurantGrid({
  restaurants,
  loading,
  error,
  onRetry,
  onClearFilters,
  onSelectRestaurant,
  selectedRatingTier,
}) {
  const [displayCount, setDisplayCount] = useState(12);

  // Reset pagination to first page whenever restaurants list updates
  useEffect(() => {
    setDisplayCount(12);
  }, [restaurants]);

  // Loading Skeleton State
  if (loading) {
    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '2rem',
        }}
      >
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            style={{
              height: '380px',
              borderRadius: 'var(--radius-xl)',
              border: '1px solid var(--border-subtle)',
              backgroundColor: '#FFFFFF',
              overflow: 'hidden',
              padding: '1.25rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}
          >
            <div className="skeleton" style={{ height: '180px', width: '100%', borderRadius: 'var(--radius-md)' }} />
            <div className="skeleton" style={{ height: '24px', width: '70%' }} />
            <div className="skeleton" style={{ height: '18px', width: '45%' }} />
            <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between' }}>
              <div className="skeleton" style={{ height: '18px', width: '30%' }} />
              <div className="skeleton" style={{ height: '18px', width: '25%' }} />
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid #F5C6CB',
          padding: '3.5rem 2rem',
          textAlign: 'center',
          maxWidth: '540px',
          margin: '2rem auto',
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        <div
          style={{
            width: '3.5rem',
            height: '3.5rem',
            borderRadius: '50%',
            backgroundColor: '#FFEBEE',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.25rem',
            color: '#C62828',
          }}
        >
          <AlertCircle size={28} />
        </div>
        <h3 style={{ fontSize: '1.35rem', marginBottom: '0.6rem' }}>
          Unable to Load Restaurants
        </h3>
        <p style={{ fontSize: '0.92rem', color: 'var(--text-stone)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
          {error || 'Could not connect to the restaurant database API. Please ensure the backend is running.'}
        </p>
        <button onClick={onRetry} className="btn-primary">
          <RotateCcw size={16} />
          Retry Connection
        </button>
      </div>
    );
  }

  // Empty Results State
  if (!restaurants || restaurants.length === 0) {
    const isUnratedSelected = selectedRatingTier === 'UNRATED';

    return (
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--border-subtle)',
          padding: '4rem 2rem',
          textAlign: 'center',
          maxWidth: '540px',
          margin: '2rem auto',
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        <div
          style={{
            width: '3.5rem',
            height: '3.5rem',
            borderRadius: '50%',
            backgroundColor: isUnratedSelected ? 'var(--accent-sage)' : 'var(--bg-ivory)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.25rem',
            color: isUnratedSelected ? 'var(--accent-forest)' : 'var(--text-stone)',
          }}
        >
          {isUnratedSelected ? <CheckCircle2 size={26} /> : <SearchX size={26} />}
        </div>
        <h3 style={{ fontSize: '1.35rem', marginBottom: '0.5rem' }}>
          {isUnratedSelected ? '100% Survey Coverage' : 'No Matching Tables Found'}
        </h3>
        <p style={{ fontSize: '0.92rem', color: 'var(--text-stone)', marginBottom: '1.75rem', lineHeight: 1.6 }}>
          {isUnratedSelected
            ? 'All 130 establishments in the CENIDET research dataset have verified community reviews (1,161 total ratings). There are no unrated tables awaiting feedback.'
            : 'We could not find any restaurants matching your current criteria. Try adjusting your search terms or clearing active filters.'}
        </p>
        <button onClick={onClearFilters} className="btn-secondary">
          <RotateCcw size={15} />
          {isUnratedSelected ? 'View All 130 Rated Tables' : 'Reset Search & Filters'}
        </button>
      </div>
    );
  }

  const visibleRestaurants = restaurants.slice(0, displayCount);
  const hasMore = displayCount < restaurants.length;

  return (
    <div>
      {/* 3-column / 2-column / 1-column Responsive Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '2rem',
        }}
        className="restaurant-grid-container"
      >
        {visibleRestaurants.map((restaurant) => (
          <RestaurantCard
            key={restaurant.place_id}
            restaurant={restaurant}
            onSelect={onSelectRestaurant}
          />
        ))}
      </div>

      {/* Load More Pagination */}
      {hasMore && (
        <div
          style={{
            textAlign: 'center',
            marginTop: '3.5rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.85rem',
          }}
        >
          <button
            onClick={() => setDisplayCount((prev) => Math.min(prev + 12, restaurants.length))}
            className="btn-secondary"
            style={{
              padding: '0.85rem 2.2rem',
              fontSize: '0.95rem',
              fontWeight: 600,
            }}
          >
            Show More Tables ({restaurants.length - displayCount} remaining)
            <ChevronDown size={16} />
          </button>
          <span style={{ fontSize: '0.82rem', color: 'var(--text-stone)' }}>
            Showing {displayCount} of {restaurants.length} establishments
          </span>
        </div>
      )}
    </div>
  );
}
