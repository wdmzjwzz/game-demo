import Character from "../Entities/Characters/Character";
import BaseSkill, { EffectType } from "../Entities/Skills/BaseSkill";
const DamageSkillInfos = [
    {
        levelLabel: "入门",
        consume: 50,
        damageValue: 100
    },
    {
        levelLabel: "小成",
        consume: 50,
        damageValue: 200
    },
    {
        levelLabel: "大成",
        consume: 50,
        damageValue: 400
    },
    {
        levelLabel: "圆满",
        consume: 50,
        damageValue: 1000
    },
]
export class DamageSkill extends BaseSkill {
    public damageValue: number = 0;
    constructor(player: Character) {
        super(player)
        this.name = "认真一拳";
        this.type = EffectType.CauseDamage;
        this.update()
    }

    update() {
        const info = DamageSkillInfos[this.currentLevel]
        this.consume = info.consume + this.player.powerPoint.maxValue * 0.02;
        this.levelLabel = info.levelLabel
        this.damageValue = info.damageValue
    }
    getComputeValue() {
        return this.damageValue + this.player.powerPoint.maxValue * 0.1
    }
}