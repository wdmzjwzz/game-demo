import BaseSkill, { EffectType } from "../../Entities/Skills/BaseSkill";
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
    constructor() {
        super() 
        this.name = "认真一拳";
        this.type = EffectType.CauseDamage;
        this.update()
    } 
     
    update() {
        const info = DamageSkillInfos[this.currentLevel]
        this.consume = info.consume;
        this.levelLabel = info.levelLabel
        this.damageValue = info.damageValue
    }
    getComputeValue(powerPoint: number) { 
        if (powerPoint < this.consume) {
            return 0
        }
        return this.damageValue
    }
}