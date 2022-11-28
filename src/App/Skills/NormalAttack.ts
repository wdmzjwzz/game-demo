import { BaseSkill } from ".";
import Character from "../Entities/Characters/Character";

export class NormalAttack extends BaseSkill {
    public player: Character
    constructor(player: Character) {
        super(player)
        this.name = "普通攻击";
        this.player = player
    }
    getComputeValue() {
        return this.player.aggressivity + this.player.powerPoint.maxValue * 0.005
    }
}