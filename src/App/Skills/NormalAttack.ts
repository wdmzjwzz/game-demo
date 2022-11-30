import { BaseSkill } from ".";
import Character from "../Entities/Characters/Character";

export class NormalAttack extends BaseSkill {
  constructor(player: Character) {
    super(player);
    this.name = "普通攻击";
    this.attribute = null;
  }
  getComputeValue() {
    return this.owner.aggressivity;
  }
}
