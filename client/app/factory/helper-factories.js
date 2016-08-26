angular.module('app.helperFactories', [])

.factory('Location', function() {
  function getRepFromZip(zipCode) {
    return $http({
      method: 'POST',
      url: '/getReps',
      data: { zipcode: zipCode }
    })
      .then(function(res){
        return res.data;
      })
  }
  return {
    getRepFromZip : getRepFromZip
  }
});