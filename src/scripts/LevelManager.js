import GameComonent from "./GameComponent.js";
import Level from "./Level.js";

export default class LevelManager extends GameComonent {
    currentLevel = 0;
    levels = [];
    constructor(game) {
        super(game);
    }

    addLevel(name, map) {
        this.levels.push(new Level(this.game, name, map));
    }

    getCurrentLevel() {
        return this.levels[this.currentLevel];
    }

    getLevel(level) {
        return this.levels[level];
    }

    nextLevel() {
        this.currentLevel++;
        this.getCurrentLevel();
    }
}