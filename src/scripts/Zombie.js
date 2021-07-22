import Enemy from "./Enemy.js";
import { Vector2 } from "./utills.js";
import Animator from "./Animator.js";

export default class Zombie extends Enemy {
    static MOVEMENT_SPEED = 50;
    static ATTACK_RANGE = 200;
    static ATTACK_DELAY = 2;
    static HEALTH = 50;

    time = 0

    animator = new Animator(this.game, this);

    constructor(game, position) {
        super(game, game.assetsManager.cache['./src/assets/zombie_sprites/default.png'], 
            position, {width: 253, height: 216}, 
            Zombie.MOVEMENT_SPEED, Zombie.ATTACK_RANGE, Zombie.HEALTH, 0.7, 0);

        this.damage = 50;
        
        this.animator.addAnimation('idle', this.game.assetsManager.spriteSheets['zombieidle'], 0, 16, 0.016, true);
        this.animator.addAnimation('walk', this.game.assetsManager.spriteSheets['zombieWalk'], 0, 16, 0.016, true);
        this.animator.addAnimation('attack', this.game.assetsManager.spriteSheets['zombieAttack'], 0, 8, 0.035, true);
    }

    update() {
        super.update();

        if (Vector2.distance(this.pivot, this.player.pivot) <= this.attackRange && this.time >= Zombie.ATTACK_DELAY) {
            this.isAttacking = true;
            this.time = 0;
            
            setTimeout(() => {this.player.getDamage(this.damage)})

            setTimeout(() => {this.isAttacking = false}, 650)
        }
        else {
            this.time += this.game.engine.deltaTime;
        }


        this.animate();
    }

    animate() {
        if (this.isAttacking) {
            this.animator.playAnimation('attack')
        }
        else if (this.isWalking) {
            this.animator.playAnimation('walk');
        }
        else {
            this.animator.playAnimation('idle');
        }
    }
}