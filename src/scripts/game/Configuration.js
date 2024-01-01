import { Utils } from "../setup/Utils.js";
import { Game } from "./Game.js";
import { StartingScreen } from "./StartingScreen.js";

export const Configuration = {
  scenes: {
    StartingScreen,
    Game,
  },
  events: {
    enemyV1hit: "enemyV1Hit",
    enemyV1CurrentPosition: "enemyV1CurrentPosition",
    enemyV1EnemiesDestroyed: "enemyV1EnemiesDestroyed",
    spaceshipCurrentPosition: "spaceshipCurrentPosition",
  },
  allResources: Utils.requireAllResources(
    require["context"]("./../../resources/", true, /\.(png|jpe?g)$/)
  ),
  background: {
    movingSpeed: 2,
  },
  spaceship: {
    scale: 0.6,
    horizontalMovement: 0.03,
  },
  shooting: {
    spaceship: {
      bulletDirection: -1,
      bulletColor: 0xffff00,
    },
    enemyV1: {
      bulletDirection: 1,
      bulletColor: 0xff1414,
    },
  },
};
