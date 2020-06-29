import { GridComponent } from "./grid-component";
import { Cell, Rect } from "../shapes";
import { CableComponent } from "./cable-component";

export class PowerComponent extends GridComponent {
  public constructor(position: Cell) {
    super(new Rect(position.x, position.y, 3, 3));
  }

  public draw(context: CanvasRenderingContext2D, scale: number): void {
    const x0 = (this.position.x + 0.5) * scale;
    const y0 = (this.position.y + 0.5) * scale;

    // Cabling
    context.save();
    context.lineWidth = Math.max(1, scale / 2);
    context.lineCap = "round";
    context.lineJoin = "round";
    context.strokeStyle = this.ghost
      ? CableComponent.STYLE_GHOST_COLOR
      : CableComponent.STYLE_ON_COLOR;
    context.moveTo(x0 + scale, y0);
    context.lineTo(x0 + scale, y0 + scale);
    context.stroke();
    context.restore();

    // Body
    context.save();
    context.moveTo(x0, y0 + scale);
    context.lineTo(x0 + scale * 2, y0 + scale);
    context.lineTo(x0 + scale * 2, y0 + scale * 2);
    context.lineTo(x0, y0 + scale * 2);
    context.moveTo(x0, y0 + scale);
    context.lineWidth = 1;
    context.fillStyle = "#FFFFFF";
    context.fill();
    context.stroke();
    context.restore();
  }
}
