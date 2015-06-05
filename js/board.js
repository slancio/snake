;(function() {
  "use strict";
  if ( typeof Snake === "undefined" ) {
    window.Snake = {};
  }

  var DIMX = 40;
  var DIMY = 20;

  var Board = Snake.Board = function(dimX, dimY) {
    this.snake = new Snake.Snake();
    this.dimX = dimX || DIMX;
    this.dimY = dimY || DIMY;
    this.apples = [];
  };

  Board.prototype.render = function() {
    var boardString = "";
    var apples = this.apples;
    var segments = this.snake.segments;

    for (var i = 0; i < this.dimY; i++) {
      var rowString = "";

      for (var j = 0; j < this.dimX; j++) {
        var isSegment = false;
        var isApple = false;

        apples.forEach(function(coord) {
          if (coord.equals([j,i])) {
            isApple = true;
          }
        });

        segments.forEach(function(coord) {
          if (coord.equals([j,i])) {
            isSegment = true;
          }
        });

        if (isSegment) {
          rowString += "S";
        } else if (isApple) {
          rowString += "a";
        } else {
          rowString += ".";
        }

      }
      boardString += rowString;
    }

    return boardString;
  };

  Board.prototype.allObjects = function() {
    return this.snake.segments.concat(this.apples);
  }

  Board.prototype.addApple = function() {
    var newCoord = null;

    var randomPos = function() {
      var x = Math.floor(Math.random() * this.dimX);
      var y = Math.floor(Math.random() * this.dimY);
      var objects = this.allObjects();
      for (var i = 0; i < objects.length; i++) {
        if (objects[i].equals([x,y])) {
          return random.call(this);
        }
      }
      return new Snake.Coord([x, y]);
    }
    this.apples.push(randomPos.call(this));
  };

  Board.prototype.testMove = function() {
    var frontPos = this.segments[0].pos();
    var newCoord = new Snake.Coord(frontPos);
    newCoord.plus(this.dir);

    this.snake.segments.forEach(function(coord) {
      if (coord.equals([newCoord.pos])) {
        alert("Game Over");
      }
    });

    this.apples.forEach(function(coord) {
      if (coord.equals([newCoord.pos])) {
        this.apples.splice(newCoord, 1);
        this.snake.eatsAnApple();
      }
    });
  }

})();
