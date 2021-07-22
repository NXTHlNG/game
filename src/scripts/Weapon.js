import GameComonent from "./GameComponent.js";
import { Vector2 } from "./utills.js";
import Bullet from "./Bullet.js";

export default class Weapon extends GameComonent {
    currentAmmo;
    reloaded = true;
    time = 0;
    fireReady = true;
    reloading = false;
    
    constructor(game, fireOffset, damage, fireRate, magazine, reloadTime) {
        super(game);
        this.damage = damage;
        this.fireOffset = fireOffset;
        this.fireRate = fireRate;
        this.magazine = magazine;
        this.reloadTime = reloadTime;

        this.currentAmmo = this.magazine;
        this.time = this.fireRate;
    }

    getFirePoint(size) {
        let point = Vector2.rotate(this.game.player.pivot, Vector2.add(this.game.player.pivot, this.fireOffset), this.game.player.rotation);
        return new Vector2(point.x - Math.floor(size.width / 2), point.y - Math.floor(size.height / 2));
    }

    shoot() {
        if (this.reloaded) {
            if (this.currentAmmo) {
                if (this.fireReady) {
                    this.currentAmmo--;
                    new Bullet(this.game, this).instanciate();
                    this.fireReady = false;
                    setTimeout(() => {
                        this.fireReady = true;
                    }, this.fireRate * 1000);
                }
            }
            else {
                this.reload();
            }
        }
    }

    reload() {
        if (this.currentAmmo === this.magazine) return;
        this.reloaded = false;
        setTimeout(() => {
            this.reloaded = true;
            this.currentAmmo = this.magazine;
        }, this.reloadTime * 1000);
    }
}