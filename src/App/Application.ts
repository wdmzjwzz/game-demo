import { Application } from "pixi.js";
import GameHelpTools from "../lib/GameHelpTools";

class GApplication {
  private pixiApp: Application | null = null;
  public init() {
    if (this.pixiApp) {
      return;
    }
    const pixiApp = GameHelpTools.createPixiApp(
      window.document.documentElement.clientWidth,
      window.document.documentElement.clientHeight
    );
    this.pixiApp = pixiApp; 
    document
      .getElementById("root")
      ?.appendChild(pixiApp.view as unknown as Node);
  }
  public play() {}
  public pause() {}
  public resume() {}
  public destory() {}
}
export const AppManager = new GApplication();
