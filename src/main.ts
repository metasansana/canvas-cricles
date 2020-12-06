import { make } from '@quenk/noni/lib/data/array';

import { CircleCollection, Circle } from './circle';

class CircleGame {

    constructor(public ctx: CanvasRenderingContext2D) { }

    isRunning = false;

    objects: CircleCollection = new CircleCollection();

    dispatchKey = (e: KeyboardEvent) => {

        switch (e.key) {

            case "Escape":
                this.isRunning = false;
                break;

            case "Enter":
                this.isRunning = true;
                break;

            default:
                break;

        }

    };

    static main(doc: HTMLDocument) {

        let canvas = <HTMLCanvasElement>document.querySelector('canvas');
        let ctx = <CanvasRenderingContext2D>canvas.getContext('2d');

        if (ctx !== null) {

            let game = new CircleGame(ctx);
            let win = <Window>doc.defaultView;

            let handleResize = () => {

                // Take up the whole screen.
                canvas.width = win.innerWidth;
                canvas.height = win.innerHeight;

            };

            win.addEventListener('resize', handleResize);
            win.addEventListener('orientationchange', handleResize);
            canvas.addEventListener('keydown', game.dispatchKey);
            handleResize();
            game.run();


        } else {

            //Browser does not support this stuff, display error message.
            let div = <HTMLElement>doc.querySelector(
                '#msg-browser-not-supported'
            );
            div.hidden = false;

        }

    }

    run() {

        let { ctx } = this;

        this.isRunning = true;

        this.objects.add(make(30, () => {

            let radius = Circle.getRandomRadius();
            let x = Circle.getRandomCoord(radius, ctx.canvas.width);
            let y = Circle.getRandomCoord(radius, ctx.canvas.height);
            let color = 'red';
            return new Circle(ctx, x, y, radius, color);

        }));

        let updateView = () => {

            this.ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            this.objects.animate();

            requestAnimationFrame(updateView);

        };

        updateView();

    }

}

CircleGame.main(document);
