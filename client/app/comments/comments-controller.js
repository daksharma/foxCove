
angular.module('app.comments', [])
.controller('Comments', ['$scope', '$state', 'UserComments', function($scope, $state, UserComments) {
  $scope.getComments = function(page){
    console.log("PAGE", page)
    UserComments.getComments(page)
                .then(function(comments){
                  $scope.comments = comments;
                  console.log("COMMENTS", comments)
                });
  };
  $scope.postComment = function(comment, username, page){
    console.log('posting!', comment, username, page)
    var timeNow = new Date();
    UserComments.postComment({page: page, content: comment, username: username, time: timeNow})
                .then(function(data){
                  console.log(data)
                })
  };
}]);