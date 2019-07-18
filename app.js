const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const monk = require("monk");
const path = require("path");

require("dotenv").config();

// Connect to MongoDB
const db = monk(
  `${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_URL}`
);
const balanceDB = db.get(`${process.env.DB_COLLECTION}`);

const app = express();

// Logger
app.use(morgan("tiny"));

// Cors
app.use(cors());

// Express body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + "/public"));

// Routes
app.use("/api/v1/db", async function(req, res, next) {
  const balance = await balanceDB.findOne({ _id: 1 });
  res.json(balance);
});

app.use("/", async function(req, res, next) {
  res.sendFile(path.join(__dirname + "/public/index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server started on port ${PORT}`));
