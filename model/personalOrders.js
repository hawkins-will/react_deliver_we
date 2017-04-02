"use strict";

const mongoose = require("../db/connection.js");
const Schema = mongoose.Schema;

var PersonalOrderSchema = new Schema({
  name: String,
  orderId: String
});

module.exports = mongoose.model("PersonalOrder", PersonalOrderSchema)
