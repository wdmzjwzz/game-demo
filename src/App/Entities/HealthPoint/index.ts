
import Character from "../Characters/Character";
import { Soul } from "../Characters/Soul";

export class HealthPoint {
  public parent: Character | Soul
  public maxValue;
  public currentValue;
  constructor(parent: Character | Soul) {
    this.parent = parent;
    this.maxValue = this.parent.levelInfo[0].maxHealthPoint;
    this.currentValue = this.maxValue
  }

  public setMaxValue(value: number) {
    this.maxValue = value;
  }
  public setCurrentValue(value: number) {
    const realValue = Math.max(0, Math.min(value, this.maxValue));
    this.currentValue = realValue;
  }
  /**
   * compute(5) 表示当前生命值+5
   * compute(-5) 表示当前生命值-5
   * @param value
   */
  public compute(value: number) {
    const realValue = value + this.currentValue;
    this.setCurrentValue(Number(realValue.toFixed()));
  }
  public levelUp() {
    const currentPercent = this.currentValue / this.maxValue
    const newInfo = this.parent.getNextLevel()
    if (newInfo) {
      this.setMaxValue(newInfo.maxHealthPoint)
      this.setCurrentValue(newInfo.maxHealthPoint * currentPercent)
    }
  }
}
