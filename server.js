// server.js

  // set up ========================
  var express  = require('express');
  var app      = express();                 // create our app w/ express
  var mongoose = require('mongoose');           // mongoose for mongodb
  var morgan = require('morgan');       // log requests to the console (express4)
  var bodyParser = require('body-parser');  // pull information from HTML POST (express4)
  var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)

  // configuration =================

  mongoose.connect('mongodb://node:node@mongo.onmodulus.net:27017/uwO3mypu');   // connect to mongoDB database on modulus.io

  app.use(express.static(__dirname + '/public'));         // set the static files location /public/img will be /img for users
  app.use(morgan('dev'));                     // log every request to the console
  app.use(bodyParser.urlencoded({'extended':'true'}));      // parse application/x-www-form-urlencoded
  app.use(bodyParser.json());                   // parse application/json
  app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
  app.use(methodOverride());

//added for mongoose
  var Dateinfo = mongoose.model('Dateinfo', {
    text : String
  });

  // listen (start app with node server.js) ======================================
  app.listen(8080);
  console.log("App listening on port 8080");



app.get('/api/dateinfos', function(req, res) {

    // use mongoose to get all todos in the database
    Dateinfo.find(function(err, dateinfos) {

      // if there is an error retrieving, send the error. nothing after res.send(err) will execute
      if (err)
        res.send(err)

      res.json(dateinfos); // return all todos in JSON format
    });
  });

  // create todo and send back all todos after creation
  app.post('/api/dateinfos', function(req, res) {

    // create a todo, information comes from AJAX request from Angular
    Dateinfo.create({
      text : req.body.text,
      done : false
    }, function(err, dateinfo) {
      if (err)
        res.send(err);

      // get and return all the todos after you create another
      Dateinfo.find(function(err, dateinfos) {
        if (err)
          res.send(err)
        res.json(dateinfos);
      });
    });

  });

  // delete a todo
  app.delete('/api/dateinogs/:dateinfo_id', function(req, res) {
    Dateinfo.remove({
      _id : req.params.dateinfo_id
    }, function(err, dateinfo) {
      if (err)
        res.send(err);

      // get and return all the todos after you create another
      Dateinfo.find(function(err, dateinfos) {
        if (err)
          res.send(err)
        res.json(dateinfos);
      });
    });
  });