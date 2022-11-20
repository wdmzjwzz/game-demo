import { Application } from "pixi.js";
import GameHelpTools from "../lib/GameHelpTools";
import rootStateManager from "../StateManager";

class Timmer {

}
class GApplication {
  private pixiApp: Application | null = null;
  private fps = 0;

  public addTimmer(timmer: Timmer) {

  }
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
  public play() {
    if (!this.pixiApp) {
      return
    }
    this.pixiApp.ticker.add(this.render);
  }
  public render = (delta: number) => { 
    const fps = this.pixiApp!.ticker.FPS
    rootStateManager.rootState.setFPS(fps)
  }
  public pause() {
    if (!this.pixiApp) {
      return
    }
    this.pixiApp.ticker.stop()
  }
  public resume() {
    if (!this.pixiApp) {
      return
    }
    this.pixiApp.ticker.start()
  }
  public destory() {
    if (!this.pixiApp) {
      return
    }
    this.pixiApp.ticker.destroy()
  }
}
export const AppManager = new GApplication();
