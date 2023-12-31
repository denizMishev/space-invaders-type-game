import { Scene } from "../setup/Scene";
import { Background } from "./Background";
import { MessageText } from "./MessageText";
import * as PIXI from "pixi.js";

export class StartingScreen extends Scene {
  constructor(scenesRelay) {
    super();
    this.create();
    this.scenesRelay = scenesRelay;
  }

  create() {
    this.createBackground();
    this.createWelcomeMessage();
    this.createStartButton();
  }

  createBackground() {
    this.bg = new Background();
    this.container.addChild(this.bg.container);
  }

  createWelcomeMessage() {
    const welcomeMessage = new MessageText(
      "Welcome to Space Defense!",
      64,
      0xffffff,
      "bold"
    ).messageText;
    welcomeMessage.anchor.set(0.5);
    welcomeMessage.x = window.innerWidth / 2;
    welcomeMessage.y = window.innerHeight / 2;
    this.container.addChild(welcomeMessage);
  }

  createStartButton() {
    const button = new PIXI.Graphics();
    button.beginFill(0x00ff00);
    button.drawRect(
      window.innerWidth / 2 - 150,
      window.innerHeight / 2 + 100,
      300,
      100
    );
    button.endFill();
    button.interactive = true;
    button.buttonMode = true;

    const buttonText = new PIXI.Text("START", {
      fontFamily: "Arial",
      fontSize: 36,
      fill: 0xffffff,
      fontWeight: "bold",
    });
    buttonText.anchor.set(0.5);
    buttonText.x = window.innerWidth / 2;
    buttonText.y = window.innerHeight / 2 + 150;

    button.on("pointerdown", this.onStartButtonClick.bind(this));

    this.container.addChild(button);
    this.container.addChild(buttonText);
  }

  onStartButtonClick() {
    this.scenesRelay.start("Game");
  }
}
