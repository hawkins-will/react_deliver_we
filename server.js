"use strict"

const express = require("express");
const mongoose = require('./db/connection.js');
const bodyParser = require('body-parser');
const Restaurant = require("./model/restaurants");
const Order = require("./model/orders");
const PastOrder = require("./model/pastOrders");
// const PersonalOrder = require("./model/personalOrders");

const app = express();
const router = express.Router();

const port = mongoose.connect("mongodb://willhawkins123:scourge123@ds163340.mlab.com:63340/heroku_02sq48jf")


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
    restaurant.deliveryFee = req.body.deliveryFee;
    restaurant.deliveryMin = req.body.deliveryMin;
    restaurant.tax = req.body.tax;
    restaurant.logo = req.body.logo;
    restaurant.save(function(err, restaurant) {
      if (err)
      res.send(err);
      res.json(restaurant);
    });
  });

router.route("/restaurants/:restaurant_id")
  .get(function(req, res) {
    Restaurant.findById(req.params.restaurant_id, function(err, restaurant) {
      if (err)
      res.send(err);
      res.json(restaurant)
    });
  })
  .put(function(req, res) {
    Restaurant.findById(req.params.restaurant_id, function(err, restaurant) {
      if (err)
      res.send(err);
      (req.body.logo) ? restaurant.logo = req.body.logo : null;
      (req.body.menuItems) ? restaurant.menuItems = req.body.menuItems : null;
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
      order.restaurantId = req.body.restaurantId;
      order.deliveryFee = req.body.deliveryFee;
      order.deliveryMin = req.body.deliveryMin;
      order.tax = req.body.tax;
      order.logo = req.body.logo;
      order.time = req.body.time;
      order.save(function(err, order) {
        if (err)
        res.send(err);
        res.json(order);
      });
    });

  router.route("/orders/:order_id")
    .get(function(req, res) {
      Order.findById(req.params.order_id, function(err, order) {
        if (err)
        res.send(err);
        res.json(order)
      });
    })
    .put(function(req, res) {
      Order.findById(req.params.order_id, function(err, order) {
        if (err)
        res.send(err);
        (req.body.restaurant) ? order.restaurant = req.body.restaurant : null;
        (req.body.personalOrders) ? order.personalOrders = req.body.personalOrders : null;
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

  router.route("/past_orders")
    .get(function(req, res) {
      PastOrder.find(function(err, orders) {
        if (err)
        res.send(err);
        res.json(orders)
      });
    })
    .post(function(req, res) {
      var order = new PastOrder();
      order.order = req.body.order;
      order.save(function(err, order) {
        if (err)
        res.send(err);
        res.json(order);
      });
    });

app.use("/api", router);

app.listen(process.env.PORT || 3001, function() {
 console.log(`api running on port ${port}`);
});
