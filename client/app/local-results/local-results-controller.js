angular.module('app.localResults', [])

.controller('ResultsController', ['$scope','Location', '$state', 'LocalOfficials', function($scope, Location, $state, LocalOfficials) {
  $scope.submit = function() {
    $state.go('searchZip', {zipcode: $scope.location})
  }
  $scope.loadZip = function() {
    if ($scope.location) {
      Location.getRepFromZip($scope.location)
        .then(function(results){
          $scope.reps = results.reps;
          $scope.reps.forEach(function(rep) {
            rep.thumb = 'http://theunitedstates.io/images/congress/225x275/' + rep.bioguide_id + '.jpg';
          });
        });
      LocalOfficials.getOfficials($scope.location)
        .then(function(results){
          console.log("RESULTS", $scope.officials)
          $scope.officials = [];
          for(var key in results){
            if(key !== 'city'){
              console.log("here", results[key][0].name)
              var arr = results[key];
              for(var i = 0; i < arr.length;i++){
                arr[i].title = key;
                $scope.officials.push(arr[i])
              }
            }
          }
        })
    }
  }
  $scope.loadProfile = function (rep) {
    $state.go('repProfile', {bioguide_id: rep.bioguide_id});
  }
}]);