const express = require('express');
const path = require('path');
const router = express(); // express.Router();
const bodyParser = require('body-parser');
const mysqlTrigger = require('../db/mysqlServerController');
const dbConnection = require('../db/dbConnection');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json({ type: 'application/vnd.api+json' }));


function getProducts(req, res) { 
    var searchKeyword = req.query['searchKeyword'];
    var searchFilter = advSearchFilter(req, searchKeyword);
    var query = "SELECT ProductID, ProductName, SupplierID, CategoryID, Unit, Price, "
        + "(SELECT COUNT(ID) FROM products WHERE ProductID <> '' " + searchFilter + ") AS TotalItems "
        + " FROM products WHERE ProductID <> '' " + searchFilter;

    var queryData = [];

    mysqlTrigger.selectQuery(dbConnection.db_w3school, query, queryData, null, function(isValid, result) {
        setTimeout(function() { res.json(result); }, Math.floor(Math.random() * 0));
    });
}

function advSearchFilter(req, keyword) {
    var result = '';

    if (keyword && keyword != '.') {
        result += "AND (ProductID LIKE '%" + keyword + "%' OR ProductName LIKE '%" + keyword + "%' " 
            + "OR SupplierID LIKE '%" + keyword + "%' OR CategoryID LIKE '%" + keyword + "%') ";
    }

    if (req.body && req.body != '.') {
        if (req.body['1'] && req.body['1'] != '.') {
            result += "AND ProductID = '" + req.body['1'] + "' ";
        } 

        if (req.body['2'] && req.body['2'] != '.') {
            result += "AND ProductName = '" + req.body['2'] + "' ";
        } 

        if (req.body['3'] && req.body['3'] != '.') {
            result += "AND SupplierID = '" + req.body['3'] + "' ";
        } 

        if (req.body['4'] && req.body['4'] != '.') {
            result += "AND CategoryID = '" + req.body['4'] + "' ";
        } 
    }

    return result;
}

router.get('/products', function (req, res) {
    getProducts(req, res);
});

module.exports = router;