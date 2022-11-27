import { HealthPoint } from "../HealthPoint";
import { BaseEquipment } from "../Equipments";
import { Status } from "./Status";
import { Soul } from "./Soul";
import { BaseEntity } from "../BaseEntity/BaseEntity";
import { PowerPoint } from "../HealthPoint/PowerPoint";
import { Attribute } from "./Attribute";
export enum Gender {
  MALE = "MALE",
  FAMALE = "FAMALE",
  NEUTRAL = "NEUTRAL"
}

export default class Character extends BaseEntity {

  public powerPoint = new PowerPoint()
  public healthPoint = new HealthPoint();
  public soul = new Soul(this);
  public displayName: string | undefined;
  public status = new Status();
  public baseAggressivity = 0;
  public defensive = 1;
  public equipments: BaseEquipment[] = [];
  public gender = Gender.NEUTRAL;
  public attributes: Attribute[] = [new Attribute()]
}
