import { Grid } from "./grid";
import { Point } from "../shapes";
import { CableComponent } from "../components";

export class CablingHandler {
  private isEnabled: boolean = false;
  private toggleButton: HTMLButtonElement;

  private _clickHandler = this.clickHandler.bind(this);
  private _moveHandler = this.moveHandler.bind(this);

  private cable: CableComponent = null;

  public constructor(private grid: Grid, private canvas: HTMLCanvasElement) {
    this.toggleButton = document.getElementById(
      "btnToggleC"
    ) as HTMLButtonElement;

    this.toggleButton.addEventListener("click", () => {
      this.isEnabled ? this.disbale() : this.enable();
    });

    this.enable();
  }

  public enable(): void {
    this.isEnabled = true;
    this.canvas.addEventListener("mouseup", this._clickHandler);
    this.canvas.addEventListener("mousemove", this._moveHandler);
    this.toggleButton.classList.add("activated");
  }

  public disbale(): void {
    this.isEnabled = false;
    this.canvas.removeEventListener("mouseup", this._clickHandler);
    this.canvas.removeEventListener("mousemove", this._moveHandler);
    this.toggleButton.classList.remove("activated");
  }

  private clickHandler(event: MouseEvent): void {
    // Must be inside the grid
    if (!this.grid.isInside(new Point(event.clientX, event.clientY))) return;

    // Detect cell under the cursor
    const rect = this.canvas.getBoundingClientRect();
    let cell = this.grid.getCellAt(
      new Point(event.clientX - rect.left, event.clientY - rect.top)
    );

    // Cancel cable
    if (this.cable && event.button == 2) {
      const index = this.grid.cables.findIndex(c => c === this.cable);
      this.grid.cables.splice(index, 1);
      this.cable = null;
      this.grid.draw();
      return;
    }

    // Start a new cable
    if (!this.cable && event.button == 0) {
      this.cable = new CableComponent(cell, cell);
      this.grid.cables.push(this.cable);
      this.grid.draw();
      return;
    }

    // End a cable
    if (this.cable && event.button == 0) {
      this.cable.end = cell;
      this.cable.ghost = false;
      this.cable = null;
      this.grid.draw();
      return;
    }
  }

  private moveHandler(event: MouseEvent): void {
    // Must be drawing a cable
    if (!this.cable) return;

    // Must be inside the grid
    if (!this.grid.isInside(new Point(event.clientX, event.clientY))) return;

    // Detect cell under the cursor
    const rect = this.canvas.getBoundingClientRect();
    let cell = this.grid.getCellAt(
      new Point(event.clientX - rect.left, event.clientY - rect.top)
    );

    // Update cable
    this.cable.end = cell;
    this.grid.draw();
  }
}
