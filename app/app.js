var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const session = require('express-session')
var logger = require('morgan');
const mongojs = require('mongojs')
const db = mongojs('mongodb://127.0.0.1:27017/footballdata', ['players'])

// var indexRouter = require('./routes/index');
var playersRouter = require('./routes/players');
var gameRouter = require('./routes/game');
var adminRouter = require('./routes/admin');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
app.use('/game', gameRouter);
app.use('/admin', adminRouter);
app.use('/api/v1/players', playersRouter);

// const sess = {
//   secret: 'palabras aleatorias',
//   cookie: {},
//   resave: false,
//   saveUninitialized: true
// }
// app.use(session(sess))

function authenticate(req, res, next) {
  let minombre = req.body.nombre
  let miapellido = req.body.apellido
  let miemail = req.body.email

  db.users.find({ nombre: minombre }, (err, docs) => {
    if (err) {
      res.send(err)
    } else {
      if (docs[0].apellido == miapellido && docs[0].email == miemail) {
        next()
      } else {
        res.redirect("/")
      }
    }
  })
}

app.post('/check', authenticate, (req, res) => {
  let minombre = req.body.nombre

  db.users.find({ nombre: minombre }, (err, docs) => {
    if (err) {
      res.send(err)
    } else {

      if (docs[0].rol == "admin") {
        // req.session.rol = "admin"
        res.redirect('/admin')

      } else if (docs[0].rol == "user") {
        // req.session.rol = "user"
        res.redirect('/game')

      } else {
        res.redirect("/")
      }
    }
  })
})

// GET the login page
app.get('/', function (req, res, next) {
  res.render('login');
});

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
