 
import BaseSkill, { EffectType } from "../../Entities/Skills/BaseSkill";

 
const CureSkillInfos = [
    {
        levelLabel: "入门",
        consume: 50,
        cureValue: 100
    },
    {
        levelLabel: "小成",
        consume: 50,
        cureValue: 200
    },
    {
        levelLabel: "大成",
        consume: 50,
        cureValue: 300
    },
    {
        levelLabel: "圆满",
        consume: 50,
        cureValue: 500
    },
]
export class CureSkill extends BaseSkill {

    constructor() {
        super() 
        this.name = "治疗术";
        this.type = EffectType.GiveCure;
        this.update()
    } 
    public cureValue: number = 0;
   
    update() {
        const info = CureSkillInfos[this.currentLevel]
        this.consume = info.consume;
        this.levelLabel = info.levelLabel
        this.cureValue = info.cureValue
    }
    getComputeValue(powerPoint: number) {
        if (powerPoint < this.consume) {
            return 0
        }
        return this.cureValue
    }
}