import { Cell, Rect } from "../shapes";
import { GridComponent } from "./grid-component";

export class CableComponent extends GridComponent {
  public static STYLE_ON_COLOR = "#FAAB00";
  public static STYLE_OFF_COLOR = "#1B1A1A";
  public static STYLE_GHOST_COLOR = "#2C6778";

  private _start: Cell;
  private _end: Cell;

  public constructor(start: Cell, end: Cell) {
    super(new Rect(0, 0, 0, 0));
    this._start = start;
    this._end = end;
  }

  public get start(): Cell {
    return this._start;
  }

  public set start(start: Cell) {
    this._start = start;
  }

  public get end(): Cell {
    return this._end;
  }

  public set end(end: Cell) {
    this._end = end;
  }

  private updateArea(): void {
    this.position.x = Math.min(this.start.x, this.end.x);
    this.position.y = Math.min(this.start.y, this.end.y);
    this.position.w = Math.abs(this.end.x - this.start.x);
    this.position.h = Math.abs(this.end.y - this.start.y);
  }

  public draw(context: CanvasRenderingContext2D, scale: number): void {
    const x0 = (this.start.x + 0.5) * scale;
    const y0 = (this.start.y + 0.5) * scale;
    const x1 = (this.end.x + 0.5) * scale;
    const y1 = (this.end.y + 0.5) * scale;
    context.lineWidth = Math.max(1, scale / 2);
    context.lineCap = "round";
    context.lineJoin = "round";
    context.strokeStyle = this.ghost
      ? CableComponent.STYLE_GHOST_COLOR
      : CableComponent.STYLE_ON_COLOR;
    context.moveTo(x0, y0);
    context.lineTo(x1, y0);
    context.lineTo(x1, y1);
    context.stroke();
  }
}
