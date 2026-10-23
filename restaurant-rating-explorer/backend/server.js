const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Home route
app.get("/", (req, res) => {
    res.json({
        message: "Restaurant Rating Explorer API is running!",
    });
});

// Health check
app.get("/api/health", (req, res) => {
    res.json({
        success: true,
        message: "Backend server is healthy",
    });
});

// Restaurant routes
const restaurantRoutes = require("./restaurants");
app.use("/api/restaurants", restaurantRoutes);

// Direct aliases for discovery and metadata
app.get("/api/cuisines", (req, res, next) => {
    req.url = "/meta/cuisines";
    restaurantRoutes(req, res, next);
});
app.get("/api/stats", (req, res, next) => {
    req.url = "/meta/stats";
    restaurantRoutes(req, res, next);
});

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});