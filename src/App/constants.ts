export enum LevelLabel {
    LQ = '练气',
    ZJ = '筑基',
    JD = '金丹',
    YY = '元婴',
    HS = '化神'
}
export const PowerLevelMap = new Map<number, LevelLabel>([
    [500, LevelLabel.LQ],
    [1000, LevelLabel.ZJ],
    [3000, LevelLabel.JD],
    [10000, LevelLabel.YY],
    [50000, LevelLabel.HS],
])