import { BaseEntity } from "../Entities/BaseEntity/BaseEntity";
import Character from "../Entities/Characters/Character";

export enum EffectType {
  //  造成伤害
  CauseDamage,
  //  给予治疗
  GiveCure,
  //  赋给buff
  AssignEffect,
}
export enum ApplyType {
  BODY,
  SOUL,
}
export default class BaseSkill extends BaseEntity {
  public applyType: ApplyType = ApplyType.BODY;
  public name: string = "";
  public type = EffectType.CauseDamage;
  public levelLabel = "";
  public consume = 0;
  public currentLevel = 0;
  public CD = 0;
  public disable = false;
  public owner: Character;
  private _timer = -1;
  constructor(owner: Character) {
    super();
    this.owner = owner;
  }
  active() {
    this.disable = true;
    this._timer = setTimeout(() => {
      this.disable = false;
      clearTimeout(this._timer);
      this._timer = -1;
    }, this.CD * 1000);
  }
  getComputeValue() {
    return 0;
  }
  levelUp() {
    this.currentLevel++;
    this.update();
  }
  update() {}
}
