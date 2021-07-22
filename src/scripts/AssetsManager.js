import GameComonent from "./GameComponent.js";
import SpriteSheet from "./SpriteSheet.js";

export default class AssetsManager extends GameComonent {
    queue = [];
    successCount = 0;
    errorCount = 0;
    cache = {};
    spriteSheets = {}
    
    constructor(game) {
        super(game);
    }

    addToQueue(...pathes) {
        this.queue = [...this.queue, ...pathes];
    }

    loadAll(callback) {
        if (this.isDone()) {
            callback(this.cache);
            return;
        }
        for (let path of this.queue) {
            let img = new Image();
            
            img.onload = () => {
                console.log(`${img.src} is loaded`);
                this.successCount++;

                if (this.isDone()) {
                    callback(this.cache);
                    this.queue = [];
                    this.successCount = 0;
                    this.errorCount = 0;
                }
            }

            img.onerror = () => {
                console.log(`${img.src} error by loading`);
                this.errorCount++;

                if (this.isDone()) {
                    callback(this.cache);
                    this.queue = [];
                    this.successCount = 0;
                    this.errorCount = 0;
                }
            }

            img.src = path;
            this.cache[path] = img;
        }
    }

    isDone() {
        return this.queue.length === (this.successCount + this.errorCount);
    }

    getAsset(path) {
        return this.cache[path];
    }

    createSpriteSheet(name, src, spriteWidth, spriteHeight, columns, rows, scale = 1, pixel = false) {
        this.spriteSheets[name] = new SpriteSheet(this.getAsset(src), spriteWidth, spriteHeight, columns, rows, scale, pixel);
    }
}