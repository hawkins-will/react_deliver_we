const mongoose = require("mongoose");
// mongoose.connect("mongodb://localhost/deliverWe")
mongoose.connect("mongodb://willhawkins123:scourge123@ds163340.mlab.com:63340/heroku_02sq48jf")

const db = mongoose.connection

db.on("error", (err) => {
  console.log(err);
})

db.once("open", () => {
  console.log("database connected!");
})

module.exports = mongoose;
