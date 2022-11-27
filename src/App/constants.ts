
export enum LevelLabel {
    LQ = '练气',
    ZJ = '筑基',
    JD = '金丹',
    YY = '元婴',
    HS = '化神'
}
interface BasePlayerInfo {
    level: LevelLabel,
    maxHealthPoint: number,
    maxPowerPoint: number,
    baseAggressivity: number,
    baseDefensive: number,
    baseGrowthValue?: number
}
export const LevelInfo: BasePlayerInfo[] = [
    {
        level: LevelLabel.LQ,
        maxHealthPoint: 500,
        maxPowerPoint: 500,
        baseAggressivity: 10,
        baseDefensive: 5,
        baseGrowthValue: 10
    },
    {
        level: LevelLabel.ZJ,
        maxHealthPoint: 1000,
        maxPowerPoint: 1000,
        baseAggressivity: 100,
        baseDefensive: 50,
        baseGrowthValue: 20
    },
    {
        level: LevelLabel.JD,
        maxHealthPoint: 3000,
        maxPowerPoint: 3000,
        baseAggressivity: 500,
        baseDefensive: 100,
        baseGrowthValue: 50
    },
    {
        level: LevelLabel.YY,
        maxHealthPoint: 10000,
        maxPowerPoint: 10000,
        baseAggressivity: 1000,
        baseDefensive: 800,
        baseGrowthValue: 100
    },
    {
        level: LevelLabel.HS,
        maxHealthPoint: 50000,
        maxPowerPoint: 50000,
        baseAggressivity: 5000,
        baseDefensive: 1000,
        baseGrowthValue: 300
    },
]
export const SoulLevelInfo: BasePlayerInfo[] = [
    {
        level: LevelLabel.LQ,
        maxHealthPoint: 500,
        maxPowerPoint: 500,
        baseAggressivity: 10,
        baseDefensive: 5,
        baseGrowthValue: 10
    },
    {
        level: LevelLabel.ZJ,
        maxHealthPoint: 1000,
        maxPowerPoint: 1000,
        baseAggressivity: 100,
        baseDefensive: 50,
        baseGrowthValue: 30
    },
    {
        level: LevelLabel.JD,
        maxHealthPoint: 3000,
        maxPowerPoint: 3000,
        baseAggressivity: 300,
        baseDefensive: 100,
        baseGrowthValue: 100
    },
    {
        level: LevelLabel.YY,
        maxHealthPoint: 10000,
        maxPowerPoint: 10000,
        baseAggressivity: 1000,
        baseDefensive: 400,
        baseGrowthValue: 300
    },
    {
        level: LevelLabel.HS,
        maxHealthPoint: 50000,
        maxPowerPoint: 50000,
        baseAggressivity: 3000,
        baseDefensive: 800,
        baseGrowthValue: 500
    },
]
