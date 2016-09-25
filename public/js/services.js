'use strict';

angular.module('travelNotebook').service('dataService', function($http) {

  this.getEntries = function(cb) {
    $http.get('/api/entries').then(cb);
  };

  this.deleteEntry = function(entry) {
    if (!entry._id) {
      console.log("Error, no id");
    }
    return $http.delete('/api/entries/' + entry._id).then(function() {

    });
  };

  this.updateEntry = function(entry) {
    if(!entry._id) {
      $http.post('/api/entries', entry);
    } else {
      $http.put('/api/entries/' + entry._id, entry).then(function(result) {
        return result.data.entry;
      });
    }
  };

});
