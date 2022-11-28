import { BaseEffect } from "../Entities/Effects";
import { BaseGoods } from "./BaseGoods";

export default class BaseEquipment extends BaseGoods {
  public aggressivity = 0;
  public percent = 1;
  public effects: BaseEffect[] = [];
}
