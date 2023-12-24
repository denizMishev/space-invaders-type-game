import * as PIXI from "pixi.js";
import { Loader } from "./Loader";
import { ScenesRelay } from "./ScenesRelay";

class Application {
  run(config) {
    this.config = config;
    this.app = new PIXI.Application({ resizeTo: window });
    document.body.appendChild(this.app.view);

    this.loader = new Loader(this.config);
    this.loader.preloadResources().then(() => this.start());

    this.scenes = new ScenesRelay();
    this.app.stage.addChild(this.scenes.container);
  }

  createSprite(key) {
    return new PIXI.Sprite(this.loader.resources[key]);
  }

  start() {
    this.scenes.changeScene("Game");
  }
}

export const App = new Application();
