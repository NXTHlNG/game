export default class SpriteSheet {
    buffer = document.createElement('canvas').getContext('2d');

    constructor(img, spriteWidth, spriteHeight, columns, rows, scale = 1, pixel = false) {
        this.img = img;
        this.spriteWidth = spriteWidth;
        this.spriteHeight = spriteHeight;
        this.columns = columns;
        this.rows = rows;
        this.scale = scale;

        this.buffer.canvas.width = this.spriteWidth * this.scale;
        this.buffer.canvas.height = this.spriteHeight * this.scale;

        this.buffer.imageSmoothingEnabled = !pixel;
    }

    getSpritePosition(number) {
        return {
            x: (number % this.columns) * this.spriteWidth,
            y: Math.floor(number / this.columns) *  this.spriteHeight,
            w: this.spriteWidth,
            h: this.spriteHeight
        }
    }

    getSprite(number) {
        this.clearBuffer();

        let spritePos = this.getSpritePosition(number);

        this.buffer.drawImage(this.img, spritePos.x, spritePos.y, spritePos.w, spritePos.h, 0, 0, spritePos.w * this.scale, spritePos.h * this.scale);

        return this.buffer.canvas;
    }

    clearBuffer() {
        this.buffer.clearRect(0, 0, this.buffer.canvas.width, this.buffer.canvas.height);
    }

    getBlank() {
        this.clearBuffer();
        return this.buffer.canvas;
    }
}