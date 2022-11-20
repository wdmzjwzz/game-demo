import { makeAutoObservable } from "mobx";

export class RootState {
    constructor() {
        makeAutoObservable(this)
    }
    FPS = 0;

    setFPS(fps: number) {
        this.FPS = fps
    }
} 