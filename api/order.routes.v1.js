//
// ./api/v1/user.routes.v1.js
//
var express = require('express');
var routes = express.Router();
var mongodb = require('../config/mongo.db');
var Order = require('../model/order.model');

//
// Geef een lijst van alle orders.
//
routes.get('/orders', function (req, res) {
    res.contentType('application/json');

    Order.find({})
        .then(function (orders) {
            res.status(200).json(orders);
        })
        .catch((error) => {
        res.status(400).json(error);
    });
});

//
// Voeg een user toe. De nieuwe info wordt gestuurd via de body van de request message.
// Vorm van de URL: POST http://hostname:3000/api/v1/users
//
routes.post('/orders/new', function (req, res) {
    console.log(req.body);
    const b = req.body;
    const order = new Order({
       name: b.name,
       description: b.description,
       Orderdate: b.date,
         supplier: b.supplier,
         product: b.product
    });
    order.save()
        .then(() => res.status(200).json(order))
    .catch((error) => res.status(400).json(error));

});

routes.put('/orders/:id', function (req, res) {
    const b= req.body;
    const order = new Order({
        name: b.name,
        description: b.description,
        Orderdate: b.date
    });

    Order.findOneAndUpdate({ _id: order._id }, { $set: {
        name: order.name,
        description: order.description,
        date: order.date
    }}).then(() => res.status(200).json(Order))
    .catch((error) => {
        res.status(400).json(error);
    });

});
module.exports = routes;