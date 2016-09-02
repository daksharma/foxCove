angular.module('app.localResults', [])

.controller('ResultsController', 
  ['$scope',
    'Location', 
    '$state', 
    'LocalOfficials', 
    'ZipCoords', 
    'LocalMap', 
    'SalesTax', 
    function($scope, Location, $state, LocalOfficials, ZipCoords, LocalMap, SalesTax) {
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
          // console.log("RESULTS", $scope.officials)
          $scope.officials = [];
          for(var key in results){
            if(key !== 'city'){
              // console.log("here", results[key][0].name)
              var arr = results[key];
              for(var i = 0; i < arr.length;i++){
                if(!arr[i].photoUrl){
                  arr[i].photoUrl = 'css/foundation-icons/svgs/fi-torso-business.svg'
                }
                if(arr[i].party === "Democratic"){
                  arr[i].party = "Democrat"
                }
                arr[i].title = key;
                $scope.officials.push(arr[i])
              }
            }
          }
        });
      SalesTax.getSalesTax($scope.location)
        .then(function(results){
          $scope.taxes = results;
        })
      ZipCoords.getGeoFromZip({zipcode: $scope.location})
        .then(function(results) {
          $scope.geo = results.data.slice(0, 2);
          $scope.token = results.data[2];
        })
        .then(function() {
          LocalMap.getMapFromGeo($scope.geo, function(results) {
            // console.log('Local: ', results)
            $scope.map = 'images/maps/' + results;
          });
        });    
    }
  };
  $scope.loadProfile = function (rep) {
    $state.go('repProfile', {bioguide_id: rep.bioguide_id});
  }
}]);