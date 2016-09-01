//This file is obsoleted. Please use local-results-controller.js

// angular.module('app.home', [])

// .controller('HomeController', ['$scope','Location', '$state', function($scope, Location, $state) {
//   $scope.loadZip = function() {
//     if ($scope.location) {
//       Location.getRepFromZip($scope.location)
//         .then(function(results){
//           $scope.reps = results.reps;
//           $scope.reps.forEach(function(rep) {
//             rep.thumb = 'http://theunitedstates.io/images/congress/225x275/' + rep.bioguide_id + '.jpg';
//           });
//         });
//     }
//   }
//   $scope.submit = function() {
//     $state.go('searchZip', {zipcode: $scope.location});
//   }
//   $scope.loadProfile = function (rep) {
//     $state.go('repProfile', {bioguide_id: rep.bioguide_id});
//   }
// }])

// .controller('ProfileController', ['$scope','RepProfile', '$state', function($scope, RepProfile, $state) {
//   $scope.build = function() {
//     RepProfile.getRepFromBioId($state.params)
//       .then(function(results){
//         $scope.reps = results;
//         $scope.reps.forEach(function(rep) {
//           rep.img = 'http://theunitedstates.io/images/congress/450x550/' + rep.bioguide_id + '.jpg';
//           rep.thumb = 'http://theunitedstates.io/images/congress/225x275/' + rep.bioguide_id + '.jpg';
//         });
//       });
//   };
// }])
