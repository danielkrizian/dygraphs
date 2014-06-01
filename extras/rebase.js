Dygraph.Plugins.Rebase = (function() {
  var rebase = function() {
  };

  rebase.prototype.toString = function() {
    return "Rebase Plugin";
  };

  rebase.prototype.activate = function(g) {
    return {
      willDrawChart: this.willDrawChart
    };
  };

  rebase.calcRebase_ = function(axis, value, logscale) {
    return DygraphLayout.calcYNormal_.apply(null, arguments);
  }

  rebase.prototype.willDrawChart = function(e) {
    var g = e.dygraph;

    if (g.getOption("rebase") === null) {
      return
    }

    function isNumber(value) {
      var type = typeof value;
      return type == 'number' ||
        (value && type == 'object' && toString.call(value) == numberClass) || false;
    }

    var rebaseOpt = g.getOption("rebase");
    var p = g.plotter_;
    var sets = p.layout.points;

    for (var i = 0; i < sets.length; i++) {
      var points = sets[i];
      var setName = p.layout.setNames[i];
      var axis = g.axisPropertiesForSeries(setName);
      var logscale = g.attributes_.getForSeries("logscale", setName);
      var starty;

      if (isNumber(rebaseOpt)) {
        var base = rebase.calcRebase_(axis, rebaseOpt, logscale);
      } else if (rebaseOpt === 'percent') {
        var yRange = g.yAxisRange(0);
        var avg = (yRange[1] - yRange[0]) / 2;
        var base = rebase.calcRebase_(axis, avg, logscale);

        g.updateOptions({
          axes: {
            y: {
              axisLabelFormatter: function(y) {
                return y + '%';
              },
              ticker: function(a, b, pixels, opts, dygraph, vals) {
                // TODO
                return Dygraph.numericTicks(a, b, pixels, opts, dygraph, vals);
              }
            }
          },
          valueRange: [-100, 100]
        }, true);
      }

      var ys = points.reduce(function(p, c) {
        p.push(c.y);
        return p;
      }, []);
      var min = Math.min.apply(Math, ys);
      var max = Math.max.apply(Math, ys) - min;

      points.map(function(c) {
        c.y = base * (c.y - min) / max;
      });
    }
  };

  return rebase;
})();
