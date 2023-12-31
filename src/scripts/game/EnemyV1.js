import * as PIXI from "pixi.js";
import { App } from "../setup/App";
import { Shooting } from "./Shooting";
import { eventEmitter } from "./EventBus";

export class EnemyV1 {
  constructor(enemyCount) {
    this.enemies = [];
    this.enemyContainers = [];
    this.enemyCount = enemyCount;
    this.container = new PIXI.Container();
    this.shooting = new Shooting("enemyV1");
    this.createEnemies();

    App.app.ticker.add(this.initiateBehaviourPrograms.bind(this));
    eventEmitter.on("enemyV1hit", this.handleEnemyHit.bind(this));
  }

  createEnemies() {
    const enemiesPerRow = 4;
    const colSpacing = 120;
    const rowSpacing = 80;
    const totalWidth = (enemiesPerRow - 1) * colSpacing;
    const startX = (window.innerWidth - totalWidth) / 2 - 50;
    const startY = window.innerHeight * 0.05;

    for (let i = 0; i < this.enemyCount; i++) {
      const enemyContainer = new PIXI.Container();

      const enemy = App.createSprite("enemyspaceshipv1");
      enemy.scale.set(0.3);

      const row = Math.floor(i / enemiesPerRow);
      const col = i % enemiesPerRow;

      enemy.x = 0;
      enemy.y = 0;
      enemyContainer.addChild(enemy);

      const healthBar = this.createHealthBar(enemy);
      healthBar.y = enemy.height - 10;
      enemyContainer.addChild(healthBar);
      enemyContainer.initialHealthWidth = healthBar.width;

      enemyContainer.x = startX + col * colSpacing;
      enemyContainer.y = startY + row * rowSpacing;

      this.container.addChild(enemyContainer);
      this.enemies.push(enemy);
      this.enemyContainers.push(enemyContainer);
    }
  }

  createHealthBar(enemy) {
    const healthBar = new PIXI.Graphics();
    healthBar.beginFill(0xff1414);
    healthBar.drawRect(20, 0, enemy.width - 40, 5);
    healthBar.endFill();

    return healthBar;
  }

  movementBehaviour() {
    this.speed = 2;
    if (!this.direction) this.direction = 1; // determine the movement direction, 1 = right ; -1 = left

    let movementInfo = [];

    const moveAmount = this.speed * this.direction;

    // filter out undefined or null containers

    const validContainers = this.enemyContainers.filter(
      (container) => container != null
    );

    validContainers.forEach((container) => {
      container.x += moveAmount;

      movementInfo.push({
        enemyContainer: container,
      });
    });

    eventEmitter.emit("enemyMovementTracking", movementInfo);

    // check for border collision

    if (validContainers.length > 0) {
      const leftmostContainer = validContainers[0];
      const rightmostContainer = validContainers[validContainers.length - 1];

      if (
        leftmostContainer.x < 0 ||
        rightmostContainer.x + rightmostContainer.width > window.innerWidth
      ) {
        this.direction *= -1;
      }
    }
  }

  attackBehaviour() {
    const now = Date.now();
    const shotInterval = 1000;

    if (!this.lastShotTime) {
      this.lastShotTime = now;
    }

    if (!this.currentEnemyIndex) {
      this.currentEnemyIndex = 0;
    }

    if (
      now - this.lastShotTime > shotInterval &&
      this.currentEnemyIndex < this.enemyContainers.length
    ) {
      const enemyContainer = this.enemyContainers[this.currentEnemyIndex];
      const enemy = this.enemies[this.currentEnemyIndex];
      const bulletX = enemyContainer.x + enemy.x + enemy.width / 2;
      const bulletY = enemyContainer.y + enemy.y + enemy.height;

      this.shooting.shoot(bulletX, bulletY);

      this.lastShotTime = now;
      this.currentEnemyIndex =
        (this.currentEnemyIndex + 1) % this.enemyContainers.length;
    }
  }

  initiateBehaviourPrograms() {
    this.movementBehaviour();
    this.attackBehaviour();
  }

  handleEnemyHit(enemyIndex) {
    const enemyContainer = this.enemyContainers[enemyIndex];
    if (!enemyContainer) return;

    const healthBar = enemyContainer.getChildAt(1);
    const initialHealthWidth = enemyContainer.initialHealthWidth;

    // 30% damage to health bar on each hit

    healthBar.width =
      Math.round((healthBar.width - initialHealthWidth / 3) * 10) / 10;

    if (healthBar.width <= 0) {
      this.container.removeChild(enemyContainer);
      this.enemyContainers.splice(enemyIndex, 1);
      this.enemies.splice(enemyIndex, 1);
    }

    if (this.enemyContainers.length === 0) {
      eventEmitter.emit("enemyV1changelevel");
    }
  }
}
