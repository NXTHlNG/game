import { clamp } from "./utills.js";

export default class Camera {
    constructor(target, maxX, maxY, width = 1920, height = 1080) {
        this.target = target;
        this.width = width;
        this.height = height;
        this.minX = 0;
        this.minY = 0;
        this.maxX = maxX - this.width;;
        this.maxY = maxY - this.height;
    }

    setMaxXMaxY(maxX, maxY) {
        this.maxX = maxX - this.width;
        this.maxY = maxY - this.height;
    }

    get x() {
        return this.target.position.x;
    }

    get y() {
        return this.target.position.y;
    }

    get position() {
        return {
            x: clamp(this.minX, this.target.position.x - this.width / 2, this.maxX),
            y: clamp(this.minY,this.target.position.y - this.height / 2, this.maxY)
        }
    } 
}