import { BaseEntity } from "../Entities/BaseEntity/BaseEntity";
import Character from "../Entities/Characters/Character";
export enum Status {
  INUSE,
  IDLE,
}
export class BaseGoods extends BaseEntity {
  public parent: Character | null = null;
  public status: Status = Status.IDLE;
}
