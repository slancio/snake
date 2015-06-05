;(function () {
  "use strict";
  if ( typeof Snake === "undefined" ) {
    window.Snake = {};
  }

  var DIMY = 20, DIMX = 20;

  var Board = Snake.Board = function (dimY, dimX) {
    this.dimY = dimY || DIMY;
    this.dimX = dimX || DIMX;
    this.board = this.setupBoard(this.dimY, this.dimX);
    this.snake = new Snake.Snake([Math.round(dimY / 2), Math.round(dimX / 2)]);
  };

  Board.prototype.addApple = function () {
    var needApple = true;
    while (needApple) {
      var pos = this.randomPos();
      var y = pos[0], x = pos[1];
      if (this.board[y][x] !== "S") {
        this.board[y][x] = "A";
        needApple = false;
      }
    }
  };

  Board.prototype.testMove = function () {
    var frontPos = this.segments[0].pos();
    var newCoord = new Snake.Coord(frontPos);
    newCoord.plus(this.dir);

    this.snake.segments.forEach(function (coord) {
      if (coord.equals([newCoord.pos])) {
        alert("Game Over");
      }
    });
  };

  Board.prototype.render = function () {
    var segments = this.snake.segments;

    for (var i = 0; i < this.dimY; i++) {
      for (var j = 0; j < this.dimX; j++) {
        if (this.board[j][i] === "A") {
          continue;
        }

        var isSegment = false;

        segments.forEach(function (coord) {
          if (coord.equals([j, i])) {
            isSegment = true;
          }
        });

        if (isSegment) {
          this.board[j][i] = "S";
        }
      }
    }
  };

  Board.prototype.randomPos = function () {
    return [Math.floor(Math.random() * this.dimY), Math.floor(Math.random() * this.dimX)];
  };

  Board.prototype.setupBoard = function (y, x) {
    var grid = [];
    for (var i = 0; i < y; i++) {
      var row = [];
      for (var j = 0; j < x; j++) {
        row.push(".");
      }
      grid.push(row);
    }

    return grid;
  };

})();
