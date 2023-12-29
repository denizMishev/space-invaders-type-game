import * as PIXI from "pixi.js";
import { App } from "../setup/App";
import { Configuration } from "./Configuration";
import { eventEmitter } from "./EventBus";

export class Shooting {
  constructor(calledFrom) {
    this.calledFrom = calledFrom;
    this.bullets = [];
    this.enemies = [];
    this.spaceshipPosition = {};

    this.bulletDirection = Configuration.shooting[calledFrom].bulletDirection;
    this.bulletColor = Configuration.shooting[calledFrom].bulletColor;

    App.app.ticker.add(this.update.bind(this));
    eventEmitter.on("enemyMovementTracking", this.updateEnemies.bind(this));
  }

  updateEnemies(movementInfo) {
    this.enemies = movementInfo.map((enemyInfo) => ({
      enemyX: enemyInfo.enemyContainer.x,
      enemyY: enemyInfo.enemyContainer.y,
      enemyWidth: enemyInfo.enemyContainer.width,
      enemyHeight: enemyInfo.enemyContainer.height,
    }));
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
    for (let i = this.bullets.length - 1; i >= 0; i--) {
      const bullet = this.bullets[i];
      bullet.update();

      if (bullet.isOffScreen()) {
        bullet.destroy();
        this.bullets.splice(i, 1);
      }
    }

    this.checkCollisions();
  }

  checkCollisions() {
    for (let i = this.bullets.length - 1; i >= 0; i--) {
      const bullet = this.bullets[i];
      const bulletRect = new PIXI.Rectangle(
        bullet.graphics.x,
        bullet.graphics.y,
        3,
        20
      );

      for (let j = 0; j < this.enemies.length; j++) {
        const enemy = this.enemies[j];
        const enemyRect = new PIXI.Rectangle(
          enemy.enemyX,
          enemy.enemyY,
          enemy.enemyWidth,
          enemy.enemyHeight
        );

        if (rectsIntersect(bulletRect, enemyRect)) {
          console.log(`collision detected with enemy at index ${j}`);
          bullet.destroy();
          this.bullets.splice(i, 1);
          break;
        }
      }
    }
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

function rectsIntersect(rectA, rectB) {
  return (
    rectA.x < rectB.x + rectB.width &&
    rectA.x + rectA.width > rectB.x &&
    rectA.y < rectB.y + rectB.height &&
    rectA.height + rectA.y > rectB.y
  );
}
