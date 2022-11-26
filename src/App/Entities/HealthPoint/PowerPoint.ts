import { HealthPoint } from ".";
export interface Level {
    value: number;
    displayName: string
}
export class PowerPoint extends HealthPoint {
    get level(): Level {
        return this.computeLevel()
    }
    private computeLevel() {
        if (this.maxValue < 500) {
            return {
                value: 1,
                displayName: "练气"
            }
        }
        if (this.maxValue < 1000) {
            return {
                value: 2,
                displayName: "筑基"
            }
        }
        if (this.maxValue < 2000) {
            return {
                value: 3,
                displayName: "金丹"
            }
        }
        if (this.maxValue < 4000) {
            return {
                value: 4,
                displayName: "元婴"
            }
        }
        if (this.maxValue < 8000) {
            return {
                value: 5,
                displayName: "化神"
            }
        }
        if (this.maxValue < 20000) {
            return {
                value: 6,
                displayName: "返虚"
            }
        }
        if (this.maxValue < 50000) {
            return {
                value: 7,
                displayName: "合体"
            }
        }
        if (this.maxValue < 80000) {
            return {
                value: 8,
                displayName: "渡劫"
            }
        }
        if (this.maxValue < 200000) {
            return {
                value: 9,
                displayName: "地仙"
            }
        }
        return {
            value: 10,
            displayName: "天仙"
        }
    }
}