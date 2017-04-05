"use strict";

const mongoose = require("../db/connection.js");
const Schema = mongoose.Schema;

var MenuItemSchema = new Schema({
    name: String,
    price: Number,
    description: String
});

var RestaurantSchema = new Schema({
  name: String,
  deliveryFee: Number,
  deliveryMin: Number,
  tax: Number,
  menuItems: [MenuItemSchema]
});

module.exports = mongoose.model("Restaurant", RestaurantSchema)
