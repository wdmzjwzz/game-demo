import { HealthPoint } from "../HealthPoint";
import { PowerLevelMap } from "../../constants";
import { ActionType, eventHandler } from "../../EventHandler";

/**
 * 法力
 */
export class PowerPoint extends HealthPoint {
    public baseGrowthValue = 100 //每秒增加0.1
    public currentValue: number = 0;
    public maxValue: number = 500
    get level() {
        return PowerLevelMap.get(this.maxValue)
    }

    compute(value: number) {
        if (this.currentValue >= this.maxValue) {
            eventHandler.dispatch({
                type: ActionType.abortTrain
            });
            return
        }
        const realValue = value + this.currentValue;
        this.setCurrentValue(Number(realValue.toFixed()));
    }

}