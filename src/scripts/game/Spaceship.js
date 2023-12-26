import { App } from "../setup/App";
import { Shooting } from "./Shooting";
import { Configuration } from "./Configuration";

export class Spaceship {
  constructor() {
    this.spaceship = App.createSprite("spaceshipv1");
    this.spaceship.scale.set(Configuration.spaceship.scale);
    this.spaceship.y = window.innerHeight * 0.9 - this.spaceship.height;
    this.spaceship.x = (window.innerWidth - this.spaceship.width) / 2;
    this.shooting = new Shooting();
    this.setupKeyboardControls();
  }

  setupKeyboardControls() {
    const moveLeft = () => {
      this.spaceship.x -=
        window.innerWidth * Configuration.spaceship.horizontalMovement;
    };

    const moveRight = () => {
      this.spaceship.x +=
        window.innerWidth * Configuration.spaceship.horizontalMovement;
    };

    window.addEventListener("keydown", (e) => {
      if (e.key === "a" || e.key === "ArrowLeft") {
        moveLeft();
      } else if (e.key === "d" || e.key === "ArrowRight") {
        moveRight();
      } else if (e.key === " ") {
        this.shoot();
      }
    });
  }

  shoot() {
    const bulletX = this.spaceship.x + this.spaceship.width / 2 - 1.5;
    const bulletY = this.spaceship.y;
    this.shooting.shoot(bulletX, bulletY);
  }
}
