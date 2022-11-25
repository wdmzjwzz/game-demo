import { HealthPoint } from "../HealthPoint";
import { v4 as uuidv4 } from "uuid";
import Character from "./Character";
export class Soul {
  constructor(public body: Character) {
    this.body = body;
  }
  public id = uuidv4();
  public healthPoint = new HealthPoint();
  public baseAggressivity = 0;
  public defensive = 1;
  
}
