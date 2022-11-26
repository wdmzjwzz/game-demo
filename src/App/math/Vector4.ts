import { EPSILON } from "./constant";
import { Vector3 } from "./Vector3";

export class Vector4 {
    public values = new Float32Array(4);
  
    public get x(): number {
      return this.values[0];
    }
  
    public get y(): number {
      return this.values[1];
    }
  
    public get z(): number {
      return this.values[2];
    }
  
    public get w(): number {
      return this.values[3];
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
  
    public set w(value: number) {
      this.values[3] = value;
    }
  
    public get Vector3(): Vector3 {
      return new Vector3([this.x, this.y, this.z]);
    }
  
    public get r(): number {
      return this.values[0];
    }
  
    public get g(): number {
      return this.values[1];
    }
  
    public get b(): number {
      return this.values[2];
    }
  
    public get a(): number {
      return this.values[3];
    }
  
    public set r(value: number) {
      this.values[0] = value;
    }
  
    public set g(value: number) {
      this.values[1] = value;
    }
  
    public set b(value: number) {
      this.values[2] = value;
    }
  
    public set a(value: number) {
      this.values[3] = value;
    }
  
    public constructor(values: number[] | null = null) {
      if (values) {
        this.x = values[0];
        this.y = values[1];
        this.z = values[2];
        this.w = values[3];
      } else {
        this.x = this.y = this.z = this.w = 0.0;
      }
    }
  
    public at(index: number): number {
      return this.values[index];
    }
  
    public reset(): void {
      this.x = 0;
      this.y = 0;
      this.z = 0;
      this.w = 0;
    }
  
    public copy(dest: Vector4 | null = null): Vector4 {
      if (!dest) dest = new Vector4();
  
      dest.x = this.x;
      dest.y = this.y;
      dest.z = this.z;
      dest.w = this.w;
  
      return dest;
    }
  
    public equals(vector: Vector4, threshold = EPSILON): boolean {
      if (Math.abs(this.x - vector.x) > threshold) return false;
  
      if (Math.abs(this.y - vector.y) > threshold) return false;
  
      if (Math.abs(this.z - vector.z) > threshold) return false;
  
      if (Math.abs(this.w - vector.w) > threshold) return false;
  
      return true;
    }
  
    static red: Vector4 = new Vector4([1.0, 0.0, 0.0, 1.0]);
    static green: Vector4 = new Vector4([0.0, 1.0, 0.0, 1.0]);
    static blue: Vector4 = new Vector4([0.0, 0.0, 1.0, 1.0]);
    static black: Vector4 = new Vector4([0, 0, 0, 0]);
  
    static v0: Vector4 = new Vector4();
    static v1: Vector4 = new Vector4();
    static v2: Vector4 = new Vector4();
  }