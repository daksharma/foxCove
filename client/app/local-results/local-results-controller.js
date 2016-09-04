angular.module('app.localResults', [])


      // Adding this function to retrieve local legislators on account of they aren't in the local officials. Need to consolidate
      // the current local officials into a single module first to avoid confususion.
      // 'openstates.org/api/v1/legislators/geo/?lat=' + geo[1] + '&' + long=geo[0]

      //   .then(function() {
      //     LocalReps.getRepsFromGeo($scope.geo, function(results) {
      //       $scope.localReps = results;
      //   })
      // })


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
    if ($scope.location.match(/^\d{5}$/)) { // Validate 5-digit input
      Location.getRepFromZip($scope.location)
        .then(function(results){
          $scope.reps = Location.repsObject.reps.reps;
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
            $scope.map = 'images/maps/' + results;
          });
        });    
    } else {
      $scope.nope(); // Redirect to error message state
    }
  }

  $scope.loadProfile = function (rep) {
    $state.go('repProfile', {bioguide_id: rep.bioguide_id});
  }

  $scope.nope = function() {
    $state.go('errorResponse', {str: $scope.location});
  }

}]);