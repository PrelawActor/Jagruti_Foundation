const db = require("../Config/db");

async function testConnection() {
    try {
        const connection = await db.getConnection();

        console.log("✅ Connected to MySQL successfully!");

        connection.release();
    } catch (error) {
        console.error("❌ Database Connection Failed");
        console.error(error);
    }
}

testConnection();