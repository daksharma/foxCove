angular.module('app.bill', [])
.controller('BillSummary', ['$scope', 'GetBillSummary', '$state', function ($scope, GetBillSummary, $state) {
  $scope.getBillSum = function () {
    // for now get something back from server for one specific bill // 71410
    // replace the bill_id number with $scope.bill_id or $stateParams.bill_id, one of these lol
    console.log($scope.bill_id)
    GetBillSummary.getBillSummary($scope.bill_id)
      .then(function(data){
        console.log(GetBillSummary.bill)
        $scope.billTitle = GetBillSummary.bill.complete.title;
        $scope.introDate = GetBillSummary.bill.complete.introduced_date;
        $scope.curBillStatus = GetBillSummary.bill.complete.current_status_description;
        $scope.officialIntro = GetBillSummary.bill.complete.titles[1][2];
        $scope.sponsor = GetBillSummary.bill.complete.sponsor;
        $scope.billDetail = GetBillSummary.bill.complete;
      });
  }
  $scope.loadProfile = function (rep) {
    $state.go('repProfile', {bioguide_id: $scope.sponsor.bioguideid});
  }
}]);

// in the html you can use this instead of dot operation
// <p>{{billTitle}}</p>
// <p>{{curBillStatus}}</p>
// <p>{{officialIntro}}</p>
// <p>{{introDate | date}}</p> // this will apply proper date format // SICK -Casey
// test comment