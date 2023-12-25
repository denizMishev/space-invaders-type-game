import { App } from "../setup/App";

export class Spaceship {
  constructor() {
    this.spaceship;
    this.createSpaceship();
    this.setupKeyboardControls();
  }

  createSpaceship() {
    this.spaceship = App.createSprite("spaceshipv1");
    this.spaceship.y = window.innerHeight * 0.9 - this.spaceship.height;
    this.spaceship.x = (window.innerWidth - this.spaceship.width) / 2;
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
      }
    });
  }
}
