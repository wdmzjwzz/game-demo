
import { Application } from "pixi.js";
import GameHelpTools from "../lib/GameHelpTools";
import rootStateManager from "../StateManager";
import { GApplication } from "./Application";
import { Attribute, AttributeLevel, AttributeType } from "./Entities/Characters/Attribute";
import Character from "./Entities/Characters/Character";
import { StatusState } from "./Entities/Characters/Status";
import { eventHandler } from "./EventHandler";
import { Player } from "./PlayerModels/Player";
import { Scene } from "./Scenes/Scene";

export class GameManager extends GApplication {
    static _instance: GameManager;
    static get instance() {
        if (!GameManager._instance) {
            GameManager._instance = new GameManager()
        }
        return GameManager._instance
    }
    public autoRecoverTimmer = -1;
    public pixiAPP: Application | null = null;
    public scene: Scene = new Scene();
    initPixiApp(container: HTMLDivElement) {
        this.pixiAPP = GameHelpTools.createPixiApp(window.document.documentElement.clientWidth, window.document.documentElement.clientHeight);
        container.appendChild(this.pixiAPP.view as unknown as Node)
    }
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
        this.startAutoRecover()
    }
    startAutoRecover() {
        this.autoRecoverTimmer = this.addTimer(() => {
            this.autoRecover()
        }, 1)
    }
    stopAutoRecover() {
        if (this.autoRecoverTimmer === -1) {
            return
        }
        this.removeTimer(this.autoRecoverTimmer)
    }
    autoRecover() {
        this.scene.children.forEach(entity => {
            const character = entity as Character
            if (character.state === StatusState.DEAD) {
                return
            }
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