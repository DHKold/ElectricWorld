import { GridComponent } from "./grid-component";
import { CableComponent } from "./cable-component";
import { Cell, Rect } from "../shapes";

export class PowerComponent extends GridComponent {
  public static STYLE_POWER_ICON =
    "m10.236 19.32c-.086 0-.174-.018-.256-.056-.26-.121-.401-.406-.339-.686l1.104-4.951h-2.585c-.23 0-.44-.129-.544-.335-.104-.205-.083-.452.053-.637l5.684-7.727c.17-.233.481-.315.745-.193.263.12.405.409.34.691l-1.133 4.947h2.784c.232 0 .443.131.546.338.103.208.08.456-.06.64l-5.854 7.727c-.117.157-.298.242-.485.242z";

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
    context.moveTo(0, scale);
    context.lineTo(scale * 3, scale);
    context.lineTo(scale * 3, scale * 3);
    context.lineTo(0, scale * 3);
    context.moveTo(0, scale);
    context.lineWidth = 1;
    context.strokeStyle = "#000000";
    context.fillStyle = "#FFFFFF";
    context.fill();
    context.stroke();
    context.closePath();

    // Icon
    const iconPath = new Path2D(PowerComponent.STYLE_POWER_ICON);
    context.lineWidth = 1;
    context.strokeStyle = "#000000";
    context.fillStyle = "#FDC50B";
    context.translate(scale / 2, scale);
    context.scale(scale / 12, scale / 12);
    context.fill(iconPath);
    context.stroke(iconPath);
  }
}
