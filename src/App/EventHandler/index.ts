import { StatusState } from "../Entities/Characters/Status";
import { GameManager } from "../GameManager";
import { Player } from "../Models/Player";
export enum ActionType {
    training,
    abortTrain,
    resumeTrain,
    levelUp
}

export interface Action {
    type: ActionType;
    param?: any
}
export class EventHandler {
    gameManager: GameManager | null = null;
    timmerIds: Map<ActionType, number> = new Map()
    init(gameManager: GameManager) {
        this.gameManager = gameManager
    }
    async dispatch(action: Action, callback?: Function) {
        if (!this.gameManager) {
            return
        }

        switch (action.type) {
            case ActionType.training:
                this.onTraining(action)
                break;
            case ActionType.abortTrain:
                this.onAbortTraining(action)
                break;
            case ActionType.levelUp:
                this.onLevelUp(action, callback)
                break;
            default:
                break;
        }

    }
    onTraining(action: Action, callback?: Function) {
        const trainId = this.timmerIds.get(ActionType.training);
        let player = action.param as Player
        if (trainId) {
            return
        }
        player.status.setState(StatusState.TRAINING)
        const id = this.gameManager!.addTimer(() => {
            const addedPower = player.powerPoint.baseGrowthValue * player.getGrowthSpeed()
            player.powerPoint.compute(addedPower);
        }, 1)
        this.timmerIds.set(action.type, id)
    }
    onAbortTraining(action: Action, callback?: Function) {
        const trainId = this.timmerIds.get(ActionType.training);
        let player = action.param as Player
        if (trainId) {
            this.gameManager!.removeTimer(trainId)
            this.timmerIds.delete(ActionType.training)
            player.status.setState(StatusState.IDLE)
        }
    }
    onLevelUp(action: Action, callback?: Function) {
        let player = action.param as Player;
        if (!player) {
            throw new Error("player is undefind");
        }
        player.levelUp()
        player.status.setState(StatusState.IDLE) // 突破成功
    }
}
export const eventHandler = new EventHandler()