angular.module('app.personProfile',[])

.controller('ProfileController', ['$scope','RepProfile', 'StateRepProfile', 'RepBio','$state', 'Affiliations', 'RepBills', function($scope, RepProfile, StateRepProfile, RepBio, $state, Affiliations, RepBills) {

  $scope.build = function() {
    var person = $state.params;
    if (person.leg_id && person.leg_id.match(/\w{1,3}\d{6}/) !== null) {
      StateRepProfile.getRepFromLegId(person)
        .then(function(results) {
          $scope.rep = results;
          $scope.rep.img = results.photo_url;
          $scope.rep.firstname = results.first_name;
          $scope.rep.lastname = results.last_name;
          $scope.getBio($scope.rep);
          $scope.getStateRepBills(person);
        });
    } else if (person.bioguide_id && person.bioguide_id.match(/\w{1}\d{6}/) !== null) {
      RepProfile.getRepFromBioId(person)
        .then(function(results){
          RepProfile.repObject = results;
          $scope.rep = results.rep;
          $scope.rep.img = 'http://theunitedstates.io/images/congress/450x550/' + $scope.rep.bioguide_id + '.jpg';
          $scope.getBio($scope.rep);
          $scope.getAffiliation($scope.rep);
          $scope.getBills($scope.rep);
        });
    } else {
      $scope.nope(person.bioguide_id);
    }
  };

  $scope.getBio = function(rep) {
    RepBio.getBioFromRepName({searchString: rep.firstname + '%20' + rep.lastname})
      .then(function(results) {
        rep.bio = results.split('\n')[0] || 'No biographical information available at this time for ' + rep.firstname + ' ' + rep.lastname;
      });
  };
  $scope.getAffiliation = function(rep) {
    Affiliations.getAffiliations(rep)
      .then(function(results) {
        $scope.rep.affiliations = results;
        $scope.format = Affiliations.formatCurrency;
      });

  };
  $scope.getBills = function(rep) {
    RepBills.getBillsFromRepId({bioguideId: rep.bioguide_id})
      .then(function(results) {
        if (results) {
          $scope.bills = results.results;
        } else {
          $scope.bills = ['Sorry, no records of sponsored bills available.'];
        }
      });
  };
  $scope.getStateRepBills = function(rep) {
    StateRepProfile.getStateRepBills(rep)
      .then(function(results) {
        if (results) {
          $scope.bills = results;
        } else {
          $scope.bills = ['Sorry, no records of sponsored bills available.'];
        }
    });
  }
  $scope.loadBill = function (bill) {
    try {
      bill = JSON.parse(bill);
      // CACHE selected bill
      RepBills.setSelectedBill(bill);
      $state.go('billSummary', { congress: bill.congress, type: bill.bill_type, number: bill.number });
    } catch(err) {
      console.error(err);
    }
  };

  $scope.nope = function(str) {
    $state.go('errorResponse', {str: str});
  };

  $scope.goHome = function() {
    $state.go('home');
  };

}]);
