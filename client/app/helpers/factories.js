angular.module('app.helperFactories', [])
.factory('Location', function ($http) {
  var repsObject = {};
  function getRepFromZip(zipCode) {
    console.log('sending:', {zipcode: zipCode});
    return $http.post('/getReps', {zipcode: zipCode})
      .then(function (response) {
        console.log(response.data);
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
  var billSum = {};
  function getBillSummary(bill_id) {
    return $http.post('/billSummary', {bill_id : bill_id})
                .then(function(data){
                  billSum.summary = data.data;
                  return billSum.summary;
                }, function(error) {
                  console.log(error);
                })
  }
  return {
    billSummary : billSum,
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