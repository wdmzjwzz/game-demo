import { HealthPoint } from "../HealthPoint";
import { ActionType, eventHandler } from "../../EventHandler";
import { StatusState } from "./Status";
import Character from "./Character";
import { Soul } from "./Soul";

/**
 * 法力
 */
export class PowerPoint extends HealthPoint {
    constructor(parent: Character | Soul) {
        super(parent)
        this.maxValue = this.parent.levelInfo[0].maxPowerPoint;
        this.currentValue = 0;
        this.baseGrowthValue = this.parent.levelInfo[0].baseGrowthValue || 0
    }
    public baseGrowthValue  //每秒增加法力值
    public currentValue;
    public maxValue
    get level() {
        const info = this.parent.levelInfo.find((item) => item.maxPowerPoint === this.maxValue)
        return info?.level
    }
    compute(value: number) {
        const realValue = value + this.currentValue;
        this.setCurrentValue(Number(realValue.toFixed()));
        if (this.currentValue >= this.maxValue) { 
            this.parent.status.setState(StatusState.BREAKING) 
        }
    }
    public levelUp(): void {
        const newInfo = this.parent.getNextLevel()
        if (newInfo) {
            this.setMaxValue(newInfo.maxPowerPoint);
            this.baseGrowthValue = newInfo.baseGrowthValue || 0
        }
    }
}