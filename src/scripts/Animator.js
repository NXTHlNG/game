import GameComonent from "./GameComponent.js";

export default class Animator extends GameComonent{
    animations = {};
    currentAnimation = '';
    defaultAnimation = '';

    constructor(game, gameObject) {
        super(game);
        this.gameObject = gameObject;
    }

    addAnimation(name, spriteSheet, startFrame, endFrame, frameDelay, isLooping) {
        this.animations[name] = new Animation(this.game, this.gameObject, spriteSheet, startFrame, endFrame, frameDelay, isLooping);
    }

    playAnimation(name) {
        this.currentAnimation = name;
        this.animations[name].play();
    }

    playDefault() {
        if (this.currentAnimation) {
            if (!this.animations[this.currentAnimation].isLooping && !this.animations[this.currentAnimation].isEnded) {
                this.animations[this.currentAnimation].play();
            }
            else {
                this.currentAnimation = this.defaultAnimation;
                this.animations[this.defaultAnimation].play();
            }
        }
    }
}

class Animation {
    time = 0;
    isEnded = false;
    isStopped = false;

    constructor(game, gameObject, spriteSheet, startFrame, endFrame, frameDelay, isLooping) {
        this.game = game;
        this.gameObject = gameObject;
        this.spriteSheet = spriteSheet;
        this.startFrame = startFrame;
        this.endFrame = endFrame;
        this.frameDelay = frameDelay;
        this.isLooping = isLooping;

        this.currentFrame = this.startFrame;
    }

    play() {
        if(!this.isStopped) {
            if (this.time >= this.frameDelay) {
                this.gameObject.image = this.spriteSheet.getSprite(this.currentFrame);
    
                if (this.currentFrame < this.endFrame) this.currentFrame++;
                else if (this.isLooping) this.currentFrame = this.startFrame;
                else this.isEnded = true;
    
                this.time = 0;
            }
            else {
                this.time += this.game.engine.deltaTime;
            }
        }
    }

    stop() {
        this.isStopped = true;
    }
}