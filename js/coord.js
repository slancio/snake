;(function () {
  "use strict";
  if ( typeof Snake === "undefined" ) {
    window.Snake = {};
  }

  var Coord = Snake.Coord = function (pos) {
    this.y = pos[0];
    this.x = pos[1];
  };

  Coord.prototype.plus = function (vector) {
    this.y += vector[0];
    this.x += vector[1];

    return this;
  };

  Coord.prototype.equals = function (pos) {
    return ((this.y === pos[0]) && (this.x === pos[1]));
  };

  Coord.prototype.pos = function () {
    return [this.y, this.x];
  };

})();
