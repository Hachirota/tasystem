const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");

const connectDB = require("./config/db");

// Load environment variables
dotenv.config({ path: "./config/config.env" });

// Connect to database
connectDB();

// Create express instance
const app = express();

// Add Request Body parsers
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Add CORS middleware
app.use(cors());

// Add Dev Logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Load port env variable
const PORT = process.env.PORT || 3000;

// Load routes
app.use("/applicant", require("./routes/applicant"));
app.use("/client", require("./routes/client"));
app.use("/skills", require("./routes/skills"));

// Start server
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`);
});
