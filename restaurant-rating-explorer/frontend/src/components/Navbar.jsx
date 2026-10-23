import React, { useState, useEffect } from 'react';
import { Compass, Star, UtensilsCrossed, Info, Menu, X, Search } from 'lucide-react';

export default function Navbar({ onSearchFocus, totalCount = 130 }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        backgroundColor: scrolled ? 'rgba(250, 248, 244, 0.94)' : 'var(--bg-ivory)',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border-subtle)' : '1px solid transparent',
        transition: 'all 0.25s ease',
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '4.75rem',
        }}
      >
        {/* Brand Logo */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            textDecoration: 'none',
          }}
        >
          <div
            style={{
              width: '2.5rem',
              height: '2.5rem',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--accent-forest)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              boxShadow: '0 4px 10px rgba(36, 76, 58, 0.25)',
            }}
          >
            <UtensilsCrossed size={18} strokeWidth={2.2} />
          </div>
          <div>
            <span
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.35rem',
                fontWeight: 700,
                color: 'var(--text-charcoal)',
                letterSpacing: '-0.02em',
                display: 'block',
                lineHeight: 1.1,
              }}
            >
              Restaurant Explorer
            </span>
            <span
              style={{
                fontSize: '0.68rem',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: 'var(--text-stone)',
                fontWeight: 600,
              }}
            >
              CENIDET Culinary Guide
            </span>
          </div>
        </a>

        {/* Center Desktop Navigation */}
        <nav
          style={{
            display: 'none',
            alignItems: 'center',
            gap: '2rem',
          }}
          className="desktop-nav"
        >
          <button
            onClick={() => scrollTo('discover')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              color: 'var(--text-charcoal)',
              fontSize: '0.92rem',
              fontWeight: 500,
              padding: '0.4rem 0.2rem',
            }}
          >
            <Compass size={16} color="var(--accent-forest)" />
            Discover
          </button>
          <button
            onClick={() => scrollTo('top-rated')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              color: 'var(--text-charcoal)',
              fontSize: '0.92rem',
              fontWeight: 500,
              padding: '0.4rem 0.2rem',
            }}
          >
            <Star size={16} color="var(--highlight-terracotta)" />
            Top Rated
          </button>
          <button
            onClick={() => scrollTo('cuisines')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              color: 'var(--text-charcoal)',
              fontSize: '0.92rem',
              fontWeight: 500,
              padding: '0.4rem 0.2rem',
            }}
          >
            <UtensilsCrossed size={16} color="var(--accent-forest)" />
            Cuisines
          </button>
          <button
            onClick={() => scrollTo('about')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              color: 'var(--text-charcoal)',
              fontSize: '0.92rem',
              fontWeight: 500,
              padding: '0.4rem 0.2rem',
            }}
          >
            <Info size={16} color="var(--text-stone)" />
            About
          </button>
        </nav>

        {/* Right CTA / Search trigger */}
        <div
          style={{
            display: 'none',
            alignItems: 'center',
            gap: '1rem',
          }}
          className="desktop-actions"
        >
          <button
            onClick={onSearchFocus}
            title="Focus search input"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.5rem 0.9rem',
              borderRadius: 'var(--radius-full)',
              border: '1px solid var(--border-subtle)',
              backgroundColor: '#FFFFFF',
              color: 'var(--text-stone)',
              fontSize: '0.82rem',
            }}
          >
            <Search size={15} />
            <span>Search</span>
            <kbd
              style={{
                fontSize: '0.7rem',
                backgroundColor: 'var(--bg-ivory)',
                padding: '0.1rem 0.35rem',
                borderRadius: '4px',
                border: '1px solid var(--border-subtle)',
              }}
            >
              /
            </kbd>
          </button>
          <button
            onClick={() => scrollTo('discover')}
            className="btn-primary"
            style={{
              padding: '0.65rem 1.35rem',
              fontSize: '0.88rem',
            }}
          >
            Explore {totalCount} Tables
          </button>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '2.5rem',
            height: '2.5rem',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-subtle)',
            backgroundColor: '#FFFFFF',
            color: 'var(--text-charcoal)',
          }}
          className="mobile-toggle"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div
          style={{
            borderTop: '1px solid var(--border-subtle)',
            backgroundColor: '#FFFFFF',
            padding: '1.25rem 1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            boxShadow: 'var(--shadow-md)',
          }}
        >
          <button
            onClick={() => scrollTo('discover')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              fontSize: '1rem',
              fontWeight: 500,
              padding: '0.5rem 0',
              textAlign: 'left',
            }}
          >
            <Compass size={18} color="var(--accent-forest)" />
            Discover Restaurants
          </button>
          <button
            onClick={() => scrollTo('top-rated')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              fontSize: '1rem',
              fontWeight: 500,
              padding: '0.5rem 0',
              textAlign: 'left',
            }}
          >
            <Star size={18} color="var(--highlight-terracotta)" />
            Top Rated
          </button>
          <button
            onClick={() => scrollTo('cuisines')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              fontSize: '1rem',
              fontWeight: 500,
              padding: '0.5rem 0',
              textAlign: 'left',
            }}
          >
            <UtensilsCrossed size={18} color="var(--accent-forest)" />
            Explore Cuisines
          </button>
          <button
            onClick={() => scrollTo('about')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              fontSize: '1rem',
              fontWeight: 500,
              padding: '0.5rem 0',
              textAlign: 'left',
            }}
          >
            <Info size={18} color="var(--text-stone)" />
            About Project
          </button>
          <div style={{ paddingTop: '0.5rem', borderTop: '1px solid var(--border-subtle)' }}>
            <button
              onClick={() => scrollTo('discover')}
              className="btn-primary"
              style={{ width: '100%' }}
            >
              Explore {totalCount} Restaurants
            </button>
          </div>
        </div>
      )}

      {/* Media query styling for responsive navbar */}
      <style>{`
        @media (min-width: 860px) {
          .desktop-nav { display: flex !important; }
          .desktop-actions { display: flex !important; }
          .mobile-toggle { display: none !important; }
        }
      `}</style>
    </header>
  );
}
