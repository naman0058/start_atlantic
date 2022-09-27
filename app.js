var createError = require('http-errors');
var cookieSession = require('cookie-session')

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var api = require('./routes/api');
var country = require('./routes/country');
var state = require('./routes/state');
var tour = require('./routes/tour');
var visa = require('./routes/visa')
var immigration_country = require('./routes/immigration_country');
var immigration_subcategory = require('./routes/immigration_subcategory');
var immigration_content = require('./routes/immigration_content');
var banner_image = require('./routes/banner_image');
var add_blogs = require('./routes/blogs');
var add_offers = require('./routes/offers');
var tour_image = require('./routes/project_image');
var trip = require('./routes/trip');
var coaching = require('./routes/coaching');
var review = require('./routes/review')
var university = require('./routes/university')
var newvisa = require('./routes/newvisa');
var admin = require('./routes/Admin/Login');
var adminDashboard = require('./routes/Admin/Dashboard')
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(cookieSession({
  name: 'session',
  keys: ['political-frames'],
 
  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api',api);
app.use('/add-country',country);
app.use('/instructors',state);
app.use('/tour',tour);
app.use('/add-visa',visa);
app.use('/immigration_country',immigration_country)
app.use('/immigration_subcategory',immigration_subcategory);
app.use('/immigration_content',immigration_content);
app.use('/banner_image',banner_image);
app.use('/add-blogs',add_blogs);
app.use('/add-offers',add_offers);
app.use('/tour-image',tour_image);
app.use('/trip',trip);
app.use('/add-coaching',coaching);
app.use('/review',review)
app.use('/add-university',university);
app.use('/new-visa',newvisa);
app.use('/admin',admin);
app.use('/admin/dashboard',adminDashboard);


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
