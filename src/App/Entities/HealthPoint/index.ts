export class HealthPoint {
  constructor(maxValue = 0) {
    this.maxValue = maxValue;
    this.currentValue = maxValue;
  }
  public maxValue;
  public currentValue;
  setMaxValue(value: number) {
    this.maxValue = value;
  }
  setCurrentValue(value: number) {
    const realValue = Math.max(0, Math.min(value, this.maxValue));
    this.currentValue = realValue;
  }
  /**
   * compute(5) 表示当前生命值+5
   * compute(-5) 表示当前生命值-5
   * @param value
   */
  compute(value: number) {
    const realValue = value + this.currentValue;
    this.setCurrentValue(realValue);
  }
}
