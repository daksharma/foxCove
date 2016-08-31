angular.module('app.home', [])
       .controller('BillSummary', ['$scope', 'GetBillSummary', '$state', function ($scope, GetBillSummary, $state) {
         $scope.helloBill = "HELLO"; // just testing
         console.log($scope.helloBill);

         $scope.getBillSum = function () {
           // for now get something back from server for one specific bill
           GetBillSummary.getBillSummary(71410)
                         .then(function(data){
                           $scope.curBillSummary = data;
                           console.log($scope.curBillSummary);
                         });
         }
       }]);