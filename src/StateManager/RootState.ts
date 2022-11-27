import { makeAutoObservable } from "mobx";
import { GameManager } from "../App/GameManager";

export class RootState {
    constructor() {
        makeAutoObservable(this)
    }
    FPS = 0;
    gameData: any = {};
    gameManager: null | GameManager = null
    setFPS(fps: number) {
        this.FPS = fps
    }
    setGameManager(gameManager: null | GameManager) {
        this.gameManager = gameManager
    }
    setGameData(data: any) {
        this.gameData = data
    }
} 