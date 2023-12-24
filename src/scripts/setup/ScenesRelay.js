import * as PIXI from "pixi.js";
import { Configuration } from "../game/Configuration";
import { App } from "./App";

export class ScenesRelay {
  constructor() {
    this.container = new PIXI.Container();
    this.container.interactive = true;
    this.currentScene = null;
  }

  changeScene(newScene) {
    if (this.currentScene) {
      this.currentScene.remove();
    }

    this.currentScene = new Configuration.scenes[newScene]();
    this.container.addChild(this.currentScene.container);
  }
}
