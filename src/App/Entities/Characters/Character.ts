import { HealthPoint } from "../HealthPoint";
import { v4 as uuidv4 } from "uuid";
import Equipment from "../Equipments";
import { Status } from "./Status";
export default class Character {
  public id = uuidv4();
  public healthPoint: HealthPoint = new HealthPoint();
  public displayName: string | undefined;
  public status = new Status();
  public baseAggressivity = 0;
  public defensive = 1;
  public equipments: Equipment[] = [];
}
