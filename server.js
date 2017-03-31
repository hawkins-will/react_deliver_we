"use strict"

const express = require("express");
const mongoose = require('./db/connection.js');
const bodyParser = require('body-parser');
const Restaurant = require("./model/restaurants");

const app = express();
const router = express.Router();

const port = process.env.API_PORT || 3001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
 res.setHeader("Access-Control-Allow-Origin", "*");
 res.setHeader("Access-Control-Allow-Credentials", "true");
 res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
 res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
 res.setHeader("Cache-Control", "no-cache");
 next();
});

router.get("/", function(req, res) {
 res.json({ message: "API Initialized!"});
});

router.route("/restaurants")
  .get(function(req, res) {
    Restaurant.find(function(err, restaurants) {
      if (err)
      res.send(err);
      res.json(restaurants)
    });
  })
  .post(function(req, res) {
    var restaurant = new Restaurant();
    restaurant.name = req.body.name;
    restaurant.save(function(err) {
      if (err)
      res.send(err);
      res.json({ message: "Restaurant successfully added!" });
    });
 });

app.use("/api", router);

app.listen(port, function() {
 console.log(`api running on port ${port}`);
});
