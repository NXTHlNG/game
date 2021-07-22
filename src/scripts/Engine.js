import GameComonent from "./GameComponent.js";

export default class Engine extends GameComonent{
    deltaTime;
    framesPerSecond;
    
    constructor(game, update, render) {
        super(game);
        this.update = update;
        this.render = render;
    }

    start() {
        this.time = performance.now();
        this.animFrameReq = requestAnimationFrame(this.run);
    }

    run = timeStamp => {
        
        this.animFrameReq = requestAnimationFrame(this.run);

        this.deltaTime = (timeStamp - this.time) / 1000;
        this.framesPerSecond = Math.round(1 / this.deltaTime);
        this.time = timeStamp;
        
        this.update();
        this.render();

    }

    stop() {
        cancelAnimationFrame(this.animFrameReq);
    }
}