import { HealthPoint } from "../HealthPoint"; 
import Character from "./Character";
import { BaseEntity } from "../BaseEntity/BaseEntity";
export class Soul extends BaseEntity {
  constructor(public body: Character) {
    super();
    this.body = body;
  } 
  public healthPoint = new HealthPoint();
  public baseAggressivity = 0;
  public defensive = 1;

}
