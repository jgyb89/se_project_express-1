require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const { errors } = require("celebrate");
const routes = require("./routes");
const errorHandler = require("./middlewares/error-handler");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const limiter = require("./middlewares/rateLimiter");

const { PORT = 3001 } = process.env;
const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db").catch((error) => {
  // eslint-disable-next-line no-console
  console.error("Database connection failed:", error);
  process.exit(1); // Exit the application if DB connection fails
});

app.use(cors());
app.use(helmet());
app.use(limiter);

// Middleware to parse incoming JSON payloads
app.use(express.json());

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Server will crash now');
  }, 0);
});

app.use("/", routes);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening at port ${PORT}`);
});

app.use(errorLogger); // enabling the error logger

app.use(errors());

app.use(errorHandler);
