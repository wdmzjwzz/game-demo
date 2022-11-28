import { Container } from "pixi.js";
import { BaseEntity } from "../Entities/BaseEntity/BaseEntity";

export class Scene extends BaseEntity {
    visible = false;
    container = new Container();
    setVisible(visible: boolean) {
        this.visible = visible
    }
    addChildren(entity: BaseEntity): void {
        // this.container.addChild(entity)
    }
    render() {
        this.children.forEach(child => {

        })
    }
} 