export class Vector2 {
    public values = new Float32Array(2);

    public get x(): number {
        return this.values[0];
    }

    public get y(): number {
        return this.values[1];
    }

    public set x(value: number) {
        this.values[0] = value;
    }

    public set y(value: number) {
        this.values[1] = value;
    }

    public constructor(values: number[] | null = null) {
        if (values) {
            this.x = values[0];
            this.y = values[1];
        } else {
            this.x = this.y = 0;
        }
    }

    copy(dest: Vector2 | null = null): Vector2 {
        if (!dest) dest = new Vector2();
        dest.x = this.x;
        dest.y = this.y;
        return dest;
    }
}
