const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");

const { PORT = 3001 } = process.env;
const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db").catch((error) => {
  console.error("Database connection failed:", error);
  process.exit(1); // Exit the application if DB connection fails
});

// Middleware to parse incoming JSON payloads
app.use(express.json());

// Temporary Middleware
app.use((req, res, next) => {
  req.user = {
    // Postman test user ID
    _id: "69ceacfdaf46ee7a1097b852",
  };
  next();
});

app.use("/", routes);

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
