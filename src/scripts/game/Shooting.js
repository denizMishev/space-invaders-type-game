import * as PIXI from "pixi.js";
import { App } from "../setup/App";

export class Shooting {
  constructor() {
    this.bullets = [];
    App.app.ticker.add(this.update.bind(this));
  }

  shoot(x, y) {
    const bullet = new Bullet(x, y);
    this.bullets.push(bullet);
  }

  update() {
    for (let i = this.bullets.length - 1; i >= 0; i--) {
      const bullet = this.bullets[i];
      bullet.update();

      if (bullet.isOffScreen()) {
        bullet.destroy();
        this.bullets.splice(i, 1);
      }
    }
  }
}

class Bullet {
  constructor(x, y) {
    this.graphics = new PIXI.Graphics();
    this.graphics.beginFill(0xffff00);
    this.graphics.drawRect(0, 0, 3, 20);
    this.graphics.endFill();
    this.graphics.x = x;
    this.graphics.y = y;
    App.app.stage.addChild(this.graphics);
  }

  update() {
    this.graphics.y -= 6; // Speed of the bullet
  }

  isOffScreen() {
    return this.graphics.y < -6;
  }

  destroy() {
    App.app.stage.removeChild(this.graphics);
    this.graphics.destroy();
  }
}
