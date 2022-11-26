import { makeAutoObservable } from "mobx";

export class RootState {
    constructor() {
        makeAutoObservable(this)
    }
    FPS = 0;
    gameData: any = {};
    setFPS(fps: number) {
        this.FPS = fps
    }
    setGameData(data: any) {
        this.gameData = data
    }
} 