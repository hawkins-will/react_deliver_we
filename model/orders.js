"use strict";

const mongoose = require("../db/connection.js");
const Schema = mongoose.Schema;

var OrderSchema = new Schema({
  name: String
});

module.exports = mongoose.model("Order", OrderSchema)
