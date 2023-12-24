import { Utils } from "../setup/Utils.js";
import { Game } from "./Game";

export const Config = {
  scenes: {
    Game,
  },
  allResources: Utils.requireAllResources(
    require["context"]("./../../resources/", true, /\.(png|jpe?g)$/)
  ),
};
