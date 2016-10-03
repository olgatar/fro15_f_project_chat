'use strict';

// require mongoose and create connection to database
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/travelnotebook', function(err) {
  if (err) {
    console.log('Failed connecting to MongoDB');
  } else {
    console.log('Successfully connected to MongoDB');
  }
});
