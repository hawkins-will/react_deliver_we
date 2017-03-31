const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/deliverWe")

const db = mongoose.connection

db.on("error", (err) => {
  console.log(err);
})

db.once("open", () => {
  console.log("database connected!");
})

module.exports = mongoose;
