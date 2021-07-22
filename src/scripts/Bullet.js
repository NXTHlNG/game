import Enemy from "./Enemy.js";
import Entity from "./Entity.js";
import Flash from "./Flash.js";
import { Vector2 } from "./utills.js";

export default class Bullet extends Entity {
    static SPEED = 3000;
    static LIFE_TIME = 2;

    time = 0;

    constructor(game, weapon) {
        super(game, game.assetsManager.cache['./src/assets/bullet.png'], new Vector2(0, 0), {width: 50, height: 4}, Bullet.SPEED, 0, game.player.getRotation(), 1);
        this.position = weapon.getFirePoint(this.size);
        this.movementDirection = this.game.player.lookDirection;
        this.weapon = weapon;
        this.hasCollider = true;

        new Flash(game, weapon, this.rotation).instanciate();
    }

    update() {
        this.time += this.game.engine.deltaTime;

        if (this.time >= Bullet.LIFE_TIME) this.destroy();

        this.move();
    }

    onCollision() {
        if (this.collideTarget instanceof Enemy) {
            this.collideTarget.getDamage(this.weapon.damage);
            this.destroy();
        }
    }
}