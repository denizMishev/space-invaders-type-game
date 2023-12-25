import { App } from "../setup/App";
import { Shooting } from "./Shooting";

export class Spaceship {
  constructor() {
    this.spaceship = App.createSprite("spaceshipv1");
    this.spaceship.y = window.innerHeight * 0.9 - this.spaceship.height;
    this.spaceship.x = (window.innerWidth - this.spaceship.width) / 2;
    this.shooting = new Shooting(); // Shooting instance
    this.setupKeyboardControls();
  }

  setupKeyboardControls() {
    const moveLeft = () => {
      this.spaceship.x -= window.innerWidth * 0.05;
    };

    const moveRight = () => {
      this.spaceship.x += window.innerWidth * 0.05;
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

  moveLeft() {
    this.spaceship.x -= window.innerWidth * 0.05;
  }

  moveRight() {
    this.spaceship.x += window.innerWidth * 0.05;
  }

  shoot() {
    const bulletX = this.spaceship.x + this.spaceship.width / 2 - 1.5;
    const bulletY = this.spaceship.y;
    this.shooting.shoot(bulletX, bulletY);
  }
}
