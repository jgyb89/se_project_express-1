const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require("./routes");

const { PORT = 3001 } = process.env;
const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db").catch((error) => {
  console.error("Database connection failed:", error);
  process.exit(1); // Exit the application if DB connection fails
});

app.use(cors());

// Middleware to parse incoming JSON payloads
app.use(express.json());

// Temporary Middleware for testing
app.use((req, res, next) => {
  req.user = {
    _id: "5d8b8592978f8bd833ca8133",
  };
  next();
});

app.use("/", routes);

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
