"use strict";

const mongoose = require("../db/connection.js");
const Schema = mongoose.Schema;

var RestaurantSchema = new Schema({
  name: String
});

module.exports = mongoose.model("Restaurant", RestaurantSchema)
