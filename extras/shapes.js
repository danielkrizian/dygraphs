/**
 * @license
 * Copyright 2011 Dan Vanderkam (danvdk@gmail.com)
 * MIT-licensed (http://opensource.org/licenses/MIT)
 */

/**
 * @fileoverview
 * Including this file will add several additional shapes to Dygraph.Circles
 * which can be passed to drawPointCallback.
 * See tests/custom-circles.html for usage.
 */

(function() {

/**
 * @param {!CanvasRenderingContext2D} ctx the canvas context
 * @param {number} sides the number of sides in the shape.
 * @param {number} radius the radius of the image.
 * @param {number} cx center x coordate
 * @param {number} cy center y coordinate
 * @param {number=} rotationRadians the shift of the initial angle, in radians.
 * @param {number=} delta the angle shift for each line. If missing, creates a
 *     regular polygon.
 */
var regularShape = function(
    ctx, sides, radius, cx, cy, rotationRadians, delta) {
  rotationRadians = rotationRadians || 0;
  delta = delta || Math.PI * 2 / sides;

  ctx.beginPath();
  var initialAngle = rotationRadians;
  var angle = initialAngle;

  var computeCoordinates = function() {
    var x = cx + (Math.sin(angle) * radius);
    var y = cy + (-Math.cos(angle) * radius);
    return [x, y];
  };

  var initialCoordinates = computeCoordinates();
  var x = initialCoordinates[0];
  var y = initialCoordinates[1];
  ctx.moveTo(x, y);

  for (var idx = 0; idx < sides; idx++) {
    angle = (idx == sides - 1) ? initialAngle : (angle + delta);
    var coords = computeCoordinates();
    ctx.lineTo(coords[0], coords[1]);
  }
  ctx.fill();
  ctx.stroke();
};

var prevy = 0;
var prevx = 0;
var countprevx = 0;
Dygraph.regularShape_ = function (
    ctx, sides, radius, cx, cy, rotationRadians, delta) {

    //alert(items[x][0]);

    var computeCoordinates = function () {

        var x = cx + (Math.sin(angle) * radius);

        var y = cy + (-Math.cos(angle) * radius);
        return [x, y];
    };
    if (sides == 7) {
        sides = 4;
        rotationRadians = rotationRadians || 0;
        delta = delta || Math.PI * 2 / sides;

        radius = 10;
        ctx.beginPath();
        var initialAngle = rotationRadians;
        var angle = initialAngle;

        var initialCoordinates = computeCoordinates();

        var x = initialCoordinates[0];
        var y = initialCoordinates[1];
        var prevyy = prevy;
        prevy = y;

        if (prevx <= cx)
            countprevx++;
        else
            countprevx = 1;

        prevx = cx;
        if (items[countprevx][2] == "UP") {

          

            ctx.fillStyle = "red";
            ctx.strokeStyle = "red";

            if (items[countprevx][1] == "blank") {

                ctx.fillStyle = "white";
                ctx.strokeStyle = "black";
            }

            if (items[countprevx][1] != "0") {
                ctx.moveTo(x, y + 30);


                for (var idx = 0; idx < sides; idx++) {
                    angle = (idx == sides - 1) ? initialAngle : (angle + delta);
                    var coords = computeCoordinates();
                    if ((idx != 1)&& (idx != 2))
                        ctx.lineTo(coords[0], coords[1] + 30);
                    if ((idx == 2)&&(idx != 1)) {
                        ctx.lineTo(coords[0] +14, coords[1] + 30);
                        if (items[countprevx][1] == "blank")
                            ctx.moveTo(coords[0] + 8, coords[1] + 30);
                        ctx.lineTo(coords[0], coords[1] +30);

                    }

                    ctx.fill();
                    ctx.stroke();


                }
            }
        }
        else {
//            if (prevx <= cx)
//                countprevx++;
//            else
//                countprevx = 1;

//            prevx = cx;

            ctx.fillStyle = "green";
            ctx.strokeStyle = "green";

            if (items[countprevx][1] == "blank") {

                ctx.fillStyle = "white";
                ctx.strokeStyle = "black";
            }
            // ctx.moveTo(x, y + 30);

            ctx.moveTo(x, y - 30);
            if (items[countprevx][1] != "0") {

                for (var idx = 0; idx < sides + 1; idx++) {
                    angle = (idx == sides - 1) ? initialAngle : (angle + delta);
                    var coords = computeCoordinates();
                    if (idx == 0)
                        ctx.moveTo(coords[0], coords[1] - 30);
                    else {
                        if ((idx != 3) && (idx != 4))
                            ctx.lineTo(coords[0], coords[1] - 30);
                        if (idx == 4) {
                            ctx.lineTo(coords[0] - 14, coords[1] - 30);
                            if (items[countprevx][1] == "blank")
                                ctx.moveTo(coords[0] - 8, coords[1] - 30);
                            ctx.lineTo(coords[0], coords[1] - 30);

                        }
                    }

                    ctx.fill();
                    ctx.stroke();

                }
            }
        }

        sides = 4; rotationRadians = Math.PI / 4;
        rotationRadians = rotationRadians || 0;
        delta = Math.PI * 2 / sides;

        radius = 8;
        ctx.beginPath();
        var initialAngle = rotationRadians;
        var angle = initialAngle;

        var initialCoordinates = computeCoordinates();

        var x = initialCoordinates[0];
        var y = initialCoordinates[1];

        if (items[countprevx][2] == "UP") {
            if (items[countprevx][1] != "0") {
                ctx.moveTo(x - 2, y + 36.5);

                for (var idx = 0; idx < sides; idx++) {
                    angle = (idx == sides - 1) ? initialAngle : (angle + delta);
                    var coords = computeCoordinates();
                    if ((idx == 1) || (idx == 2))
                        ctx.lineTo(coords[0] + 2, coords[1] + 36.5);
                    else {
                        if ((idx == 0)||(items[countprevx][1] == "filled"))
                        ctx.lineTo(coords[0] - 2, coords[1] + 36.5);
                    }
                    ctx.fill();
                    ctx.stroke();


                }
            }
        }
        else {
            if (items[countprevx][1] != "0") {

                ctx.moveTo(x - 2, y - 36.5);

                for (var idx = 0; idx < sides; idx++) {
                    angle = (idx == sides - 1) ? initialAngle : (angle + delta);
                    var coords = computeCoordinates();
                    if ((idx == 3) || (idx == 0)) {
                        ctx.lineTo(coords[0] - 2, coords[1] - 36.5);
                    }
                    else {
                        if ((idx == 2) || (items[countprevx][1] == "filled"))
                            ctx.lineTo(coords[0] + 2, coords[1] - 36.5);
                        else {

                            ctx.moveTo(coords[0] + 2, coords[1] - 36.5);
                        }
                    }
                    ctx.fill();
                    ctx.stroke();


                }
            }
        }
    }
    else {

        rotationRadians = rotationRadians || 0;
        delta = delta || Math.PI * 2 / sides;

        radius = 10;
        ctx.beginPath();
        var initialAngle = rotationRadians;
        var angle = initialAngle;

        var initialCoordinates = computeCoordinates();

        var x = initialCoordinates[0];
        var y = initialCoordinates[1];

        ctx.moveTo(x, y);

        for (var idx = 0; idx < sides; idx++) {
            angle = (idx == sides - 1) ? initialAngle : (angle + delta);
            var coords = computeCoordinates();

            ctx.lineTo(coords[0], coords[1]);

            ctx.fill();
            ctx.stroke();


        }

    }

};




/**
 * TODO(danvk): be more specific on the return type.
 * @param {number} sides
 * @param {number=} rotationRadians
 * @param {number=} delta
 * @return {Function}
 * @private
 */
var shapeFunction = function(sides, rotationRadians, delta) {
  return function(g, name, ctx, cx, cy, color, radius) {
    ctx.strokeStyle = color;
    ctx.fillStyle = "white";
    regularShape(ctx, sides, radius, cx, cy, rotationRadians, delta);
  };
};

Dygraph.shapeFunction_ = function(sides, rotationRadians, delta) {
  return function(g, name, ctx, cx, cy, color, radius) {
    ctx.strokeStyle = color;
    ctx.fillStyle = "red";
    Dygraph.regularShape_(ctx, sides, radius, cx, cy, rotationRadians, delta);
  };
};

Dygraph.update(Dygraph.Circles, {
  TRIANGLE : shapeFunction(3),
  ARROW: Dygraph.shapeFunction_(7),
  SQUARE : shapeFunction(4, Math.PI / 4),
  DIAMOND : shapeFunction(4),
  PENTAGON : shapeFunction(5),
  HEXAGON : shapeFunction(6),
  CIRCLE : function(g, name, ctx, cx, cy, color, radius) {
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.fillStyle = "white";
    ctx.arc(cx, cy, radius, 0, 2 * Math.PI, false);
    ctx.fill();
    ctx.stroke();
  },
  STAR : shapeFunction(5, 0, 4 * Math.PI / 5),
  PLUS : function(g, name, ctx, cx, cy, color, radius) {
    ctx.strokeStyle = color;

    ctx.beginPath();
    ctx.moveTo(cx + radius, cy);
    ctx.lineTo(cx - radius, cy);
    ctx.closePath();
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(cx, cy + radius);
    ctx.lineTo(cx, cy - radius);
    ctx.closePath();
    ctx.stroke();
  },
  EX : function(g, name, ctx, cx, cy, color, radius) {
    ctx.strokeStyle = color;

    ctx.beginPath();
    ctx.moveTo(cx + radius, cy + radius);
    ctx.lineTo(cx - radius, cy - radius);
    ctx.closePath();
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(cx + radius, cy - radius);
    ctx.lineTo(cx - radius, cy + radius);
    ctx.closePath();
    ctx.stroke();
  }
});

});
