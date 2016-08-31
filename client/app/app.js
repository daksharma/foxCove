angular.module('foxCove', [
  'app.home',
  'app.bill',
  'app.search',
  // 'app.repProfileController',
  'app.helperFactories',
  'ui.router',
  'app.directives'
])

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
  .state('home', {
    templateUrl: 'app/home/view.html',
    url: '/',
    controller: 'HomeController'
  })
  .state('searchZip', {
    templateUrl: 'app/home/view.html',
    url: '/:zipcode',
    controller: function($scope, $stateParams) {
      $scope.location = $stateParams.zipcode;
    }
  })
  .state('repProfile', {
    templateUrl: 'app/home/profile.html',
    url: '/rep/:bioguide_id',
    controller: function($scope, $stateParams) {
      $scope.bioguide_id = $stateParams.bioguide_id;
    }
  })
  .state('billsummary',{
    templateUrl: 'app/billsummary/bill-summary.html',
    url: '/billSummary',
    controller: 'BillSummary'
  });
  // .state('profile',{
  //   templateUrl: 'app/profile/rep-profile-view.html',
  //   url: "/profile",
  //   controller: 'ProfileController'
  // });

  // DEFAULT route
  $urlRouterProvider.otherwise('/');

});
