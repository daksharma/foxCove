angular.module('app.bill', [])
.controller('BillSummary', ['$scope', 'GetBillSummary', '$state', function ($scope, GetBillSummary, $state) {
  $scope.getBillSum = function () {
    GetBillSummary.getBillSummary($scope.bill_id)
      .then(function(data){
        $scope.billTitle = GetBillSummary.bill.complete.title;
        $scope.introDate = GetBillSummary.bill.complete.introduced_date;
        $scope.curBillStatus = GetBillSummary.bill.complete.current_status_description;
        $scope.officialIntro = GetBillSummary.bill.complete.titles[1][2];
        $scope.sponsor = GetBillSummary.bill.complete.sponsor;
        $scope.cosponsors = GetBillSummary.bill.complete.cosponsors;
        $scope.billDetail = GetBillSummary.bill.complete;
      });
  }
  $scope.loadProfile = function (rep) {
    $state.go('repProfile', {bioguide_id: rep.bioguideid});
  }
}]);

// in the html you can use this instead of dot operation
// <p>{{billTitle}}</p>
// <p>{{curBillStatus}}</p>
// <p>{{officialIntro}}</p>
// <p>{{introDate | date}}</p> // this will apply proper date format // SICK -Casey
// I added the whole object to scope for variety.
// test comment