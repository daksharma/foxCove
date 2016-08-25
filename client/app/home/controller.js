angular.module('app.home', [])

.controller('HomeController', function($scope) {

  $scope.submit = function() {
    alert($scope.location);
  }

})
