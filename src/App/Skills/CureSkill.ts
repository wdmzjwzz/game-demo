
import Character from "../Entities/Characters/Character";
import BaseSkill, { EffectType } from "../Entities/Skills/BaseSkill";


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

    constructor(player: Character) {
        super(player)
        this.name = "治疗术";
        this.type = EffectType.GiveCure;
        this.update()
    }
    public cureValue: number = 0;

    update() {
        const info = CureSkillInfos[this.currentLevel]
        this.consume = info.consume + this.player.powerPoint.maxValue * 0.02;
        this.levelLabel = info.levelLabel
        this.cureValue = info.cureValue
    }
    getComputeValue() {
        return this.cureValue + this.player.powerPoint.maxValue * 0.1
    }
}