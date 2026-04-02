const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./routes/users");
const itemRouter = require("./routes/clothingItems");
const { NOT_FOUND } = require("./utils/errors");

const { PORT = 3001 } = process.env;
const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db");

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

// Mount routing
app.use("/users", userRouter);
app.use("/items", itemRouter);

// Handle cases when the client requests a non-existent resource
app.use((req, res) => {
  res.status(NOT_FOUND).send({ message: "Requested resource not found" });
});

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
