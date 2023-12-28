import * as PIXI from "pixi.js";
import { App } from "../setup/App";
import { Configuration } from "./Configuration";
import { eventEmitter } from "./EventBus";

export class Shooting {
  constructor(calledFrom) {
    this.calledFrom = calledFrom;
    this.bullets = [];

    this.bulletDirection = Configuration.shooting[calledFrom].bulletDirection; // -1 for up, 1 for down

    this.bulletColor = Configuration.shooting[calledFrom].bulletColor;

    App.app.ticker.add(this.update.bind(this));
  }

  shoot(x, y) {
    const bullet = new Bullet(
      x,
      y,
      this.bulletDirection,
      this.bulletColor,
      this.calledFrom
    );
    this.bullets.push(bullet);
  }

  update() {
    let bulletData = [];

    for (let i = this.bullets.length - 1; i >= 0; i--) {
      const bullet = this.bullets[i];
      bullet.update();

      bulletData.push({
        calledFrom: this.calledFrom,
        x: bullet.graphics.x,
        y: bullet.graphics.y,
        width: bullet.graphics.width,
        height: bullet.graphics.height,
      });

      if (bullet.isOffScreen()) {
        bullet.destroy();
        this.bullets.splice(i, 1);
      }
    }

    eventEmitter.emit("bulletTracking", bulletData);
  }
}

class Bullet {
  constructor(x, y, direction, bulletColor, calledFrom) {
    this.calledFrom = calledFrom;
    this.graphics = new PIXI.Graphics();
    this.graphics.beginFill(bulletColor);
    this.graphics.drawRect(0, 0, 3, 20);
    this.graphics.endFill();
    this.graphics.x = x;
    this.graphics.y = y;
    this.direction = direction;
    App.app.stage.addChild(this.graphics);
  }

  update() {
    this.graphics.y += 6 * this.direction;
  }

  isOffScreen() {
    return this.direction === -1
      ? this.graphics.y < -20
      : this.graphics.y > window.innerHeight;
  }

  destroy() {
    App.app.stage.removeChild(this.graphics);
    this.graphics.destroy();
  }
}
