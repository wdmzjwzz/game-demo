import { EPSILON } from "./constant";
import { Matrix4 } from "./Matrix4";
import { Vector3 } from "./Vector3";

export class quat {
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

    public constructor() {
        this.setIdentity();
    }

    public at(index: number): number {
        return this.values[index];
    }

    public reset(): void {
        for (let i = 0; i < 4; i++) {
            this.values[i] = 0;
        }
    }

    public copy(dest: quat | null = null): quat {
        if (!dest) dest = new quat();

        for (let i = 0; i < 4; i++) {
            dest.values[i] = this.values[i];
        }

        return dest;
    }

    public roll(): number {
        const x = this.x,
            y = this.y,
            z = this.z,
            w = this.w;

        return Math.atan2(2.0 * (x * y + w * z), w * w + x * x - y * y - z * z);
    }

    public pitch(): number {
        const x = this.x,
            y = this.y,
            z = this.z,
            w = this.w;

        return Math.atan2(2.0 * (y * z + w * x), w * w - x * x - y * y + z * z);
    }

    public yaw(): number {
        return Math.asin(2.0 * (this.x * this.z - this.w * this.y));
    }

    public equals(vector: quat, threshold = EPSILON): boolean {
        for (let i = 0; i < 4; i++) {
            if (Math.abs(this.values[i] - vector.at(i)) > threshold) return false;
        }

        return true;
    }

    public setIdentity(): quat {
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.w = 1;

        return this;
    }

    public calculateW(): quat {
        const x = this.x,
            y = this.y,
            z = this.z;

        this.w = -Math.sqrt(Math.abs(1.0 - x * x - y * y - z * z));

        return this;
    }

    public static dot(q1: quat, q2: quat): number {
        return q1.x * q2.x + q1.y * q2.y + q1.z * q2.z + q1.w * q2.w;
    }

    public inverse(): quat {
        const dot = quat.dot(this, this);

        if (!dot) {
            this.setIdentity();
            return this;
        }

        const invDot = dot ? 1.0 / dot : 0;

        this.x *= -invDot;
        this.y *= -invDot;
        this.z *= -invDot;
        this.w *= invDot;

        return this;
    }

    public conjugate(): quat {
        this.values[0] *= -1;
        this.values[1] *= -1;
        this.values[2] *= -1;

        return this;
    }

    public length(): number {
        const x = this.x,
            y = this.y,
            z = this.z,
            w = this.w;

        return Math.sqrt(x * x + y * y + z * z + w * w);
    }

    public normalize(dest: quat | null = null): quat {
        if (!dest) dest = this;

        const x = this.x,
            y = this.y,
            z = this.z,
            w = this.w;

        let length = Math.sqrt(x * x + y * y + z * z + w * w);

        if (!length) {
            dest.x = 0;
            dest.y = 0;
            dest.z = 0;
            dest.w = 0;

            return dest;
        }

        length = 1 / length;

        dest.x = x * length;
        dest.y = y * length;
        dest.z = z * length;
        dest.w = w * length;

        return dest;
    }

    public add(other: quat): quat {
        for (let i = 0; i < 4; i++) {
            this.values[i] += other.at(i);
        }

        return this;
    }

    // 这个是左到右结合 this.cross.other
    public multiply(other: quat): quat {
        const q1x = this.values[0],
            q1y = this.values[1],
            q1z = this.values[2],
            q1w = this.values[3];

        const q2x = other.x,
            q2y = other.y,
            q2z = other.z,
            q2w = other.w;

        this.x = q1x * q2w + q1w * q2x + q1y * q2z - q1z * q2y;
        this.y = q1y * q2w + q1w * q2y + q1z * q2x - q1x * q2z;
        this.z = q1z * q2w + q1w * q2z + q1x * q2y - q1y * q2x;
        this.w = q1w * q2w - q1x * q2x - q1y * q2y - q1z * q2z;

        return this;
    }

    public multiplyVector3(
        vector: Vector3,
        dest: Vector3 | null = null
    ): Vector3 {
        if (!dest) dest = new Vector3();

        const x = vector.x,
            y = vector.y,
            z = vector.z;

        const qx = this.x,
            qy = this.y,
            qz = this.z,
            qw = this.w;

        //
        const ix = qw * x + qy * z - qz * y,
            iy = qw * y + qz * x - qx * z,
            iz = qw * z + qx * y - qy * x,
            iw = -qx * x - qy * y - qz * z;

        dest.x = ix * qw + iw * -qx + iy * -qz - iz * -qy;
        dest.y = iy * qw + iw * -qy + iz * -qx - ix * -qz;
        dest.z = iz * qw + iw * -qz + ix * -qy - iy * -qx;

        return dest;
    }

    public toMatrix4(dest: Matrix4 | null = null): Matrix4 {
        if (!dest) dest = new Matrix4();

        const x = this.x,
            y = this.y,
            z = this.z,
            w = this.w,
            x2 = x + x,
            y2 = y + y,
            z2 = z + z,
            xx = x * x2,
            xy = x * y2,
            xz = x * z2,
            yy = y * y2,
            yz = y * z2,
            zz = z * z2,
            wx = w * x2,
            wy = w * y2,
            wz = w * z2;

        dest.set([
            1 - (yy + zz),
            xy + wz,
            xz - wy,
            0,

            xy - wz,
            1 - (xx + zz),
            yz + wx,
            0,

            xz + wy,
            yz - wx,
            1 - (xx + yy),
            0,

            0,
            0,
            0,
            1,
        ]);

        return dest;
    }

