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
  };
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

  function getRepSponsorshipHistory(bioguide_id) {
    return $http.post('/sponsorship', bioguide_id)
      .then(function(response) {
        repObject.sponsorships = response.data.results;
        return response.results;
      }, function(error) {
          console.error(error);
      });
  }

  return {
    repObject: repObject,
    getRepFromBioId: getRepFromBioId,
    getRepSponsorshipHistory: getRepSponsorshipHistory
  };
})
.factory('StateRepProfile', function($http) {
  var repObject = {};

  function getRepFromLegId(leg_id) {
    return $http.get('/getStateRepRecord?leg_id=' + leg_id.leg_id) // Check the DB for this rep.
      .then(function (response) {
        if (response.data) {
          repObject.data = response.data;
          return response.data;
        }
        return $http.post('/getStateRep', leg_id)
        .then(function (response) {
          repObject.data = response.data;
          repObject.data.party = repObject.data.party.replace('Democratic', 'Democrat');
          $http.post('/saveStateRepRecord', response.data);
          return response.data;
        }, function (error) {
          console.log(error);
        });
      }, function (error) {
        console.log(error);
      });
  }

  function getStateRepBills(leg_id) {
    return $http.post('/getStateRepBills', leg_id)
      .then(function(response) {
        repObject.bills = response.data;
        // TODO: Slice bill title into subject and description.
        return response.data;
      }, function(error) {
        console.log(error);
      });
  }

  return {
    repObject: repObject,
    getRepFromLegId: getRepFromLegId,
    getStateRepBills: getStateRepBills
  };
})
.factory('RepBio', function($http) {
  var repBio = {};

  function getBioFromRepName(searchString) {
    return $http.post('/getBio', searchString)
      .then(function (response) {
        repBio = response.data;
        return repBio;
      }, function (error) {
        console.log(error);
      });
  }

  return {
    bio: repBio,
    getBioFromRepName: getBioFromRepName
  };
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
  };
})
.factory('LocalMap', function($http) {
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
  };
})
.factory('LocalOfficials', function($http){
  function getOfficials(zipcode){
    return $http.post('/getLocalReps', {zip: zipcode})
      .then(function(res){
        return res.data;
      }, function(error) {
        console.log(error);
      });
  }
  return {
    getOfficials: getOfficials
  };
})
.factory('StateLeg', function($http){
  var legislators = {};
  function getStateLegsFromGeo(coordinates) {
    return $http.post('/getStateLegs', coordinates)
      .then(function(res){
        legislators.data = res.data;
        legislators.data.forEach(function(v) {
          v.party = v.party.replace('Democratic', 'Democrat');
          legislators.state = v.state; // This is a cheap move that should be done in the first Zipcode lookup above
        });
        return legislators;
      }, function(error) {
        console.log(error);
      });
  }
  return {
    legislators: legislators,
    getStateLegsFromGeo: getStateLegsFromGeo
  };
})
.factory('Bill', function($http) {

  function getSummary(bill) {
    return $http.post('/billSummary', bill)
      .then(function(res){
        return res.data;
      }, function(error) {
        console.log(error);
      });
  }

  function getInfo(bill) {
    return $http.post('/billInfo', bill)
      .then(function(res){
        return res.data;
      }, function(err) {
        console.error(err);
      });
  }

  return {
    getSummary : getSummary,
    getInfo: getInfo
  };
})
.factory('SalesTax', function($http){
  function getSalesTax(zipcode){
    return $http.post('/getSalesTax', {zip: zipcode})
      .then(function(res){
        return res.data;
      }, function(error) {
        console.log(error);
      });
  }
  return {
    getSalesTax: getSalesTax
  };
})
.factory('Affiliations', function($http){
  function getAffiliations(input) {
    return $http.post('/getRepAffiliation', input)
      .then(function(res){
        // console.log("RES", res)
        return res.data;
      }, function(error) {
        console.log(error);
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
          result.unshift(",");
        }
      }
    }
  }
  return cur + result.join("");
}

  return {
    getAffiliations: getAffiliations,
    formatCurrency: formatCurrency
  };
})
.factory('RepBills', function($http){
  // STORE user selection
  var storage = { selectedBill: null };

  function getBillsFromRepId(ref) {
    return $http.post('/getBills', ref)
      .then(function(res){
        return res.data;
      }, function(error) {
        console.log(error);
      });
  }

  return {
    // RETRIEVE selected bill
    getSelectedBill: function() {
      return storage.selectedBill;
    },
    // CACHE selected bill
    setSelectedBill: function(value) {
      storage.selectedBill = value;
    },
    getBillsFromRepId: getBillsFromRepId
  };
})
.factory('UserComments', function($http) {
  function getComments(page) {
    return $http.post('/getComments', {page: page})
      .then(function (res) {
        return res.data;
      }, function (error) {
        console.log(error)
      });
  }

  function postComment(comment) {
    return $http.post('/postComment', {comment: comment})
      .then(function (res) {
        return res.data;
      }, function (error) {
        console.log(error)
      });
  }

  function deleteComment(comment) {
    return $http.post('/deleteComment', {comment: comment})
      .then(function (res) {
        return res.data;
      }, function (error) {
        console.log(error)
      });
  }

  return {
    getComments: getComments,
    postComment: postComment,
    deleteComment: deleteComment
  };
})
.factory('RepNews', function($http) {
  function getRepNews(titleAndRepName, bioguide_id) {
    return $http.get('/getRepNewsArticles?bioguide_id=' + bioguide_id)
      .then(function(data) {
        if (data !== null && data.data !== "") {
          return data.data;
        } else {
          return $http.post('/getRepNews', {titleAndRepName: titleAndRepName, bioguide_id: bioguide_id})
            .then(function (newsData) {
              return newsData.data;
            }, function (error) {
              console.log(error);
            });
        }
      });
  }
  return {
    getRepNews : getRepNews
  };
});
