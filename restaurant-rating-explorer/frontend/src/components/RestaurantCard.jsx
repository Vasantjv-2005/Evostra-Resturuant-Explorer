import React from 'react';
import { Star, MapPin, DollarSign, Wine, ArrowRight } from 'lucide-react';
import { getRestaurantImage } from '../utils/imageHelper';

export default function RestaurantCard({ restaurant, onSelect }) {
  const imageUrl = getRestaurantImage(restaurant);
  const ratingVal = restaurant.avg_overall_rating ? Number(restaurant.avg_overall_rating) : null;
  const reviewsCount = Number(restaurant.total_reviews) || 0;

  // Rating badge color determination
  let ratingClass = 'rating-unrated';
  let ratingLabel = 'Unrated';
  if (ratingVal !== null && reviewsCount > 0) {
    if (ratingVal >= 1.5) ratingClass = 'rating-high';
    else if (ratingVal >= 1.0) ratingClass = 'rating-medium';
    else ratingClass = 'rating-low';
    ratingLabel = `${Number(ratingVal).toFixed(2)} / 2.0`;
  }

  // Price formatting
  const priceDisplay = {
    low: { symbol: '$', text: 'Low' },
    medium: { symbol: '$$', text: 'Medium' },
    high: { symbol: '$$$', text: 'High' },
  }[restaurant.price?.toLowerCase()] || { symbol: '•', text: restaurant.price || 'N/A' };

  return (
    <article
      onClick={() => onSelect(restaurant.place_id)}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(restaurant.place_id);
        }
      }}
      aria-label={`View details for ${restaurant.name}`}
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: 'var(--radius-xl)',
        border: '1px solid var(--border-subtle)',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-sm)',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        transition: 'transform var(--transition-base), box-shadow var(--transition-base), border-color var(--transition-base)',
        outline: 'none',
      }}
      className="restaurant-card"
    >
      {/* Visual Header Image */}
      <div
        style={{
          position: 'relative',
          height: '210px',
          overflow: 'hidden',
          backgroundColor: '#F0EDE6',
        }}
      >
        <img
          src={imageUrl}
          alt={restaurant.name}
          loading="lazy"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
          className="restaurant-card-img"
        />

        {/* Rating Overlay Pill */}
        <div
          style={{
            position: 'absolute',
            top: '0.85rem',
            right: '0.85rem',
            boxShadow: 'var(--shadow-sm)',
          }}
          className={`rating-pill ${ratingClass}`}
        >
          {ratingVal !== null && reviewsCount > 0 && <Star size={13} fill="currentColor" />}
          <span>{ratingLabel}</span>
        </div>

        {/* Price & Alcohol Tags */}
        <div
          style={{
            position: 'absolute',
            bottom: '0.85rem',
            left: '0.85rem',
            display: 'flex',
            gap: '0.4rem',
          }}
        >
          <span
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.94)',
              backdropFilter: 'blur(4px)',
              padding: '0.25rem 0.6rem',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.74rem',
              fontWeight: 700,
              color: 'var(--text-charcoal)',
            }}
          >
            {priceDisplay.symbol} {priceDisplay.text}
          </span>

          {restaurant.alcohol && restaurant.alcohol !== 'No_Alcohol_Served' && (
            <span
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.94)',
                backdropFilter: 'blur(4px)',
                padding: '0.25rem 0.55rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.74rem',
                fontWeight: 600,
                color: 'var(--accent-forest)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem',
              }}
            >
              <Wine size={12} />
              {restaurant.alcohol === 'Wine-Beer' ? 'Wine & Beer' : 'Full Bar'}
            </span>
          )}
        </div>
      </div>

      {/* Card Body */}
      <div
        style={{
          padding: '1.4rem',
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
        }}
      >
        {/* Cuisines Badges */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.35rem',
            marginBottom: '0.65rem',
          }}
        >
          {restaurant.cuisines && restaurant.cuisines.length > 0 ? (
            restaurant.cuisines.slice(0, 3).map((c) => (
              <span
                key={c}
                className="badge badge-sage"
                style={{ fontSize: '0.72rem', padding: '0.2rem 0.55rem' }}
              >
                {c.replace(/_/g, ' ')}
              </span>
            ))
          ) : (
            <span
              className="badge badge-outline"
              style={{ fontSize: '0.72rem', padding: '0.2rem 0.55rem' }}
            >
              Cuisine Unspecified
            </span>
          )}
        </div>

        {/* Title */}
        <h3
          style={{
            fontSize: '1.25rem',
            fontWeight: 700,
            lineHeight: 1.3,
            color: 'var(--text-charcoal)',
            marginBottom: '0.4rem',
          }}
        >
          {restaurant.name}
        </h3>

        {/* Location */}
        <p
          style={{
            fontSize: '0.86rem',
            color: 'var(--text-stone)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem',
            marginBottom: '1.25rem',
          }}
        >
          <MapPin size={15} color="var(--accent-forest)" style={{ flexShrink: 0 }} />
          <span>
            {restaurant.city || 'Mexico'}
            {restaurant.state ? `, ${restaurant.state}` : ''}
          </span>
        </p>

        {/* Rating Summary Detail & Button Footer */}
        <div
          style={{
            marginTop: 'auto',
            paddingTop: '0.9rem',
            borderTop: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ fontSize: '0.82rem', color: 'var(--text-stone)' }}>
            {reviewsCount > 0 ? (
              <span>
                <strong>{reviewsCount}</strong> {reviewsCount === 1 ? 'rating' : 'ratings'}
              </span>
            ) : (
              <span style={{ fontStyle: 'italic' }}>Awaiting ratings</span>
            )}
          </div>

          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.3rem',
              fontSize: '0.84rem',
              fontWeight: 600,
              color: 'var(--accent-forest)',
            }}
            className="view-details-link"
          >
            <span>View Details</span>
            <ArrowRight size={14} />
          </div>
        </div>
      </div>

      <style>{`
        .restaurant-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-lg);
          border-color: #D6D2C8;
        }
        .restaurant-card:hover .restaurant-card-img {
          transform: scale(1.05);
        }
        .restaurant-card:hover .view-details-link {
          color: var(--accent-forest-hover);
        }
        .restaurant-card:focus-visible {
          box-shadow: 0 0 0 3px rgba(36, 76, 58, 0.25), var(--shadow-lg);
          border-color: var(--accent-forest);
        }
      `}</style>
    </article>
  );
}
