import * as PIXI from "pixi.js";
import { App } from "../setup/App";
import { Shooting } from "./Shooting";

export class EnemyV1 {
  constructor(enemyCount) {
    this.enemies = [];
    this.enemyContainers = [];
    this.enemyCount = enemyCount;
    this.container = new PIXI.Container();
    this.shooting = new Shooting("enemyV1");
    this.createEnemies();

    App.app.ticker.add(this.initiateBehaviourPrograms.bind(this));
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

    const moveAmount = this.speed * this.direction;
    this.enemyContainers.forEach((container) => {
      container.x += moveAmount;
    });

    // check for border collision

    const leftmostContainer = this.enemyContainers[0];
    const rightmostContainer =
      this.enemyContainers[this.enemyContainers.length - 1];
    if (
      leftmostContainer.x < 0 ||
      rightmostContainer.x + rightmostContainer.width > window.innerWidth
    ) {
      this.direction *= -1;
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
}
