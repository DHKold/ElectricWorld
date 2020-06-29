import { Rect } from "../shapes";

export abstract class GridComponent {
  public ghost: boolean = true;
  public visible: boolean = true;

  public constructor(public position: Rect) {}

  abstract draw(context: CanvasRenderingContext2D, scale: number): void;
}
