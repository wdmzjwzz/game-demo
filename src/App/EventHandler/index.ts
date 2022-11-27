import { StatusState } from "../Entities/Characters/Status";
import { GameManager } from "../GameManager";
import { Player } from "../Models/Player";
export enum ActionType {
    training,
    abortTrain,
    resumeTrain,
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
        const trainId = this.timmerIds.get(ActionType.training);
        let player = action.param as Player
        switch (action.type) {
            case ActionType.training:
                if (trainId) {
                    return
                }

                player.status.setState(StatusState.TRAINING)
                const id = this.gameManager?.addTimer(() => {
                    const addedPower = player.powerPoint.baseGrowthValue * player.getGrowthSpeed()
                    player.powerPoint.compute(addedPower);
                }, 1)
                this.timmerIds.set(action.type, id)
                break;
            case ActionType.abortTrain:
                if (trainId) {
                    this.gameManager.removeTimer(trainId)
                    this.timmerIds.delete(ActionType.training)
                    player.status.setState(StatusState.IDLE)
                }
                break;
            default:
                break;
        }

    }

}
export const eventHandler = new EventHandler()