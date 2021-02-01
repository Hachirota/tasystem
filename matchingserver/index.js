const express = require("express");

// Create express instance
const app = express();

// Add Request Body parsers
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Set port
const PORT = 3500;

// Load routes
app.use("/matching", require("./src/routes/matching"));

// Start server
app.listen(PORT, () => {
  console.log(`Matching server is running on port ${PORT}`);
});
