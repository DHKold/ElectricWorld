import { Grid } from "./grid";
import { Point } from "../shapes";

export class NavigationHandler {
  private isEnabled: boolean = false;
  private toggleButton: HTMLButtonElement;

  private captMouse: any = null;

  private _startDrag = this.startDrag.bind(this);
  private _stopDrag = this.stopDrag.bind(this);
  private _zoom = this.zoom.bind(this);
  private _drag = this.drag.bind(this);

  public constructor(private grid: Grid, private canvas: HTMLCanvasElement) {
    this.toggleButton = document.getElementById(
      "btnToggleN"
    ) as HTMLButtonElement;

    this.toggleButton.addEventListener("click", () => {
      this.isEnabled ? this.disbale() : this.enable();
    });

    this.enable();
  }

  public enable(): void {
    this.isEnabled = true;
    this.canvas.addEventListener("mousedown", this._startDrag);
    this.canvas.addEventListener("wheel", this._zoom);
    window.addEventListener("mouseup", this._stopDrag);
    window.addEventListener("mousemove", this._drag);
    this.toggleButton.classList.add("activated");
  }

  public disbale(): void {
    this.isEnabled = false;
    this.canvas.removeEventListener("mousedown", this._startDrag);
    this.canvas.removeEventListener("wheel", this._zoom);
    window.removeEventListener("mouseup", this._stopDrag);
    window.removeEventListener("mousemove", this._drag);
    this.toggleButton.classList.remove("activated");
  }

  private startDrag(event: MouseEvent): void {
    // Must be inside the grid
    if (!this.grid.isInside(new Point(event.clientX, event.clientY))) return;

    // Drag with Middle Button
    if (event.button === 1)
      this.captMouse = {
        x: event.clientX,
        y: event.clientY,
        sx: this.grid.start.x,
        sy: this.grid.start.y
      };
  }

  private stopDrag(event: MouseEvent): void {
    if (event.button === 1) this.captMouse = null;
  }

  private zoom(event: WheelEvent): void {
    if (event.deltaY > 0) {
      this.grid.scale = this.grid.scale / 2;
    } else if (event.deltaY < 0) {
      this.grid.scale = this.grid.scale * 2;
    }
  }

  private drag(event: MouseEvent): void {
    if (this.captMouse !== null) {
      let diff = {
        x: event.clientX - this.captMouse.x,
        y: event.clientY - this.captMouse.y
      };
      this.grid.start.x = this.captMouse.sx - diff.x;
      this.grid.start.y = this.captMouse.sy - diff.y;
      this.grid.draw();
    }
  }
}
