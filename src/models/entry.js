'use strict';

var mongoose = require('mongoose');

var entrySchema = new mongoose.Schema({
	title: { type: String, required: true },
	country: { type: String, required: true },
	main_body: { type: String, required: true },
	date: { type: Date, default: Date.now },
	main_image: {
		filesize: { type: Number, required: true },
		filetype: { type: String, required: true },
		filename: { type: String, required: true },
		base64: { type: String, required: true }
	},
  notes: [{
		sub_date: { type: Date, default: Date.now },
		sub_image: {
			filesize: { type: Number, required: true },
			filetype: { type: String, required: true },
			filename:{ type: String, required: true },
			base64: { type: String, required: true }
		},
		sub_body: { type: String, required: true },
		notes_count: Number
	}]
});

var entrymodel = mongoose.model('Entry', entrySchema);

module.exports = entrymodel;
