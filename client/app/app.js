angular.module('foxCove', [
  'app.home',
  'ui.router',
  'app.helperFactories'
])

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
  .state('home', {
    templateUrl: 'app/home/view.html',
    url: '/',
    controller: 'HomeController'
  })
  .state('profile', {
    templateUrl: 'app/profile/profile.html',
    url: '/hello',
    controller: 'profileController'
  });

  // DEFAULT route
  $urlRouterProvider.otherwise('/');

});
