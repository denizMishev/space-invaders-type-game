import { App } from "../setup/App";
import { Scene } from "../setup/Scene";

export class Game extends Scene {
  create() {
    this.createBackground();
  }

  createBackground() {
    this.bg = App.createSprite("spacebackground");
    this.container.addChild(this.bg);
    this.bg.width = window.innerWidth;
    this.bg.height = window.innerHeight;
  }
}
