const assert = require('assert');
const Product = require('../model/product.model');
const Order = require('../model/order.model');
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server.js');
var chould = chai.should();

process.env.NODE_ENV = 'test';


chai.use(chaiHttp);

describe('POST METHODS', function() {


    it('create and save an order',function (done) {
        var product = new Product({_id:"5a2d63ef25172c3dd0694622",name:"testproduct", description:"testproductdescrip",imagePath: "testimage",instock:"8000"});
        var order = new Order({name:"testorder",description:"testdescription", orderdate:"testorder", supplier:"testsupplier",product:[product] });
        order.save()
            .then(function(){
            assert(!order.isNew);
        done();
        });
    });

    it('return specific order by ordername',function(done) {

        var product = new Product({_id:"5a2d63ef25172c3dd0694622",name:"testproduct", description:"testproductdescrip",imagePath: "testimage",instock:"8000"});
        var order = new Order({name:"testorder",description:"testdescription", orderdate:"testorder", supplier:"testsupplier",product:[product] });
        order.save()
            .then(function(){
                Order.find({name: 'testdescription'})
                .then(function(order) {
                    assert(order[0]._id.toString() === order._id.toString());
                    done();
                });// no catch

            });// no catch
    });


    it('API returns json', function(done) {

        var product = new Product({_id:"5a2d63ef25172c3dd0694622",name:"testproduct", description:"testproductdescrip",imagePath: "testimage",instock:"8000"});
        var order = new Order({name:"testorder",description:"testdescription", orderdate:"testorder", supplier:"testsupplier",product:[product] });

        chai.request(server).post('/orders')
            .send(order)
            .end(function(err, res) {
                res.should.be.json;//whether 200 or 400 etc. this should return json
                done();
            });
    });



});