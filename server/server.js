const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cardRoutes = require("./routes/cardRoutes");
require("dotenv").config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB using environment variables
mongoose
  .connect(process.env.DB_URL, {
    // Add any other options as needed
  })
  .then(() => console.log("MongoDB Connected!"))
  .catch((err) => console.log(err));

app.use(bodyParser.json());

// Use answer routes
app.use("/card", cardRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
