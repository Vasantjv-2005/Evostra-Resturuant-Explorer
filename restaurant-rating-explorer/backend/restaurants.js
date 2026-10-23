const express = require("express");
const router = express.Router();
const pool = require("./db");

// GET /api/restaurants/meta/cuisines - List of cuisines with restaurant counts
router.get("/meta/cuisines", async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT 
                rc.cuisine,
                COUNT(DISTINCT r.place_id)::int as count
            FROM public.restaurant_cuisines rc
            JOIN public.restaurants r ON rc.place_id = r.place_id
            GROUP BY rc.cuisine
            ORDER BY count DESC, rc.cuisine ASC
        `);
        res.json({
            success: true,
            count: result.rows.length,
            data: result.rows,
        });
    } catch (error) {
        console.error("Error fetching cuisines:", error.message);
        res.status(500).json({
            success: false,
            message: "Failed to fetch cuisines",
        });
    }
});

// GET /api/restaurants/meta/stats - Platform stats derived from real data
router.get("/meta/stats", async (req, res) => {
    try {
        const statsRes = await pool.query(`
            SELECT 
                (SELECT COUNT(*)::int FROM public.restaurants) as total_restaurants,
                (SELECT COUNT(*)::int FROM public.ratings) as total_ratings,
                (SELECT COUNT(DISTINCT city)::int FROM public.restaurants WHERE city IS NOT NULL AND city != '?') as total_cities,
                (SELECT COUNT(DISTINCT rc.cuisine)::int FROM public.restaurant_cuisines rc JOIN public.restaurants r ON rc.place_id = r.place_id) as total_cuisines
        `);
        res.json({
            success: true,
            data: statsRes.rows[0],
        });
    } catch (error) {
        console.error("Error fetching stats:", error.message);
        res.status(500).json({
            success: false,
            message: "Failed to fetch stats",
        });
    }
});

// GET /api/restaurants - All restaurants with cuisines
router.get("/", async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT 
                s.*,
                COALESCE(
                    (SELECT json_agg(rc.cuisine ORDER BY rc.cuisine) 
                     FROM public.restaurant_cuisines rc 
                     WHERE rc.place_id = s.place_id), 
                    '[]'::json
                ) AS cuisines
            FROM public.v_restaurant_summary s
            ORDER BY s.name ASC
        `);

        res.json({
            success: true,
            count: result.rows.length,
            data: result.rows,
        });
    } catch (error) {
        console.error("Error fetching restaurants:", error.message);
        res.status(500).json({
            success: false,
            message: "Failed to fetch restaurants",
        });
    }
});

// GET /api/restaurants/:placeId - Single restaurant detailed profile
router.get("/:placeId", async (req, res) => {
    try {
        const { placeId } = req.params;

        const summaryRes = await pool.query(`
            SELECT 
                s.*,
                r.address,
                r.zip,
                r.url,
                r.fax,
                r.franchise,
                r.area,
                r.other_services,
                COALESCE(
                    (SELECT json_agg(rc.cuisine ORDER BY rc.cuisine) 
                     FROM public.restaurant_cuisines rc 
                     WHERE rc.place_id = s.place_id), 
                    '[]'::json
                ) AS cuisines,
                COALESCE(
                    (SELECT json_agg(DISTINCT rp.payment_method ORDER BY rp.payment_method) 
                     FROM public.restaurant_payments rp 
                     WHERE rp.place_id = s.place_id), 
                    '[]'::json
                ) AS payments,
                COALESCE(
                    (SELECT json_agg(DISTINCT rk.parking_type ORDER BY rk.parking_type) 
                     FROM public.restaurant_parking rk 
                     WHERE rk.place_id = s.place_id), 
                    '[]'::json
                ) AS parking,
                COALESCE(
                    (SELECT json_agg(json_build_object('days', ro.days, 'hours', ro.hours)) 
                     FROM public.restaurant_operating_hours ro 
                     WHERE ro.place_id = s.place_id), 
                    '[]'::json
                ) AS operating_hours
            FROM public.v_restaurant_summary s
            JOIN public.restaurants r ON s.place_id = r.place_id
            WHERE s.place_id = $1
        `, [placeId]);

        if (summaryRes.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Restaurant not found",
            });
        }

        const restaurant = summaryRes.rows[0];

        // Fetch rating distributions (0, 1, 2)
        const ratingDistRes = await pool.query(`
            SELECT 
                rating,
                COUNT(*)::int as count
            FROM public.ratings
            WHERE place_id = $1
            GROUP BY rating
            ORDER BY rating ASC
        `, [placeId]);

        const foodDistRes = await pool.query(`
            SELECT 
                food_rating,
                COUNT(*)::int as count
            FROM public.ratings
            WHERE place_id = $1
            GROUP BY food_rating
            ORDER BY food_rating ASC
        `, [placeId]);

        const serviceDistRes = await pool.query(`
            SELECT 
                service_rating,
                COUNT(*)::int as count
            FROM public.ratings
            WHERE place_id = $1
            GROUP BY service_rating
            ORDER BY service_rating ASC
        `, [placeId]);

        const distribution = {
            overall: { 0: 0, 1: 0, 2: 0 },
            food: { 0: 0, 1: 0, 2: 0 },
            service: { 0: 0, 1: 0, 2: 0 },
        };

        ratingDistRes.rows.forEach(r => { distribution.overall[r.rating] = r.count; });
        foodDistRes.rows.forEach(r => { distribution.food[r.food_rating] = r.count; });
        serviceDistRes.rows.forEach(r => { distribution.service[r.service_rating] = r.count; });

        restaurant.rating_distribution = distribution;

        res.json({
            success: true,
            data: restaurant,
        });
    } catch (error) {
        console.error("Error fetching restaurant:", error.message);
        res.status(500).json({
            success: false,
            message: "Failed to fetch restaurant",
        });
    }
});

module.exports = router;