"use strict";

const mongoose = require("../db/connection.js");
const Schema = mongoose.Schema;

var PersonalOrderSchema = new Schema({
    name: String
});

var OrderSchema = new Schema({
  restaurant: String,
  personalOrders: [PersonalOrderSchema]
});

module.exports = mongoose.model("Order", OrderSchema)
