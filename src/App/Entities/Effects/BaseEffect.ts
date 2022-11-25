export enum EffectStatus {
  NORMAL = "NORMAL",
  VERTIGO = "VERTIGO", //眩晕
}
export default class BaseEffect {
  public type: EffectStatus = EffectStatus.NORMAL;
  public keepTime = 0;
  
}
