"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var array_1 = require("@quenk/noni/lib/data/array");
var circle_1 = require("./circle");
var CircleGame = /** @class */ (function () {
    function CircleGame(ctx) {
        var _this = this;
        this.ctx = ctx;
        this.isRunning = false;
        this.objects = new circle_1.CircleCollection();
        this.dispatchKey = function (e) {
            switch (e.key) {
                case "Escape":
                    _this.isRunning = false;
                    break;
                case "Enter":
                    _this.isRunning = true;
                    break;
                default:
                    break;
            }
        };
    }
    CircleGame.main = function (doc) {
        var canvas = document.querySelector('canvas');
        var ctx = canvas.getContext('2d');
        if (ctx !== null) {
            var game = new CircleGame(ctx);
            var win_1 = doc.defaultView;
            var handleResize = function () {
                // Take up the whole screen.
                canvas.width = win_1.innerWidth;
                canvas.height = win_1.innerHeight;
            };
            win_1.addEventListener('resize', handleResize);
            win_1.addEventListener('orientationchange', handleResize);
            canvas.addEventListener('keydown', game.dispatchKey);
            handleResize();
            game.run();
        }
        else {
            //Browser does not support this stuff, display error message.
            var div = doc.querySelector('#msg-browser-not-supported');
            div.hidden = false;
        }
    };
    CircleGame.prototype.run = function () {
        var _this = this;
        var ctx = this.ctx;
        this.isRunning = true;
        this.objects.add(array_1.make(30, function () {
            var radius = circle_1.Circle.getRandomRadius();
            var x = circle_1.Circle.getRandomCoord(radius, ctx.canvas.width);
            var y = circle_1.Circle.getRandomCoord(radius, ctx.canvas.height);
            var color = 'red';
            return new circle_1.Circle(ctx, x, y, radius, color);
        }));
        var updateView = function () {
            _this.ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            _this.objects.animate();
            requestAnimationFrame(updateView);
        };
        updateView();
    };
    return CircleGame;
}());
CircleGame.main(document);
//# sourceMappingURL=main.js.map