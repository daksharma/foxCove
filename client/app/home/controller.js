angular.module('app.home', [])

.controller('HomeController', function($scope, userLocationFactory) {
  $scope.submit = function() {
    // alert($scope.location);
    userLocationFactory.sendZipCode($scope.location);
  };
})

.factory('userLocationFactory', function($http){
  var serverUrl = 'localhost:3000'; // TODO : properly change server/localhost
  function sendZipCode(userZipCode) {
    $http.post(serverUrl + '/getreps', userZipCode)
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
