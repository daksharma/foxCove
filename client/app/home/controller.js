angular.module('app.home', [])

.controller('HomeController', ['$scope','Location', function($scope, Location) {
  $scope.submit = function() {
    Location.getRepFromZip($scope.location)
      .then(function(results){
        $scope.reps = results.reps;
        $scope.reps.forEach(function(rep) {
          rep.img = 'http://theunitedstates.io/images/congress/450x550/' + rep.bioguide_id + '.jpg';
          rep.thumb = 'http://theunitedstates.io/images/congress/225x275/' + rep.bioguide_id + '.jpg';
        });
      });
  };
}]);
