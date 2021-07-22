import GameObject from "./GameObject.js";
import { Vector2 } from "./utills.js";

export default class Flash extends GameObject {
    constructor(game, weapon, rotation) {
        super(game, game.assetsManager.cache['./src/assets/flash.png'], new Vector2(0, 0), {width: 30, height: 50}, rotation);
        this.position = weapon.getFirePoint(this.size);
        setTimeout(() => this.destroy(), 10);
    }
}