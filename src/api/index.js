'use strict';

var express = require('express');
var Entry = require('../models/entry');

var router = express.Router();

// get all entries
router.get('/entries', function(req, res) {
  Entry.find({}, function(err, entries) {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    res.json({ entries: entries });
  });
});

// add new entry
router.post('/entries', function(req, res) {
  var new_entry = req.body;
  Entry.create(new_entry, function(err, todo) {
    if (err) {
      return res.status(500).json({ err: err.message });
    }
    res.json({ 'entry': new_entry, message: 'Entry added to db' });
  });
});

// update one entry
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

// delete entry from db
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
