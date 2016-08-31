angular.module('app.home', [])

.controller('HomeController', ['$scope','Location', '$state', function($scope, Location, $state) {
  $scope.loadZip = function() {
    if ($scope.location) {
      Location.getRepFromZip($scope.location)
        .then(function(results){
          $scope.reps = results.reps;
          $scope.reps.forEach(function(rep) {
            rep.thumb = 'http://theunitedstates.io/images/congress/225x275/' + rep.bioguide_id + '.jpg';
          });
        });
    }
  }
  $scope.submit = function() {
    $state.go('searchZip', {zipcode: $scope.location})
  }
  $scope.loadProfile = function (rep) {
    $state.go('repProfile', {bioguide_id: rep.bioguide_id});
  }
}]);