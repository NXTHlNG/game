export default class TileMap {
    constructor(columns, rows, layers, tileSheet) {
        this.columns = columns;
        this.rows = rows;
        this.layers = layers;
        this.tileSheet = tileSheet;

        this.width = this.columns * this.tileSheet.spriteWidth * this.tileSheet.scale;
        this.height = this.rows * this.tileSheet.spriteHeight * this.tileSheet.scale;
    }

    getTile(layer, x, y) {
        let num = this.layers[layer][x * this.columns + y];
        if (num) {
            num--;
            return  this.tileSheet.getSprite(num);
        } 
        else {
            return this.tileSheet.getBlank();
        }
    }
}