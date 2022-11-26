import { v4 as uuidv4 } from "uuid";
export class BaseEntity {
    public id = uuidv4();
    public parent: BaseEntity | null = null;
    public children: BaseEntity[] = []
    addChildren(entity: BaseEntity) {
        const item = this.children.find(child => child.id === entity.id);
        if (item) {
            throw new Error("对象已存在");
        }
        this.children.push(entity)
        entity.parent = this;
    }

    removeChildren(entity: BaseEntity) {
        const index = this.children.findIndex(item => item.id === entity.id);
        if (index !== -1) {
            this.children.splice(index, 1)
        }
    }

    clear() {
        this.children = []
    }
}