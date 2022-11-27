export class HealthPoint {

  public maxValue = 100;
  public currentValue = 100;
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
    this.setCurrentValue(Number(realValue.toFixed()));
  }
}
