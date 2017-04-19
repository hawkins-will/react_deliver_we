"use strict";

const mongoose = require("../db/connection.js");
const Schema = mongoose.Schema;

var PastOrderSchema = new Schema({
  order: Object
});

module.exports = mongoose.model("PastOrder", PastOrderSchema)
