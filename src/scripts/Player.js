import { Controller, Button } from './Controller.js';
import { Vector2 } from "./utills.js";
import Entity from "./Entity.js";
import Animator from './Animator.js';
import PlayerFeet from './PlayerFeet.js';
import Weapon from './Weapon.js';

export default class Player extends Entity {
    static MOVEMENT_SPEED = 150;
    static HEALTH = 200;

    lookDirection;
    angle;
    isMoving = false;
    isShooting = false;
    
    weapons = {
        'pistol': new Weapon(this.game, new Vector2(125, 55), 10, 0.6, 10, 0.8),
        'riffle': new Weapon(this.game, new Vector2(120, 50), 5, 0.1, 30, 0.8)
    }

    currentWeapon = 'pistol';

    playerController = new Controller(this.game, {
        w: new Button('KeyW'),
        a: new Button('KeyA'),
        s: new Button('KeyS'),
        d: new Button('KeyD'),
        r: new Button('KeyR'),
        d1: new Button('Digit1'),
        d2: new Button('Digit2'),
        leftMB: new Button('0'),
        rightMB: new Button('2')
    });

    animator = new Animator(this.game, this);

    constructor(game) {
        super(game, game.assetsManager.cache['./src/assets/player_sprites/default.png'], new Vector2(1500, 1000), {width: 253, height: 216}, Player.MOVEMENT_SPEED, Player.HEALTH, 0, 0.7);

        this.feet = new PlayerFeet(this.game, this);
        this.hasCollider = true;
        
        this.animator.addAnimation('pistolidle', this.game.assetsManager.spriteSheets['pistolidle'], 0, 19, 0.02, true);
        this.animator.addAnimation('pistolMove', this.game.assetsManager.spriteSheets['pistolMove'], 0, 19, 0.02, true);
        this.animator.addAnimation('pistolShoot', this.game.assetsManager.spriteSheets['pistolShoot'], 0, 2, 0.2, true);
        this.animator.addAnimation('pistolReload', this.game.assetsManager.spriteSheets['pistolReload'], 0, 14, 0.02, true);
        this.animator.addAnimation('riffleidle', this.game.assetsManager.spriteSheets['riffleidle'], 0, 19, 0.02, true);
        this.animator.addAnimation('riffleMove', this.game.assetsManager.spriteSheets['riffleMove'], 0, 19, 0.02, true);
        this.animator.addAnimation('riffleShoot', this.game.assetsManager.spriteSheets['riffleShoot'], 0, 2, 0.05, true);
        this.animator.addAnimation('riffleReload', this.game.assetsManager.spriteSheets['riffleReload'], 0, 14, 0.02, true);
        this.animator.defaultAnimation = 'pistolidle';

    }

    update() {
        this.playerController.updateMousePosition();
        this.input();
        this.move();
        this.animate();
    }

    input() {
        if (this.playerController.buttons.w.active) {
            this.movementDirection.add(new Vector2(0, -1));
        }
        
        if (this.playerController.buttons.a.active) {
            this.movementDirection.add(new Vector2(-1, 0));
        }

        if (this.playerController.buttons.s.active) {
            this.movementDirection.add(new Vector2(0, 1));
        }

        if (this.playerController.buttons.d.active) {
            this.movementDirection.add(new Vector2(1, 0));
        }

        if (this.playerController.buttons.r.active) {
            this.isShooting = true;
            this.weapons[this.currentWeapon].reload();
        }

        if (this.playerController.buttons.d1.active) {
            this.currentWeapon = 'pistol';
        }

        if (this.playerController.buttons.d2.active) {
            this.currentWeapon = 'riffle';
        }

        if (this.movementDirection.x || this.movementDirection.y) {
            this.isMoving = true;
            this.angle = Math.atan2(this.lookDirection.y, this.lookDirection.x ) - Math.atan2(this.movementDirection.y, this.movementDirection.x);
        } 
        else {
            this.isMoving = false;
        }

        if (this.playerController.buttons.leftMB.active) {
            this.isShooting = true;
            this.shoot();
        }
        else if (this.weapons[this.currentWeapon].reloaded) {
            this.isShooting = false;
        }

        this.lookDirection = Vector2.substract(this.playerController.mousePositionWorld, this.pivot);

        this.rotation = Math.atan2(this.lookDirection.y, this.lookDirection.x);
    }

    animate() {
        if (this.isShooting) {
            if (this.weapons[this.currentWeapon].reloaded) {
                this.animator.playAnimation(`${this.currentWeapon}Shoot`);
            }
            else {
                this.animator.playAnimation(`${this.currentWeapon}Reload`)
            }
        } else if (this.isMoving) {
            this.animator.playAnimation(`${this.currentWeapon}Move`);
        }
        else {
            this.animator.playAnimation(`${this.currentWeapon}idle`);
        }
    }

    shoot() {
        this.weapons[this.currentWeapon].shoot();
    }

    destroy() {
        console.log('das')
        super.destroy();
        setTimeout(() => {this.feet.destroy(); this.game.isGameOver = true}, 1)
    }
}