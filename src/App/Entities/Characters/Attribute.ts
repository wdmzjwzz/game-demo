export enum AttributeType {
    JIN = '金',
    MU = '木',
    SHUI = '水',
    HUO = '火',
    TU = '土',
    FEN = '风',
    LEI = '雷'
}
export enum AttributeLevel {
    LOW = "下品",
    MID = "中品",
    TOP = '上品',
    BEST = '极品'
}
const GrowthMap = new Map<AttributeLevel, number>([
    [AttributeLevel.LOW, 0.8],
    [AttributeLevel.MID, 1],
    [AttributeLevel.TOP, 1.2],
    [AttributeLevel.BEST, 1.5]
])
export class Attribute {
    constructor(public type = AttributeType.FEN, public level = AttributeLevel.LOW) {
    }
    overlying() {
        const growthSpeed = GrowthMap.get(this.level);
        return growthSpeed || 1;
    }
}