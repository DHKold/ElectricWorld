import { Grid } from "./grid";
import { Point } from "../shapes";

export class InfoHandler {
  private isEnabled: boolean = false;
  private toggleButton: HTMLButtonElement;

  public constructor(private grid: Grid, private canvas: HTMLCanvasElement) {
    this.toggleButton = document.getElementById(
      "btnToggleI"
    ) as HTMLButtonElement;

    this.toggleButton.addEventListener("click", () => {
      this.isEnabled ? this.disbale() : this.enable();
    });

    this.enable();
  }

  public enable(): void {
    this.isEnabled = true;
    this.canvas.addEventListener("click", this._selectCell);
    this.toggleButton.classList.add("activated");
  }

  public disbale(): void {
    this.isEnabled = false;
    this.canvas.removeEventListener("click", this._selectCell);
    this.toggleButton.classList.remove("activated");
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
