'use strict';

angular.module('travelNotebook').service('dataService', function($http) {

  // get entries from database and return to scope
  this.getEntries = function(parameters, cb) {
      $http.get('/api/entries', {params: parameters}).then(cb);
  };

  // delete an antry from database and return result to scope
  this.deleteEntry = function(entry) {
    if (!entry._id) {
      console.log("Error, no id");
    }
    return $http.delete('/api/entries/' + entry._id).then(function() {
      console.log();
    });
  };

  // update a changed entry in database and return result to scope
  this.updateEntry = function(entry) {
      if (!entry._id) {
        $http.post('/api/entries', entry);
      }
      else {
        $http.put('/api/entries/' + entry._id, entry).then(function(result) {
          return result.data.entry;
        });
      }
  };

});
