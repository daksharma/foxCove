angular.module('foxCove', [
  'app.home',
  'app.localResults',
  'app.personProfile',
  'app.helperFactories',
  'ui.router',
  'app.directives'
])

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
  .state('home', {
    templateUrl: 'app/home/home-view.html',
    url: '/',
    controller: 'HomeController'
  })

  .state('searchZip', {
    templateUrl: 'app/home/home-view.html',
    url: '/:zipcode',
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

  // DEFAULT route
  $urlRouterProvider.otherwise('/');

});
