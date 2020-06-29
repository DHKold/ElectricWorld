import "./style.css";

import { Game } from "./game/game";

// Configure the canvas
const canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
canvas.addEventListener("contextmenu", e => e.preventDefault());
canvas.addEventListener("wheel", e => e.preventDefault());

// Create the game
const game = new Game(canvas);

const resize = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  game.resize();
};
window.addEventListener("resize", resize);
resize();
