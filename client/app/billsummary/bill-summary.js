angular.module('app.home', [])
       .controller('BillSummary', ['$scope', 'GetBillSummary', '$state', function ($scope, GetBillSummary, $state) {

         $scope.getBillSum = function () {
           // for now get something back from server for one specific bill
           GetBillSummary.getBillSummary(71410)
                         .then(function(data){
                           // don't worry if these dot variables are complaining
                           $scope.billTitle = data.title;
                           $scope.introDate = data.introduced_date;
                           $scope.curBillStatus = data.current_status_description;
                           $scope.officialIntro = data.titles[1][2];
                         });
         }
       }]);



// in the html you can use this instead of dot operation
// <p>{{billTitle}}</p>
// <p>{{curBillStatus}}</p>
// <p>{{officialIntro}}</p>
// <p>{{introDate | date}}</p> // this will apply proper date format