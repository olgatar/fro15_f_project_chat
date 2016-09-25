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
  //notes: {
		//date: { type: Date, default: Date.now },
		//sub_image: {
			//filesize: Number,
			//filetype: String,
			//filename: String,
			//base64: String
		//},
		//sub_body: String
	//}
});

var model = mongoose.model('Entry', entrySchema);

module.exports = model;
