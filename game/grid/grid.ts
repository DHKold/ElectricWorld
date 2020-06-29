import { GridComponent } from "../components";
import { Cell, Point, Rect } from "../shapes";

export class Grid {
  public MAX_SCALE = 256;
  public MIN_SCALE = 1;

  public start: Point = new Point(0, 0);
  public components: GridComponent[] = [];

  private _scale: number = 16;

  public constructor(
    private canvas: HTMLCanvasElement,
    private context: CanvasRenderingContext2D
  ) {
    this.centerOnCell(new Cell(0, 0));
  }

  public getCellCoord(cell: Cell): Point {
    const x = cell.x * this.scale - this.start.x;
    const y = cell.y * this.scale - this.start.y;
    return new Point(x, y);
  }

  public getCellAt(coord: Point): Cell {
    let Cx = Math.floor((coord.x + this.start.x) / this.scale);
    let Cy = Math.floor((coord.y + this.start.y) / this.scale);
    return new Cell(Cx, Cy);
  }

  public centerOnCell(cell: Cell): void {
    this.centerOnCoord(this.getCellCoord(cell).add(Math.round(this.scale / 2)));
  }

  public centerOnCoord(coord: Point): void {
    this.start.x = coord.x - Math.round(this.canvas.width / 2);
    this.start.y = coord.y - Math.round(this.canvas.height / 2);
  }

  public isInside(coord: Point): boolean {
    const rect = this.canvas.getBoundingClientRect();
    return (
      coord.x >= rect.left &&
      coord.x < rect.left + this.canvas.width &&
      coord.y >= rect.top &&
      coord.y < rect.top + this.canvas.height
    );
  }

  public get scale(): number {
    return this._scale;
  }

  public set scale(scale: number) {
    if (scale < this.MIN_SCALE || scale > this.MAX_SCALE) return;
    const factor = scale / this._scale - 1;
    const center = new Point(this.canvas.width, this.canvas.height)
      .div(2)
      .add(this.start);
    this.start.add(center.mul(factor));
    this._scale = scale;
    this.draw();
  }

  public draw(): void {
    // Units
    let x1 = 0.5 + this.canvas.width;
    let y1 = 0.5 + this.canvas.height;
    let xs = ((-this.start.x % this.scale) + this.scale) % this.scale;
    let ys = ((-this.start.y % this.scale) + this.scale) % this.scale;

    // Draw lines
    const path = new Path2D();
    for (let x = 0; x < this.canvas.width / this.scale; ++x) {
      path.moveTo(0.5 + xs + x * this.scale, 0.5);
      path.lineTo(0.5 + xs + x * this.scale, y1);
    }
    for (let y = 0; y < this.canvas.height / this.scale; ++y) {
      path.moveTo(0.5, 0.5 + ys + y * this.scale);
      path.lineTo(x1, 0.5 + ys + y * this.scale);
    }

    // Background
    this.context.save();
    this.context.fillStyle = "#145d0e";
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Grid
    this.context.strokeStyle = "rgba(255,255,255,0.1)";
    if (this.scale > 2) {
      this.context.setLineDash([6, 2]);
      this.context.stroke(path);
    }
    this.context.lineWidth = 1;
    this.context.setLineDash([]);
    this.context.restore();

    // Components
    this.components.forEach(c => {
      // Properties
      const p0 = this.getCellCoord(new Cell(c.position.x, c.position.y));
      const zone = new Rect(
        p0.x,
        p0.y,
        c.position.w * this.scale,
        c.position.h * this.scale
      );

      // Check if the cable is visible on screen

      // Draw area
      this.context.save();
      this.context.beginPath();
      this.context.translate(zone.x + 0.5, zone.y + 0.5);
      c.draw(this.context, this.scale);
      this.context.closePath();
      this.context.restore();
    });
  }
}
