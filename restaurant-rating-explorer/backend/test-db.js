const pool = require("./db");

async function testConnection() {
    try {
        const result = await pool.query(`
      SELECT current_database() AS database_name,
             version() AS postgres_version
    `);

        console.log("✅ PostgreSQL connected successfully!");
        console.log("Database:", result.rows[0].database_name);
        console.log("Version:", result.rows[0].postgres_version);
    } catch (error) {
        console.error("❌ Database connection failed:", error.message);
    } finally {
        await pool.end();
    }
}

testConnection();