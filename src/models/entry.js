'use strict';

var mongoose = require('mongoose');

var entrySchema = new mongoose.Schema({
	title: String,
	country: String,
	main_body: String,
	date: { type: Date, default: Date.now },
	main_image: {
		filesize: Number,
		filetype: String,
		filename: String,
		base64: String
	},
  notes: [{
		sub_date: { type: Date, default: Date.now },
		sub_image: {
			filesize: Number,
			filetype: String,
			filename: String,
			base64: String
		},
		sub_body: String,
		notes_count: Number
	}]
});

var entrymodel = mongoose.model('Entry', entrySchema);

module.exports = entrymodel;
