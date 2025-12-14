import pool from "../config/db.js";

async function testConnection() {
  try {
    const [rows] = await pool.query("SELECT 1 + 1 AS result");
    console.log("Conexión exitosa ✅ Resultado:", rows[0].result);
  } catch (error) {
    console.error("Error de conexión ❌:", error);
  }
}

testConnection();