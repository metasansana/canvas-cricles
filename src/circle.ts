
/**
 * Coord type.
 */
export type Coord = number;

/**
 * Radius type.
 */
export type Radius = number;

/**
 * Color is a string representing an html color.
 */
export type Color = string;

/**
 * Radian type.
 */
export type Radian = number;

const PI2 = Math.PI * 2;

const VELOCITY = (Math.random() * 4) + 1;

/**
 * Circle object drawn on the screen randomly.
 */
export class Circle {

    constructor(
        public ctx: CanvasRenderingContext2D,
        public x: Coord,
        public y: Coord,
        public radius: Radian,
        public color: Color,
        public dx: number = VELOCITY * randomDirection(),
        public dy: number = VELOCITY * randomDirection()) { }

    /**
     * getRandomRadius generates a random number for the radius value of a circle.
     *
     * The radius determines how large the cricle will be.
     */
    static getRandomRadius(): Radius {

        return Math.floor(Math.random() * 30) + 15;

    }

    /**
     * getRandomCoord provides a random Coord for a Circle given a radius and 
     * a bounding dimension.
     *
     * @param radius - The radius of the Circle the Coord is generated for.
     * @param bound  - The width/height of the bounding canvas to constrain the
     *                 Coord to.
     */
    static getRandomCoord(radius: Radius, bound: number): Coord {

        // Random number between 0 -> (bound less diameter of circle) + half a
        // side because only one touches the edge at a time.
        return Math.random() * (bound - (radius * 2)) + radius;

    }

    /**
     * draw this circle.
     */
    draw() {

        let { ctx } = this;
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.radius, 0, PI2);
        ctx.fill();

    }

    animate() {

        let { ctx } = this;

        this.x += this.dx;
        this.y += this.dy;

        if (this.x + this.radius > ctx.canvas.width || this.x - this.radius < 0)
            this.dx = -this.dx;

        if (this.y + this.radius > ctx.canvas.height || this.y - this.radius < 0)
            this.dy = -this.dy;

        this.draw();

    }

}

/**
 * CircleCollection provides composite Circle support.
 */
export class CircleCollection {

    constructor(public circles: Circle[] = []) { }

    /**
     * add one or more Circles to the collection.
     */
    add(circles: Circle[]): CircleCollection {

        this.circles = this.circles.concat(circles);
        return this;

    }

    draw() {

        this.circles.forEach(c => c.draw());

    }

    animate() {

        this.circles.forEach(c => c.animate());

    }

}

// deterimins the direction on the axis the Circle moves.
const randomDirection = () => Math.floor(Math.random() * 2) === 1 ? 1 : -1;
