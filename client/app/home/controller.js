angular.module('app.home', [])

.controller('HomeController', ['$scope','Location', '$state', function($scope, Location, $state) {
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
          rep.thumb = 'http://theunitedstates.io/images/congress/225x275/' + rep.bioguide_id + '.jpg';
          rep.profile = 'repProfile({ bioguide_id:' + rep.bioguide_id + '})';
        });
      })
      .then(function() {
        // non-functioning. Should update URL on successful search
        // $state.transitionTo($state.searchZip, $scope.location);
      });
  }
  $scope.loadProfile = function (rep) {
    console.log($scope)
    $state.go('repProfile', {bioguide_id: rep.bioguide_id});
  }
}])

.controller('ProfileController', ['$scope','RepProfile', '$state', function($scope, RepProfile, $state) {
  $scope.build = function() {
    RepProfile.getRepFromBioId($state.params)
      .then(function(results){
        $scope.rep = results.rep;
        console.log($scope.rep.bioguide_id)
        $scope.rep.img = 'http://theunitedstates.io/images/congress/450x550/' + $scope.rep.bioguide_id + '.jpg';
      })
  };
}])
