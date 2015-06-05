;(function() {
  "use strict";
  if ( typeof Snake === "undefined" ) {
    window.Snake = {};
  }

  var DIRS = {"N": [0,-1], "E": [1, 0], "S": [0, 1], "W": [-1, 0]};
  var POS = [20, 10];
  var THRESHOLD = 2;

  var Lizard = Snake.Snake = function() {
    this.dir = DIRS["E"];
    this.segments = [new Snake.Coord(POS)];
    this.hasEaten = false;
    this.appleCount = 0;
    this.growThreshold = THRESHOLD;
  };

  Lizard.prototype.move = function(newCoord) {
    this.segments.unshift(newCoord);
    if (this.hasEaten) {
      this.hasEaten = false;
    } else {
      this.segments.pop();
    }
  };

  Lizard.prototype.turn = function(dir) {
    this.dir = DIRS[dir];
  };

  Lizard.prototype.eatsAnApple = function() {
    this.appleCount += 1;
    if (this.appleCount === this.growThreshold) {
      this.hasEaten = true;
      this.appleCount = 0;
    }
  };


})();
