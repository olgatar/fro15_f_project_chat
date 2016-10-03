'use strict';
// require node express
var express = require('express');
// require the database
var Entry = require('../models/entry');
// define the router
var router = express.Router();

// router middleware function to get access to req.query
router.use(function(req, res, next) {
  //console.log(req.query.selected_country);
  next();
});

// router middleware function to save all entries in req.object
router.use('/entries', function(req, res, next) {
  Entry.find(function(err, entries) {
    if (err) return next(error);
    req.allEntries = entries;
    next();
  });
});


// router middleware function to save filtered entries in req.object
router.use('/entries', function(req, res, next) {
  Entry.aggregate(
    [{ $match : { country : req.query.selected_country } }],
    function(err, entries) {
    if (err) return next(error);
    if (!entries[0]) req.filteredEntries = req.allEntries;
    if (entries[0]) req.filteredEntries = entries;
    next();
  });
});

// router get request to return either all or filtered entries as json response
router.get('/entries', function (req, res, next) {
  next();
}, function (req, res, next) {
  //
  res.json({entries: req.filteredEntries});
});

// add new entry to the database
router.post('/entries', function(req, res) {
  var new_entry = req.body;
  Entry.create(new_entry, function(err, todo) {
    if (err) {
      return res.status(500).json({ err: err.message });
    }
    res.json({ 'entry': new_entry, message: 'Entry added to db' });
  });
});

// update one entry in database
router.put('/entries/:id', function(req, res) {
  var id = req.params.id;
  var entry = req.body;
  if (entry && entry._id !== id) {
    return res.status(500).json({ err: "Ids don't match!" });
  }
  Entry.findByIdAndUpdate(id, entry, {new: true}, function(err, todo) {
    if (err) {
      return res.status(500).json({ err: err.message });
    }
    res.json({ 'entry': entry, message: 'Entry was updated' });
  });
});

// delete entry from database
router.delete('/entries/:id', function(req, res) {
  var id = req.params.id;
  Entry.findByIdAndRemove(id, function(err, result) {
    if (err) {
      return res.status(500).json({ err: err.message });
    }
    res.json({ message: 'Entry was deleted' });
  });
});


module.exports = router;
