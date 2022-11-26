
import rootStateManager from "../StateManager";
import { Application } from "./Application"; 
import { Player } from "./Models/Player";
import { Scene } from "./Scenes/Scene";

export class GameManager extends Application {
    public scene: Scene = new Scene();
    start() { 
        const player = new Player()
        this.scene.addChildren(player)
        super.start()
    }
    render() {
        rootStateManager.rootState.setGameData(this.scene)
    }
}