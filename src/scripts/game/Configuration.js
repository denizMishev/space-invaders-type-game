import { Utils } from "../setup/Utils.js";
import { Game } from "./Game.js";

export const Configuration = {
  scenes: {
    Game,
  },
  allResources: Utils.requireAllResources(
    require["context"]("./../../resources/", true, /\.(png|jpe?g)$/)
  ),
  background: {
    movingSpeed: 2,
  },
};
