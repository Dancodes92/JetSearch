const PORT = process.env.PORT || 3001;
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const path = require("path");

app.use(morgan("dev"));
app.use(bodyParser.json());

app.use("/api", require("./api"));

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
