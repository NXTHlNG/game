import { Vector2 } from "./utills.js";


export class Controller {
    mousePosition = new Vector2(0, 0);
    mousePositionScreen = new Vector2(0, 0);
    mousePositionWorld = new Vector2(0, 0);

    constructor(game, buttons) {
        this.game = game;
        this.buttons = buttons;
        window.addEventListener('keydown', this.keyboardHandler);
        window.addEventListener('keyup', this.keyboardHandler);
        game.canvas.addEventListener('mousedown', this.mouseHandler);
        game.canvas.addEventListener('mouseup', this.mouseHandler);
        game.canvas.addEventListener('mousemove', this.mouseMove);
    }
    
    keyboardHandler = event => {
        let state = event.type === 'keydown' ? true : false;
        let nothingHandled = true;

        for (let key in this.buttons) {
            if (this.buttons[key].key === event.code) {
                this.buttons[key].input(state);
                nothingHandled = false;
            }
        }

        if(!nothingHandled) event.preventDefault();
    }

    mouseHandler = event => {
        let state = event.type === 'mousedown' ? true : false;

        for (let key in this.buttons) {
            if (this.buttons[key].key == event.button) {
                this.buttons[key].input(state);
            }
        }
        event.preventDefault();
    }

    mouseMove = event => {
        this.mousePosition.x = event.clientX;
        this.mousePosition.y = event.clientY;

        this.mousePositionScreen = this.game.toViewportCoordinates(this.mousePosition);
    }

    updateMousePosition() {
        this.mousePositionWorld = this.game.toWorldCoordinates(this.mousePositionScreen);
    }
}

export class Button {
    constructor(key) {
        this.key = key;
        this.active = this.down = false;
    }

    input(state) {
        this.down = state;
        if (this.active != state) this.active = state;
    }
}