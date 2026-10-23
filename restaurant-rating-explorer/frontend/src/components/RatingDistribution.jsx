import React, { useState } from 'react';
import { Star, BarChart3, Utensils, Award } from 'lucide-react';

export default function RatingDistribution({
  avgOverall,
  avgFood,
  avgService,
  totalReviews,
  distribution,
}) {
  const [activeTab, setActiveTab] = useState('overall'); // 'overall' | 'food' | 'service'

  const currentDist = distribution?.[activeTab] || { 0: 0, 1: 0, 2: 0 };
  const totalInDist =
    (currentDist[0] || 0) + (currentDist[1] || 0) + (currentDist[2] || 0);

  const getPercentage = (count) => {
    if (!totalInDist || totalInDist === 0) return 0;
    return Math.round((count / totalInDist) * 100);
  };

  const scaleDescriptions = [
    { score: 2, label: 'High / Exceptional', color: '#244C3A', bg: 'var(--accent-sage)' },
    { score: 1, label: 'Medium / Satisfactory', color: '#B78103', bg: '#FFF8E1' },
    { score: 0, label: 'Low / Basic', color: '#C62828', bg: '#FFEBEE' },
  ];

  return (
    <div
      style={{
        backgroundColor: 'var(--bg-ivory)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border-subtle)',
        padding: '1.5rem',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          marginBottom: '1.25rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <BarChart3 size={18} color="var(--accent-forest)" />
          <h4 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0 }}>
            Rating Breakdown &amp; Distribution
          </h4>
        </div>

        {/* Tab switchers: Overall / Food / Service */}
        <div
          style={{
            display: 'flex',
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-full)',
            padding: '0.2rem',
            border: '1px solid var(--border-subtle)',
          }}
        >
          {[
            { id: 'overall', label: 'Overall' },
            { id: 'food', label: 'Food' },
            { id: 'service', label: 'Service' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '0.25rem 0.75rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.78rem',
                fontWeight: 600,
                backgroundColor: activeTab === tab.id ? 'var(--accent-forest)' : 'transparent',
                color: activeTab === tab.id ? '#FFFFFF' : 'var(--text-stone)',
                transition: 'all 0.2s ease',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Metric Highlights Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1rem',
          marginBottom: '1.5rem',
          paddingBottom: '1.25rem',
          borderBottom: '1px solid var(--border-subtle)',
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '0.74rem', color: 'var(--text-stone)', fontWeight: 600, textTransform: 'uppercase' }}>
            Overall Rating
          </div>
          <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--accent-forest)' }}>
            {avgOverall ? `${avgOverall} / 2.0` : 'Unrated'}
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '0.74rem', color: 'var(--text-stone)', fontWeight: 600, textTransform: 'uppercase' }}>
            Food Quality
          </div>
          <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-charcoal)' }}>
            {avgFood ? `${avgFood} / 2.0` : '—'}
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '0.74rem', color: 'var(--text-stone)', fontWeight: 600, textTransform: 'uppercase' }}>
            Service Level
          </div>
          <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-charcoal)' }}>
            {avgService ? `${avgService} / 2.0` : '—'}
          </div>
        </div>
      </div>

      {/* Bar Distribution Chart */}
      {totalInDist > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {scaleDescriptions.map(({ score, label, color, bg }) => {
            const count = currentDist[score] || 0;
            const pct = getPercentage(count);

            return (
              <div key={score}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '0.82rem',
                    marginBottom: '0.3rem',
                  }}
                >
                  <span style={{ fontWeight: 600, color: 'var(--text-charcoal)' }}>
                    Score {score} — {label}
                  </span>
                  <span style={{ color: 'var(--text-stone)', fontWeight: 500 }}>
                    {count} ratings ({pct}%)
                  </span>
                </div>

                <div
                  style={{
                    height: '10px',
                    width: '100%',
                    backgroundColor: '#EAE7E0',
                    borderRadius: 'var(--radius-full)',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      height: '100%',
                      width: `${pct}%`,
                      backgroundColor: color,
                      borderRadius: 'var(--radius-full)',
                      transition: 'width 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p style={{ fontSize: '0.85rem', color: 'var(--text-stone)', textAlign: 'center', margin: '1rem 0' }}>
          No individual ratings recorded yet for this table.
        </p>
      )}

      {/* Scale Notice */}
      <div
        style={{
          marginTop: '1.25rem',
          paddingTop: '0.85rem',
          borderTop: '1px solid var(--border-subtle)',
          fontSize: '0.75rem',
          color: 'var(--text-light)',
          lineHeight: 1.5,
        }}
      >
        ℹ️ <strong>CENIDET Discrete Scale:</strong> Ratings in this dataset range strictly from 0 to 2
        (0 = Low, 1 = Medium, 2 = High).
      </div>
    </div>
  );
}
