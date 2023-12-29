import { App } from "../setup/App";
import { Shooting } from "./Shooting";
import { Configuration } from "./Configuration";
import { eventEmitter } from "./EventBus";

export class Spaceship {
  constructor() {
    this.spaceship = App.createSprite("spaceshipv1");
    this.spaceship.scale.set(Configuration.spaceship.scale);
    this.spaceship.y = window.innerHeight * 0.9 - this.spaceship.height;
    this.spaceship.x = (window.innerWidth - this.spaceship.width) / 2;
    this.shooting = new Shooting("spaceship");
    this.registerUserInput();
  }

  moveLeft() {
    this.spaceship.x -=
      window.innerWidth * Configuration.spaceship.horizontalMovement;
  }

  moveRight() {
    this.spaceship.x +=
      window.innerWidth * Configuration.spaceship.horizontalMovement;
  }

  shoot() {
    const bulletX = this.spaceship.x + this.spaceship.width / 2 - 1.5;
    const bulletY = this.spaceship.y;
    this.shooting.shoot(bulletX, bulletY);
  }

  updateSpaceshipData() {
    const spaceshipData = {
      x: this.spaceship.x,
      y: this.spaceship.y,
      width: this.spaceship.width,
      height: this.spaceship.height,
    };
    eventEmitter.emit("spaceshipPositionUpdate", spaceshipData);
  }

  registerUserInput() {
    window.addEventListener("keydown", (e) => {
      switch (e.key) {
        case "a":
        case "ArrowLeft":
          this.moveLeft();
          this.updateSpaceshipData();
          break;
        case "d":
        case "ArrowRight":
          this.moveRight();
          this.updateSpaceshipData();
          break;
        case " ":
          this.shoot();
          break;
      }
    });
  }
}
