
 
import { ActionType, eventHandler } from "../../EventHandler";
import Character from "../Characters/Character";
import { Soul } from "../Characters/Soul";
import { StatusState } from "../Characters/Status";

export class HealthPoint {
  public parent: Character | Soul
  public maxValue;
  public currentValue;
  public baseRecover = 1
  constructor(parent: Character | Soul) {
    this.parent = parent;
    this.maxValue = this.parent.levelInfo[0].maxHealthPoint;
    this.currentValue = this.maxValue
  }
  recover() {
    this.compute(this.baseRecover)
  }
  public setMaxValue(value: number) {
    this.maxValue = value;
  }
  public setCurrentValue(value: number) {
    const realValue = Math.max(0, Math.min(value, this.maxValue));
    this.currentValue = realValue;
    if (this.currentValue === 0) {
      requestAnimationFrame(() => {
        this.parent.status.setState(StatusState.DEAD);
        eventHandler.dispatch({
          type: ActionType.dead,
          param: this.parent
        })
      }) 
    }
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
