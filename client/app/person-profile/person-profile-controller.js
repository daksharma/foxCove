angular.module('app.personProfile',[])

.controller('ProfileController', ['$scope','RepProfile', 'RepBio','$state', 'Affiliations', 'RepBills', function($scope, RepProfile, RepBio, $state, Affiliations, RepBills) {
  $scope.build = function() {
    RepProfile.getRepFromBioId($state.params)
      .then(function(results){
        $scope.rep = results.rep;
        $scope.rep.img = 'http://theunitedstates.io/images/congress/450x550/' + $scope.rep.bioguide_id + '.jpg';
        $scope.getBio($scope.rep);
        $scope.getAffiliation($scope.rep)
        $scope.getBills($scope.rep);
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
<<<<<<< 0ab9f830ef7230902e238d2e12b8da07e6326505
        $scope.rep.affiliations = results
=======
        // console.log("****", results)
        $scope.rep.affiliations = results.positions
>>>>>>> [refactor] Rework loadZip controller
      })
    
  }
  $scope.getBills = function(rep) {
    RepBills.getBillsFromRepId({bioguideId: rep.bioguide_id})
      .then(function(results) {
        $scope.bills = results.results;
        $scope.selectedBill = $scope.bills[0];
        console.log($scope.bills);
      });
  }
}]);