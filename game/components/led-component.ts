import { GridComponent } from "./grid-component";
import { CableComponent } from "./cable-component";
import { Cell, Rect } from "../shapes";

export class LedComponent extends GridComponent {
  public constructor(position: Cell) {
    super(new Rect(position.x, position.y, 3, 1));
  }

  public draw(context: CanvasRenderingContext2D, scale: number): void {
    // Cabling
    context.beginPath();
    context.lineWidth = Math.max(1, scale / 2);
    context.lineCap = "round";
    context.lineJoin = "round";
    context.strokeStyle = this.ghost
      ? CableComponent.STYLE_GHOST_COLOR
      : CableComponent.STYLE_ON_COLOR;
    context.moveTo(scale * 0.5, scale * 0.5);
    context.lineTo(scale * 1.0, scale * 0.5);
    context.moveTo(scale * 2.0, scale * 0.5);
    context.lineTo(scale * 2.5, scale * 0.5);
    context.stroke();
    context.closePath();

    // Body
    context.beginPath();
    context.moveTo(scale, 0);
    context.lineTo(scale * 2, scale / 2);
    context.lineTo(scale, scale);
    context.lineTo(scale, 0);
    context.moveTo(scale * 2, 0);
    context.lineTo(scale * 2, scale);
    context.lineWidth = 1;
    context.strokeStyle = "#000000";
    context.fillStyle = "#FFFFFF";
    context.fill();
    context.stroke();
    context.closePath();
  }
}
