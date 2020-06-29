import { Grid } from "./grid";
import { Point } from "../shapes";

export class NavigationHandler {
  public constructor(private grid: Grid, private canvas: HTMLCanvasElement) {
    this.attachEvents();
  }

  private attachEvents(): void {
    const rect = this.canvas.getBoundingClientRect();
    const isInsideGrid = (p: Point) => {
      return (
        p.x >= rect.left &&
        p.x < rect.left + this.canvas.width &&
        p.y >= rect.top &&
        p.y < rect.top + this.canvas.height
      );
    };

    let captMouse = null;

    this.canvas.addEventListener("mousedown", e => {
      // Must be inside the grid
      if (!isInsideGrid(new Point(e.clientX, e.clientY))) return;

      // Drag with Middle Button
      if (e.button === 1)
        captMouse = {
          x: e.clientX,
          y: e.clientY,
          sx: this.grid.start.x,
          sy: this.grid.start.y
        };
    });

    window.addEventListener("mouseup", e => {
      if (e.button === 1) captMouse = null;
    });

    window.addEventListener("mousemove", e => {
      if (captMouse !== null) {
        let diff = {
          x: e.clientX - captMouse.x,
          y: e.clientY - captMouse.y
        };
        this.grid.start.x = captMouse.sx - diff.x;
        this.grid.start.y = captMouse.sy - diff.y;
        this.grid.draw();
      }
    });

    this.canvas.addEventListener("wheel", e => {
      if (e.deltaY > 0) {
        this.grid.scale = this.grid.scale / 2;
      } else if (e.deltaY < 0) {
        this.grid.scale = this.grid.scale * 2;
      }
    });
  }
}
