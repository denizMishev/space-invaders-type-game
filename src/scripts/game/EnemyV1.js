import * as PIXI from "pixi.js";
import { App } from "../setup/App";

export class EnemyV1 {
  constructor(enemyCount) {
    this.enemies = [];
    this.enemyCount = enemyCount;
    this.container = new PIXI.Container();
    this.speed = 2;
    this.direction = 1; // direction 1 right ; direction -1 = left
    this.createEnemies();
    App.app.ticker.add(this.movementBehaviour.bind(this));
  }

  createEnemies() {
    const spacing = 120;
    const totalWidth = (this.enemyCount - 1) * spacing;
    const startX = (window.innerWidth - totalWidth) / 2 - 50;
    const startY = window.innerHeight * 0.05;

    for (let i = 0; i < this.enemyCount; i++) {
      const enemy = App.createSprite("enemyspaceshipv1");
      enemy.scale.set(0.3);
      enemy.x = startX + i * spacing;
      enemy.y = startY;
      this.container.addChild(enemy);
      this.enemies.push(enemy);
    }
  }

  movementBehaviour() {
    // determine the movement direction

    const moveAmount = this.speed * this.direction;

    this.enemies.forEach((enemy) => {
      enemy.x += moveAmount;
    });

    // check for border collision and reverse direction if necessary

    const leftmostEnemy = this.enemies[0];
    const rightmostEnemy = this.enemies[this.enemies.length - 1];

    if (
      leftmostEnemy.x < 0 ||
      rightmostEnemy.x + rightmostEnemy.width > window.innerWidth
    ) {
      this.direction *= -1;
    }
  }
}
