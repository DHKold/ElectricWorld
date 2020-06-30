import { GridComponent } from "./grid-component";
import { CableComponent } from "./cable-component";
import { Cell, Rect } from "../shapes";

export class GroundComponent extends GridComponent {
  public constructor(position: Cell) {
    super(new Rect(position.x, position.y, 3, 3));
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
    context.moveTo(scale * 1.5, scale * 0.5);
    context.lineTo(scale * 1.5, scale * 1.0);
    context.stroke();
    context.closePath();

    // Body
    context.beginPath();
    context.moveTo(scale * 0.5, scale * 1.1);
    context.lineTo(scale * 2.5, scale * 1.1);
    context.moveTo(scale * 0.75, scale * 1.75);
    context.lineTo(scale * 2.25, scale * 1.75);
    context.moveTo(scale * 1.0, scale * 2.4);
    context.lineTo(scale * 2.0, scale * 2.4);
    context.lineWidth = Math.max(1, scale / 3);
    context.strokeStyle = "#000000";
    context.stroke();
    context.closePath();
  }
}
