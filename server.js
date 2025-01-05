const express = require("express");
const dotenv = require("dotenv");
const mysql = require("mysql2");
const path = require("path");

// Load environment variables from the .env file
dotenv.config(); // Change the path if your .env file is located elsewhere

const app = express();

// Middleware to serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

// MySQL database connection configuration
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Test database connection
db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err.message);
    process.exit(1); // Exit the process if the database connection fails
  }
  console.log("Connected to the database!");
});

// Route to serve the main HTML file
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Route to fetch all records from the specified table
const tableName = process.env.TABLE_NAME;
app.get(`/api/${tableName}`, (req, res) => {
  if (!tableName) {
    return res
      .status(500)
      .send("Table name is not defined in the environment variables.");
  }

  const query = `SELECT * FROM ??`;
  db.query(query, [tableName], (err, results) => {
    if (err) {
      console.error("Database query failed:", err.message);
      return res.status(500).send("Database query failed.");
    }
    res.json(results);
  });
});

// Error handling for undefined routes
app.use((req, res) => {
  res.status(404).send("404 - Resource not found");
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
