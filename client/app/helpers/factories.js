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
    repsObject: repsObject,
    getRepFromZip: getRepFromZip
  }
})
.factory('SearchResult',function() {
// Is this a thing? Can we get rid of it?

})
.factory('RepProfile', function($http) {
  var repObject = {};

  function getRepFromBioId(bioguide_id) {
    return $http.post('/getRep', bioguide_id)
      .then(function (response) {
        repObject = response.data;
        console.log(repObject);
        return response.data;
      }, function (error) {
        console.log(error);
      });
  };

  function getRepSponsorshipHistory(bioguide_id) {
    return $http.post('/sponsorship', bioguide_id)
      .then(function(response) {
        repObject.sponsorships = response.data.results;
        console.log('repObject:', repObject);
        return response.results;
      }, function(error) {
          console.error(error);
      });
  };

  return {
    repObject: repObject,
    getRepFromBioId: getRepFromBioId,
    getRepSponsorshipHistory: getRepSponsorshipHistory
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
.factory('StateLeg', function($http){
  var legislators = {};
  function getStateLegsFromGeo(legs) {
    return $http.post('/getStateLegs', ref)
      .then(function(res){
        legislators.data = res.data;
        return res.data;
      }, function(error) {
        console.log(error)
      });
  }
  return {
    legislators: legislators.data,
    getStateLegsFromGeo: getStateLegsFromGeo
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
})
.factory('Affiliations', function($http){
  function getAffiliations(input) {
    return $http.post('/getRepAffiliation', input)
      .then(function(res){
        // console.log("RES", res)
        return res.data;
      }, function(error) {
        console.log(error)
      });
  }

  function formatCurrency (string, cur) {
  var arr = string.split("");
  var result = [];
  for(var i = arr.length -1 ; i >= 0; i-=3){
    result.unshift(arr[i]);
    if(arr[i-1]){
      result.unshift(arr[i-1]);
      if(arr[i-2]){
        result.unshift(arr[i-2]);
        if(arr[i-3]){
          result.unshift(",")
        }
      }
    }
  }
  return cur + result.join("");
}

  return {
    getAffiliations: getAffiliations,
    formatCurrency: formatCurrency
  }
})
.factory('RepBills', function($http){
  var bills;
  function getBillsFromRepId(ref) {
    return $http.post('/getBills', ref)
      .then(function(res){
        bills = res.data;
        return res.data;
      }, function(error) {
        console.log(error)
      });
  }
  return {
    bills: bills,
    getBillsFromRepId: getBillsFromRepId
  }
});
