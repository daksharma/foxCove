angular.module('app.home', [])

.controller('HomeController', ['$scope','$state', function($scope, $state) {

  $scope.submit = function() {
    $state.go('searchZip', {zipcode: $scope.location});
  };

}]);
