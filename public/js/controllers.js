'use strict';

angular.module('travelNotebook').controller('travelNotebookCtrl', function($scope, dataService, $window, $http) {

  $scope.addNewEntryFormVisible = false;
  $scope.addNewEntryBtnVisible = true;
  $scope.notebookVisible = false;
  $scope.changeBtnVisible = true;
  $scope.noteImgPreviewVisible = false;
  $scope.selected_country = '';
  $scope.new_entry = {};
  $scope.new_note = {};
  $scope.entry = {};


  //get all entries from database without any filter and return to scope
  dataService.getAllEntries(function(response) {
      $scope.allEntries =  response.data.entries;
  });

  // define filter parameter to pass together with http get requests
  var parameters = {
    selected_country: $scope.selected_country
  };

  //get either all or filtered entries from database and return to scope
  dataService.getEntries(parameters, function(response) {
      $scope.entries =  response.data.entries;
  });


  // add new entry
  $scope.addEntry = function() {

      $scope.entries.unshift({
        title: $scope.entry.title,
      	country: $scope.entry.country,
      	main_body: $scope.entry.main_body,
      	date: new Date(),
        main_image: $scope.entry.main_image,
        notes: [{
      		sub_date: '',
          sub_image: '',
      		sub_body: ''
      	}]
      });
  };

  // delete selected entry
  $scope.deleteEntry = function(entry, i) {
    var a = $scope.entries.length - i - 1;
    dataService.deleteEntry(entry).then(function() {
      $scope.entries.splice(a, 1);
    });
  };

  // save new entry
  $scope.saveEntry = function(entry, i) {
      dataService.updateEntry(entry);
      location.reload();
      $scope.entry = {};
  };

  // save selected or changed entry
  $scope.saveChangedEntry = function(entry, i) {
      dataService.updateEntry(entry);
  };

  // toggle to open/close entry notebook
  $scope.notebookVisible = [];
  $scope.toggleNotebook = function(i) {
    $scope.noteImgPreviewVisible[i] = false;
    $scope.notebookVisible[i] = $scope.notebookVisible[i] ? false : true;
  };

  // add a note to the selected entry
  $scope.note = {};
  $scope.addEntryNote = function(entry, note, new_note, i) {

    var a = $scope.entries.length - i - 1;
    $scope.entries[a].notes.unshift({
      //notes: [{
        sub_date: new Date(),
        sub_image: $scope.new_note.sub_image,
        sub_body: $scope.new_note.sub_body
      //}]
    });

    dataService.updateEntry(entry);
    $scope.new_note = {};
  };

  $scope.noteImgPreviewVisible = [];
  $scope.previewVisible = function(i) {
    $scope.noteImgPreviewVisible[i] = true;
  };

  //delete selected note from selected entry and undate entry
  $scope.deleteEntryNote = function(entry, note, outerIndex, innerIndex) {

    var a = $scope.entries.length - outerIndex - 1;
    $scope.entries[a].notes.splice(innerIndex, 1);

    dataService.updateEntry(entry);
  };

  // listener for the country select to filter entries
  $scope.$watch(
      function() {
        return $scope.selected_country;
      },
      function (newValue, oldValue) {
        if (!angular.equals(oldValue, newValue)) {
          // filter entries by the selected country
          $scope.filterInit();
        }
      }, true);

  // function for the filter initiation
  $scope.filterInit = function() {
    var parameters = {
      selected_country: $scope.selected_country
    };
    dataService.getEntries(parameters, function(response) {
        $scope.entries = response.data.entries;
    });
  }

  // refresh the entries back after filter
  $scope.refreshEntries = function() {
    dataService.getAllEntries(function(response) {
      $scope.entries =  response.data.entries;
    });
    $scope.selected_country = {};
  }

});
