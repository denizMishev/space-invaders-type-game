import { Scene } from "../setup/Scene";
import { Background } from "./Background";
import { EnemyV1 } from "./EnemyV1";
import { shootingCollisionHandler } from "./ShootingCollisionHandler";
import { Spaceship } from "./Spaceship";

export class Game extends Scene {
  create() {
    this.createBackground();
    this.createSpaceship();
    this.createEnemies();
    shootingCollisionHandler();
  }

  createBackground() {
    this.bg = new Background();
    this.container.addChild(this.bg.container);
  }

  createSpaceship() {
    this.spaceship = new Spaceship();
    this.container.addChild(this.spaceship.spaceship);
  }

  createEnemies() {
    this.enemies = new EnemyV1(4);
    this.container.addChild(this.enemies.container);
  }
}
