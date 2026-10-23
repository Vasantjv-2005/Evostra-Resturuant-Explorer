import React from 'react';
import { UtensilsCrossed, Database, Server, Code, Heart } from 'lucide-react';

export default function Footer() {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      id="about"
      style={{
        backgroundColor: '#FFFFFF',
        borderTop: '1px solid var(--border-subtle)',
        paddingTop: '4.5rem',
        paddingBottom: '3rem',
        color: 'var(--text-stone)',
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '3rem',
            marginBottom: '3.5rem',
          }}
        >
          {/* Brand & Description */}
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                marginBottom: '1rem',
              }}
            >
              <div
                style={{
                  width: '2.25rem',
                  height: '2.25rem',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--accent-forest)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF',
                }}
              >
                <UtensilsCrossed size={16} />
              </div>
              <span
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.35rem',
                  fontWeight: 700,
                  color: 'var(--text-charcoal)',
                }}
              >
                Restaurant Explorer
              </span>
            </div>

            <p style={{ fontSize: '0.9rem', lineHeight: 1.65, maxWidth: '340px', marginBottom: '1.5rem' }}>
              A curated restaurant discovery and community ratings platform built on authentic
              recommender systems data from CENIDET, Mexico.
            </p>

            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.8rem',
                backgroundColor: 'var(--bg-ivory)',
                padding: '0.4rem 0.85rem',
                borderRadius: 'var(--radius-full)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--accent-forest)',
                fontWeight: 600,
              }}
            >
              <Database size={14} />
              130 Surveyed Venues &bull; 1,161 Verified Ratings
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div>
            <h4
              style={{
                fontSize: '0.95rem',
                fontWeight: 700,
                color: 'var(--text-charcoal)',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                marginBottom: '1.25rem',
                fontFamily: 'var(--font-sans)',
              }}
            >
              Navigation
            </h4>

            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem' }}>
              <li>
                <button
                  onClick={() => scrollTo('discover')}
                  style={{ color: 'var(--text-stone)', transition: 'color 0.2s' }}
                  className="footer-link"
                >
                  Discover Restaurants
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('top-rated')}
                  style={{ color: 'var(--text-stone)', transition: 'color 0.2s' }}
                  className="footer-link"
                >
                  Top-Rated Establishments
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('cuisines')}
                  style={{ color: 'var(--text-stone)', transition: 'color 0.2s' }}
                  className="footer-link"
                >
                  Culinary Categories
                </button>
              </li>
              <li>
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  style={{ color: 'var(--text-stone)', transition: 'color 0.2s' }}
                  className="footer-link"
                >
                  Back to Top
                </button>
              </li>
            </ul>
          </div>

          {/* Research Context & Technical Credits */}
          <div>
            <h4
              style={{
                fontSize: '0.95rem',
                fontWeight: 700,
                color: 'var(--text-charcoal)',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                marginBottom: '1.25rem',
                fontFamily: 'var(--font-sans)',
              }}
            >
              Research &amp; Technology
            </h4>

            <p style={{ fontSize: '0.86rem', lineHeight: 1.6, marginBottom: '0.85rem' }}>
              <strong>Dataset:</strong> Restaurant &amp; Consumer Data (CENIDET, RecSys'11), Department
              of Computer Science, National Center for Research and Technological Development, Mexico.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.82rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Database size={13} color="var(--accent-forest)" />
                <span>PostgreSQL 18 Database Engine</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Server size={13} color="var(--accent-forest)" />
                <span>Express &amp; Node.js REST API</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Code size={13} color="var(--accent-forest)" />
                <span>React 19 &bull; Vite 8 Frontend</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Banner */}
        <div
          style={{
            paddingTop: '2rem',
            borderTop: '1px solid var(--border-subtle)',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            fontSize: '0.85rem',
          }}
        >
          <div>&copy; {new Date().getFullYear()} Restaurant Rating Explorer. All rights reserved.</div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              color: 'var(--accent-forest)',
              fontWeight: 500,
              fontStyle: 'italic',
            }}
          >
            <span>Made for the love of good food.</span>
            <Heart size={14} fill="var(--highlight-terracotta)" color="var(--highlight-terracotta)" />
          </div>
        </div>
      </div>

      <style>{`
        .footer-link:hover {
          color: var(--accent-forest) !important;
          text-decoration: underline;
        }
      `}</style>
    </footer>
  );
}
