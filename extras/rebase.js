Dygraph.Plugins.Rebase = (function() {
  var rebase = function() {
  };

  rebase.prototype.toString = function() {
    return "Rebase Plugin";
  };

  rebase.prototype.activate = function() {
    return {
      willDrawChart: this.willDrawChart
    };
  };

  rebase.calcRebase_ = function(axis, value, logscale) {
    return DygraphLayout.calcYNormal_(axis, value, logscale);
  };

  rebase.getCompareValue = function(sets) {
    return sets[0][0].y;
  };

  rebase.prototype.willDrawChart = function(e) {
    var g = e.dygraph;

    if (g.getOption("rebase") === null) {
      return;
    }

    var rebaseOpt = g.getOption("rebase");

    var p = g.plotter_;
    var sets = p.layout.points;
    var compareValue = (rebaseOpt === "percent") ? 0.5 : rebase.getCompareValue(sets);

    sets.map(function(points, idx) {
      var diff = compareValue - points[0].y;

      if (diff) {
        points.map(function(point) {
          point.y = point.y + diff;
        });
      }
    });
  };

  return rebase;
})();
