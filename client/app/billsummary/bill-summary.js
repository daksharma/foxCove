angular.module('app.bill', [])
.controller('BillSummary', ['$scope', 'Bill', '$state', 'RepBills', '$sce', function ($scope, Bill, $state, RepBills, $sce) {

  var bill = RepBills.getSelectedBill();

  $scope.getBillSum = function () {

    Bill.getSummary($scope.bill)
      .then(function(summaryFragments){
          $scope.summaryFragments = summaryFragments.map(function(summaryFragment){
            return $sce.trustAsHtml(summaryFragment);
          });
      });

    Bill.getInfo($scope.bill)
      .then(function(billInfo){
        $scope.introDate = billInfo.introduced_date;
        $scope.officialIntro = billInfo.titles[0][2];
        $scope.altTitle = (billInfo.titles[2] ? billInfo.titles[2][2] : undefined);
        $scope.billTitle = billInfo.title;
        $scope.curBillStatus = billInfo.current_status_description;
        $scope.sponsor = billInfo.sponsor;
        $scope.cosponsors = billInfo.cosponsors;
        $scope.sponsor_role = billInfo.sponsor_role;
      });

  };
  $scope.loadProfile = function (rep) {
    $state.go('repProfile', {bioguide_id: rep.bioguideid});
  };

  $scope.goHome = function() {
    $state.go('home');
  };

}]);

// in the html you can use this instead of dot operation
// <p>{{billTitle}}</p>
// <p>{{curBillStatus}}</p>
// <p>{{officialIntro}}</p>
// <p>{{introDate | date}}</p> // this will apply proper date format // SICK -Casey
// I added the whole object to scope for variety.
// test comment
