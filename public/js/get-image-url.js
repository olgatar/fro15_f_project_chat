function getImageURL(event){
  var imagePath = URL.createObjectURL(event.target.files[0]);
  $('#image-div').css('background-image', 'url(' + imagePath + ')');
}
