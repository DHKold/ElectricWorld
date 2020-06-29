import { Rect } from "../shapes";
import { GridComponent } from "./grid-component";

export class OverComponent extends GridComponent {
  private cache: ImageData;
  private cacheScale: number;

  public getImageData(scale: number): ImageData {
    if (this.cache && scale === this.cacheScale) {
      return this.cache;
    }

    const canvas = document.createElement("canvas");
    canvas.width = scale * this.position.w;
    canvas.height = scale * this.position.h;
    const context = canvas.getContext("2d");
    context.fillStyle = "#CCCCCC";
    context.fillRect(0, 0, canvas.width, canvas.height);

    this.cache = context.getImageData(0, 0, canvas.width, canvas.height);
    this.cacheScale = scale;
    return this.cache;
  }
}
