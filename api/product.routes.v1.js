var express = require('express');
var routes = express.Router();
var mongodb = require('../config/mongo.db');
var Product = require('../model/product.model');

//get all products
routes.get('/products', function (req, res) {
    res.contentType('application/json');

    Product.find({})
        .then(function (products) {
            res.status(200).json(products);
        })
        .catch((error) => {
        res.status(400).json(error);
    });
});

//get 1 product
routes.get('/products/:id', function (req, res) {
    res.contentType('application/json');
    Product.findOne({ _id: req.params.id })
        .then(function (products) {
            res.status(200).json(products);
        })
        .catch((error) => {
        res.status(400).json(error);
    });
});

//add product
routes.post('/products', function (req, res) {
    const b = req.body;

    const product = new Product({

        name: b.name,
        description: b.description,
        imagePath: b.imagePath,
        instock: b.instock,
        orderprice: b.orderprice
    });
    product.save()
        .then(() => res.status(200).json(product))
    .catch((error) => res.status(400).json(product));

});

//edit product
routes.put('/products/:id', function (req, res) {

    const b= req.body;

    const product = new Product({
        _id: b._id,
        name: b.name,
        description: b.description,
        imagePath: b.imagePath,
        instock: b.instock,
        orderprice: b.orderprice
    });
    Product.findOneAndUpdate({ _id: product._id }, { $set: {
        name: product.name,
        description: product.description,
        imagePath: product.imagePath,
        instock: product.instock,
        orderprice: product.orderprice
    }}).then(() => res.status(200).json(Product))
    .catch((error) => {
        res.status(400).json(error);
    });

});

//delete product
routes.delete('/products/:id', function (req, res) {

    Recipe.remove({"_id" :product._id})
            .then( res.status(200).json('OK'))
        .catch(res.status(400).json(error));
    });


module.exports = routes;