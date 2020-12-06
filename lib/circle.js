"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CircleCollection = exports.Circle = void 0;
var PI2 = Math.PI * 2;
var VELOCITY = (Math.random() * 4) + 1;
/**
 * Circle object drawn on the screen randomly.
 */
var Circle = /** @class */ (function () {
    function Circle(ctx, x, y, radius, color, dx, dy) {
        if (dx === void 0) { dx = VELOCITY * randomDirection(); }
        if (dy === void 0) { dy = VELOCITY * randomDirection(); }
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.dx = dx;
        this.dy = dy;
    }
    /**
     * getRandomRadius generates a random number for the radius value of a circle.
     *
     * The radius determines how large the cricle will be.
     */
    Circle.getRandomRadius = function () {
        return Math.floor(Math.random() * 30) + 15;
    };
    /**
     * getRandomCoord provides a random Coord for a Circle given a radius and
     * a bounding dimension.
     *
     * @param radius - The radius of the Circle the Coord is generated for.
     * @param bound  - The width/height of the bounding canvas to constrain the
     *                 Coord to.
     */
    Circle.getRandomCoord = function (radius, bound) {
        // Random number between 0 -> (bound less diameter of circle) + half a
        // side because only one touches the edge at a time.
        return Math.random() * (bound - (radius * 2)) + radius;
    };
    /**
     * draw this circle.
     */
    Circle.prototype.draw = function () {
        var ctx = this.ctx;
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.radius, 0, PI2);
        ctx.fill();
    };
    Circle.prototype.animate = function () {
        var ctx = this.ctx;
        this.x += this.dx;
        this.y += this.dy;
        if (this.x + this.radius > ctx.canvas.width || this.x - this.radius < 0)
            this.dx = -this.dx;
        if (this.y + this.radius > ctx.canvas.height || this.y - this.radius < 0)
            this.dy = -this.dy;
        this.draw();
    };
    return Circle;
}());
exports.Circle = Circle;
/**
 * CircleCollection provides composite Circle support.
 */
var CircleCollection = /** @class */ (function () {
    function CircleCollection(circles) {
        if (circles === void 0) { circles = []; }
        this.circles = circles;
    }
    /**
     * add one or more Circles to the collection.
     */
    CircleCollection.prototype.add = function (circles) {
        this.circles = this.circles.concat(circles);
        return this;
    };
    CircleCollection.prototype.draw = function () {
        this.circles.forEach(function (c) { return c.draw(); });
    };
    CircleCollection.prototype.animate = function () {
        this.circles.forEach(function (c) { return c.animate(); });
    };
    return CircleCollection;
}());
exports.CircleCollection = CircleCollection;
// deterimins the direction on the axis the Circle moves.
var randomDirection = function () { return Math.floor(Math.random() * 2) === 1 ? 1 : -1; };
//# sourceMappingURL=circle.js.map