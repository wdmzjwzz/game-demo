import { HealthPoint } from "../HealthPoint";
import { BaseEquipment } from "../Equipments";
import { Status } from "./Status";
import { BaseEntity } from "../BaseEntity/BaseEntity";
import { PowerPoint } from "./PowerPoint";
import { Attribute } from "./Attribute";
import { LevelInfo } from "../../constants";
import BaseSkill from "../Skills/BaseSkill";
export enum Gender {
  MALE = "MALE",
  FAMALE = "FAMALE",
  NEUTRAL = "NEUTRAL"
}

export default class Character extends BaseEntity {
  public displayName: string | undefined;

  public equipments: BaseEquipment[] = [];
  public gender = Gender.NEUTRAL;
  public levelInfo = LevelInfo;
  // 外部因素修炼加成
  public outerbuff = 1;
 
  public powerPoint = new PowerPoint(this)
  public healthPoint = new HealthPoint(this);
  public status = new Status();
  public attributes: Attribute[] = [new Attribute()]
  public skills: BaseSkill[] = [];
  get level() {
    return this.powerPoint.level
  }
  get defensive() {
    const currentLevel = this.powerPoint.level!
    const levelInfo = this.levelInfo.find((item) => {
      return item.level === currentLevel
    })
    return levelInfo?.baseDefensive || 0
  }
  get aggressivity() {
    const currentLevel = this.powerPoint.level!
    const levelInfo = this.levelInfo.find((item) => {
      return item.level === currentLevel
    })
    return levelInfo?.baseAggressivity || 0
  }
  public levelUp() {
    this.powerPoint.levelUp()
    this.healthPoint.levelUp();
  }
  public getNextLevel() {
    const currentLevel = this.powerPoint.level!
    const index = this.levelInfo.findIndex((item) => {
      return item.level === currentLevel
    })
    const newInfo = this.levelInfo[index + 1];
    return newInfo
  }
  public getLevelIndex() {
    const currentLevel = this.powerPoint.level!
    const index = this.levelInfo.findIndex((item) => {
      return item.level === currentLevel
    })
    return index
  }
  public getGrowthSpeed() {
    const totalSpeed = this.attributes.reduce((pre, cur, index) => {
      const total = pre + cur.overlying();
      return total
    }, 1)
    const length = this.attributes.length
    const growthSpeed = totalSpeed / length * Math.pow(0.9, length - 1)
    return growthSpeed * this.outerbuff
  }
  attack(skill: BaseSkill, target: Character) {

  }
  attacked(skill: BaseSkill, source: Character) {

  }
}
