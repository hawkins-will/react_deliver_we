const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/deliverWe")

const db = mongoose.connection

db.on("error", (err) => {
  console.log(err);
})

db.once("open", () => {
  console.log("database connected!");
  console.log("mongodb://heroku_bspfb4xt:8m3n67lp508v8ssqdq7pl8juge@ds163010.mlab.com:63010/heroku_bspfb4xt");
})

module.exports = mongoose;
