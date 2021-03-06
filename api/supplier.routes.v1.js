var express = require('express');
var routes = express.Router();
var neo4j = require('neo4j-driver').v1;
var driver = neo4j.driver("bolt://hobby-allpbepjgmiigbkebfaeeial.dbs.graphenedb.com:24786", neo4j.auth.basic("admin", "b.Nzga2JV4uXWY.6kKkJ0npOY2arLcz"));
// var driver = neo4j.driver('bolt://localhost',neo4j.auth.basic("neo4j","neo4j"));
var session = driver.session();
var Supplier = require('../model/supplier.model');

//get all suppliers
routes.get('/suppliers', function (req, res) {
    res.contentType('application/json');
     session.run("MATCH (n:Supplier)RETURN n")
    .then(function(result){
        var supplierArray = [];
        result.records.forEach(function(record){
                supplierArray.push({
                    id: record._fields[0].identity.low,
                    name: record._fields[0].properties.name,
                    age: record._fields[0].properties.age,
                    telnummer: record._fields[0].properties.telnummer                    
                })            
            });
            res.status(200).json(supplierArray)        
    })
    .catch(function(error){
        console.log(error);
    })
});

//get 1 supplier
routes.get('/suppliers/:id', function (req, res) {
    res.contentType('application/json');
    const name = req.params.id;
  session.run("MATCH (n:Supplier) WHERE toLower(n.name) CONTAINS toLower('"+name+"') RETURN { id:ID(n), name: n.name, age: n.age, telnummer: n.teltelnummer } as User")
        .then(function (result) {
            // console.log(result);
            var supplier;
            var tmpArr = [];
            result.records.forEach(function (record){
                // console.log(record._fields);
                var tmpId;
                var tmpName;
                var tmpAge;
                var tmpTelnummer;
                var tmp = new Supplier(record._fields);
                var tempSupplier = [];
                var tmpNodes = tmp._node[0];
                tmpId = tmpNodes.id.low;  
                tmpName = tmpNodes.name;
                tmpAge = tmpNodes.age;
                tmpTelnummer = tmpNodes.telnummer;
                tempSupplier.push(tmpId);
                tempSupplier.push(tmpName);
                tempSupplier.push(tmpAge);
                tempSupplier.push(tmpTelnummer);

                tmpArr.push(tempSupplier);
                console.log(tmpArr);            
           
            })
            res.status(200).json(tmpArr);
        })
        .catch((error) => {
        console.log(error);
    });
});

//add supplier
routes.post('/suppliers', function (req, res) {
    const b = req.body;  
    session.run("CREATE (n:Supplier {name: '"+b.name+"', age:'"+b.age+"', telnummer:'"+b.telnummer+"'})")
    .then(function(supplier) {
        res.status(200).json(supplier);
    })
    .catch((error) => res.status(400).json(supplier));

});

//edit supplier
routes.put('/suppliers/:id', function (req, res) {

    const name = req.params.name;
    const supplier = new Supplier({
        _id: b._id,
        name: b.name,
        age: b.age,
        telnummer: b.telnummer
    });
    session.run("Match(n:Supplier) Where n.name = '"+name+"' Create (b:Order {name: 'relorder', description: 'made during request'})<-[rel:Assigned_To]-(n)")
    .then(() => res.status(200).json(Supplier))
    .catch((error) => {
        res.status(400).json(error);
    });

});
module.exports = routes;