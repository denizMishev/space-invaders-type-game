import { Scene } from "../setup/Scene";
import { Background } from "./Background";
import { EnemyV1 } from "./EnemyV1";
import { Spaceship } from "./Spaceship";
import { eventEmitter } from "./EventBus";
import { MessageText } from "./MessageText";
import { Configuration } from "./Configuration";

export class Game extends Scene {
  async create() {
    this.createBackground();
    this.createSpaceship();

    await this.changeWave(true, () => this.createEnemies(true));

    eventEmitter.on(Configuration.events.enemyV1EnemiesDestroyed, () =>
      this.changeWave(false, () => this.createEnemies())
    );
  }

  createBackground() {
    this.bg = new Background();
    this.container.addChild(this.bg.container);
  }

  createSpaceship() {
    this.spaceship = new Spaceship();
    this.container.addChild(this.spaceship.spaceship);
  }

  createEnemies(initial = false) {
    this.enemyCount = initial ? 4 : this.enemyCount + 4;

    if (this.enemies) {
      this.container.removeChild(this.enemies.container);
    }

    this.enemies = new EnemyV1(this.enemyCount);
    this.container.addChild(this.enemies.container);
  }

  async changeWave(firstWave, createEnemies) {
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    const waveNumber = this.enemyCount / 4 - 1;

    let waveCompletedTextMsg;
    let nextWaveTextMsg;

    if (firstWave) {
      waveCompletedTextMsg = " GET READY! ";
      nextWaveTextMsg = " ENEMIES COMING! ";
    } else {
      waveCompletedTextMsg = `WAVE ${waveNumber + 1} COMPLETED!`;
      nextWaveTextMsg = `LETS GO! WAVE ${waveNumber + 2}`;
    }

    const waveCompletedText = new MessageText(
      waveCompletedTextMsg,
      56,
      0xffffff,
      "bold"
    ).messageText;
    this.container.addChild(waveCompletedText);

    await delay(1000);

    const nextWaveText = new MessageText(nextWaveTextMsg, 36, 0xff0000, "bold")
      .messageText;
    nextWaveText.y = waveCompletedText.y + waveCompletedText.height + 10;
    this.container.addChild(nextWaveText);

    await delay(2500);

    let isVisible = true;
    const blinkInterval = setInterval(() => {
      nextWaveText.visible = isVisible;
      isVisible = !isVisible;
    }, 50);

    await delay(1000);

    clearInterval(blinkInterval);
    nextWaveText.visible = true;

    this.container.removeChild(waveCompletedText);
    this.container.removeChild(nextWaveText);

    createEnemies();
  }
}
