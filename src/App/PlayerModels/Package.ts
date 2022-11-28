import Character from "../Entities/Characters/Character";
import { BaseGoods, Status } from "../Equipments/BaseGoods";

export class Package {
  constructor(master: Character) {
    this.master = master;
  }
  master: Character;
  goodsList: BaseGoods[] = [];
  getGoods(id: string) {
    return this.goodsList.find((g) => g.id === id);
  }
  add() {}
  remove(id: string) {
    const goods = this.goodsList.find((g) => g.id === id);
    const goodsIndex = this.goodsList.findIndex((g) => g.id === id);
    if (!goods) return;

    if (goods.status === Status.INUSE) {
      goods.parent?.removeChildren(goods);
      this.goodsList.splice(goodsIndex, 1);
    }
  }

  takeOff(id: string) {
    const goods = this.getGoods(id);
    if (!goods || goods.status !== Status.INUSE) {
      return;
    }
    this.master.removeChildren(goods);
    goods.parent = null;
    goods.status = Status.IDLE;
  }
  wear(id: string) {
    const goods = this.getGoods(id);
    if (!goods) {
      return;
    }
    this.master.addChildren(goods);
    goods.parent = this.master;
    goods.status = Status.INUSE;
  }
  clear() {}
  pop(id: string) {
    const goodsIndex = this.goodsList.findIndex((g) => g.id === id);
    return this.goodsList.splice(goodsIndex, 1)[0];
  }
}
