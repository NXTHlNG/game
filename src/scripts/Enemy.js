import Entity from "./Entity.js";
import { Vector2 } from "./utills.js";

export default class Enemy extends Entity {
    isWalking = false;
    isAttacking = false;

    constructor(game, image, position, size, movementSpeed, attackRange, health, friction = 0.7, rotation = 0) {
        super(game, image, position, size, movementSpeed, health, rotation, friction);
        this.player = this.game.player;
        this.attackRange = attackRange;

        this.hasCollider = true;
    }

    update() {
        this.input();
        this.move();
    }

    input() {
        this.lookDirection = Vector2.substract(this.player.position, this.pivot);
        this.rotation = Math.atan2(this.lookDirection.y, this.lookDirection.x);

        if (Vector2.distance(this.pivot, this.player.pivot) > this.attackRange) {
            this.movementDirection = this.lookDirection;
            this.isWalking = true;
        }
        else {
            this.movementDirection = new Vector2(0, 0);
            this.isWalking = false;
        }
    }
}