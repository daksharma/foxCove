angular.module('foxCove', [
  'app.home',
  'app.localResults',
  'app.personProfile',
  'app.bill',
  // 'app.repProfileController',
  'app.helperFactories',
  'ui.router',
  'app.directives',
  'app.comments',
  'd3directive'
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
    url: '/zip/:zipcode',
    views: {
      '': {
        templateUrl: 'app/local-results/local-results-view.html',
        controller: function($scope, $stateParams) {
          $scope.location = $stateParams.zipcode;
          $scope.pageName = $stateParams.zipcode;
        }
      },
      'comments@searchZip': {
        templateUrl: 'app/comments/comments-view.html',
        controller: 'Comments'
      }
    }
  })

  // .state('searchZip', {
  //   templateUrl: 'app/local-results/local-results-view.html',
  //   url: '/zip/:zipcode',
  //   controller: function($scope, $stateParams) {
  //     $scope.location = $stateParams.zipcode;
  //     $scope.pageName = $stateParams.zipcode;
  //   }
  // })

  // .state('searchZip.comments', {
  //   templateUrl: 'app/comments/comments-view.html'
  // })

  .state('repProfile', {
    url: '/rep/:bioguide_id',
    views: {
      '': {
        templateUrl: 'app/person-profile/person-profile-view.html',
        controller: function($scope, $stateParams) {
          $scope.leg_id = $stateParams.leg_id;
          $scope.pageName = "rep/" + $stateParams.bioguide_id;
        }
      },
      'comments@repProfile': {
        templateUrl: 'app/comments/comments-view.html',
        controller: 'Comments'
      }
    }
  })

  // .state('repProfile', {
  //   templateUrl: 'app/person-profile/person-profile-view.html',
  //   url: '/rep/:bioguide_id',
  //   controller: function($scope, $stateParams) {
  //     $scope.leg_id = $stateParams.leg_id;
  //     $scope.pageName = "rep/" + $stateParams.bioguide_id;
  //   }
  // })

  // .state('repProfile.comments', {
  //   url: '/comments',
  //   templateUrl: 'app/comments/comments-view.html'
  // })

  .state('stateRepProfile', {
    url: '/srep/:leg_id',
    views: {
      '': {
        templateUrl: 'app/person-profile/person-profile-view.html',
        controller: function($scope, $stateParams) {
          $scope.leg_id = $stateParams.leg_id;
          $scope.pageName = "srep/" + $stateParams.leg_id;
        }
      },
      'comments@stateRepProfile': {
        templateUrl: 'app/comments/comments-view.html',
        controller: 'Comments'
      }
    }
  })

  // .state('stateRepProfile', {
  //   templateUrl: 'app/person-profile/person-profile-view.html',
  //   url: '/srep/:leg_id',
  //   controller: function($scope, $stateParams) {
  //     $scope.leg_id = $stateParams.leg_id;
  //     $scope.pageName = "srep/" + $stateParams.leg_id;
  //   }
  // })

  // .state('stateRepProfile.comments', {
  //   url: '/comments',
  //   templateUrl: 'app/comments/comments-view.html'
  // })

  .state('billSummary', {
    url: '/bill/:congress/:type/:number',
    views: {
      '': {
        templateUrl: 'app/billsummary/bill-summary.html',
        controller: function ($scope, $stateParams) {
          $scope.bill = {
            congress: $stateParams.congress,
            number: $stateParams.number,
            type: $stateParams.type
          };
          $scope.pageName = $stateParams.congress + "/" + $stateParams.number + "/" + $stateParams.type;
        }
      },
      'comments@billSummary': {
        templateUrl: 'app/comments/comments-view.html',
        controller: 'Comments'
      }
    }
  })

  // .state('billSummary',{
  //   templateUrl: 'app/billsummary/bill-summary.html',
  //   url: '/bill/:congress/:type/:number',
  //   controller: function ($scope, $stateParams) {
  //     $scope.bill = {
  //       congress: $stateParams.congress,
  //       number: $stateParams.number,
  //       type: $stateParams.type
  //     };
  //     $scope.pageName = $stateParams.congress + "/" + $stateParams.number + "/" + $stateParams.type;
  //   }
  // })

  // .state('billSummary.comments', {
  //   url: '/comments',
  //   templateUrl: 'app/comments/comments-view.html'
  // })

  .state('dev', {
    templateUrl: 'app/comments/comments-view.html',
    url: '/dev/',
  });

  // DEFAULT route
  $urlRouterProvider.otherwise('/');
});
