import { EPSILON } from "./constant";

export class Vector3 {
    public values = new Float32Array(3);
  
    public get x(): number {
      return this.values[0];
    }
  
    public get y(): number {
      return this.values[1];
    }
  
    public get z(): number {
      return this.values[2];
    }
  
    public set x(value: number) {
      this.values[0] = value;
    }
  
    public set y(value: number) {
      this.values[1] = value;
    }
  
    public set z(value: number) {
      this.values[2] = value;
    }
  
    public constructor(values: number[] | null = null) {
      if (values !== null) {
        this.x = values[0];
        this.y = values[1];
        this.z = values[2];
      } else {
        this.x = this.y = this.z = 0;
      }
    }
  
    public at(index: number): number {
      return this.values[index];
    }
  
    public reset(x: number = 0, y: number = 0, z: number = 0): void {
      this.x = x;
      this.y = y;
      this.z = z;
    }
  
    public copy(dest: Vector3 | null = null): Vector3 {
      if (!dest) dest = new Vector3();
  
      dest.x = this.x;
      dest.y = this.y;
      dest.z = this.z;
  
      return dest;
    }
  
    public negate(dest: Vector3 | null = null): Vector3 {
      if (!dest) dest = this;
  
      dest.x = -this.x;
      dest.y = -this.y;
      dest.z = -this.z;
  
      return dest;
    }
  
    public equals(vector: Vector3, threshold = EPSILON): boolean {
      if (Math.abs(this.x - vector.x) > threshold) return false;
  
      if (Math.abs(this.y - vector.y) > threshold) return false;
  
      if (Math.abs(this.z - vector.z) > threshold) return false;
  
      return true;
    }
  
    public get length(): number {
      return Math.sqrt(this.length2);
    }
  
    public get length2(): number {
      let x = this.x,
        y = this.y,
        z = this.z;
  
      return x * x + y * y + z * z;
    }
  
    add(vector: Vector3): Vector3 {
      this.x += vector.x;
      this.y += vector.y;
      this.z += vector.z;
  
      return this;
    }
  
    subtract(vector: Vector3): Vector3 {
      this.x -= vector.x;
      this.y -= vector.y;
      this.z -= vector.z;
  
      return this;
    }
  
    public scale(value: number, dest: Vector3 | null = null): Vector3 {
      if (!dest) {
        dest = this;
      } else {
        this.copy(dest);
      }
  
      dest.x *= value;
      dest.y *= value;
      dest.z *= value;
  
      return dest;
    }
  
    public normalize(dest: Vector3 | null = null): Vector3 {
      if (!dest) dest = this;
  
      let length = this.length;
  
      if (length === 1) {
        return this;
      }
  
      if (length === 0) {
        dest.x = 0;
        dest.y = 0;
        dest.z = 0;
  
        return dest;
      }
  
      length = 1.0 / length;
  
      dest.x *= length;
      dest.y *= length;
      dest.z *= length;
  
      return dest;
    }
  
    public normalize2(): number {
      let length = this.length;
      let len: number = 1.0 / length;
      this.x *= len;
      this.y *= len;
      this.z *= len;
      return length;
    }
  
    public static multiplyScalar(
      vector: Vector3,
      value: number,
      dest: Vector3 | null = null
    ): Vector3 {
      if (!dest) dest = new Vector3();
      dest.x *= value;
      dest.y *= value;
      dest.z *= value;
      return dest;
    }
  
    public static cross(
      vector: Vector3,
      vector2: Vector3,
      dest: Vector3 | null = null
    ): Vector3 {
      if (!dest) dest = new Vector3();
  
      let x = vector.x,
        y = vector.y,
        z = vector.z;
  
      let x2 = vector2.x,
        y2 = vector2.y,
        z2 = vector2.z;
  
      dest.x = y * z2 - z * y2;
      dest.y = z * x2 - x * z2;
      dest.z = x * y2 - y * x2;
  
      return dest;
    }
  
    public static dot(vector: Vector3, vector2: Vector3): number {
      let x = vector.x,
        y = vector.y,
        z = vector.z;
  
      let x2 = vector2.x,
        y2 = vector2.y,
        z2 = vector2.z;
  
      return x * x2 + y * y2 + z * z2;
    }
  
    public static sum(
      vector: Vector3,
      vector2: Vector3,
      dest: Vector3 | null = null
    ): Vector3 {
      if (!dest) dest = new Vector3();
  
      dest.x = vector.x + vector2.x;
      dest.y = vector.y + vector2.y;
      dest.z = vector.z + vector2.z;
  
      return dest;
    }
  
    public static difference(
      vector: Vector3,
      vector2: Vector3,
      dest: Vector3 | null = null
    ): Vector3 {
      if (!dest) dest = new Vector3();
  
      dest.x = vector.x - vector2.x;
      dest.y = vector.y - vector2.y;
      dest.z = vector.z - vector2.z;
  
      return dest;
    }
  
    static readonly up = new Vector3([0, 1, 0]);
    static readonly down = new Vector3([0, -1, 0]);
    static readonly right = new Vector3([1, 0, 0]);
    static readonly left = new Vector3([-1, 0, 0]);
    static readonly forward = new Vector3([0, 0, 1]);
    static readonly backward = new Vector3([0, 0, -1]);
  
    static readonly zero = new Vector3([0, 0, 0]);
  
    static v0 = new Vector3([0, 0, 0]);
    static v1 = new Vector3([0, 0, 0]);
    static v2 = new Vector3([0, 0, 0]);
  }