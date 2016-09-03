angular.module('app.personProfile',[])

.controller('ProfileController', ['$scope','RepProfile', 'RepBio','$state', 'Affiliations', function($scope, RepProfile, RepBio, $state, Affiliations) {
  $scope.build = function() {
    RepProfile.getRepFromBioId($state.params)
      .then(function(results){
        $scope.rep = results.rep;
        $scope.rep.img = 'http://theunitedstates.io/images/congress/450x550/' + $scope.rep.bioguide_id + '.jpg';
        $scope.getBio($scope.rep);
        console.log("CRP", $scope.rep.crp_id)
        $scope.getAffiliation($scope.rep)
      })
  }
  $scope.getBio = function(rep) {
    RepBio.getBioFromRepName({searchString: rep.firstname + '%20' + rep.lastname})
      .then(function(results) {
        rep.bio = results.split('\n')[0] || 'No biographical information available at this time for ' + rep.firstname + ' ' + rep.lastname;
      })
  }
  $scope.getAffiliation = function(rep) {
    Affiliations.getAffiliations(rep)
      .then(function(results) {
        console.log("****", results)
        $scope.rep.affiliations = results.positions
      })
    
  }
}]);