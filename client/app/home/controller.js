angular.module('app.home', [])

.controller('HomeController', ['$scope','Location', '$state', 'LocalOfficials', function($scope, Location, $state, LocalOfficials) {
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
  $scope.submit = function() {
    $state.go('searchZip', {zipcode: $scope.location})
  }
  $scope.loadProfile = function (rep) {
    $state.go('repProfile', {bioguide_id: rep.bioguide_id});
  }
}])

.controller('ProfileController', ['$scope','RepProfile', '$state', function($scope, RepProfile, $state) {
  $scope.build = function() {
    RepProfile.getRepFromBioId($state.params)
      .then(function(results){
        $scope.rep = results.rep;
        $scope.rep.img = 'http://theunitedstates.io/images/congress/450x550/' + $scope.rep.bioguide_id + '.jpg';
      })
  };
}])