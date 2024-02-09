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

    this.moveSpeed = 5;
    this.movingLeft = false;
    this.movingRight = false;
    this.movingUp = false;
    this.movingDown = false;

    this.shooting = new Shooting("spaceship");
    this.registerUserInput();

    App.app.ticker.add(this.updatePosition.bind(this));
  }

  registerUserInput() {
    window.addEventListener("keydown", (e) => {
      switch (e.key) {
        case "a":
        case "ArrowLeft":
          this.movingLeft = true;
          break;
        case "d":
        case "ArrowRight":
          this.movingRight = true;
          break;
        case "w":
        case "ArrowUp":
          this.movingUp = true;
          break;
        case "s":
        case "ArrowDown":
          this.movingDown = true;
          break;
        case " ":
          this.shoot();
          break;
      }
    });

    window.addEventListener("keyup", (e) => {
      switch (e.key) {
        case "a":
        case "ArrowLeft":
          this.movingLeft = false;
          break;
        case "d":
        case "ArrowRight":
          this.movingRight = false;
          break;
        case "w":
        case "ArrowUp":
          this.movingUp = false;
          break;
        case "s":
        case "ArrowDown":
          this.movingDown = false;
          break;
      }
    });
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
    eventEmitter.emit(
      Configuration.events.spaceshipCurrentPosition,
      spaceshipData
    );
  }

  updatePosition(delta) {
    if (this.movingLeft) this.spaceship.x -= this.moveSpeed * delta;
    if (this.movingRight) this.spaceship.x += this.moveSpeed * delta;
    if (this.movingUp) this.spaceship.y -= this.moveSpeed * delta;
    if (this.movingDown) this.spaceship.y += this.moveSpeed * delta;

    //keep spaceship inside window boundaries
    this.spaceship.x = Math.max(
      0,
      Math.min(this.spaceship.x, window.innerWidth - this.spaceship.width)
    );
    this.spaceship.y = Math.max(
      0,
      Math.min(this.spaceship.y, window.innerHeight - this.spaceship.height)
    );

    this.updateSpaceshipData();
  }
}
