const express = require('express');
const path = require('path');
const router = express(); // express.Router();
const bodyParser = require('body-parser');
const mysqlTrigger = require('../db/mysqlServerController');
const dbConnection = require('../db/dbConnection');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json({ type: 'application/vnd.api+json' }));


function getSuppliers(req, res) { 
    var searchKeyword = req.query['searchKeyword'];
    var searchFilter = advSearchFilter(req, searchKeyword);
    var query = "SELECT SupplierID, SupplierName, ContactName, Address, City, PostalCode, Country, Phone, "
        + "(SELECT COUNT(ID) FROM suppliers WHERE SupplierID <> '' " + searchFilter + ") AS TotalItems "
        + " FROM suppliers WHERE SupplierID <> '' " + searchFilter;

    var queryData = [];

    mysqlTrigger.selectQuery(dbConnection.db_w3school, query, queryData, null, function(isValid, result) {
        setTimeout(function() { res.json(result); }, Math.floor(Math.random() * 0));
    });
}

function advSearchFilter(req, keyword) {
    var result = '';

    if (keyword && keyword != '.') {
        result += "AND (SupplierID LIKE '%" + keyword + "%' OR SupplierName LIKE '%" + keyword + "%' " 
            + "OR Address LIKE '%" + keyword + "%' OR Country LIKE '%" + keyword + "%') ";
    }

    if (req.body && req.body != '.') {
        if (req.body['1'] && req.body['1'] != '.') {
            result += "AND SupplierID = '" + req.body['1'] + "' ";
        } 

        if (req.body['2'] && req.body['2'] != '.') {
            result += "AND SupplierName = '" + req.body['2'] + "' ";
        } 

        if (req.body['3'] && req.body['3'] != '.') {
            result += "AND Address = '" + req.body['3'] + "' ";
        } 

        if (req.body['4'] && req.body['4'] != '.') {
            result += "AND Country = '" + req.body['4'] + "' ";
        } 
    }

    return result;
}

router.get('/suppliers', function (req, res) {
    getSuppliers(req, res);
});

module.exports = router;