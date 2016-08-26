angular.module('app.home', [])

.controller('HomeController', ['$scope','Location', function($scope, Location) {
  $scope.submit = function() {
    Location.getRepFromZip($scope.location)
      .then(function(results){
        $scope.reps = results.reps;
        $scope.reps.forEach(function(rep) {
          rep.img = 'http://theunitedstates.io/images/congress/original/' + rep.bioguide_id + '.jpg'
        })
      })
  };
}]);