export class Point {
  public static readonly ZERO = new Point(0, 0);
  public static readonly ONE = new Point(1, 1);

  public constructor(public x: number, public y: number) {}

  public clone(): Point {
    return new Point(this.x, this.y);
  }

  public add(p: Point | number): this {
    if (typeof p === "number") {
      p = new Point(p, p);
    }
    this.x += p.x;
    this.y += p.y;
    return this;
  }

  public sub(p: Point | number): this {
    if (typeof p === "number") {
      p = new Point(p, p);
    }
    this.x -= p.x;
    this.y -= p.y;
    return this;
  }

  public neg(): this {
    this.x *= -1;
    this.y *= -1;
    return this;
  }

  public mul(p: Point | number): this {
    if (typeof p === "number") {
      p = new Point(p, p);
    }
    this.x *= p.x;
    this.y *= p.y;
    return this;
  }

  public div(p: Point | number): this {
    if (typeof p === "number") {
      p = new Point(p, p);
    }
    this.x /= p.x;
    this.y /= p.y;
    return this;
  }
}
