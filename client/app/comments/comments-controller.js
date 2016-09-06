angular.module('app.comments', [])
.controller('Comments', ['$scope', '$state', 'UserComments', function($scope, $state, UserComments) {

  $scope.getComments = function(page){
    UserComments.getComments(page)
      .then(function(comments){
        $scope.comments = comments;
        console.log(comments)
      })
  };

  $scope.postComment = function(comment, username){
    console.log(comment)
    var timeNow = Date.now();
    UserComments.postComment({content: comment, username: username, time: timeNow})
      .then(function(data){
        console.log(data)
      })
  }
    



}])