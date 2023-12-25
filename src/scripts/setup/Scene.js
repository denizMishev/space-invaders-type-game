import * as PIXI from "pixi.js";
import { App } from "./App";

export class Scene {
  constructor() {
    this.container = new PIXI.Container();
    this.container.interactive = true;
    this.create(); // Call the create method to set up the scene
  }

  create() {}

  destroy() {}

  remove() {
    this.destroy();
    this.container.destroy();
  }
}
