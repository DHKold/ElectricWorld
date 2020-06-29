import { Grid } from "./grid";
import { Point } from "../shapes";
import { PowerComponent, GridComponent } from "../components";

export class ComponentsHandler {
  private isEnabled: boolean = false;
  private toggleButton: HTMLButtonElement;

  private _clickHandler = this.clickHandler.bind(this);
  private _moveHandler = this.moveHandler.bind(this);

  private component: GridComponent = null;

  public constructor(private grid: Grid, private canvas: HTMLCanvasElement) {
    this.toggleButton = document.getElementById(
      "btnToggleA"
    ) as HTMLButtonElement;

    this.toggleButton.addEventListener("click", () => {
      this.isEnabled ? this.disbale() : this.enable();
    });

    this.disbale();
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

    // Cancel placement
    if (this.component && event.button == 2) {
      const index = this.grid.components.findIndex(c => c === this.component);
      this.grid.components.splice(index, 1);
      this.component = null;
      this.grid.draw();
      return;
    }

    // Start a new component
    if (!this.component && event.button == 0) {
      this.component = new PowerComponent(cell);
      this.grid.components.push(this.component);
      this.grid.draw();
      return;
    }

    // Confirm the placement
    if (this.component && event.button == 0) {
      this.component.ghost = false;
      this.component.position.x = cell.x;
      this.component.position.y = cell.y;
      this.component = null;
      this.grid.draw();
      return;
    }
  }

  private moveHandler(event: MouseEvent): void {
    // Must be drawing
    if (!this.component) return;

    // Must be inside the grid
    if (!this.grid.isInside(new Point(event.clientX, event.clientY))) return;

    // Detect cell under the cursor
    const rect = this.canvas.getBoundingClientRect();
    let cell = this.grid.getCellAt(
      new Point(event.clientX - rect.left, event.clientY - rect.top)
    );

    // Update component
    this.component.position.x = cell.x;
    this.component.position.y = cell.y;
    this.grid.draw();
  }
}
