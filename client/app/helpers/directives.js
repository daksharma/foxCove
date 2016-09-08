angular.module('app.directives', [])

.directive('ngEnter', function () {
  return function (scope, element, attrs) {
    element.bind("keydown keypress", function (event) {
      if(event.which === 13) {
        scope.$apply(function (){
          scope.$eval(attrs.ngEnter);
        });
        event.preventDefault();
      }
    });
  };
})

.directive('ngImgErr', function() {
  return {
    link: function(scope, element, attrs) {
      element.bind('error', function() {
        if (attrs.src !== attrs.ngImgSrc) {
          attrs.$set('src', attrs.ngImgErr);
        }
      });
    }
  };
});
