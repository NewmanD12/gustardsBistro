//instantiate standard libraries
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

require("dotenv").config()

const { mongooseConnect } = require('./middleware/mongoose')
mongooseConnect()

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const menuItemsRouter = require('./routes/menuItems');
const localFarmersRouter = require('./routes/localFarmers')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());
app.options("*", cors());

app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/menu-items', menuItemsRouter);
app.use('/api/local-farmers', localFarmersRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
