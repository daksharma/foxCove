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
.factory('SearchResultFactory',function() {


})
.factory('RepProfileFactory', function() {

  }
);