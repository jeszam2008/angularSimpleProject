const express = require('express');
const path = require('path');
const router = express(); // express.Router();
const bodyParser = require('body-parser');
const mysqlTrigger = require('../db/mysqlServerController');
const dbConnection = require('../db/dbConnection');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json({ type: 'application/vnd.api+json' }));


function getShippers(req, res) { 
    var searchKeyword = req.query['searchKeyword'];
    var searchFilter = advSearchFilter(req, searchKeyword);
    var query = "SELECT ShipperID, ShipperName, Phone, "
        + "(SELECT COUNT(ID) FROM shippers WHERE ShipperID <> '' " + searchFilter + ") AS TotalItems "
        + " FROM shippers WHERE ShipperID <> '' " + searchFilter;

    var queryData = [];

    mysqlTrigger.selectQuery(dbConnection.db_w3school, query, queryData, null, function(isValid, result) {
        setTimeout(function() { res.json(result); }, Math.floor(Math.random() * 0));
    });
}

function advSearchFilter(req, keyword) {
    var result = '';

    if (keyword && keyword != '.') {
        result += "AND (ShipperID LIKE '%" + keyword + "%' OR ShipperName LIKE '%" + keyword + "%') ";
    }

    if (req.body && req.body != '.') {
        if (req.body['1'] && req.body['1'] != '.') {
            result += "AND ShipperID = '" + req.body['1'] + "' ";
        } 

        if (req.body['2'] && req.body['2'] != '.') {
            result += "AND ShipperName = '" + req.body['2'] + "' ";
        } 
 
    }

    return result;
}

router.get('/shippers', function (req, res) {
    getShippers(req, res);
});

module.exports = router;