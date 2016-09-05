angular.module('app.personProfile',[])

.controller('ProfileController', ['$scope','RepProfile', 'RepBio','$state', 'Affiliations', 'RepBills', function($scope, RepProfile, RepBio, $state, Affiliations, RepBills) {

  $scope.build = function() {
    var person = $state.params;
    console.log(person)
    if (person.leg_id) {
      console.log('STATE REP: ', person);
    } else if (person.bioguide_id) {
    RepProfile.getRepFromBioId(person)
      .then(function(results){
        RepProfile.repObject = results;
        $scope.rep = results.rep;
        $scope.rep.img = 'http://theunitedstates.io/images/congress/450x550/' + $scope.rep.bioguide_id + '.jpg';
        $scope.getBio($scope.rep);
        $scope.getAffiliation($scope.rep);
        $scope.getBills($scope.rep);
      })
    } else {
      $scope.nope(personId);
    }
  };

  $scope.getBio = function(rep) {
    RepBio.getBioFromRepName({searchString: rep.firstname + '%20' + rep.lastname})
      .then(function(results) {
        rep.bio = results.split('\n')[0] || 'No biographical information available at this time for ' + rep.firstname + ' ' + rep.lastname;
      })
  }

  $scope.getAffiliation = function(rep) {
    Affiliations.getAffiliations(rep)
      .then(function(results) {
        $scope.rep.affiliations = results;
        $scope.format = Affiliations.formatCurrency
      })

  }

  $scope.getBills = function(rep) {
    RepBills.getBillsFromRepId({bioguideId: rep.bioguide_id})
      .then(function(results) {
        $scope.bills = results.results;
      });
  }

  $scope.loadBill = function (bill) {
    $state.go('billSummary', bill);
  }

  $scope.nope = function(str) {
    $state.go('errorResponse', {str: str});
  }

}]);
