var sqlCommand = {
    "selectQuery": function (poolConnection, query, queryParams, queryTag, callback) {

        poolConnection.getConnection(function (err, connection) { 
            if (!err) {
                connection.query(query, queryParams, function (err, results, fields) {
                    if (connection) {
                        connection.release();
                        connection.destroy();
                    } 

                    if (!err) { 
                        callback(true, { status: 200, data: results, message: 'OK' });
                    } else {
                        callback(false, { status: err.status, data: [], message: err.message });
                    }
                });
            } else {
                if (connection) {
                    connection.release();
                    connection.destroy();
                } 
                callback(false, { status: err.status, data: [], message: err.message });
            }
        }); 
    },
    "inserQuery": function (poolConnection, query, queryParams, queryTag, callback) {
        poolConnection.getConnection(function (err, connection) { 
            if (!err) {
                connection.query(query, queryParams, function (err, result) {
                    if (connection) {
                        connection.release();
                        connection.destroy();
                    } 

                    if (!err) { 
                        callback(true, { status: 200, data: [], message: 'OK' });
                    } else {
                        callback(false, { status: err.status, data: [], message: err.message });
                    }
                });
            } else {
                if (connection) {
                    connection.release();
                    connection.destroy();
                } 
                callback(false, { status: err.status, data: [], message: err.message });
            }
        }); 
    },
    "updateQuery": function (poolConnection, query, queryParams, queryTag, callback) {
        poolConnection.getConnection(function (err, connection) { 
            if (!err) {
                connection.query(query, queryParams, function (err, result) {
                    if (connection) {
                        connection.release();
                        connection.destroy();
                    } 

                    if (!err) { 
                        callback(true, { status: 200, data: [], message: 'OK' });
                    } else {
                        callback(false, { status: err.status, data: [], message: err.message });
                    }
                });
            } else {
                if (connection) {
                    connection.release();
                    connection.destroy();
                } 
                callback(false, { status: err.status, data: [], message: err.message });
            }
        }); 
    },
    "deleteQuery": function (poolConnection, query, queryParams, queryTag, callback) {
        poolConnection.getConnection(function (err, connection) { 
            if (!err) {
                connection.query(query, queryParams, function (err, result) {
                    if (connection) {
                        connection.release();
                        connection.destroy();
                    } 

                    if (!err) { 
                        callback(true, { status: 200, data: [], message: 'OK' });
                    } else {
                        callback(false, { status: err.status, data: [], message: err.message });
                    }
                });
            } else {
                if (connection) {
                    connection.release();
                    connection.destroy();
                } 
                callback(false, { status: err.status, data: [], message: err.message });
            }
        }); 
    }
};

module.exports = sqlCommand;