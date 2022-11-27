import Character, { Gender } from "../Entities/Characters/Character";
import { Soul } from "../Entities/Characters/Soul";

export class Player extends Character {
    public displayName = "王铁柱";
    public soul;
    constructor() {
        super() 
        this.gender = Gender.MALE;
        this.soul = new Soul(this)
    } 
}