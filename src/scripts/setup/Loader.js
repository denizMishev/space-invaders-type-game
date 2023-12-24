import * as PIXI from "pixi.js";

export class Loader {
  constructor(configuration) {
    this.resources = {};
    this.configuration = configuration;
  }

  preloadResources() {
    const resourcePromises = this.configuration.allResources.map((resource) => {
      const key = this.extractKeyFromResource(resource);

      if (this.isImageResource(resource)) {
        return PIXI.Assets.load(resource.data.default)
          .then((res) => {
            this.resources[key] = res;
          })
          .catch((error) => {
            console.error(`Error loading resource: ${error}`);
          });
      } else {
        return Promise.resolve();
      }
    });

    return Promise.all(resourcePromises);
  }

  extractKeyFromResource(resource) {
    const lastSlashIndex = resource.key.lastIndexOf("/") + 1;
    const lastDotIndex = resource.key.lastIndexOf(".");
    return resource.key.substring(lastSlashIndex, lastDotIndex);
  }

  isImageResource(resource) {
    return resource.key.endsWith(".png") || resource.key.endsWith(".jpg");
  }
}
