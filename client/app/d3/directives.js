angular.module('myApp.directives', ['d3'])
  .directive('barChart', ['d3Service', function(d3Service) {
    return {
      restrict: 'EA',
      scope: {},
      link: function(scope, element, attrs) {
        d3Service.d3().then(function(d3) {
          var svg = d3.select(element[0])
            .append("svg")
            .style("width", "100%");
        });
      }};
  }]);
