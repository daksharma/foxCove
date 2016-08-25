angular.module('app.home', [])

.controller('HomeController', function($scope, userLocationFactory) {
  $scope.submit = function() {
    // alert($scope.location);
    userLocationFactory.sendZipCode($scope.location);
  };
})

.factory('userLocationFactory', function($http){
  function sendZipCode(userZipCode) {
    $http.post('/getReps', {zipcode: userZipCode})
         .then(function (data, error) {
           console.log(data);
           if (error) {
             console.log(error);
           }
           return 'hello';
         });
  }
  return {
    sendZipCode : sendZipCode
  }
});
