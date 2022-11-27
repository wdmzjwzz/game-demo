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
    SOUL
}
export default class BaseSkill {
    public applyType: ApplyType = ApplyType.BODY
    public name: string = '';
    public type = EffectType.CauseDamage;
    public levelLabel = '';
    public consume = 0
    public currentLevel = 0
    getComputeValue(baseAggressivity: number) {
        return baseAggressivity
    }
    levelUp() {
        this.currentLevel++;
        this.update()
    }
    update() { 
    }
}
