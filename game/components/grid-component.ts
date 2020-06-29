import { Rect } from "../shapes";

export abstract class GridComponent {
  public ghost: boolean = true;
  public visible: boolean = true;

  public constructor(public position: Rect) {}
}
