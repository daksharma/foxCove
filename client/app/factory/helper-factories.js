angular.module('app.helperFactories', [])
  .factory('Location', function ($http) {
    function getRepFromZip(zipCode) {
      return $http.post('/getReps', {zipcode: zipCode})
                  .then(function (response) {
                    return response.data;
                  }, function (error) {
                    console.log(error)
                  });

    }
    return {
      getRepFromZip: getRepFromZip
    }
  });