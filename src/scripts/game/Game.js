import { Scene } from "../setup/Scene";
import { Background } from "./Background";
import { Spaceship } from "./Spaceship";

export class Game extends Scene {
  create() {
    this.createBackground();
    this.createSpaceship();
  }

  createBackground() {
    this.bg = new Background();
    this.container.addChild(this.bg.container);
  }

  createSpaceship() {
    this.spaceship = new Spaceship();
    this.container.addChild(this.spaceship.spaceship); // Add the spaceship's sprite to the container
  }
}
