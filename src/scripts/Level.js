import Zombie from "./Zombie.js";
import { Vector2 } from "./utills.js";

export default class Level {
    needCheck = true;
    zombieDefault = 2;
    multiplier = 1;
    needSpawn = true;

    constructor(game, name, map) {
        this.game = game;
        this.name = name;
        this.map = map;
        this.gameObjects = [this.game.player];
    }

    spawnZombies(count, game) {
        for (let i = 0; i < count; i++) {
            new Zombie(game, new Vector2(Math.floor(Math.random() * this.map.width), Math.floor(Math.random() * this.map.height))).instanciate();
        }
    }

    checkGameObjects() {
        if (this.needCheck) {
            this.needSpawn = true;
            for (let key in this.gameObjects) {
                if (this.gameObjects[key].destroyed) {
                    this.gameObjects.splice(key, 1);
                }
                else if (!this.gameObjects[key].inctanciated) {
                    this.gameObjects[key].inctanciated = true;
                }

                if (this.gameObjects[key] instanceof Zombie && this.needSpawn) {
                    this.needSpawn = false;
                }
            }
            this.needCheck = false;
        }

        if (this.needSpawn) {
            this.spawnZombies(this.zombieDefault * this.multiplier, this.game);
            this.multiplier *= 2;
            this.needSpawn = true;
        }
    }
}