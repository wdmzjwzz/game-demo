import { HealthPoint } from "../HealthPoint";
import { StatusState } from "./Status";
import Character from "./Character";

/**
 * 法力
 */
export class PowerPoint extends HealthPoint {
  constructor(parent: Character) {
    super(parent);
    this.maxValue = this.parent.levelInfo[0].maxPowerPoint;
    this.currentValue = 0;
    this.baseGrowthValue = this.parent.levelInfo[0].baseGrowthValue || 0;
    this.baseRecover = 5;
  }
  public baseGrowthValue; //每秒增加法力值
  public currentValue;
  public maxValue;

  get level() {
    const info = this.parent.levelInfo.find(
      item => item.maxPowerPoint === this.maxValue
    );
    return info?.level;
  }
  recover() {
    // if (this.parent.state === StatusState.IDLE) {
    //   this.compute(this.baseRecover)
    // }
  }
  public setCurrentValue(value: number) {
    const realValue = Math.max(0, value);
    this.currentValue = realValue;
  }
  compute(value: number) {
    const realValue = value + this.currentValue;
    this.setCurrentValue(Number(realValue.toFixed()));
    if (this.currentValue >= this.maxValue) {
      this.parent.setState(StatusState.BREAKING);
    }
  }
  public levelUp(): void {
    const newInfo = this.parent.getNextLevel();
    if (newInfo) {
      this.setMaxValue(newInfo.maxPowerPoint);
      this.baseGrowthValue = newInfo.baseGrowthValue || 0;
    }
  }
}
