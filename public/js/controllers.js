'use strict';

angular.module('travelNotebook').controller('travelPostsCtrl', function($scope, dataService) {

  $scope.showform = false;
  $scope.showimage = false;
  $scope.showbutton = true;
  $scope.shownotebook = false;

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
      //notes: {
    		//date: new Date(),
        //sub_image: $scope.entry.sub_image,
    		//sub_body: $scope.entry.sub_body
    	//}
    });
  };

  $scope.deleteEntry = function(entry, index) {
    dataService.deleteEntry(entry).then(function() {
      $scope.entries.splice(index, 1);
    });
  };

  $scope.saveEntry = function(entry, i) {
    //$scope.entries[i].editing = false;
    //$scope.entries[i].notes.date = new Date();
    //$scope.entries[i].notes.sub_image = $scope.entry.sub_image;
    //$scope.entries[i].notes.sub_body = $scope.entry.sub_body;
    dataService.updateEntry(entry);
  };

  $scope.shownotebook = [];

  $scope.toggle = function(index) {
    $scope.shownotebook[index] = $scope.shownotebook[index] === false ? true: false;
  };

});
