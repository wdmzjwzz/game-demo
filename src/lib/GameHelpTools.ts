import * as PIXI from "pixi.js";
export default class GameHelpTools {
  static createPixiApp(width: number, height: number) {
    let app = new PIXI.Application({ width, height, antialias: true });
    return app;
  }
}
