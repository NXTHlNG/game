import GameObject from "./GameObject.js";
import { Vector2 } from "./utills.js";

export default class Entity extends GameObject {
    velocity = new Vector2(0, 0);
    movementDirection = new Vector2(0, 0);
    lookDirection = new Vector2(0, 0);
    
    constructor(game, image, position, size, movementSpeed, health, rotation, friction = 0.7) {
        super(game, image, position, size, rotation);
        this.health = health;
        this.movementSpeed = movementSpeed;
        this.friction = friction;
    }

    update() {
        this.move();
    }

    move() {
        this.velocity.add(this.movementDirection.normalize());

        this.position.x += this.velocity.x * this.movementSpeed * this.game.engine.deltaTime;
        this.position.y += this.velocity.y * this.movementSpeed * this.game.engine.deltaTime;

        if (this.movementDirection.x || this.movementDirection.y) {
            this.movementDirection = new Vector2(0, 0);
        }

        if (Math.abs(this.velocity.x) > 0.0001 || Math.abs(this.velocity.y) > 0.0001) {
            this.velocity.mult(this.friction);
        } 
        else if (this.velocity.x || this.velocity.y) {
            this.velocity.x = 0;
            this.velocity.y = 0;
        }
    }

    getDamage(damage) {
        this.health -= damage;
        
        if (this.health <= 0 ) {
            this.destroy();
        }
    } 
}