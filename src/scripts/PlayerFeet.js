import Animator from "./Animator.js";
import GameObject from "./GameObject.js";

export default class PlayerFeet extends GameObject {
    animator = new Animator(this.game, this);

    constructor(game, player) {
        super(game, game.assetsManager.cache['./src/assets/player_sprites/feet_idle.png'], {x: 0, y: 0}, {width: 132, height: 155}, 0);
        this.player = player;

        this.animator.addAnimation('idle', this.game.assetsManager.spriteSheets['feetidle'], 0, 0, 0, true);
        this.animator.addAnimation('run', this.game.assetsManager.spriteSheets['feetRun'], 0, 19, 0.016, true);       
        this.animator.addAnimation('strafeLeft', this.game.assetsManager.spriteSheets['feetStrafeLeft'], 0, 19, 0.016, true);       
        this.animator.addAnimation('strafeRight', this.game.assetsManager.spriteSheets['feetStrafeRight'], 0, 19, 0.016, true);
    }

    update() {
        this.input();
        this.animate();
    }

    input() {
        this.rotation = this.player.rotation;
        this.position.x = this.player.pivot.x - (this.size.width / 2);
        this.position.y = this.player.pivot.y - (this.size.height / 2);
    }

    animate() {
        if (this.player.isMoving) {
            if ((this.player.angle < -Math.PI / 4 && this.player.angle > -Math.PI * 3 / 4) ||
                (this.player.angle > Math.PI * 5 / 4 && this.player.angle < Math.PI * 7 / 4)) {
                this.animator.playAnimation('strafeRight');
            } else if ((this.player.angle > Math.PI / 4 && this.player.angle < Math.PI * 3 / 4) ||
                (this.player.angle < -Math.PI * 5 / 4 && this.player.angle > -Math.PI * 7 / 4)) {
                    this.animator.playAnimation('strafeLeft');
            } else {
                this.animator.playAnimation('run');
            }
        }
        else {
            this.animator.playAnimation('idle');
        }
    }

    instanciate() {
        if (!this.instanciated) {
            this.instanciated = true;
            this.game.levelManager.getCurrentLevel().gameObjects.unshift(this);
            this.game.levelManager.getCurrentLevel().needCheck = true;
        }
    }
}