    var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');



var index = require('./routes/index');
var users = require('./routes/users');
var registerRouter=require('./routes/registerrouter');
var projectRouter = require('./routes/projectrouter');
var projectmetaRouter = require('./routes/projectmetarouter');
var customerRouter = require('./routes/customerrouter');
var expenseRouter = require('./routes/expenserouter');
var bookingRouter = require('./routes/bookingrouter');
var crudRouter = require('./routes/crudrouter');

var mongoose = require('mongoose');

var url = 'mongodb://MMGroupDB:beZNpV6yphJecgWr@cluster0-shard-00-00-mjo4a.mongodb.net:27017,cluster0-shard-00-01-mjo4a.mongodb.net:27017,cluster0-shard-00-02-mjo4a.mongodb.net:27017/MMGroup?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin';
mongoose.connect(url);

var db = mongoose.connection;
db.on('error',console.error.bind(console,'Connection error'));
db.on('open',function(){
	console.log("Connected To Database");
})


var app = express();
// view engine setup

allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  if ('OPTIONS' === req.method) {
    res.send(200);
  } else {
    next();
  }
};

app.use(allowCrossDomain);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public

//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/register',registerRouter)
app.use('/project', projectRouter)
app.use('/projectmeta', projectmetaRouter)
app.use('/customer', customerRouter)
app.use('/expense', expenseRouter)
app.use('/booking', bookingRouter)
app.use('/crud', crudRouter)


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
