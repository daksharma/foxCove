angular.module('app.helperFactories', [])

.factory('Location', function ($http) {
  var repsObject = {};
  function getRepFromZip(zipCode) {
    return $http.post('/getReps', {zipcode: zipCode})
      .then(function (response) {
        repsObject.reps = response.data;
        return response.data;
      }, function (error) {
        console.log(error);
      });
  }

  return {
    repsObjects: repsObject,
    getRepFromZip: getRepFromZip
  }
})
.factory('SearchResult',function() {


})
.factory('RepProfile', function($http) {
  var repObject = {};

  function getRepFromBioId(bioguide_id) {
    return $http.post('/getRep', bioguide_id)
      .then(function (response) {
        repObject = response.data;
        return response.data;
      }, function (error) {
        console.log(error);
      });
  }

  return {
    rep: repObject,
    getRepFromBioId: getRepFromBioId
  }
})
.factory('RepBio', function($http) {
  var repBio = {};

  function getBioFromRepName(searchString) {
    return $http.post('/getBio', searchString)
      .then(function (response) {
        repBio = response.data;
        return repBio
      }, function (error) {
        console.log(error);
      });
  }

  return {
    bio: repBio,
    getBioFromRepName: getBioFromRepName
  }
})
.factory('ZipCoords', function($http) {
  var coordinates;
  var token;
  function getGeoFromZip(searchString) {
    return $http.post('/getGeo', searchString)
      .then(function (response) {
        coordinates = response.data.slice(0, 2);
        token = response.data[2];
        return response;
      }, function (error) {
        console.log(error);
      });
  }

  return {
    coordinates: coordinates,
    token: token,
    getGeoFromZip: getGeoFromZip
  }
})
.factory('LocalMap', function($http) { // To be completed. Do not delete.
  var map;

  function getMapFromGeo(geo, cb) {
    return $http.post('/getMap', geo)
      .then(function (response) {
        map = response.data;
        cb(map);
      }, function (error) {
        console.log(error);
      });
  }

  return {
    map: map,
    getMapFromGeo: getMapFromGeo
  }
})
.factory('LocalOfficials', function($http){
  function getOfficials(zipcode){
    return $http.post('/getLocalReps', {zip: zipcode})
      .then(function(res){
        return res.data
      }, function(error) {
        console.log(error)
      });
  }
  return {
    getOfficials: getOfficials
  }
})
.factory('GetBillSummary', function($http) {
  var bill = {};
  function getBillSummary(bill_id) {
    return $http.post('/billSummary', {bill_id : bill_id})
      .then(function(data){
        bill.complete = data.data;
        return bill.complete;
      }, function(error) {
        console.log(error);
      })
  }
  return {
    bill : bill,
    getBillSummary : getBillSummary
  }
})
.factory('SalesTax', function($http){
  function getSalesTax(zipcode){
    return $http.post('/getSalesTax', {zip: zipcode})
      .then(function(res){
        return res.data
      }, function(error) {
        console.log(error)
      });
  }
  return {
    getSalesTax: getSalesTax
  }
});