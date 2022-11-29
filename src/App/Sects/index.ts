import { BaseEntity } from "../Entities/BaseEntity/BaseEntity";
import { AttributeType } from "../Entities/Characters/Attribute";
import Character from "../Entities/Characters/Character";
export class Lingmai {
  constructor(public level: number, public type: AttributeType) {}
}
export class Sect extends BaseEntity {
  displayName = "";
  members: Character[] = [];
  master: Character | null = null;
  lingmais = [new Lingmai(1, AttributeType.HUO)];
  gongfas = []; 
}
