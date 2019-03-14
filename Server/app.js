const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');


//Midleware.
const testApi = require('./b3a-API/routes/TestToTheAPI');
const ErrorHandlers = require('./b3a-API/Handlers/ErrorHandlers');
const noOne = require('./AccesWebControl');
require('./api/models/db');
require('./api/config/passport');
//Incoming request have top go for this function(hendler)
// var funtTopass = (req, res, next)=>{
//     res.status(200).json({
//         message: 'it works!'
//     })
// }
// app.use(funtTopass);


//SERVER STATUS AUTOMATIC LOGIN --morgan
app.use(morgan('dev'));
//
app.use(bodyParser.urlencoded({ extended: true })); // Extended : true "allows to parse rich data"
app.use(bodyParser.json());


//CORS!!!!
app.use((req, res, next) => {
    //noOne(req.headers.host) recive the host and loock for it in the DB(future feature to add) giving acces to the API.
    res.header('Access-Control-Allow-Origin', noOne(req.headers.host));
    res.header('Access-Control-Allow-Credentials', true);
    //'Origin, X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept'
    res.header(
        'Access-Control-Allow-Headers',
        '*'
    );
    //res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
        return res.status(200).json({});
    }
    next();
});
//API ENDPOINTS
app.use('/TestRest', testApi);
app.use(passport.initialize());
app.use('/api', routesApi);

//ERRORS HANDLING
app.use(ErrorHandlers.NotFoundAPIResponse);
app.use(ErrorHandlers.InsideAppErrorAPIResponse);
// error handlers
// Catch unauthorised errors
app.use(function(err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401);
        res.json({ "message": err.name + ": " + err.message });
    }
});



module.exports = app;