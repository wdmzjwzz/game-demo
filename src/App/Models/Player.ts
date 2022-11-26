import Character, { Gender } from "../Entities/Characters/Character";
import { Soul } from "../Entities/Characters/Soul";

export class Player extends Character {
    displayName = "王铁柱";

    constructor() {
        super()
        this.healthPoint.setMaxValue(500);
        this.powerPoint.setMaxValue(0)
        this.gender = Gender.MALE;
        this.baseAggressivity = 60;
        this.defensive = 10;
        this.soul = new Soul(this)
    }
}