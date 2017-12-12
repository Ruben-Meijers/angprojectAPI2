var neo4j = require('neo4j-driver').v1;
// var driver = neo4j.driver('bolt://localhost',neo4j.auth.basic("neo4j","neo4j"));
var driver = neo4j.driver("bolt://hobby-allpbepjgmiigbkebfaeeial.dbs.graphenedb.com:24786", neo4j.auth.basic("admin", "b.Nzga2JV4uXWY.6kKkJ0npOY2arLcz"));
var session = driver.session();
var Supplier = module.exports = function Supplier(_node) {
    this._node = _node;
}