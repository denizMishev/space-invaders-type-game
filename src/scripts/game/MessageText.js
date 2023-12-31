import * as PIXI from "pixi.js";
import { App } from "../setup/App";

export class MessageText {
  constructor(text, fontSize, color, fontWeight) {
    this.text = text;
    this.fontSize = fontSize;
    this.color = color;
    this.fontWeight = fontWeight;
    this.messageText = this.createMessageText();
  }

  createMessageText() {
    const messageText = new PIXI.Text(this.text, {
      fontFamily: "Arial",
      fontSize: this.fontSize,
      fill: this.color,
      fontWeight: this.fontWeight,
    });
    messageText.anchor.set(0.5);
    messageText.x = App.app.renderer.width / 2;
    messageText.y = App.app.renderer.height / 2.5;
    return messageText;
  }
}
