import { HealthPoint } from "../HealthPoint";
import Character from "./Character";
import { SoulLevelInfo } from "../../constants";
import { PowerPoint } from "./PowerPoint";
export class Soul extends Character {
  constructor(public body: Character) {
    super();
    this.body = body;
    this.healthPoint = null;
    this.powerPoint = new PowerPoint(this);
  }
  public levelInfo = SoulLevelInfo;
  public getNextLevel() {
    const currentLevel = this.powerPoint.level!;
    const index = this.levelInfo.findIndex((item) => {
      return item.level === currentLevel;
    });
    const newInfo = this.levelInfo[index + 1];
    return newInfo;
  }
  public levelUp() {
    const bodyLevelIndex = this.body.getLevelIndex();
    const soulLevelIndex = this.getLevelIndex();
    if (soulLevelIndex > bodyLevelIndex) {
      throw new Error("灵魂境界不能高于本身境界两个大段");
    }
    this.powerPoint.levelUp();
  }
}
