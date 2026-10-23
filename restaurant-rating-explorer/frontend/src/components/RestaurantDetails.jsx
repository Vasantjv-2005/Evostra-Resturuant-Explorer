import React, { useEffect, useState } from 'react';
import {
  X,
  MapPin,
  Clock,
  CreditCard,
  Car,
  Wine,
  Cigarette,
  ShieldAlert,
  Globe,
  Utensils,
  Sparkles,
  DollarSign,
  Shirt,
  Accessibility,
  Building2,
  Calendar,
} from 'lucide-react';
import { fetchRestaurantDetails } from '../services/api';
import { getRestaurantImage } from '../utils/imageHelper';
import RatingDistribution from './RatingDistribution';

export default function RestaurantDetails({ placeId, onClose }) {
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!placeId) return;

    let mounted = true;
    setLoading(true);
    setError(null);

    fetchRestaurantDetails(placeId)
      .then((data) => {
        if (mounted) {
          setRestaurant(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (mounted) {
          setError('Could not load restaurant details.');
          setLoading(false);
        }
      });

    // Handle ESC key to close modal
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    // Prevent body scroll while modal is open
    document.body.style.overflow = 'hidden';

    return () => {
      mounted = false;
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [placeId, onClose]);

  if (!placeId) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.25rem',
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="restaurant-detail-title"
    >
      {/* Backdrop Overlay */}
      <div
        onClick={onClose}
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(32, 35, 31, 0.65)',
          backdropFilter: 'blur(6px)',
          animation: 'fadeIn 0.25s ease',
        }}
      />

      {/* Modal Dialog Card */}
      <div
        style={{
          position: 'relative',
          zIndex: 101,
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--radius-xl)',
          width: '100%',
          maxWidth: '820px',
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: 'var(--shadow-modal)',
          border: '1px solid var(--border-subtle)',
          animation: 'modalSlideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close restaurant details"
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            zIndex: 10,
            width: '2.5rem',
            height: '2.5rem',
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            boxShadow: 'var(--shadow-md)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--text-charcoal)',
            border: '1px solid var(--border-subtle)',
          }}
          className="modal-close-btn"
        >
          <X size={20} />
        </button>

        {loading ? (
          <div style={{ padding: '3rem', textAlign: 'center' }}>
            <div className="skeleton" style={{ height: '240px', width: '100%', borderRadius: 'var(--radius-lg)', marginBottom: '1.5rem' }} />
            <div className="skeleton" style={{ height: '32px', width: '50%', margin: '0 auto 1rem' }} />
            <div className="skeleton" style={{ height: '20px', width: '70%', margin: '0 auto 2rem' }} />
            <div className="skeleton" style={{ height: '140px', width: '100%', borderRadius: 'var(--radius-lg)' }} />
          </div>
        ) : error || !restaurant ? (
          <div style={{ padding: '4rem 2rem', textAlign: 'center' }}>
            <div
              style={{
                width: '3.5rem',
                height: '3.5rem',
                borderRadius: '50%',
                backgroundColor: '#FFEBEE',
                color: '#C62828',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem',
              }}
            >
              <ShieldAlert size={28} />
            </div>
            <h3 style={{ fontSize: '1.35rem', marginBottom: '0.5rem' }}>Unable to Load Profile</h3>
            <p style={{ color: 'var(--text-stone)', marginBottom: '1.5rem' }}>{error}</p>
            <button onClick={onClose} className="btn-secondary">
              Close Window
            </button>
          </div>
        ) : (
          <div>
            {/* Header Banner Image */}
            <div style={{ position: 'relative', height: '270px', overflow: 'hidden' }}>
              <img
                src={getRestaurantImage(restaurant)}
                alt={restaurant.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'linear-gradient(180deg, rgba(32, 35, 31, 0.15) 0%, rgba(32, 35, 31, 0.75) 100%)',
                }}
              />

              <div
                style={{
                  position: 'absolute',
                  bottom: '1.5rem',
                  left: '1.75rem',
                  right: '1.75rem',
                  color: '#FFFFFF',
                }}
              >
                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
                  {restaurant.cuisines?.map((c) => (
                    <span
                      key={c}
                      style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        color: 'var(--accent-forest)',
                        fontSize: '0.74rem',
                        fontWeight: 700,
                        padding: '0.25rem 0.65rem',
                        borderRadius: 'var(--radius-full)',
                      }}
                    >
                      {c.replace(/_/g, ' ')}
                    </span>
                  ))}
                  {restaurant.price && (
                    <span
                      style={{
                        backgroundColor: 'rgba(36, 76, 58, 0.85)',
                        color: '#FFFFFF',
                        fontSize: '0.74rem',
                        fontWeight: 600,
                        padding: '0.25rem 0.65rem',
                        borderRadius: 'var(--radius-full)',
                      }}
                    >
                      Price: {restaurant.price.toUpperCase()}
                    </span>
                  )}
                </div>

                <h2
                  id="restaurant-detail-title"
                  style={{
                    color: '#FFFFFF',
                    fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)',
                    fontWeight: 700,
                    lineHeight: 1.2,
                  }}
                >
                  {restaurant.name}
                </h2>
              </div>
            </div>

            {/* Modal Body Content */}
            <div style={{ padding: '2rem' }}>
              {/* Overview & Quick Info */}
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '1.25rem',
                  alignItems: 'center',
                  paddingBottom: '1.5rem',
                  marginBottom: '1.75rem',
                  borderBottom: '1px solid var(--border-subtle)',
                  fontSize: '0.9rem',
                  color: 'var(--text-stone)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <MapPin size={17} color="var(--accent-forest)" />
                  <span>
                    {[restaurant.address, restaurant.city, restaurant.state, restaurant.country]
                      .filter((val) => val && val !== '?')
                      .join(', ') || 'Location details unavailable'}
                  </span>
                </div>

                {restaurant.zip && restaurant.zip !== '?' && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Building2 size={16} />
                    <span>Postal Code: {restaurant.zip}</span>
                  </div>
                )}

                {restaurant.url && restaurant.url !== '?' && restaurant.url !== 'no' && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Globe size={16} color="var(--accent-forest)" />
                    <a
                      href={`http://${restaurant.url.replace(/^https?:\/\//, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: 'var(--accent-forest)', textDecoration: 'underline' }}
                    >
                      {restaurant.url}
                    </a>
                  </div>
                )}
              </div>

              {/* Ratings Visualization Section */}
              <div style={{ marginBottom: '2rem' }}>
                <RatingDistribution
                  avgOverall={restaurant.avg_overall_rating}
                  avgFood={restaurant.avg_food_rating}
                  avgService={restaurant.avg_service_rating}
                  totalReviews={restaurant.total_reviews}
                  distribution={restaurant.rating_distribution}
                />
              </div>

              {/* Two-Column Grid: Operating Hours & Amenities */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                  gap: '1.75rem',
                }}
              >
                {/* Operating Hours */}
                <div
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid var(--border-subtle)',
                    padding: '1.5rem',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      marginBottom: '1rem',
                      color: 'var(--accent-forest)',
                      fontWeight: 700,
                    }}
                  >
                    <Clock size={18} />
                    <h4 style={{ fontSize: '1.05rem', margin: 0 }}>Operating Hours</h4>
                  </div>

                  {restaurant.operating_hours && restaurant.operating_hours.length > 0 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                      {restaurant.operating_hours.map((schedule, i) => (
                        <div
                          key={i}
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            fontSize: '0.85rem',
                            padding: '0.45rem 0',
                            borderBottom:
                              i < restaurant.operating_hours.length - 1
                                ? '1px dashed var(--border-subtle)'
                                : 'none',
                          }}
                        >
                          <span style={{ fontWeight: 600, color: 'var(--text-charcoal)' }}>
                            {schedule.days.replace(/;/g, ' ').trim()}
                          </span>
                          <span style={{ color: 'var(--text-stone)', fontFamily: 'var(--font-sans)' }}>
                            {schedule.hours.replace(/;/g, '').trim()}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p style={{ fontSize: '0.86rem', color: 'var(--text-stone)' }}>
                      Schedule details not provided in the survey record.
                    </p>
                  )}
                </div>

                {/* Amenities, Payments & Parking */}
                <div
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid var(--border-subtle)',
                    padding: '1.5rem',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      marginBottom: '1rem',
                      color: 'var(--accent-forest)',
                      fontWeight: 700,
                    }}
                  >
                    <Sparkles size={18} />
                    <h4 style={{ fontSize: '1.05rem', margin: 0 }}>Amenities &amp; Services</h4>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.86rem' }}>
                    {/* Payments */}
                    <div>
                      <div style={{ fontWeight: 600, color: 'var(--text-charcoal)', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        <CreditCard size={15} color="var(--accent-forest)" />
                        Accepted Payment Methods:
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                        {restaurant.payments && restaurant.payments.length > 0 ? (
                          restaurant.payments.map((p) => (
                            <span key={p} className="badge badge-outline" style={{ fontSize: '0.75rem' }}>
                              {p.replace(/_/g, ' ')}
                            </span>
                          ))
                        ) : (
                          <span style={{ color: 'var(--text-stone)' }}>Cash only / Not recorded</span>
                        )}
                      </div>
                    </div>

                    {/* Parking */}
                    <div>
                      <div style={{ fontWeight: 600, color: 'var(--text-charcoal)', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        <Car size={15} color="var(--accent-forest)" />
                        Parking Facilities:
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                        {restaurant.parking && restaurant.parking.length > 0 ? (
                          restaurant.parking.map((pk) => (
                            <span key={pk} className="badge badge-sage" style={{ fontSize: '0.75rem' }}>
                              {pk.replace(/_/g, ' ')}
                            </span>
                          ))
                        ) : (
                          <span style={{ color: 'var(--text-stone)' }}>None listed</span>
                        )}
                      </div>
                    </div>

                    {/* Alcohol & Smoking */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', paddingTop: '0.5rem', borderTop: '1px solid var(--border-subtle)' }}>
                      <div>
                        <span style={{ color: 'var(--text-stone)', fontSize: '0.75rem', display: 'block' }}>
                          ALCOHOL POLICY
                        </span>
                        <span style={{ fontWeight: 600, color: 'var(--text-charcoal)' }}>
                          {restaurant.alcohol?.replace(/_/g, ' ') || 'None'}
                        </span>
                      </div>

                      <div>
                        <span style={{ color: 'var(--text-stone)', fontSize: '0.75rem', display: 'block' }}>
                          SMOKING AREA
                        </span>
                        <span style={{ fontWeight: 600, color: 'var(--text-charcoal)' }}>
                          {restaurant.smoking_area?.replace(/_/g, ' ') || 'None'}
                        </span>
                      </div>

                      <div>
                        <span style={{ color: 'var(--text-stone)', fontSize: '0.75rem', display: 'block' }}>
                          DRESS CODE
                        </span>
                        <span style={{ fontWeight: 600, color: 'var(--text-charcoal)' }}>
                          {restaurant.dress_code || 'Casual'}
                        </span>
                      </div>

                      <div>
                        <span style={{ color: 'var(--text-stone)', fontSize: '0.75rem', display: 'block' }}>
                          ACCESSIBILITY
                        </span>
                        <span style={{ fontWeight: 600, color: 'var(--text-charcoal)' }}>
                          {restaurant.accessibility?.replace(/_/g, ' ') || 'Standard'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes modalSlideUp {
          from {
            opacity: 0;
            transform: translateY(24px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .modal-close-btn:hover {
          background-color: #FFFFFF !important;
          transform: scale(1.08);
        }
      `}</style>
    </div>
  );
}
