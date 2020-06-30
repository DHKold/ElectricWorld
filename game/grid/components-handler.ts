import { Grid } from "./grid";
import { Point } from "../shapes";
import {
  PowerComponent,
  GridComponent,
  LedComponent,
  GroundComponent
} from "../components";

export class ComponentsHandler {
  private isEnabled: boolean = false;
  private toggleButton: HTMLButtonElement;

  private _clickHandler = this.clickHandler.bind(this);
  private _moveHandler = this.moveHandler.bind(this);
  private _keyupHandler = this.keyupHandler.bind(this);

  private component: GridComponent = null;

  public componentClasses = [PowerComponent, GroundComponent, LedComponent];
  public activeClass = 0;

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
    window.addEventListener("keyup", this._keyupHandler);
    this.toggleButton.classList.add("activated");
  }

  public disbale(): void {
    this.isEnabled = false;
    this.canvas.removeEventListener("mouseup", this._clickHandler);
    this.canvas.removeEventListener("mousemove", this._moveHandler);
    window.removeEventListener("keyup", this._keyupHandler);
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
      this.component = new this.componentClasses[this.activeClass](cell);
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

  private keyupHandler(event: KeyboardEvent): void {
    // Must not be drawing
    if (this.component) return;

    // Cycle
    if (event.keyCode === 65) this.activeClass++;
    if (event.keyCode === 69) this.activeClass--;
    const max = this.componentClasses.length;
    this.activeClass = ((this.activeClass % max) + max) % max;
    this.grid.draw();
  }
}
