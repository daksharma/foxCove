angular.module('app.home', [])

.controller('HomeController', function($scope, userLocationFactory) {
  $scope.submit = function() {
    // alert($scope.location);
    userLocationFactory.sendZipCode($scope.location);
  };
})

.factory('userLocationFactory', function($http){
  function sendZipCode(userZipCode) {
    console.log(userZipCode);
    $http.post('/getReps', {zipcode:userZipCode})
         .then(function (data){
           console.log(data);
         }, function(error) {
              console.log(error);
         });
  }
  return {
    sendZipCode : sendZipCode
  }
});
