import { Grid } from "./grid";
import { Point } from "../shapes";

export class InfoHandler {
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

    this.canvas.addEventListener("click", e => {
      // Must be inside the grid
      if (!isInsideGrid(new Point(e.clientX, e.clientY))) return;

      // Detect cell under the cursor
      let cell = this.grid.getCellAt(
        new Point(e.clientX - rect.left, e.clientY - rect.top)
      );
      console.log(cell);
    });
  }
}
