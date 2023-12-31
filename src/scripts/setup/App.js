import * as PIXI from "pixi.js";
import { Loader } from "./Loader";
import { ScenesRelay } from "./ScenesRelay";
import { StartingScreen } from "../game/StartingScreen";

class Application {
  run() {
    this.app = new PIXI.Application({ resizeTo: window });
    document.body.appendChild(this.app.view);

    this.loader = new Loader();
    this.loader.preloadResources().then(() => this.start());

    this.scenesRelay = new ScenesRelay();
    this.app.stage.addChild(this.scenesRelay.container);
  }

  createSprite(key) {
    return new PIXI.Sprite(this.loader.resources[key]);
  }

  start() {
    this.scenesRelay.start("StartingScreen", this.scenesRelay);
  }
}

export const App = new Application();
