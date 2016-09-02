// This file was deprecated. Please use helpers/factories.

angular.module('app.helperFactories', [])
.factory('Location', function ($http) {
  var repsObject = {};

  function getRepFromZip(zipCode) {
    return $http.post('/getReps', {zipcode: zipCode})
      .then(function (response) {
        repsObject.reps = response.data.reps;
        console.log(repsObject)
        return response.data;
      }, function (error) {
        console.log(error)
      });
  }

  return {
    repsObjects: repsObject,
    getRepFromZip: getRepFromZip
  }
})
.factory('SearchResult',function() {


})
.factory('RepProfile', function($http) {
  var repObject = {};

  function getRepFromBioId(bioguide_id) {
    console.log(bioguide_id)
    return $http.post('/getRep', bioguide_id)
      .then(function (response) {
        repObject = response.data;
        return response.data;
      }, function (error) {
        console.log(error)
      });
  }

  return {
    rep: repObject,
    getRepFromBioId: getRepFromBioId
  }
})


.factory('LocalOfficials', function($http){
  function getOfficials(zipcode){
    return $http.post('/getLocalReps', {zip: zipcode})
      .then(function(res){
        return res.data
      }, function(error) {
        console.log(error)
      });
  }
  return {
    getOfficials: getOfficials
  }
})