import Character, { Gender } from "../Entities/Characters/Character";
import { Soul } from "../Entities/Characters/Soul";
import BaseSkill, { ApplyType, EffectType } from "../Skills/BaseSkill";
import { CureSkill, DamageSkill, NormalAttack } from "../Skills";
import { Package } from "./Package";

export class Player extends Character {
  public displayName = "王铁柱";
  public soul;
  public isSelf = true;
  public package = new Package(this);
  constructor() {
    super();
    this.gender = Gender.MALE;
    this.soul = new Soul(this);
    const normalAttack = new NormalAttack(this);
    const cureSkill = new CureSkill(this);
    const renzhenyiquan = new DamageSkill(this);
    this.skills.push(normalAttack, cureSkill, renzhenyiquan);
  }

  attack(skill: BaseSkill, target: Character) {
    if (skill.disable) {
      return;
    }
    const consumePowerPoint = skill.consume;
    if (this.powerPoint.currentValue < consumePowerPoint) {
      return;
    }
    this.powerPoint.compute(-consumePowerPoint);
    target.attacked(skill, this);
  }
  attacked(skill: BaseSkill, source: Character) {
    if (skill.type === EffectType.GiveCure) {
      const value = skill.getComputeValue();
      this.healthPoint?.compute(value);
      return;
    }

    if (skill.applyType === ApplyType.BODY) {
      const aggressivity = skill.getComputeValue();
      const defensive = this.defensive;
      const heartPoint = aggressivity - defensive;
      if (heartPoint > 0) {
        this.healthPoint?.compute(-heartPoint);
      }
    }
    if (skill.applyType === ApplyType.SOUL) {
      const aggressivity = skill.getComputeValue();
      const defensive = this.soul.defensive;
      const heartPoint = aggressivity - defensive;
      if (heartPoint > 0) {
        this.soul.powerPoint.compute(-heartPoint);
      }
    }
  }
}
