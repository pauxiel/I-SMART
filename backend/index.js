const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

require("dotenv").config();

// app
const app = express();

//db
mongoose
  .connect(process.env.DATABASE_CLOUD)
  .then(() => console.log("DB conected"));

// middlewares
app.use(morgan("dev"));
app.use(cookieParser());
app.use(bodyParser.json());

//cors
if ((process.env.NODE_ENV = "development")) {
  app.use(cors({ origin: `${process.env.CLIENT_URL}` }));
}

// routes
app.get("/api", (req, res) => {
  res.json({ time: Date().toString() });
});

//port
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
