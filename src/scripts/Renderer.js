import Camera from './Camera.js';
import GameComonent from './GameComponent.js';
import Player from './Player.js';

export default class Renderer extends GameComonent {
    constructor(game, canvas) {
        super(game);
        this.ctx = canvas.getContext('2d');
        this.buffer = document.createElement('canvas').getContext('2d');        
    }

    setLevel(level) {
        this.level = level;
        this.game.worldWidth = this.buffer.canvas.width = level.map.width;
        this.game.worldHeight = this.buffer.canvas.height = level.map.height;
        this.viewport = new Camera(this.game.player, this.buffer.canvas.width, this.buffer.canvas.height);
        this.ctx.canvas.width = this.viewport.width;
        this.ctx.canvas.height = this.viewport.height;

        this.buffer.imageSmoothingEnabled = false;
    }

    clear() {
        this.buffer.fillStyle = '#ffffff';
        this.buffer.fillRect(0, 0, this.buffer.canvas.width, this.buffer.canvas.height);

        this.ctx.fillStyle = '#ffffff';
        this.ctx.fillRect(0, 0, this.buffer.canvas.width, this.buffer.canvas.height);
    }

    drawObject(gameObject) {
        if (gameObject.rotation) {
            this.buffer.translate(gameObject.pivot.x, gameObject.pivot.y);
            this.buffer.rotate(gameObject.rotation);
            this.buffer.translate(-gameObject.pivot.x, -gameObject.pivot.y);
        }

        this.buffer.drawImage(gameObject.image, gameObject.position.x, gameObject.position.y, gameObject.size.width, gameObject.size.height);
        
        this.buffer.setTransform(1, 0, 0, 1, 0, 0);
    }

    drawLayer(layer) {
        let tileSize = {
            w: this.level.map.tileSheet.spriteWidth * this.level.map.tileSheet.scale,
            h: this.level.map.tileSheet.spriteHeight * this.level.map.tileSheet.scale
        };
        let startColumn = Math.floor(this.viewport.position.x / tileSize.w);
        let lastColumn = startColumn + Math.ceil(this.viewport.width / tileSize.w) + 1;
        let startRow = Math.floor(this.viewport.position.y / tileSize.h);
        let lastRow = startRow + Math.ceil(this.viewport.height / tileSize.h) + 1;

        for (let x = startRow; x < lastRow; x++) {
            for (let y = startColumn; y < lastColumn; y++) {
                let tile = this.level.map.getTile(layer, x, y);
                if (tile) {
                    this.buffer.drawImage(
                        tile,
                        y * tile.height,
                        x * tile.width,
                    )
                }
            }
        }
    }

    drawHUD() {
        this.ctx.font = '32px sans-serif';
        this.ctx.fillText(`HP: ${this.game.player.health}/${Player.HEALTH}`, this.viewport.width - 250, this.viewport.height - 100);
        this.ctx.fillText(`AMMO: ${this.game.player.weapons[this.game.player.currentWeapon].currentAmmo}/${this.game.player.weapons[this.game.player.currentWeapon].magazine}`, this.viewport.width - 250, this.viewport.height - 50);
        this.ctx.font = '24px sans-serif';
        this.ctx.fillText(`FPS: ${this.game.engine.framesPerSecond}`, this.viewport.width - 100, 50);

    }

    render() {
        this.clear();

        this.drawLayer(0);

        for (let gameObject of this.level.gameObjects) {
            this.drawObject(gameObject);
        }

        this.ctx.drawImage(this.buffer.canvas, this.viewport.position.x, this.viewport.position.y, this.viewport.width, this.viewport.height, 0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        
        this.drawHUD();
    }
}