export class Injector {
  constructor() {
    return this;
  }
  static dependencies = {};

  static addDependency(dependency, key) {
    this.dependencies[key] = dependency;
  }

  static getDependency(key) {
    return this.dependencies[key];
  }
}
