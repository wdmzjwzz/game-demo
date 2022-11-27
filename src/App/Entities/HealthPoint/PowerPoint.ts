import { HealthPoint } from ".";
import { PowerLevelMap } from "../../constants";

/**
 * 法力
 */
export class PowerPoint extends HealthPoint {
    public baseGrowthValue = 0.1 //每秒增加0.1
    public currentValue: number = 0;
    public maxValue: number = 500
    get level() {
        return PowerLevelMap.get(this.maxValue)
    }
}