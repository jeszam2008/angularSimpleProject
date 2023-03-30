const express = require('express');
const path = require('path');
const router = express(); // express.Router();
const bodyParser = require('body-parser');
const mysqlTrigger = require('../db/mysqlServerController');
const dbConnection = require('../db/dbConnection');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json({ type: 'application/vnd.api+json' }));

const FILENAME = "customerServerController.js";

function getCustomers(req, res) { 
    const FUNCTION_NAME = "getCustomers()";
    var searchKeyword = req.query['searchKeyword'];
    var searchFilter = advSearchFilter(req, searchKeyword);
    var query = "SELECT CustomerID, CustomerName, ContactName, Address, City, PostalCode, Country, "
        + "(SELECT COUNT(ID) FROM customers WHERE CustomerID <> '' " + searchFilter + ") AS TotalItems "
        + " FROM customers WHERE CustomerID <> '' " + searchFilter;

    var queryData = [];

    mysqlTrigger.selectQuery(dbConnection.db_w3school, query, queryData, FILENAME + ' - ' + FUNCTION_NAME, function(isValid, result) {
        setTimeout(function() { res.json(result); }, Math.floor(Math.random() * 0));
    });
}

function advSearchFilter(req, keyword) {
    var result = '';

    if (keyword && keyword != '.') {
        result += "AND (CustomerID LIKE '%" + keyword + "%' OR CustomerName LIKE '%" + keyword + "%' " 
            + "OR Address LIKE '%" + keyword + "%' OR Country LIKE '%" + keyword + "%') ";
    }

    if (req.body && req.body != '.') {
        if (req.body['1'] && req.body['1'] != '.') {
            result += "AND CustomerID = '" + req.body['1'] + "' ";
        } 

        if (req.body['2'] && req.body['2'] != '.') {
            result += "AND CustomerName = '" + req.body['2'] + "' ";
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

function addCustomer(req, res) {
    const FUNCTION_NAME = "getCustomers()";
    var resultObj = { "status" : "500", "message" : "Server error", "data" : req.body };
    
    var reqCustomerID = req.body['CustomerID'];
    var reqCustomerName = req.body['CustomerName'];
    var reqContactName = req.body['ContactName'];
    var reqAddress = req.body['Address'];
    var reqCity = req.body['City'];
    var reqPostalCode = req.body['PostalCode'];
    var reqCountry = req.body['Country'];


    if (reqCustomerID && reqCustomerName && reqContactName && reqAddress
        && reqCity && reqPostalCode && reqCountry) {

        var query = "SELECT CustomerID FROM customers WHERE CustomerID = ? LIMIT 1";
        var queryData = [reqCustomerID];

        mysqlTrigger.selectQuery(dbConnection.db_w3school, query, queryData, FILENAME + ' - ' + FUNCTION_NAME, function(isValid, result) {
            if (isValid) {
                if (result.data.length <= 0) {
                    query = "INSERT INTO customers (CustomerID, CustomerName, ContactName, Address, City, PostalCode, Country) " 
                        + "VALUES (?, ?, ?, ?, ?, ?, ?)";

                    queryData = [reqCustomerID, reqCustomerName, reqContactName, reqAddress, reqCity, reqPostalCode, reqCountry];

                    mysqlTrigger.inserQuery(dbConnection.db_w3school, query, queryData, FILENAME + ' - ' + FUNCTION_NAME, function(isValid, result) {
                        if (isValid) {
                            resultObj['status'] = "200";  
                            resultObj['message'] = "Request Success";  
                            res.json(resultObj);
                        } else {
                            res.json(resultObj);
                        }
                    }); 
                } else {
                    resultObj['status'] = "400"; 
                    resultObj['message'] = "Data already exist"; 
                    resultObj['data'] = req.body; 
                    res.json(resultObj); 
                }
            } else {  
                res.json(resultObj);
            }
        });

    } else {
        resultObj['status'] = "300";
        resultObj['message'] = "Invalid parameter";
        resultObj['data'] = req.body;
        res.json(resultObj);
    }
 
}

function updateCustomer(req, res) {
    const FUNCTION_NAME = "updateCustomer()";
    var resultObj = { "status" : "500", "message" : "Server error", "data" : req.body };
    
    var reqCustomerID = req.body['CustomerID'];
    var reqCustomerName = req.body['CustomerName'];
    var reqContactName = req.body['ContactName'];
    var reqAddress = req.body['Address'];
    var reqCity = req.body['City'];
    var reqPostalCode = req.body['PostalCode'];
    var reqCountry = req.body['Country'];


    if (reqCustomerID && reqCustomerName && reqContactName && reqAddress
        && reqCity && reqPostalCode && reqCountry) {

        var query = "SELECT CustomerID FROM customers WHERE CustomerID = ? LIMIT 1";
        var queryData = [reqCustomerID];

        mysqlTrigger.selectQuery(dbConnection.db_w3school, query, queryData, FILENAME + ' - ' + FUNCTION_NAME, function(isValid, result) {
            if (isValid) {
                if (result.data.length > 0) {
                    query = "UPDATE customers SET CustomerName = ?, ContactName = ?, Address = ?, City = ?, PostalCode = ?, Country = ? " 
                        + "WHERE CustomerID = ? LIMIT 1";

                    queryData = [reqCustomerName, reqContactName, reqAddress, reqCity, reqPostalCode, reqCountry, reqCustomerID];

                    mysqlTrigger.updateQuery(dbConnection.db_w3school, query, queryData, FILENAME + ' - ' + FUNCTION_NAME, function(isValid, result) {
                        if (isValid) {
                            resultObj['status'] = "200";  
                            resultObj['message'] = "Request Success";  
                            res.json(resultObj);
                        } else {
                            res.json(resultObj);
                        }
                    }); 
                } else {
                    resultObj['status'] = "400"; 
                    resultObj['message'] = "Data does not exist"; 
                    resultObj['data'] = req.body; 
                    res.json(resultObj); 
                }
            } else {  
                res.json(resultObj);
            }
        });

    } else {
        resultObj['status'] = "300";
        resultObj['message'] = "Invalid parameter";
        resultObj['data'] = req.body;
        res.json(resultObj);
    }
 
}

function removeCustomer(req, res) {
    const FUNCTION_NAME = "removeCustomer()";
    var resultObj = { "status" : "500", "message" : "Server error", "data" : req.body };
    
    var reqCustomerID = req.query['CustomerID']; 

    if (reqCustomerID) {

        var query = "SELECT CustomerID FROM customers WHERE CustomerID = ? LIMIT 1";
        var queryData = [reqCustomerID];

        mysqlTrigger.selectQuery(dbConnection.db_w3school, query, queryData, FILENAME + ' - ' + FUNCTION_NAME, function(isValid, result) {
            if (isValid) {
                if (result.data.length > 0) {
                    query = "DELETE FROM customers WHERE CustomerID = ? LIMIT 1";
                    queryData = [reqCustomerID];

                    mysqlTrigger.deleteQuery(dbConnection.db_w3school, query, queryData, FILENAME + ' - ' + FUNCTION_NAME, function(isValid, result) {
                        if (isValid) {
                            resultObj['status'] = "200";  
                            resultObj['message'] = "Request Success";  
                            res.json(resultObj);
                        } else {
                            res.json(resultObj);
                        }
                    }); 
                } else {
                    resultObj['status'] = "400"; 
                    resultObj['message'] = "Data does not exist"; 
                    resultObj['data'] = req.body; 
                    res.json(resultObj); 
                }
            } else {  
                res.json(resultObj);
            }
        });

    } else {
        resultObj['status'] = "300";
        resultObj['message'] = "Invalid parameter";
        resultObj['data'] = req.body;
        res.json(resultObj);
    }
 
}

router.get('/customers', function (req, res) {
    getCustomers(req, res);
});

router.post('/customers', function (req, res) {
    addCustomer(req, res);
});

router.put('/customers', function (req, res) {
    updateCustomer(req, res);
});

router.delete('/customers', function (req, res) {
    removeCustomer(req, res);
});

module.exports = router;