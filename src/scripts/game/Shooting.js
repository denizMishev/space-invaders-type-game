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
    eventEmitter.on(
      "enemyMovementTracking",
      this.updateEnemiesPosition.bind(this)
    );
    eventEmitter.on(
      "spaceshipPositionUpdate",
      this.updateSpaceshipPosition.bind(this)
    );
  }

  updateEnemiesPosition(movementInfo) {
    this.enemies = movementInfo.map((enemyInfo) => ({
      enemyX: enemyInfo.enemyContainer.x,
      enemyY: enemyInfo.enemyContainer.y,
      enemyWidth: enemyInfo.enemyContainer.width,
      enemyHeight: enemyInfo.enemyContainer.height,
    }));
  }

  updateSpaceshipPosition(spaceshipData) {
    this.spaceshipPosition = spaceshipData;
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
    let bulletTargetPositions = [];
    let bulletTarget = "";

    if (this.calledFrom === "spaceship") {
      bulletTargetPositions = this.enemies.map((enemy) => ({
        x: enemy.enemyX,
        y: enemy.enemyY,
        width: enemy.enemyWidth,
        height: enemy.enemyHeight,
      }));
      bulletTarget = "enemyV1";
    } else if (this.calledFrom === "enemyV1") {
      bulletTargetPositions = [this.spaceshipPosition];
      bulletTarget = "spaceship";
    }

    for (let i = this.bullets.length - 1; i >= 0; i--) {
      const bullet = this.bullets[i];
      const bulletRect = new PIXI.Rectangle(
        bullet.graphics.x,
        bullet.graphics.y,
        bullet.graphics.width,
        bullet.graphics.height
      );

      for (let j = 0; j < bulletTargetPositions.length; j++) {
        const target = bulletTargetPositions[j];
        const targetRect = new PIXI.Rectangle(
          target.x,
          target.y,
          target.width,
          target.height
        );

        if (rectsIntersect(bulletRect, targetRect)) {
          console.log(`Collision detected with ${bulletTarget} at index ${j}`);
          eventEmitter.emit(`${bulletTarget}hit`, j);
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
