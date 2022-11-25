export enum EffectStatus {
  NORMAL = "NORMAL",
  VERTIGO = "VERTIGO", //眩晕
  TRACEBACK = "TRACEBACK", //回溯时间
}
export default class BaseEffect {
  public type: EffectStatus = EffectStatus.NORMAL;
  public keepTime = 0;
  public CD = 0;
}
