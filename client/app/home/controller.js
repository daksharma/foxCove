angular.module('app.home', [])

.controller('HomeController', ['$scope','Location', '$state', '$stateParams', function($scope, Location, $state, $stateParams) {
  $scope.loadZip = function() {
    if ($scope.location) {
      $scope.submit();
    }
  }
  $scope.submit = function() {
    Location.getRepFromZip($scope.location)
      .then(function(results){
        $scope.reps = results.reps;
        $scope.reps.forEach(function(rep) {
          rep.img = 'http://theunitedstates.io/images/congress/450x550/' + rep.bioguide_id + '.jpg';
          rep.thumb = 'http://theunitedstates.io/images/congress/225x275/' + rep.bioguide_id + '.jpg';
        });
      })
      .then(function() {
        // non-functioning. Should update URL on successful search
        // $state.transitionTo($state.searchZip, $scope.location);
      });
  };
}]);
