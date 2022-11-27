
import rootStateManager from "../StateManager";
import { Application } from "./Application";
import { Attribute, AttributeLevel, AttributeType } from "./Entities/Characters/Attribute";
import Character from "./Entities/Characters/Character";
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
    public autoRecoverTimmer = -1
    public scene: Scene = new Scene();
    start() {
        if (this.autoRecoverTimmer !== -1) {
            this.removeTimer(this.autoRecoverTimmer);
            this.autoRecoverTimmer = -1;
            this.scene.children = []
        }
        eventHandler.init(this)
        super.start()
        const player = new Player()
        const att = new Attribute(AttributeType.LEI, AttributeLevel.BEST);
        player.attributes = [att]

        const npcPlayer = new Player()
        npcPlayer.displayName = '张三'
        npcPlayer.isSelf = false
        this.scene.addChildren(player)
        this.scene.addChildren(npcPlayer)

        this.autoRecoverTimmer = this.addTimer(() => {
            this.autoRecover()
        }, 1)
    }
    autoRecover() {
        this.scene.children.forEach(entity => {
            const character = entity as Character
            if (character.healthPoint) {
                character.healthPoint.recover()
            }
            if (character.powerPoint) {
                character.powerPoint.recover()
            }
        })
    }
    render() {
        rootStateManager.rootState.setGameData({ ...this.scene })
    }

}
export const gameManager = GameManager.instance