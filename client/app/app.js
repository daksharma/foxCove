angular.module('foxCove', [
  'app.home',
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
  // .state('profile',{
  //   templateUrl: 'app/profile/rep-profile-view.html',
  //   url: "/profile",
  //   controller: 'ProfileController'
  // });

  // DEFAULT route
  $urlRouterProvider.otherwise('/');

});
