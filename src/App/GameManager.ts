
import rootStateManager from "../StateManager";
import { Application } from "./Application";
import { Attribute, AttributeLevel, AttributeType } from "./Entities/Characters/Attribute";
import { eventHandler } from "./EventHandler";
import { Player } from "./Models/Player";
import { Scene } from "./Scenes/Scene";

export class GameManager extends Application {
    static _instance: GameManager;
    static get instance() {
        if (!GameManager._instance) {
            GameManager._instance = new GameManager()
        }
        return GameManager._instance
    }
    public scene: Scene = new Scene();
    start() {
        eventHandler.init(this)
        super.start()
        const player = new Player()
        const att = new Attribute(AttributeType.LEI, AttributeLevel.BEST); 
        player.attributes = [att]

        const npcPlayer = new Player()
        npcPlayer.displayName = '张三'

        this.scene.addChildren(player)
        this.scene.addChildren(npcPlayer)
    }
    render() {
        rootStateManager.rootState.setGameData({ ...this.scene })
    }

}
export const gameManager = GameManager.instance