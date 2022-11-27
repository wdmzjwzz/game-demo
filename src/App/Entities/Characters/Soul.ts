import { HealthPoint } from "../HealthPoint";
import Character from "./Character"; 
import { SoulLevelInfo } from "../../constants";
import { PowerPoint } from "./PowerPoint";
export class Soul extends Character {
  constructor(public body: Character) {
    super();
    this.body = body;
    this.healthPoint = new HealthPoint(this);
    this.powerPoint = new PowerPoint(this);
  }  
  public levelInfo = SoulLevelInfo;
  public getNextLevel() {
    const currentLevel = this.powerPoint.level!
    const index = this.levelInfo.findIndex((item) => {
      return item.level === currentLevel
    })
    const newInfo = this.levelInfo[index + 1];
    return newInfo
  }
  
}
