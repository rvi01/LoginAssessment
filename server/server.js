const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const { readdirSync } = require("fs");

const app = express();

mongoose.connect(process.env.DATABASE, {
  useFindAndModify: true,
  useCreateIndex: true,
  useNewUrlParser: true,
});

app.use(morgan("dev"));
app.use(bodyParser({ limit: "2mb" }));
app.use(cors());


readdirSync("./routes").map((r) => app.use("/api", require("./routes/" + r)));

const port = process.env.PORT;
app.listen(port, () => console.log("App is running on port ", port));
