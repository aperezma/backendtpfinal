var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/admin/login');
var app = express();
var adminArticulosRouter = require('./routes/admin/articulos')
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin/login', loginRouter);
app.use('/admin/articulos', adminArticulosRouter)
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
//const session = require('express-session');
//app.use(session({
//  secret: 'afsdfwjoeijf293jr2hwrw23r',
//  resave: false,
//  saveUninitialized: true,
//}))

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

secured = async (req, res, next) => {
  try {
    console.log(req.session.id_usuario);
    if(req.session.id_usuario){
      next();
    } else{
      res.redirect('/admin/login');
    } 
  } catch(error) {console.log(error);}
}

module.exports = app;