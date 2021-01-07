var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var mqtt = require('mqtt');
var firebase = require('firebase/app');

require('firebase/database');

var firebaseConfig = {
  apiKey: "AIzaSyBOQYVPKxEhd4qF0NXEnrqXQzMTJvfmGls",
  authDomain: "temperature-catalunia.firebaseapp.com",
  databaseURL: "https://temperature-catalunia-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "temperature-catalunia",
  storageBucket: "temperature-catalunia.appspot.com",
  messagingSenderId: "749669114352",
  appId: "1:749669114352:web:11866e8b0d4c95ed54bd35",
  measurementId: "G-KCV2CFQKYC"
};

firebase.initializeApp(firebaseConfig);

var mqttClient = mqtt.connect('http://127.0.0.1:11883');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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

mqttClient.on('connect', function () {
  mqttClient.subscribe('temperatura/#', function (err) {
    if (!err) {
      // mqttClient.publish('presence', 'Hello mqtt')
      console.log('node mqttClient subscribed....');
    }
  })
})
 
mqttClient.on('message', function (topic, message) {
  // message is Buffer
  console.log(topic, message.toString());
  const date = new Date();
  firebase.database().ref(`${topic}/${date}`).set({
    date: date,
    temperature: message.toString()
  });
})

module.exports = app;
