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

    if (g.getNumericOption("rebase") !== null) {
      var rebaseOpt = g.getNumericOption("rebase");
    } else {
      return;
    }
    var p = g.plotter_;
    var sets = p.layout.points;

    for (var i = 0; i < sets.length; i++) {
      var points = sets[i];
      var setName = p.layout.setNames[i];
      var axis = g.axisPropertiesForSeries(setName);
      var logscale = g.attributes_.getForSeries("logscale", setName);
      var starty;

      var base = rebase.calcRebase_(axis, rebaseOpt, logscale);
      base = p.area.h * base + p.area.y;

      for (var j = 0; j < points.length; j++) {
        var point = points[j];
        var y = p.area.h * point.y + p.area.y;
        
        if (j === 0) {
          starty = y;
          point.canvasy = base;
        } else {
          point.canvasy = y * base / starty;
        }
      }
    }
  };

  return rebase;
})();
