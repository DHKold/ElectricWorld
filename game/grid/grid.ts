import { CableComponent, OverComponent } from "../components";
import { Cell, Point, Rect } from "../shapes";

export class Grid {
  public MAX_SCALE = 80;
  public MIN_SCALE = 5;

  public start: Point = new Point(0, 0);
  public components: OverComponent[] = [];
  public cables: CableComponent[] = [];

  private _scale: number = 20;

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
    let w = this.canvas.width / this.scale;
    let h = this.canvas.height / this.scale;
    let x0 = 0.5;
    let y0 = 0.5;
    let x1 = x0 + this.canvas.width;
    let y1 = y0 + this.canvas.height;
    let xs = ((-this.start.x % this.scale) + this.scale) % this.scale;
    let ys = ((-this.start.y % this.scale) + this.scale) % this.scale;

    // Draw lines
    const path = new Path2D();
    for (let x = 0; x < w; ++x) {
      path.moveTo(x0 + xs + x * this.scale, y0);
      path.lineTo(x0 + xs + x * this.scale, y1);
    }
    for (let y = 0; y < h; ++y) {
      path.moveTo(x0, y0 + ys + y * this.scale);
      path.lineTo(x1, y0 + ys + y * this.scale);
    }

    // Background
    this.context.fillStyle = "#145d0e";
    this.context.fillRect(x0, y0, this.canvas.width, this.canvas.height);
    // Grid
    this.context.strokeStyle = "rgba(255,255,255,0.1)";
    this.context.setLineDash([5, 2]);
    this.context.lineWidth = 1;
    this.context.stroke(path);
    this.context.setLineDash([]);
    // Border
    this.context.strokeStyle = "#333333";
    this.context.strokeRect(
      x0,
      y0,
      this.canvas.width - 1,
      this.canvas.height - 1
    );
  }
}
