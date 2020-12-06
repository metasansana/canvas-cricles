/**
 * Coord type.
 */
export declare type Coord = number;
/**
 * Radius type.
 */
export declare type Radius = number;
/**
 * Color is a string representing an html color.
 */
export declare type Color = string;
/**
 * Radian type.
 */
export declare type Radian = number;
/**
 * Circle object drawn on the screen randomly.
 */
export declare class Circle {
    ctx: CanvasRenderingContext2D;
    x: Coord;
    y: Coord;
    radius: Radian;
    color: Color;
    dx: number;
    dy: number;
    constructor(ctx: CanvasRenderingContext2D, x: Coord, y: Coord, radius: Radian, color: Color, dx?: number, dy?: number);
    /**
     * getRandomRadius generates a random number for the radius value of a circle.
     *
     * The radius determines how large the cricle will be.
     */
    static getRandomRadius(): Radius;
    /**
     * getRandomCoord provides a random Coord for a Circle given a radius and
     * a bounding dimension.
     *
     * @param radius - The radius of the Circle the Coord is generated for.
     * @param bound  - The width/height of the bounding canvas to constrain the
     *                 Coord to.
     */
    static getRandomCoord(radius: Radius, bound: number): Coord;
    /**
     * draw this circle.
     */
    draw(): void;
    animate(): void;
}
/**
 * CircleCollection provides composite Circle support.
 */
export declare class CircleCollection {
    circles: Circle[];
    constructor(circles?: Circle[]);
    /**
     * add one or more Circles to the collection.
     */
    add(circles: Circle[]): CircleCollection;
    draw(): void;
    animate(): void;
}
