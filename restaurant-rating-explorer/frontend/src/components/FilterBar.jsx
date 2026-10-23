import React from 'react';
import { Filter, SlidersHorizontal, RotateCcw, Search, X, MapPin, DollarSign, Star, Utensils } from 'lucide-react';

export default function FilterBar({
  searchQuery,
  onSearchChange,
  selectedCity,
  onCityChange,
  selectedPrice,
  onPriceChange,
  selectedRatingTier,
  onRatingTierChange,
  selectedCuisine,
  onCuisineChange,
  cuisines,
  sortBy,
  onSortChange,
  onClearFilters,
  totalResults,
  totalCount,
}) {
  const isFiltered =
    Boolean(searchQuery) ||
    selectedCity !== 'ALL' ||
    selectedPrice !== 'ALL' ||
    selectedRatingTier !== 'ALL' ||
    selectedCuisine !== 'ALL' ||
    sortBy !== 'name_asc';

  // Helper labels for active filter pills
  const cityLabels = {
    'ALL': 'All Cities',
    'San Luis Potosi': 'San Luis Potosí',
    'Cuernavaca': 'Cuernavaca',
    'Ciudad Victoria': 'Ciudad Victoria',
  };

  const priceLabels = {
    'low': 'Low ($)',
    'medium': 'Medium ($$)',
    'high': 'High ($$$)',
  };

  const ratingLabels = {
    'HIGH': 'High (1.50 – 2.00)',
    'MODERATE': 'Moderate (1.00 – 1.49)',
    'LOW': 'Low (< 1.00)',
    'UNRATED': 'Unrated Tables',
  };

  const sortLabels = {
    'name_asc': 'Name: A to Z',
    'name_desc': 'Name: Z to A',
    'rating_desc': 'Highest Rating',
    'rating_asc': 'Lowest Rating',
    'reviews_desc': 'Most Reviewed',
  };

  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: 'var(--radius-xl)',
        border: '1px solid var(--border-subtle)',
        padding: '1.5rem',
        marginBottom: '2.5rem',
        boxShadow: 'var(--shadow-sm)',
      }}
    >
      {/* Top Header: Count & Reset Action */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          marginBottom: '1.25rem',
          paddingBottom: '1rem',
          borderBottom: '1px solid var(--border-subtle)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <span style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-charcoal)' }}>
            Showing {totalResults} of {totalCount} restaurants
          </span>
          {isFiltered && (
            <span
              className="badge badge-sage"
              style={{
                fontSize: '0.75rem',
                fontWeight: 600,
                padding: '0.2rem 0.6rem',
              }}
            >
              Filters Active
            </span>
          )}
        </div>

        {/* Reset All Filters Button */}
        {isFiltered && (
          <button
            onClick={onClearFilters}
            id="reset-filters-btn"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              color: 'var(--highlight-terracotta)',
              fontSize: '0.85rem',
              fontWeight: 600,
              backgroundColor: '#FFF2F0',
              padding: '0.35rem 0.85rem',
              borderRadius: 'var(--radius-full)',
              border: '1px solid #FFCCC7',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            <RotateCcw size={14} />
            Reset all filters
          </button>
        )}
      </div>

      {/* Prominent Live Search Input */}
      <div style={{ marginBottom: '1.25rem' }}>
        <div
          style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            backgroundColor: 'var(--bg-ivory)',
            borderRadius: 'var(--radius-md)',
            border: '1.5px solid var(--border-subtle)',
            padding: '0.55rem 1rem',
            transition: 'border-color 0.2s, box-shadow 0.2s',
          }}
        >
          <Search size={18} color="var(--accent-forest)" style={{ marginRight: '0.65rem', flexShrink: 0 }} />
          <input
            id="discovery-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by restaurant name, cuisine, city, or address..."
            style={{
              width: '100%',
              border: 'none',
              outline: 'none',
              backgroundColor: 'transparent',
              fontSize: '0.95rem',
              color: 'var(--text-charcoal)',
            }}
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              aria-label="Clear search query"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0.25rem',
                borderRadius: '50%',
                color: 'var(--text-stone)',
                backgroundColor: '#E8E5DF',
                marginLeft: '0.5rem',
                cursor: 'pointer',
              }}
            >
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Multi-Faceted Filter Dropdowns */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(175px, 1fr))',
          gap: '1rem',
          alignItems: 'flex-end',
        }}
      >
        {/* Location / City Filter */}
        <div>
          <label
            htmlFor="filter-city"
            style={{
              display: 'block',
              fontSize: '0.72rem',
              fontWeight: 700,
              letterSpacing: '0.05em',
              color: 'var(--text-stone)',
              marginBottom: '0.35rem',
              textTransform: 'uppercase',
            }}
          >
            Location / City
          </label>
          <select
            id="filter-city"
            value={selectedCity}
            onChange={(e) => onCityChange(e.target.value)}
            style={{
              width: '100%',
              padding: '0.65rem 0.85rem',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-subtle)',
              backgroundColor: selectedCity !== 'ALL' ? '#F4F8F5' : 'var(--bg-ivory)',
              fontSize: '0.88rem',
              color: selectedCity !== 'ALL' ? 'var(--accent-forest)' : 'var(--text-charcoal)',
              fontWeight: selectedCity !== 'ALL' ? 600 : 400,
              outline: 'none',
              cursor: 'pointer',
            }}
          >
            <option value="ALL">All Surveyed Cities (130)</option>
            <option value="San Luis Potosi">San Luis Potosi (84)</option>
            <option value="Cuernavaca">Cuernavaca (23)</option>
            <option value="Ciudad Victoria">Ciudad Victoria (23)</option>
          </select>
        </div>

        {/* Cuisine Type Filter */}
        <div>
          <label
            htmlFor="filter-cuisine"
            style={{
              display: 'block',
              fontSize: '0.72rem',
              fontWeight: 700,
              letterSpacing: '0.05em',
              color: 'var(--text-stone)',
              marginBottom: '0.35rem',
              textTransform: 'uppercase',
            }}
          >
            Cuisine Type
          </label>
          <select
            id="filter-cuisine"
            value={selectedCuisine}
            onChange={(e) => onCuisineChange(e.target.value)}
            style={{
              width: '100%',
              padding: '0.65rem 0.85rem',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-subtle)',
              backgroundColor: selectedCuisine !== 'ALL' ? '#F4F8F5' : 'var(--bg-ivory)',
              fontSize: '0.88rem',
              color: selectedCuisine !== 'ALL' ? 'var(--accent-forest)' : 'var(--text-charcoal)',
              fontWeight: selectedCuisine !== 'ALL' ? 600 : 400,
              outline: 'none',
              cursor: 'pointer',
            }}
          >
            <option value="ALL">All Cuisines (23 Types)</option>
            {cuisines.map((c) => (
              <option key={c.cuisine} value={c.cuisine}>
                {c.cuisine.replace(/_/g, ' ')} ({c.count})
              </option>
            ))}
          </select>
        </div>

        {/* Price Tier Filter */}
        <div>
          <label
            htmlFor="filter-price"
            style={{
              display: 'block',
              fontSize: '0.72rem',
              fontWeight: 700,
              letterSpacing: '0.05em',
              color: 'var(--text-stone)',
              marginBottom: '0.35rem',
              textTransform: 'uppercase',
            }}
          >
            Price Tier
          </label>
          <select
            id="filter-price"
            value={selectedPrice}
            onChange={(e) => onPriceChange(e.target.value)}
            style={{
              width: '100%',
              padding: '0.65rem 0.85rem',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-subtle)',
              backgroundColor: selectedPrice !== 'ALL' ? '#F4F8F5' : 'var(--bg-ivory)',
              fontSize: '0.88rem',
              color: selectedPrice !== 'ALL' ? 'var(--accent-forest)' : 'var(--text-charcoal)',
              fontWeight: selectedPrice !== 'ALL' ? 600 : 400,
              outline: 'none',
              cursor: 'pointer',
            }}
          >
            <option value="ALL">All Price Levels (130)</option>
            <option value="low">Low ($) (45)</option>
            <option value="medium">Medium ($$) (60)</option>
            <option value="high">High ($$$) (25)</option>
          </select>
        </div>

        {/* Rating Score Tier Filter */}
        <div>
          <label
            htmlFor="filter-rating"
            style={{
              display: 'block',
              fontSize: '0.72rem',
              fontWeight: 700,
              letterSpacing: '0.05em',
              color: 'var(--text-stone)',
              marginBottom: '0.35rem',
              textTransform: 'uppercase',
            }}
          >
            Rating (0–2 Scale)
          </label>
          <select
            id="filter-rating"
            value={selectedRatingTier}
            onChange={(e) => onRatingTierChange(e.target.value)}
            style={{
              width: '100%',
              padding: '0.65rem 0.85rem',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-subtle)',
              backgroundColor: selectedRatingTier !== 'ALL' ? '#F4F8F5' : 'var(--bg-ivory)',
              fontSize: '0.88rem',
              color: selectedRatingTier !== 'ALL' ? 'var(--accent-forest)' : 'var(--text-charcoal)',
              fontWeight: selectedRatingTier !== 'ALL' ? 600 : 400,
              outline: 'none',
              cursor: 'pointer',
            }}
          >
            <option value="ALL">All Ratings (130)</option>
            <option value="HIGH">High (1.50 – 2.00) (25)</option>
            <option value="MODERATE">Moderate (1.00 – 1.49) (76)</option>
            <option value="LOW">Low (&lt; 1.00) (29)</option>
            <option value="UNRATED">Unrated Tables (0)</option>
          </select>
        </div>

        {/* Sort Order */}
        <div>
          <label
            htmlFor="sort-by"
            style={{
              display: 'block',
              fontSize: '0.72rem',
              fontWeight: 700,
              letterSpacing: '0.05em',
              color: 'var(--text-stone)',
              marginBottom: '0.35rem',
              textTransform: 'uppercase',
            }}
          >
            Sort Order
          </label>
          <select
            id="sort-by"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            style={{
              width: '100%',
              padding: '0.65rem 0.85rem',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-subtle)',
              backgroundColor: sortBy !== 'name_asc' ? '#F4F8F5' : 'var(--bg-ivory)',
              fontSize: '0.88rem',
              color: sortBy !== 'name_asc' ? 'var(--accent-forest)' : 'var(--text-charcoal)',
              fontWeight: sortBy !== 'name_asc' ? 600 : 400,
              outline: 'none',
              cursor: 'pointer',
            }}
          >
            <option value="name_asc">Name: A to Z</option>
            <option value="name_desc">Name: Z to A</option>
            <option value="rating_desc">Highest Average Rating</option>
            <option value="rating_asc">Lowest Average Rating</option>
            <option value="reviews_desc">Most Reviewed</option>
          </select>
        </div>
      </div>

      {/* Active Filter Chips / Pills */}
      {isFiltered && (
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: '0.5rem',
            marginTop: '1.25rem',
            paddingTop: '1rem',
            borderTop: '1px dashed var(--border-subtle)',
          }}
        >
          <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-stone)' }}>
            Active Filters:
          </span>

          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                backgroundColor: 'var(--accent-sage)',
                color: 'var(--accent-forest)',
                fontSize: '0.78rem',
                fontWeight: 600,
                padding: '0.25rem 0.65rem',
                borderRadius: 'var(--radius-full)',
                cursor: 'pointer',
              }}
            >
              Search: "{searchQuery}"
              <X size={12} />
            </button>
          )}

          {selectedCity !== 'ALL' && (
            <button
              onClick={() => onCityChange('ALL')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                backgroundColor: 'var(--accent-sage)',
                color: 'var(--accent-forest)',
                fontSize: '0.78rem',
                fontWeight: 600,
                padding: '0.25rem 0.65rem',
                borderRadius: 'var(--radius-full)',
                cursor: 'pointer',
              }}
            >
              City: {cityLabels[selectedCity] || selectedCity}
              <X size={12} />
            </button>
          )}

          {selectedCuisine !== 'ALL' && (
            <button
              onClick={() => onCuisineChange('ALL')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                backgroundColor: 'var(--accent-sage)',
                color: 'var(--accent-forest)',
                fontSize: '0.78rem',
                fontWeight: 600,
                padding: '0.25rem 0.65rem',
                borderRadius: 'var(--radius-full)',
                cursor: 'pointer',
              }}
            >
              Cuisine: {selectedCuisine.replace(/_/g, ' ')}
              <X size={12} />
            </button>
          )}

          {selectedPrice !== 'ALL' && (
            <button
              onClick={() => onPriceChange('ALL')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                backgroundColor: 'var(--accent-sage)',
                color: 'var(--accent-forest)',
                fontSize: '0.78rem',
                fontWeight: 600,
                padding: '0.25rem 0.65rem',
                borderRadius: 'var(--radius-full)',
                cursor: 'pointer',
              }}
            >
              Price: {priceLabels[selectedPrice] || selectedPrice}
              <X size={12} />
            </button>
          )}

          {selectedRatingTier !== 'ALL' && (
            <button
              onClick={() => onRatingTierChange('ALL')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                backgroundColor: 'var(--accent-sage)',
                color: 'var(--accent-forest)',
                fontSize: '0.78rem',
                fontWeight: 600,
                padding: '0.25rem 0.65rem',
                borderRadius: 'var(--radius-full)',
                cursor: 'pointer',
              }}
            >
              Rating: {ratingLabels[selectedRatingTier] || selectedRatingTier}
              <X size={12} />
            </button>
          )}

          {sortBy !== 'name_asc' && (
            <button
              onClick={() => onSortChange('name_asc')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                backgroundColor: '#F0EDE6',
                color: 'var(--text-charcoal)',
                fontSize: '0.78rem',
                fontWeight: 600,
                padding: '0.25rem 0.65rem',
                borderRadius: 'var(--radius-full)',
                cursor: 'pointer',
              }}
            >
              Sort: {sortLabels[sortBy] || sortBy}
              <X size={12} />
            </button>
          )}

          <button
            onClick={onClearFilters}
            style={{
              fontSize: '0.78rem',
              color: 'var(--highlight-terracotta)',
              fontWeight: 600,
              textDecoration: 'underline',
              cursor: 'pointer',
              marginLeft: '0.5rem',
            }}
          >
            Clear all
          </button>
        </div>
      )}
    </div>
  );
}
