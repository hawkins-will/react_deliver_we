const mongoose = require("mongoose");
mongoose.connect("mongodb://willhawkins:scourge123@ds163010.mlab.com:63010/heroku_bspfb4xt")

const db = mongoose.connection

db.on("error", (err) => {
  console.log(err);
})

db.once("open", () => {
  console.log("database connected!");
})

module.exports = mongoose;
