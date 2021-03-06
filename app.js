var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var Customer = require('./routes/Customer');
var PostJobs = require('./routes/PostJobs');
var categories = require('./routes/Categories');
var Provider = require('./routes/Provider');
var Feedback = require('./routes/FeedBack');
var AddCard = require('./routes/AddCard');
var Task = require('./routes/Task');
var Deal = require('./routes/Deals');
var Coupon = require('./routes/Coupon');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(cors());
app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/customer', Customer);
app.use('/api/postjob', PostJobs);
app.use('/api/categories', categories);
app.use('/api/provider', Provider);
app.use('/api/feedback',Feedback);
app.use('/api/task',Task)
app.use('/api/addcard',AddCard);
app.use('/api/deal',Deal);
app.use('/api/coupon',Coupon);

//app.use('/api/customer',CustomerRegister);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});


// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');  
});

module.exports = app;
