'use strict';

angular.module('travelNotebook').controller('travelPostsCtrl', function($scope, dataService, $window) {

  $scope.showform = false;
  $scope.showimage = false;
  $scope.showbutton = true;
  $scope.shownotebook = false;
  $scope.showaddnote = false;
  $scope.showChangeButton = true;
  $scope.noteImagePreview = false;

  dataService.getEntries(function(response) {
    $scope.entries =  response.data.entries;
  });

  $scope.addEntry = function() {
    //console.log($scope.entry.main_image);
    $scope.entries.unshift({
      title: $scope.entry.title,
    	country: $scope.entry.country,
    	main_body: $scope.entry.main_body,
    	date: new Date(),
      main_image: $scope.entry.main_image,
      notes: [{
    		sub_date: new Date(),
        sub_image: '',
    		sub_body: ''
    	}]
    });
  };

  $scope.deleteEntry = function(entry, i) {

    var a = $scope.entries.length - i - 1;

    dataService.deleteEntry(entry).then(function() {
      $scope.entries.splice(a, 1);
    });
  };

  $scope.saveEntry = function(entry, i) {
      dataService.updateEntry(entry);
      location.reload();
  };

  $scope.shownotebook = [];
  $scope.toggleNotebook = function(i) {
    $scope.shownotebook[i] = $scope.shownotebook[i] === false ? true: false;
  };

  $scope.note = {};

  $scope.addEntryNote = function(entry, note, i) {

    var a = $scope.entries.length - i - 1;

    $scope.entries[a].notes.unshift({
      //notes: [{
        sub_date: new Date(),
        sub_image: $scope.note.sub_image,
        sub_body: $scope.note.sub_body
      //}]
    });

    dataService.updateEntry(entry);

  };

  $scope.activatePreview = function (event, reader, fileList, fileObjs, file) {
     $scope.noteImagePreview = true;
   };

});
