angular.module('foxCove', [
  'app.home',
  'app.localResults',
  'app.personProfile',
  'app.bill',
  // 'app.repProfileController',
  'app.helperFactories',
  'ui.router',
  'app.directives'
])

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider

  .state('home', {
    templateUrl: 'app/home/home-view.html',
    url: '/',
  })

  .state('errorResponse', {
    templateUrl: 'app/home/home-view.html',
    url: '/nope/:str',
    controller: function($scope, $stateParams) {
      if ($stateParams.str) {
        $scope.errorResponse = 'Sorry, "' + $stateParams.str + '" isn\'t a thing here.';
      } else {
        $scope.errorResponse = 'Hm. Something went wrong.';
      }
    }
  })

  .state('searchZip', {
    templateUrl: 'app/local-results/local-results-view.html',
    url: '/zip/:zipcode',
    controller: function($scope, $stateParams) {
      $scope.location = $stateParams.zipcode;
    }
  })

  .state('repProfile', {
    templateUrl: 'app/person-profile/person-profile-view.html',
    url: '/rep/:bioguide_id',
    controller: function($scope, $stateParams) {
      $scope.bioguide_id = $stateParams.bioguide_id;
    }
  })

  .state('billSummary',{
    templateUrl: 'app/billsummary/bill-summary.html',
    url: '/bill/:congress/:type/:number',
    controller: function ($scope, $stateParams) {
      $scope.bill = {
        congress: $stateParams.congress,
        number: $stateParams.number,
        type: $stateParams.type
      };
    }
  });

  // DEFAULT route
  $urlRouterProvider.otherwise('/');

});
