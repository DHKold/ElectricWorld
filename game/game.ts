import { Point, Rect, Cell } from "./shapes";
import {
  Grid,
  InfoHandler,
  NavigationHandler,
  CablingHandler,
  ComponentsHandler
} from "./grid";

export class Game {
  private context: CanvasRenderingContext2D;
  private grid: Grid;

  constructor(private canvas: HTMLCanvasElement) {
    this.context = canvas.getContext("2d", { alpha: false });
    this.grid = new Grid(canvas, this.context);
    this.attachEvents();
  }

  public tick() {}

  public render() {
    this.grid.draw();
  }

  public resize(): void {
    this.grid.draw();
  }

  private attachEvents() {
    // Prevent default events
    this.canvas.addEventListener("mousedown", e => e.preventDefault());
    this.canvas.addEventListener("mouseup", e => e.preventDefault());
    this.canvas.addEventListener("mousemove", e => e.preventDefault());
    this.canvas.addEventListener("click", e => e.preventDefault());

    // Handlers
    new NavigationHandler(this.grid, this.canvas);
    new InfoHandler(this.grid, this.canvas);
    new CablingHandler(this.grid, this.canvas);
    new ComponentsHandler(this.grid, this.canvas);
  }
}
