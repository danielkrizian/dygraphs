(function() {
  "use strict";

  Dygraph.DataHandlers.RebaseHandler = function(baseOpt) {
    this.baseOpt = baseOpt;
  };

  var RebaseHandler =  Dygraph.DataHandlers.RebaseHandler;
  RebaseHandler.prototype = new Dygraph.DataHandlers.DefaultHandler();

  RebaseHandler.rebase = function(value, initial, base) {
    if (base === "percent") {
      return (value / initial - 1) * 100;
    }
    return value * base / initial;
  };

  RebaseHandler.prototype.getExtremeYValues = function(series, dateWindow, options) {
    var minY = null, maxY = null, y;
    var firstIdx = 0, lastIdx = series.length - 1;
    var initial = series[firstIdx][1];

    for (var j = firstIdx; j <= lastIdx; j++) {
      if (j === firstIdx) {
        y = (this.baseOpt === "percent") ? 0 : this.baseOpt;
      } else {
        y = RebaseHandler.rebase(series[j][1], initial, this.baseOpt);
      }
      if (y === null || isNaN(y))
        continue;
      if (maxY === null || y > maxY) {
        maxY = y;
      }
      if (minY === null || y < minY) {
        minY = y;
      }
    }
    return [ minY, maxY ];
  };

  RebaseHandler.prototype.seriesToPoints = function(series, setName, boundaryIdStart){
    var points = [];
    var firstIdx = 0;
    var lastIdx = series.length - 1;
    var initial = series[firstIdx][1]; // TODO: check for null
    for (var i = 0; i <= lastIdx; ++i) {
      var item = series[i];
      var yraw = item[1];
      var yval = yraw === null ? null : Dygraph.DataHandler.parseFloat(yraw);
      if (yval !== null) {
        if (i === firstIdx) {
          yval = (this.baseOpt === "percent") ? 0 : this.baseOpt;
        } else {
          yval = RebaseHandler.rebase(yval, initial, this.baseOpt);
        }
      }
      var point = {
        x: NaN,
        y: NaN,
        xval: Dygraph.DataHandler.parseFloat(item[0]),
        yval: yval,
        name: setName,
        idx: i + boundaryIdStart
      };
      points.push(point);
    }
    this.onPointsCreated_(series, points);
    return points;
  };

})();

Dygraph.Plugins.Rebase = (function() {
  var rebase = function() {
  };

  rebase.prototype.toString = function() {
    return "Rebase Plugin";
  };

  rebase.prototype.activate = function(g) {
    if (g.getOption("rebase") === null) {
      return;
    }
    return {
      predraw: this.predraw
    };
  };

  rebase.prototype.predraw = function(e) {
    var g = e.dygraph;
    var baseOpt = g.getOption("rebase");

    if (baseOpt === "percent") {
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

    g.dataHandler_ = new Dygraph.DataHandlers.RebaseHandler(baseOpt);
  };

  return rebase;
})();
