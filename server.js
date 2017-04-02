"use strict"

const express = require("express");
const mongoose = require('./db/connection.js');
const bodyParser = require('body-parser');
const Restaurant = require("./model/restaurants");
const Order = require("./model/orders");

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

router.route("/restaurants/:restaurant_id")
  .put(function(req, res) {
    Restaurant.findById(req.params.restaurant_id, function(err, restaurant) {
      if (err)
      res.send(err);
      (req.body.name) ? restaurant.name = req.body.name : null;
      restaurant.save(function(err) {
        if (err)
        res.send(err);
        res.json({ message: "Restaurant has been updated" })
      })
    })
  })
  .delete(function(req, res) {
    Restaurant.remove({ _id: req.params.restaurant_id }, function(err, restaurant) {
      if (err)
      res.send(err)
      res.json({ message: "Restaurant has been deleted" })
    })
  })

  router.route("/orders")
    .get(function(req, res) {
      Order.find(function(err, orders) {
        if (err)
        res.send(err);
        res.json(orders)
      });
    })
    .post(function(req, res) {
      var order = new Order();
      order.restaurant = req.body.restaurant;
      order.save(function(err) {
        if (err)
        res.send(err);
        res.json({ message: "Order successfully added!" });
      });
    });

  router.route("/orders/:order_id")
    .put(function(req, res) {
      Order.findById(req.params.order_id, function(err, order) {
        if (err)
        res.send(err);
        (req.body.restaurant) ? order.restaurant = req.body.restaurant : null;
        order.save(function(err) {
          if (err)
          res.send(err);
          res.json({ message: "Order has been updated" })
        })
      })
    })
    .delete(function(req, res) {
      Order.remove({ _id: req.params.order_id }, function(err, order) {
        if (err)
        res.send(err)
        res.json({ message: "Order has been deleted" })
      })
    })


app.use("/api", router);

app.listen(port, function() {
 console.log(`api running on port ${port}`);
});
