"use strict";

const mongoose = require("../db/connection.js");
const Schema = mongoose.Schema;

var ItemSchema = new Schema({
  name: String,
  price: Number,
  description: String
});

var PersonalOrderSchema = new Schema({
  name: String,
  items: [ItemSchema]
});

var OrderSchema = new Schema({
  time: String,
  restaurant: String,
  restaurantId: String,
  deliveryFee: Number,
  deliveryMin: Number,
  tax: Number,
  personalOrders: [PersonalOrderSchema]
});

module.exports = mongoose.model("Order", OrderSchema)
