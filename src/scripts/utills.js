export class Vector2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    get length() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    static add(vector_1, vector_2) {
        if (vector_1 instanceof Vector2 && vector_2 instanceof Vector2) {
            return new Vector2(vector_1.x + vector_2.x, vector_1.y + vector_2.y);
        }
    }

    static substract(vector_1, vector_2) {
        if (vector_1 instanceof Vector2 && vector_2 instanceof Vector2) {
            return new Vector2(vector_1.x - vector_2.x, vector_1.y - vector_2.y);
        }
    }

    static distance(vector_1, vector_2) {
        if (vector_1 instanceof Vector2 && vector_2 instanceof Vector2) {
            return Math.sqrt((vector_1.x - vector_2.x) ** 2 + (vector_1.y - vector_2.y) ** 2);
        }
    }

    static mult(vector, a) {
        return new Vector2(vector.x *= a, vector.y *= a);
        
    }

    static rotate(point_1, point_2, angle) {
        let px = point_2.x - point_1.x;
        let py = point_2.y - point_1.y;

        let xnew = px * Math.cos(angle) - py * Math.sin(angle);
        let ynew = px * Math.sin(angle) + py * Math.cos(angle);

        px = xnew + point_1.x;
        py = ynew + point_1.y;

        return new Vector2(px, py);
    }

    normalize() {
        if (this.length) {
            return new Vector2(this.x / this.length, this.y / this.length);
        }
        else return new Vector2(0, 0);
    }

    add(vector) {
        if (vector instanceof Vector2) {
            this.x += vector.x;
            this.y += vector.y;
        }
    }

    substract(vector) {
        if (vector instanceof Vector2) {
            this.x -= vector.x;
            this.y -= vector.y;
        }
    }

    mult(a) {
        this.x *= a;
        this.y *= a;
    }
}

export function clamp(min, value, max) {
    if (value < min) return min;
    else if (value > max) return max;
    else return value;
}

