import * as PIXI from "pixi.js";
import { Configuration } from "../game/Configuration";

export class ScenesRelay {
  constructor() {
    this.container = new PIXI.Container();
    this.container.interactive = true;
    this.scene = null;
  }

  start(scene, sceneRelayInstance) {
    if (this.scene) {
      this.scene.destroy();
    }

    this.scene = new Configuration.scenes[scene](sceneRelayInstance);
    this.container.addChild(this.scene.container);
  }

  update(dt) {
    if (this.scene && this.scene.update) {
      this.scene.update(dt);
    }
  }
}
