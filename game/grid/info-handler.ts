import { Grid } from "./grid";
import { Point } from "../shapes";

export class InfoHandler {
  public constructor(private grid: Grid, private canvas: HTMLCanvasElement) {
    this.enable();
  }

  public enable(): void {
    this.canvas.addEventListener("click", this._selectCell);
  }

  public disbale(): void {
    this.canvas.removeEventListener("click", this._selectCell);
  }

  private selectCell(event: MouseEvent): void {
    // Must be inside the grid
    if (!this.grid.isInside(new Point(event.clientX, event.clientY))) return;

    // Detect cell under the cursor
    const rect = this.canvas.getBoundingClientRect();
    let cell = this.grid.getCellAt(
      new Point(event.clientX - rect.left, event.clientY - rect.top)
    );
    console.log(cell);
  }

  private _selectCell = this.selectCell.bind(this);
}
