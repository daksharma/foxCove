angular.module('app.home', [])

.controller('HomeController', function($scope, userLocationFactory) {
  $scope.submit = function() {
    // alert($scope.location);
    userLocationFactory.sendZipCode($scope.location);
  };
  $scope.reps = userLocationFactory.result;
})

.factory('userLocationFactory', function($http){
  var result = { data : null};
  function sendZipCode(userZipCode) {
    console.log(userZipCode);
    $http.post('/getReps', {zipcode:userZipCode})
         .then(function (data){
           result.data = data;
           console.log(result.data);
         }, function(error) {
              console.log(error);
         });
  }
  return {
    sendZipCode : sendZipCode,
    result : result
  }
});
