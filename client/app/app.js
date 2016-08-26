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
  .state('search', {
    templateUrl: 'app/search/search.html',
    url: '/search',
    controller: 'SearchResultController'
  })
  // .state('profile',{
  //   templateUrl: 'app/profile/rep-profile-view.html',
  //   url: "/profile",
  //   controller: 'ProfileController'
  // });

  // DEFAULT route
  $urlRouterProvider.otherwise('/');

});
