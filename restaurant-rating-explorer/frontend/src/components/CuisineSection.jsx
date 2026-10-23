import React from 'react';
import { Utensils, ArrowUpRight } from 'lucide-react';
import { getCuisineImage } from '../utils/imageHelper';

export default function CuisineSection({ cuisines, onSelectCuisine }) {
  if (!cuisines || cuisines.length === 0) return null;

  return (
    <section id="cuisines" className="section-wrapper" style={{ backgroundColor: 'var(--bg-ivory)' }}>
      <div className="container">
        <div style={{ marginBottom: '2.5rem' }}>
          <div className="section-eyebrow">CULINARY TRADITIONS</div>
          <h2 className="section-title">Explore by cuisine</h2>
          <p className="section-subtitle">
            Authentic culinary categories represented across the surveyed restaurant dataset.
            Select any cuisine to explore its tables.
          </p>
        </div>

        {/* Cuisine Tiles Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '1.25rem',
          }}
        >
          {cuisines.map((item) => {
            const displayName = item.cuisine.replace(/_/g, ' ');
            const bannerImg = getCuisineImage(item.cuisine);

            return (
              <div
                key={item.cuisine}
                onClick={() => onSelectCuisine(item.cuisine)}
                style={{
                  position: 'relative',
                  height: '140px',
                  borderRadius: 'var(--radius-lg)',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  border: '1px solid var(--border-subtle)',
                  boxShadow: 'var(--shadow-sm)',
                  transition: 'all var(--transition-base)',
                }}
                className="cuisine-card"
              >
                {/* Background Food Photography with Dark Vignette */}
                <img
                  src={bannerImg}
                  alt={displayName}
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.4s ease',
                  }}
                  className="cuisine-bg"
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background:
                      'linear-gradient(180deg, rgba(32, 35, 31, 0.2) 0%, rgba(32, 35, 31, 0.82) 100%)',
                    transition: 'background 0.3s ease',
                  }}
                  className="cuisine-overlay"
                />

                {/* Content Overlay */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    padding: '1rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    zIndex: 2,
                    color: '#FFFFFF',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'flex-end',
                    }}
                  >
                    <div
                      style={{
                        width: '1.75rem',
                        height: '1.75rem',
                        borderRadius: '50%',
                        backgroundColor: 'rgba(255, 255, 255, 0.25)',
                        backdropFilter: 'blur(4px)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'transform 0.2s ease',
                      }}
                      className="arrow-circle"
                    >
                      <ArrowUpRight size={14} color="#FFFFFF" />
                    </div>
                  </div>

                  <div>
                    <h3
                      style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: '1.15rem',
                        fontWeight: 700,
                        color: '#FFFFFF',
                        marginBottom: '0.15rem',
                        lineHeight: 1.2,
                      }}
                    >
                      {displayName}
                    </h3>
                    <span
                      style={{
                        fontSize: '0.78rem',
                        color: 'rgba(255, 255, 255, 0.85)',
                        fontWeight: 500,
                      }}
                    >
                      {item.count} {item.count === 1 ? 'restaurant' : 'restaurants'}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .cuisine-card:hover {
          transform: translateY(-3px);
          box-shadow: var(--shadow-md);
        }
        .cuisine-card:hover .cuisine-bg {
          transform: scale(1.08);
        }
        .cuisine-card:hover .cuisine-overlay {
          background: linear-gradient(180deg, rgba(36, 76, 58, 0.3) 0%, rgba(36, 76, 58, 0.9) 100%) !important;
        }
        .cuisine-card:hover .arrow-circle {
          transform: translate(2px, -2px);
          background-color: var(--accent-forest) !important;
        }
      `}</style>
    </section>
  );
}
