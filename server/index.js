var express = require('express');
const cors = require('cors')
var db = require('./dbManager')
var stocks = require('./stocks')
var portfolio = require('./portfolio')
var strategy = require('./strategy')

var app = express();

var corsOptions = {
   //origin: 'http://localhost:1962',
   origin: '*',
   optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
 }
 
 app.use(express.json()) 
 app.use(cors(corsOptions));
 app.use('/stocks', stocks);
 app.use('/portfolio', portfolio);
 app.use('/strategy', strategy);
 
 
 app.get('/', function (req, res) {    
      res.send('Hello from Portfolio Server');
 })


 var server = app.listen(8081, function () {
    var host = server.address().address;
    var port = server.address().port;
    
    console.log("Example app listening at http://%s:%s", host, port);
 })

 server.on('close',() => {
    db.closeDb();   
 })

 