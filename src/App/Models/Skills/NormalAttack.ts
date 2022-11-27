import { BaseSkill } from ".";

export class NormalAttack extends BaseSkill {
    constructor() {
        super()
        this.name = "普通攻击";
    }
    /**
     * 攻击力加成
     */
    aggressivityOverlying = 1;
    /**
     * 攻击力加成
    */
    defensiveOverlying = 1;
    /**
     * 
     * @param baseAggressivity 基础攻击力
     * @returns 经过技能加成之后的攻击力
     */
    getAggressivity(baseAggressivity: number) {
        return baseAggressivity * this.aggressivityOverlying
    }
}