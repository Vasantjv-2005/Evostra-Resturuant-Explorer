import React from 'react';
import { Search, X, Sparkles, MapPin, Award, Star } from 'lucide-react';

export default function Hero({
  searchQuery,
  onSearchChange,
  onSearchClear,
  searchInputRef,
  stats,
  featuredRestaurant,
  onSelectRestaurant,
}) {
  return (
    <section
      style={{
        paddingTop: '3.5rem',
        paddingBottom: '4.5rem',
        borderBottom: '1px solid var(--border-subtle)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '3.5rem',
            alignItems: 'center',
          }}
          className="hero-grid"
        >
          {/* Left Column: Editorial Headline & Search */}
          <div>
            <div className="section-eyebrow">GOOD FOOD. GREAT DISCOVERIES.</div>

            <h1
              style={{
                fontSize: 'clamp(2.75rem, 5.5vw, 4.25rem)',
                fontWeight: 700,
                lineHeight: 1.12,
                color: 'var(--text-charcoal)',
                marginBottom: '1.5rem',
                letterSpacing: '-0.025em',
              }}
            >
              Find your next <br />
              <span
                style={{
                  color: 'var(--accent-forest)',
                  fontStyle: 'italic',
                  fontFamily: 'var(--font-serif)',
                }}
              >
                favorite table.
              </span>
            </h1>

            <p
              style={{
                fontSize: '1.15rem',
                color: 'var(--text-stone)',
                lineHeight: 1.65,
                maxWidth: '560px',
                marginBottom: '2.5rem',
              }}
            >
              Discover remarkable restaurants, explore local cuisines, and find your
              next dining experience through real restaurant data and authentic
              community ratings.
            </p>

            {/* Prominent Search Bar */}
            <div
              style={{
                maxWidth: '580px',
                position: 'relative',
                marginBottom: '2.5rem',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: '#FFFFFF',
                  borderRadius: 'var(--radius-full)',
                  border: '1.5px solid var(--border-subtle)',
                  padding: '0.45rem 0.6rem 0.45rem 1.25rem',
                  boxShadow: 'var(--shadow-md)',
                  transition: 'border-color var(--transition-fast), box-shadow var(--transition-fast)',
                }}
                className="search-box-wrapper"
              >
                <Search
                  size={20}
                  color="var(--accent-forest)"
                  style={{ flexShrink: 0, marginRight: '0.75rem' }}
                />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  placeholder="Search restaurants, cities, or cuisines..."
                  aria-label="Search restaurants, cities, or cuisines"
                  style={{
                    width: '100%',
                    border: 'none',
                    outline: 'none',
                    fontSize: '1rem',
                    color: 'var(--text-charcoal)',
                    backgroundColor: 'transparent',
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Escape') onSearchClear();
                    if (e.key === 'Enter') {
                      const el = document.getElementById('discover');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                />
                {searchQuery ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <button
                      onClick={onSearchClear}
                      aria-label="Clear search query"
                      style={{
                        padding: '0.4rem',
                        borderRadius: 'var(--radius-full)',
                        color: 'var(--text-stone)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                      }}
                    >
                      <X size={18} />
                    </button>
                    <button
                      onClick={() => {
                        const el = document.getElementById('discover');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="btn-primary"
                      style={{
                        padding: '0.45rem 1rem',
                        fontSize: '0.84rem',
                        flexShrink: 0,
                      }}
                    >
                      View Results
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      const el = document.getElementById('discover');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="btn-primary"
                    style={{
                      padding: '0.55rem 1.2rem',
                      fontSize: '0.86rem',
                      flexShrink: 0,
                    }}
                  >
                    Explore
                  </button>
                )}
              </div>
              <div
                style={{
                  display: 'flex',
                  gap: '0.75rem',
                  alignItems: 'center',
                  marginTop: '0.65rem',
                  fontSize: '0.8rem',
                  color: 'var(--text-light)',
                  paddingLeft: '0.75rem',
                  flexWrap: 'wrap',
                }}
              >
                <span>Popular searches:</span>
                {['Mexican', 'San Luis Potosi', 'Bar', 'Cuernavaca'].map((term) => (
                  <button
                    key={term}
                    onClick={() => {
                      onSearchChange(term);
                      const el = document.getElementById('discover');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    style={{
                      color: 'var(--accent-forest)',
                      fontWeight: 600,
                      textDecoration: 'underline',
                      textUnderlineOffset: '2px',
                      cursor: 'pointer',
                    }}
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>

            {/* Genuine Data-Derived Stats */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
                gap: '1.25rem',
                paddingTop: '1.75rem',
                borderTop: '1px solid var(--border-subtle)',
                maxWidth: '540px',
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '2rem',
                    fontWeight: 700,
                    color: 'var(--text-charcoal)',
                    lineHeight: 1,
                    marginBottom: '0.25rem',
                  }}
                >
                  {stats ? stats.total_restaurants : '130'}
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-stone)', fontWeight: 500 }}>
                  Surveyed Restaurants
                </div>
              </div>

              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '2rem',
                    fontWeight: 700,
                    color: 'var(--accent-forest)',
                    lineHeight: 1,
                    marginBottom: '0.25rem',
                  }}
                >
                  {stats ? stats.total_ratings.toLocaleString() : '1,161'}
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-stone)', fontWeight: 500 }}>
                  Community Ratings
                </div>
              </div>

              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '2rem',
                    fontWeight: 700,
                    color: 'var(--highlight-terracotta)',
                    lineHeight: 1,
                    marginBottom: '0.25rem',
                  }}
                >
                  {stats ? stats.total_cuisines : '23'}
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-stone)', fontWeight: 500 }}>
                  Catalogued Cuisines
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Layered Editorial Visual */}
          <div
            style={{
              position: 'relative',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            {/* Background Decorative Accent Ring */}
            <div
              style={{
                position: 'absolute',
                top: '5%',
                right: '0%',
                width: '320px',
                height: '320px',
                borderRadius: '50%',
                backgroundColor: 'var(--accent-sage-light)',
                zIndex: 0,
                opacity: 0.8,
              }}
            />

            {/* Main Editorial Image Card */}
            <div
              style={{
                position: 'relative',
                zIndex: 1,
                width: '100%',
                maxWidth: '460px',
                borderRadius: 'var(--radius-xl)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-lg)',
                border: '1px solid var(--border-subtle)',
                backgroundColor: '#FFFFFF',
              }}
            >
              <div
                style={{
                  height: '320px',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80"
                  alt="Fine artisanal culinary dish"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    top: '1rem',
                    left: '1rem',
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(8px)',
                    padding: '0.35rem 0.85rem',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    letterSpacing: '0.04em',
                    color: 'var(--accent-forest)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    boxShadow: 'var(--shadow-sm)',
                  }}
                >
                  <Sparkles size={14} color="var(--accent-forest)" />
                  CURATED DISCOVERY
                </div>
              </div>

              {/* Featured Card Inset */}
              <div style={{ padding: '1.5rem' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '0.5rem',
                  }}
                >
                  <div className="badge badge-sage">
                    {featuredRestaurant?.cuisines?.[0] || 'Mexican Gastronomy'}
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.3rem',
                      color: 'var(--highlight-terracotta)',
                      fontWeight: 700,
                      fontSize: '0.9rem',
                    }}
                  >
                    <Star size={15} fill="var(--highlight-terracotta)" />
                    <span>
                      {featuredRestaurant?.avg_overall_rating
                        ? `${featuredRestaurant.avg_overall_rating} / 2.0`
                        : '2.0 / 2.0 scale'}
                    </span>
                  </div>
                </div>

                <h3
                  style={{
                    fontSize: '1.35rem',
                    marginBottom: '0.4rem',
                    fontWeight: 700,
                  }}
                >
                  {featuredRestaurant?.name || 'Restaurante Bar San Luis'}
                </h3>

                <p
                  style={{
                    fontSize: '0.88rem',
                    color: 'var(--text-stone)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    marginBottom: '1.25rem',
                  }}
                >
                  <MapPin size={15} />
                  {featuredRestaurant
                    ? `${featuredRestaurant.city}, ${featuredRestaurant.state}`
                    : 'San Luis Potosi, Mexico'}
                </p>

                {featuredRestaurant && (
                  <button
                    onClick={() => onSelectRestaurant(featuredRestaurant.place_id)}
                    className="btn-secondary"
                    style={{
                      width: '100%',
                      padding: '0.65rem',
                      fontSize: '0.88rem',
                    }}
                  >
                    View Restaurant Profile
                  </button>
                )}
              </div>
            </div>

            {/* Overlapping Badge Floating Accent */}
            <div
              style={{
                position: 'absolute',
                bottom: '-1.25rem',
                left: '-1rem',
                zIndex: 2,
                backgroundColor: '#FFFFFF',
                borderRadius: 'var(--radius-lg)',
                padding: '0.85rem 1.25rem',
                boxShadow: 'var(--shadow-md)',
                border: '1px solid var(--border-subtle)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
              }}
              className="floating-accent-card"
            >
              <div
                style={{
                  width: '2.25rem',
                  height: '2.25rem',
                  borderRadius: '50%',
                  backgroundColor: 'var(--accent-sage-light)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--accent-forest)',
                }}
              >
                <Award size={18} />
              </div>
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-charcoal)' }}>
                  100% Genuine Data
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-stone)' }}>
                  CENIDET Research Dataset
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 992px) {
          .hero-grid {
            grid-template-columns: 1.15fr 0.85fr !important;
          }
        }
        .search-box-wrapper:focus-within {
          border-color: var(--accent-forest) !important;
          box-shadow: 0 0 0 3px rgba(36, 76, 58, 0.12), var(--shadow-md) !important;
        }
        @media (max-width: 576px) {
          .floating-accent-card {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}
