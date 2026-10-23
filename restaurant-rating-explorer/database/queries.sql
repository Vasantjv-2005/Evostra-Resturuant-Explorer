-- ============================================================================
-- Verification & Exploration Queries: restaurant_explorer
-- PostgreSQL Queries for pgAdmin Query Tool
-- File: database/queries.sql
-- ============================================================================

-- ----------------------------------------------------------------------------
-- 1. Verify Table Record Counts
-- Expected row counts after importing data:
--   restaurants: 130
--   restaurant_cuisines: 916
--   restaurant_payments: 1,314
--   restaurant_operating_hours: 2,339
--   restaurant_parking: 702
--   ratings: 1,161
-- ----------------------------------------------------------------------------
SELECT 'restaurants' AS table_name, COUNT(*) AS row_count FROM public.restaurants
UNION ALL
SELECT 'restaurant_cuisines', COUNT(*) FROM public.restaurant_cuisines
UNION ALL
SELECT 'restaurant_payments', COUNT(*) FROM public.restaurant_payments
UNION ALL
SELECT 'restaurant_operating_hours', COUNT(*) FROM public.restaurant_operating_hours
UNION ALL
SELECT 'restaurant_parking', COUNT(*) FROM public.restaurant_parking
UNION ALL
SELECT 'ratings', COUNT(*) FROM public.ratings;

-- ----------------------------------------------------------------------------
-- 2. Verify Requirement 1 & 4: Preservation of Unmatched Cuisines
-- Verifies the exact data metrics:
--   - Total cuisines: 916
--   - Matched cuisine records: 112 (belonging to 95 distinct restaurants)
--   - Preserved unmatched cuisine records: 804 (belonging to 674 distinct restaurants)
--   - Surveyed restaurants lacking cuisines: 35
-- ----------------------------------------------------------------------------
SELECT 
    COUNT(*) AS total_cuisine_rows,
    COUNT(r.place_id) AS matched_cuisine_rows,
    COUNT(*) - COUNT(r.place_id) AS preserved_unmatched_rows,
    COUNT(DISTINCT CASE WHEN r.place_id IS NULL THEN rc.place_id END) AS unmatched_distinct_restaurants,
    COUNT(DISTINCT CASE WHEN r.place_id IS NOT NULL THEN rc.place_id END) AS matched_distinct_restaurants
FROM public.restaurant_cuisines rc
LEFT JOIN public.restaurants r ON rc.place_id = r.place_id;

-- ----------------------------------------------------------------------------
-- 3. Top-Rated Restaurants by Average Overall Rating
-- Note: Evaluates rated restaurants ordered by rating and review volume.
-- ----------------------------------------------------------------------------
SELECT 
    place_id,
    name,
    city,
    state,
    price,
    total_reviews,
    avg_overall_rating,
    avg_food_rating,
    avg_service_rating
FROM public.v_restaurant_summary
WHERE total_reviews > 0
ORDER BY avg_overall_rating DESC, total_reviews DESC
LIMIT 10;

-- ----------------------------------------------------------------------------
-- 4. Verify Requirement 7: Unrated Restaurants Preserve NULL Averages
-- Demonstrates that restaurants with 0 reviews retain NULL averages, allowing
-- applications to distinguish unrated places from those with an average score of 0.
-- ----------------------------------------------------------------------------
SELECT 
    place_id,
    name,
    city,
    total_reviews,
    avg_overall_rating,
    avg_food_rating,
    avg_service_rating
FROM public.v_restaurant_summary
WHERE total_reviews = 0 OR avg_overall_rating IS NULL
ORDER BY name ASC;

-- ----------------------------------------------------------------------------
-- 5. Restaurant Distribution by Matched Cuisine
-- ----------------------------------------------------------------------------
SELECT 
    rc.cuisine,
    COUNT(DISTINCT r.place_id) AS matched_restaurant_count
FROM public.restaurant_cuisines rc
JOIN public.restaurants r ON rc.place_id = r.place_id
GROUP BY rc.cuisine
ORDER BY matched_restaurant_count DESC;

-- ----------------------------------------------------------------------------
-- 6. Inspect Sample Preserved Unmatched Cuisines View (Requirement 1 & 4)
-- Surfaces ChefMoz cuisines preserved without dummy restaurants.
-- ----------------------------------------------------------------------------
SELECT 
    place_id,
    cuisine
FROM public.v_unmatched_cuisines
ORDER BY place_id ASC
LIMIT 15;

-- ----------------------------------------------------------------------------
-- 7. Search Active Restaurants with Parking and Accepted Payments
-- Combines public application tables for a comprehensive explorer view.
-- ----------------------------------------------------------------------------
SELECT 
    r.place_id,
    r.name,
    r.city,
    r.price,
    STRING_AGG(DISTINCT rc.cuisine, ', ') AS cuisines,
    STRING_AGG(DISTINCT rp.payment_method, ', ') AS accepted_payments,
    STRING_AGG(DISTINCT rk.parking_type, ', ') AS parking_options,
    s.avg_overall_rating,
    s.total_reviews
FROM public.restaurants r
LEFT JOIN public.restaurant_cuisines rc ON r.place_id = rc.place_id
LEFT JOIN public.restaurant_payments rp ON r.place_id = rp.place_id
LEFT JOIN public.restaurant_parking rk ON r.place_id = rk.place_id
LEFT JOIN public.v_restaurant_summary s ON r.place_id = s.place_id
GROUP BY r.place_id, r.name, r.city, r.price, s.avg_overall_rating, s.total_reviews
ORDER BY s.avg_overall_rating DESC NULLS LAST
LIMIT 10;
