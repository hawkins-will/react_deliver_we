const mongoose = require("mongoose");
mongoose.connect("mongodb://heroku_bspfb4xt:8m3n67lp508v8ssqdq7pl8juge@ds163010.mlab.com:63010/heroku_bspfb4xt")

const db = mongoose.connection

db.on("error", (err) => {
  console.log(err);
})

db.once("open", () => {
  console.log("database connected!");
})

module.exports = mongoose;
