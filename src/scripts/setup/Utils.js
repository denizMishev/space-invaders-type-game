export class Utils {
  static requireAllResources(resources) {
    const files = [];

    resources.keys().forEach((key) => {
      files.push({
        key,
        data: resources(key),
      });
    });

    return files;
  }
}
