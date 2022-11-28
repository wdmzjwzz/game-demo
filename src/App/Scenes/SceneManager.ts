import { gameManager } from "../GameManager";
import { Scene } from "./Scene";
const {pixiAPP} = gameManager
export class SceneManager {
    static _instance: SceneManager;
    static get instance() {
        if (!SceneManager._instance) {
            SceneManager._instance = new SceneManager()
        }
        return SceneManager._instance
    }

    sceneList: Scene[] = [];

    render() {
        const activeSence = this.sceneList.find(scene => scene.visible)
         
    }
}
const sceneManager = SceneManager.instance;
export default sceneManager