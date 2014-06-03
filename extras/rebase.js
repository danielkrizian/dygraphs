(function() {
  "use strict";

  Dygraph.DataHandlers.RebaseHandler = function(base) {
    this.base = base;
  };

  var RebaseHandler =  Dygraph.DataHandlers.RebaseHandler;
  RebaseHandler.prototype = new Dygraph.DataHandlers.DefaultHandler();

  RebaseHandler.prototype.extractSeries = function(rawData, i, options) {
    var series = [];
    var baseOpt = options.get("rebase");
    var initial = rawData[0][i];
    var logScale = options.get("logscale");

    for (var j = 0; j < rawData.length; j++) {
      var x = rawData[j][0];
      var point;
      if (baseOpt === "percent") {
        point = j ? (rawData[j][i] / initial - 1) * 100 : 0;
      } else {
        point = j ? rawData[j][i] * baseOpt / initial : baseOpt;
      }
      if (logScale) {
        if (point <= 0) {
          point = null;
        }
      }
      series.push([ x, point ]);
    }

    return series;
  };

})();

Dygraph.Plugins.Rebase = (function() {
  var rebase = function() {
    this.canonicalRawData = [];
  };

  rebase.prototype.toString = function() {
    return "Rebase Plugin";
  };

  rebase.prototype.activate = function() {
    return {
      predraw: this.predraw
    };
  };

  rebase.calcRebase_ = function(axis, value, logscale) {
    return DygraphLayout.calcYNormal_(axis, value, logscale);
  };

  rebase.getCompareValue = function(sets) {
    return sets[0][0].y;
  };

  rebase.prototype.predraw = function(e) {
    var g = e.dygraph;
    var rebaseOpt = g.getOption("rebase");

    if (rebaseOpt === null) {
      return;
    }

    if (rebaseOpt === "percent") {
      g.updateOptions(
          {
            axes: {
              y: {
                axisLabelFormatter: function(y) {
                  return y + '%';
                },
                valueFormatter: function(y) {
                  return Math.round(y * 100) / 100 + '%';
                }
              }
            }
          }, true);
    }

    g.dataHandler_ = new Dygraph.DataHandlers.RebaseHandler(rebaseOpt);
  };

  return rebase;
})();
