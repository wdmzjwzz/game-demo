import { Application } from "pixi.js";
import GameHelpTools from "../lib/GameHelpTools";
import rootStateManager from "../StateManager";


class GApplication {
  private pixiApp: Application | null = null;
  private fps = 0;
  private FPSTimer = -1
  private startFPSTimer() {
    this.FPSTimer = setInterval(() => {
      const fps = this.pixiApp!.ticker.FPS
      rootStateManager.rootState.setFPS(Number(fps.toFixed(2)))
    }, 500)
  }
  private removeFPSTimer() {
    clearInterval(this.FPSTimer)
    this.FPSTimer = -1
  }
  public init() {
    if (this.pixiApp) {
      return;
    }

    const pixiApp = GameHelpTools.createPixiApp(
      window.document.documentElement.clientWidth,
      window.document.documentElement.clientHeight-2
    );
    this.pixiApp = pixiApp;
    document.getElementById('root')!.appendChild(pixiApp.view as unknown as Node);

    setTimeout(() => pixiApp.resize(), 500)
    this.startFPSTimer()
  }
  public play() {
    if (!this.pixiApp) {
      return
    }
    this.pixiApp.ticker.add(this.render);
  }
  public render = (delta: number) => {

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
    this.pixiApp.ticker.destroy();
    this.removeFPSTimer()
  }
}
export const AppManager = new GApplication();
