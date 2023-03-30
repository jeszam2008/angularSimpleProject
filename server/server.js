require('dotenv').config();
const PORT = process.env.PORT || 1365;

const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');

const app = express(); 
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(express.static(path.join(path.dirname(__dirname), 'public')));

const controllers = [
    require('./controllers/customerServerController'),
    require('./controllers/productServerController'),
    require('./controllers/shipperServerController'),
    require('./controllers/supplierServerController') 
];

controllers.forEach(function(data) { 
    app.use('/api', data);
});

app.get('/*', function(req, res) { 
    res.sendFile(path.join(path.dirname(__dirname), 'public', 'index.html'));  
});

app.listen(PORT, function() {
    console.log('Server is listening at port ' + PORT);
});