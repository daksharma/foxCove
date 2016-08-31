angular.module('app.personProfile',[])

.controller('ProfileController', ['$scope','RepProfile', '$state', function($scope, RepProfile, $state) {
  $scope.build = function() {
    RepProfile.getRepFromBioId($state.params)
      .then(function(results){
        $scope.rep = results.rep;
        $scope.rep.img = 'http://theunitedstates.io/images/congress/450x550/' + $scope.rep.bioguide_id + '.jpg';
      });
  };
}]);