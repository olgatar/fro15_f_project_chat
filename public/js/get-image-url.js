'use strict';

// function to get new entry image blod url used for image preview
function getEntryImageURL(event){
  var entryImagePath = URL.createObjectURL(event.target.files[0]);
  // publish image in html preview div
  $('#entry-image-div').css('background-image', 'url(' + entryImagePath + ')');
}

// function to get new note image blod url used for image preview
function getNoteImageURL(event){
  var noteImagePath = URL.createObjectURL(event.target.files[0]);
  // publish image in html preview div
  $('.note-image-preview').attr('src', noteImagePath);
}
