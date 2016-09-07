angular.module('d3directive', [])
  .directive('pieChart', ['$window', '$timeout', function($scope, $window, $timeout) {
    return {
      // MATCH element OR attribute
      restrict: 'EA',
      replace: false,
      scope: {
        // two-way data binding
        data: "=",
      },
      link: function(scope, element, attrs) {

        console.log('d3:', d3);
        // ASSIGN chart radius
        var radius = 75;
        // ASSIGN colors to chart paths
        var color = d3.scaleOrdinal()
          .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

        var svg = d3.select(element[0])
          .append('svg')
          .style('width', '100%')
          .style('height', '100%')
          .append('g')
          .attr('transform', "translate(" + 360 / 2 + "," + 150 / 2 + ")");

        // WATCH scope.data
        scope.$watch('data', function(newData, oldData) {
          // when change, RENDER new data
          render(newData);
        }, true);

        var arc = d3.arc()
        .outerRadius(radius - 10)
        // CHANGE size of hole
        .innerRadius(radius - 30);

        var pie = d3.pie()
        .sort(null)
        .value(function(d) {
          return d.rate;
        });

        function render(data){
          // REMOVE svg elements from canvas
          svg.selectAll('*').remove();

          if( !data ){
            return;
          }

          var totalRate = data.totalRate;
          data = data.rates;

          svg.selectAll('.arc')
            .data(pie(data))
            .enter()
            .append("g")
            .attr('r', radius)
            .attr('class', 'arc')
            .append('path')
            .attr('d', arc)
            .style("fill", function(d) {
              return color(d.data.rate);
            });
        }
      }
    };
  }]);
