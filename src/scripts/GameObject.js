import GameComonent from "./GameComponent.js";
import { Vector2 } from "./utills.js";

export default class GameObject extends GameComonent {
    destroyed = false;
    instanciated = false;
    isColliding = false;
    hasCollider = false;
    collideTarget;
    collideSide;

    constructor(game, image, position, size, rotation) {
        super(game);
        this.image = image;
        this.position = position;
        this.size = size;
        this.rotation = rotation;
    }

    get pivot() {
        return new Vector2(this.position.x + Math.round(this.size.width / 2), this.position.y + Math.round(this.size.height / 2));
    }

    update() {
    }

    instanciate() {
        if (!this.instanciated) {
            this.instanciated = true;
            this.game.levelManager.getCurrentLevel().gameObjects.push(this);
            this.game.levelManager.getCurrentLevel().needCheck = true;
        }
    }

    checkCollision(gameObject) {
        if (this.hasCollider && gameObject.hasCollider) {
            this.isColliding = gameObject.isColliding = this.position.x + this.size.width >= gameObject.position.x && 
                                                        this.position.x <= gameObject.position.x + gameObject.size.width && 
                                                        this.position.y + this.size.height >= gameObject.position.y && 
                                                        this.position.y <= gameObject.position.y + gameObject.size.height;
            this.collideTarget = gameObject;
            gameObject.collideTarget = this;

            if (this.isColliding) {
                this.onCollision();
                gameObject.onCollision();
            }
        }        
    }

    onCollision() {

    }

    destroy() {
        this.destroyed = true;
        this.game.levelManager.getCurrentLevel().needCheck = true;
    }

    getPosition() {
        let a = JSON.parse(JSON.stringify(this.position));
        return a;
    }
    
    getRotation() {
        let a = JSON.parse(JSON.stringify(this.rotation));
        return a;
    }
}