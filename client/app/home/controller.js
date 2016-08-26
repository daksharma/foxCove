angular.module('app.home', [])


.controller('HomeController', function($scope, Location) {

  $scope.submit = function() {
    Location.getRepFromZip($scope.location)
      .then(function(results){
        $scope.reps = results.reps;
      });
  };
})


.factory('Location', function($http){

  function getRepFromZip(zipCode) {
    return $http({
      method: 'POST',
      url: '/getReps',
      data: { zipcode: zipCode },
    })
    .then(function(res){
      return res.data;
    });
  }

  return {
    getRepFromZip : getRepFromZip,
  };
});
