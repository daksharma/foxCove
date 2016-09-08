angular.module('app.personProfile',[])

.controller('ProfileController', ['$scope','RepProfile', 'StateRepProfile', 'RepBio','$state', 'Affiliations', 'RepBills', 'RepNews',function($scope, RepProfile, StateRepProfile, RepBio, $state, Affiliations, RepBills, RepNews) {

  $scope.build = function() {
    var person = $state.params;
    if (person.leg_id && person.leg_id.match(/\w{1,3}\d{6}/) !== null) {
      StateRepProfile.getRepFromLegId(person)
        .then(function(results) {
          $scope.rep = results;
          $scope.rep.img = results.photo_url;
          $scope.rep.firstname = results.firstname || results.first_name;
          $scope.rep.lastname = results.lastname || results.last_name;
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

          // Uncomment code presentation. use this until better api is found with less limitations
          // this is to limit the api calls per month-- at least during this testing phase.
          $scope.getNews($scope.rep.title, $scope.rep.firstname, $scope.rep.lastname, $scope.rep.bioguide_id);
        });
    } else {
      $scope.nope(person.bioguide_id);
    }
  };
  $scope.getBio = function(rep) {
    RepBio.getBioFromRepName({searchString: (rep.nickname || rep.firstname) + '%20' + rep.lastname})
      .then(function(results) {
        rep.bio = results.split('\n')[0] || $scope.makeBio($scope.rep);
      });
  };
  $scope.makeBio = function(rep) {
    var titles = {
      Sen: 'US Senator representing the state of ' + rep.state.toUpperCase() + '.',
      Rep: 'US Congressperson representing ' + rep.state.toUpperCase() + ' state District ' + rep.district +  '.'
    };
    return rep.firstname + ' ' + (rep.middlename || '') + ' ' + rep.lastname + ' is a ' + (titles[rep.title] ||
      'representative of ' + rep.state.toUpperCase() + ' District ' + rep.district + ' in the state\'s ' + (rep.chamber || '') + ' house.');
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
  };
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

  $scope.getNews = function(title, firstName, lastName, bioguide_id) {
    var titleName = title + "%20" + firstName + "%20" + lastName;
    RepNews.getRepNews(titleName, bioguide_id)
           .then(function(data) {
             $scope.newsData = data.articleAndUrls;
           });
  };

}]);
