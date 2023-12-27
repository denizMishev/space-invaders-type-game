import * as PIXI from "pixi.js";
import { App } from "../setup/App";
import { Shooting } from "./Shooting";

export class EnemyV1 {
  constructor(enemyCount) {
    this.enemies = [];
    this.enemyCount = enemyCount;
    this.container = new PIXI.Container();
    this.shooting = new Shooting("enemyV1");
    this.createEnemies();

    App.app.ticker.add(this.initiateBehaviourPrograms.bind(this));
  }

  createEnemies() {
    const enemiesPerRow = 4;
    const spacing = 120;
    const rowSpacing = 60; // vertical spacing
    const totalWidth = (enemiesPerRow - 1) * spacing;
    const startX = (window.innerWidth - totalWidth) / 2 - 50;
    const startY = window.innerHeight * 0.05;

    for (let i = 0; i < this.enemyCount; i++) {
      const enemy = App.createSprite("enemyspaceshipv1");
      enemy.scale.set(0.3);

      const row = Math.floor(i / enemiesPerRow);
      const col = i % enemiesPerRow;

      enemy.x = startX + col * spacing;
      enemy.y = startY + row * rowSpacing;
      this.container.addChild(enemy);
      this.enemies.push(enemy);
    }
  }

  movementBehaviour() {
    this.speed = 2;
    if (!this.direction) this.direction = 1; // determine the movement direction, 1 = right ; -1 = left

    const moveAmount = this.speed * this.direction;
    this.enemies.forEach((enemy) => {
      enemy.x += moveAmount;
    });

    // reverse direction on border collision

    const leftmostEnemy = this.enemies[0];
    const rightmostEnemy = this.enemies[this.enemies.length - 1];
    if (
      leftmostEnemy.x < 0 ||
      rightmostEnemy.x + rightmostEnemy.width > window.innerWidth
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
      this.currentEnemyIndex < this.enemies.length
    ) {
      const enemy = this.enemies[this.currentEnemyIndex];
      const bulletX = enemy.x + enemy.width / 2;
      const bulletY = enemy.y + enemy.height - 40;
      this.shooting.shoot(bulletX, bulletY);

      this.lastShotTime = now;
      this.currentEnemyIndex =
        (this.currentEnemyIndex + 1) % this.enemies.length;
    }
  }

  initiateBehaviourPrograms() {
    this.movementBehaviour();
    this.attackBehaviour();
  }
}
