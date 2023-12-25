import * as PIXI from "pixi.js";
import { Configuration } from "./Configuration";
import { App } from "../setup/App";

export class Background {
  constructor() {
    this.container = new PIXI.Container();
    this.#backgroundMovement();
  }

  #backgroundMovement() {
    this.backgrounds = [];

    // multiple backgrounds that will display one after another to simulate moving effect

    const createBackgrounds = () => {
      for (let i = 0; i < 3; i++) {
        const background = App.createSprite("spacebackground");
        background.y = -background.height * (i - 1);
        background.x = 0;
        this.container.addChild(background);
        this.backgrounds.push(background);
      }
    };

    // reposition background image when it moves out of the viewport at the bottom

    const moveOnFrame = () => {
      App.app.ticker.add(() => {
        const offset = Configuration.background.movingSpeed;
        this.backgrounds.forEach((sprite, index) => {
          sprite.y += offset;

          if (sprite.y >= sprite.height) {
            const prevIndex =
              index === 0 ? this.backgrounds.length - 1 : index - 1;
            sprite.y = this.backgrounds[prevIndex].y - sprite.height;
          }
        });
      });
    };

    createBackgrounds();
    moveOnFrame();
  }
}