    public static sum(q1: quat, q2: quat, dest: quat | null = null): quat {
        if (!dest) dest = new quat();

        dest.x = q1.x + q2.x;
        dest.y = q1.y + q2.y;
        dest.z = q1.z + q2.z;
        dest.w = q1.w + q2.w;

        return dest;
    }

    public static product(q1: quat, q2: quat, dest: quat | null = null): quat {
        if (!dest) dest = new quat();

        let q1x = q1.x,
            q1y = q1.y,
            q1z = q1.z,
            q1w = q1.w,
            q2x = q2.x,
            q2y = q2.y,
            q2z = q2.z,
            q2w = q2.w;

        dest.x = q1x * q2w + q1w * q2x + q1y * q2z - q1z * q2y;
        dest.y = q1y * q2w + q1w * q2y + q1z * q2x - q1x * q2z;
        dest.z = q1z * q2w + q1w * q2z + q1x * q2y - q1y * q2x;
        dest.w = q1w * q2w - q1x * q2x - q1y * q2y - q1z * q2z;

        return dest;
    }

    public static cross(q1: quat, q2: quat, dest: quat | null = null): quat {
        if (!dest) dest = new quat();

        const q1x = q1.x,
            q1y = q1.y,
            q1z = q1.z,
            q1w = q1.w,
            q2x = q2.x,
            q2y = q2.y,
            q2z = q2.z,
            q2w = q2.w;

        dest.x = q1w * q2z + q1z * q2w + q1x * q2y - q1y * q2x;
        dest.y = q1w * q2w - q1x * q2x - q1y * q2y - q1z * q2z;
        dest.z = q1w * q2x + q1x * q2w + q1y * q2z - q1z * q2y;
        dest.w = q1w * q2y + q1y * q2w + q1z * q2x - q1x * q2z;

        return dest;
    }

    public static shortMix(
        q1: quat,
        q2: quat,
        time: number,
        dest: quat | null = null
    ): quat {
        if (!dest) dest = new quat();

        if (time <= 0.0) {
            q1.copy(q1);

            return dest;
        } else if (time >= 1.0) {
            q2.copy(dest);

            return dest;
        }

        let cos = quat.dot(q1, q2),
            q2a = q2.copy();

        if (cos < 0.0) {
            q2a.inverse();
            cos = -cos;
        }

        let k0: number, k1: number;

        if (cos > 0.9999) {
            k0 = 1 - time;
            k1 = 0 + time;
        } else {
            const sin: number = Math.sqrt(1 - cos * cos);
            const angle: number = Math.atan2(sin, cos);

            const oneOverSin: number = 1 / sin;

            k0 = Math.sin((1 - time) * angle) * oneOverSin;
            k1 = Math.sin((0 + time) * angle) * oneOverSin;
        }

        dest.x = k0 * q1.x + k1 * q2a.x;
        dest.y = k0 * q1.y + k1 * q2a.y;
        dest.z = k0 * q1.z + k1 * q2a.z;
        dest.w = k0 * q1.w + k1 * q2a.w;

        return dest;
    }

    public static mix(
        q1: quat,
        q2: quat,
        time: number,
        dest: quat | null = null
    ): quat {
        if (!dest) dest = new quat();

        const cosHalfTheta = q1.x * q2.x + q1.y * q2.y + q1.z * q2.z + q1.w * q2.w;

        if (Math.abs(cosHalfTheta) >= 1.0) {
            q1.copy(dest);
            return dest;
        }

        const halfTheta = Math.acos(cosHalfTheta),
            sinHalfTheta = Math.sqrt(1.0 - cosHalfTheta * cosHalfTheta);

        if (Math.abs(sinHalfTheta) < 0.001) {
            dest.x = q1.x * 0.5 + q2.x * 0.5;
            dest.y = q1.y * 0.5 + q2.y * 0.5;
            dest.z = q1.z * 0.5 + q2.z * 0.5;
            dest.w = q1.w * 0.5 + q2.w * 0.5;

            return dest;
        }

        const ratioA = Math.sin((1 - time) * halfTheta) / sinHalfTheta,
            ratioB = Math.sin(time * halfTheta) / sinHalfTheta;

        dest.x = q1.x * ratioA + q2.x * ratioB;
        dest.y = q1.y * ratioA + q2.y * ratioB;
        dest.z = q1.z * ratioA + q2.z * ratioB;
        dest.w = q1.w * ratioA + q2.w * ratioB;

        return dest;
    }

    static fromAxis(
        axis: Vector3,
        angle: number,
        dest: quat | null = null
    ): quat {
        if (!dest) dest = new quat();

        angle *= 0.5;
        const sin = Math.sin(angle);

        dest.x = axis.x * sin;
        dest.y = axis.y * sin;
        dest.z = axis.z * sin;
        dest.w = Math.cos(angle);

        return dest;
    }

    static identity = new quat().setIdentity();
    static q0 = new quat();
    static q1 = new quat();
    static q2 = new quat();
}
