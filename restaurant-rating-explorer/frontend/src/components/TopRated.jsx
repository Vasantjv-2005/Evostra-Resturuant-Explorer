import React from 'react';
import { Star, MapPin, ArrowRight } from 'lucide-react';
import { getRestaurantImage } from '../utils/imageHelper';

export default function TopRated({ restaurants, onSelectRestaurant }) {
  // Sort restaurants by avg_overall_rating DESC, then total_reviews DESC
  const topRated = [...restaurants]
    .filter((r) => r.avg_overall_rating !== null && Number(r.avg_overall_rating) > 0)
    .sort((a, b) => {
      const diff = Number(b.avg_overall_rating) - Number(a.avg_overall_rating);
      if (Math.abs(diff) > 0.001) return diff;
      return Number(b.total_reviews) - Number(a.total_reviews);
    })
    .slice(0, 4);

  if (topRated.length === 0) return null;

  return (
    <section id="top-rated" className="section-wrapper" style={{ backgroundColor: '#FFFFFF' }}>
      <div className="container">
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: '1rem',
            marginBottom: '3rem',
          }}
          className="section-header-row"
        >
          <div>
            <div className="section-eyebrow">EDITORIAL SELECTION</div>
            <h2 className="section-title">Highly rated, highly recommended</h2>
            <p className="section-subtitle">
              The leading establishments ranked strictly by authentic community ratings
              and verified evaluation scores.
            </p>
          </div>
          <div
            style={{
              fontSize: '0.82rem',
              backgroundColor: 'var(--bg-ivory)',
              padding: '0.5rem 1rem',
              borderRadius: 'var(--radius-full)',
              color: 'var(--text-stone)',
              border: '1px solid var(--border-subtle)',
            }}
          >
            Original CENIDET rating scale: <strong>0 (Low) to 2 (High)</strong>
          </div>
        </div>

        {/* 4 Featured Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))',
            gap: '1.75rem',
          }}
        >
          {topRated.map((restaurant, idx) => {
            const imgUrl = getRestaurantImage(restaurant);
            const ratingNum = Number(restaurant.avg_overall_rating);

            return (
              <div
                key={restaurant.place_id}
                onClick={() => onSelectRestaurant(restaurant.place_id)}
                style={{
                  backgroundColor: 'var(--bg-ivory)',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--border-subtle)',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'transform var(--transition-base), box-shadow var(--transition-base)',
                  display: 'flex',
                  flexDirection: 'column',
                }}
                className="top-card"
              >
                {/* Image Banner with Rank Badge */}
                <div style={{ position: 'relative', height: '190px', overflow: 'hidden' }}>
                  <img
                    src={imgUrl}
                    alt={restaurant.name}
                    loading="lazy"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.5s ease',
                    }}
                    className="card-image"
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: '0.85rem',
                      left: '0.85rem',
                      backgroundColor: 'rgba(32, 35, 31, 0.85)',
                      backdropFilter: 'blur(4px)',
                      color: '#FFFFFF',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      padding: '0.25rem 0.65rem',
                      borderRadius: 'var(--radius-full)',
                      letterSpacing: '0.04em',
                    }}
                  >
                    #{idx + 1} TOP RATED
                  </div>

                  <div
                    style={{
                      position: 'absolute',
                      bottom: '0.85rem',
                      right: '0.85rem',
                      backgroundColor: '#FFFFFF',
                      boxShadow: 'var(--shadow-sm)',
                      padding: '0.35rem 0.65rem',
                      borderRadius: 'var(--radius-full)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.3rem',
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      color: 'var(--accent-forest)',
                    }}
                  >
                    <Star size={14} fill="var(--highlight-terracotta)" color="var(--highlight-terracotta)" />
                    <span>{restaurant.avg_overall_rating} / 2.0</span>
                  </div>
                </div>

                {/* Content */}
                <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  {/* Cuisines Tags */}
                  <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '0.6rem' }}>
                    {restaurant.cuisines?.slice(0, 2).map((c) => (
                      <span key={c} className="badge badge-sage" style={{ fontSize: '0.72rem' }}>
                        {c.replace(/_/g, ' ')}
                      </span>
                    ))}
                    {(!restaurant.cuisines || restaurant.cuisines.length === 0) && (
                      <span className="badge badge-outline" style={{ fontSize: '0.72rem' }}>
                        Standard Cuisine
                      </span>
                    )}
                  </div>

                  <h3
                    style={{
                      fontSize: '1.15rem',
                      fontWeight: 700,
                      color: 'var(--text-charcoal)',
                      marginBottom: '0.4rem',
                      lineHeight: 1.3,
                    }}
                  >
                    {restaurant.name}
                  </h3>

                  <p
                    style={{
                      fontSize: '0.84rem',
                      color: 'var(--text-stone)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      marginBottom: '1rem',
                    }}
                  >
                    <MapPin size={14} />
                    <span>
                      {restaurant.city || 'Mexico'}
                      {restaurant.state ? `, ${restaurant.state}` : ''}
                    </span>
                  </p>

                  <div
                    style={{
                      marginTop: 'auto',
                      paddingTop: '0.85rem',
                      borderTop: '1px solid var(--border-subtle)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      fontSize: '0.82rem',
                    }}
                  >
                    <span style={{ color: 'var(--text-stone)' }}>
                      <strong>{restaurant.total_reviews}</strong> verified reviews
                    </span>

                    <span
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.25rem',
                        color: 'var(--accent-forest)',
                        fontWeight: 600,
                      }}
                    >
                      View Details
                      <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .top-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-lg);
          border-color: #D6D2C8;
        }
        .top-card:hover .card-image {
          transform: scale(1.04);
        }
        @media (min-width: 768px) {
          .section-header-row {
            flex-direction: row !important;
            align-items: flex-end !important;
          }
        }
      `}</style>
    </section>
  );
}
