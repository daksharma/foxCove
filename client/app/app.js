angular.module('foxCove', [
  'app.home',
  'ui.router'
])

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
  .state('home', {
    templateUrl: 'app/home/view.html',
    url: '/',
    controller: 'HomeController'
  });

  // DEFAULT route
  $urlRouterProvider.otherwise('/');

});
