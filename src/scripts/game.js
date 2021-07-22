import Engine from './Engine.js';
import Renderer from './Renderer.js';
import Player from './Player.js';
import TileMap from './TileMap.js';
import LevelManager from './LevelManager.js';
import Level from './Level.js';
import AssetsManager from './AssetsManager.js';
import { Vector2 } from './utills.js';
import SpriteSheet from './SpriteSheet.js';
import Zombie from './Zombie.js';
import { Button, Controller } from './Controller.js';

const canvas = document.getElementById('canvas');

canvas.addEventListener('contextmenu', event => event.preventDefault());

class Game {
    isGameOver = false;
    isPaused = false;
    isStarted = false;

    constructor(canvas) {
        this.canvas = canvas;
        this.engine = new Engine(this, this.update, this.render);
        this.assetsManager = new AssetsManager(this);
        this.renderer = new Renderer(this, this.canvas);
        this.controller = new Controller(this, {esc: new Button('Escape')});
        this.levelManager = new LevelManager(this);

        this.startScreen = document.createElement('div');
        this.startScreen.classList.add('screen', 'start');
        this.startScreen.innerHTML = `
            <p class="title">GAME TITLE</p>
            <div class="description">
                <p class="subtitle">Controls</p>
                <p>W, A, S, D — movement</p>
                <p>LBM — shoot</p>
                <p>1, 2 — change weapon</p>
                <p>ESC — pause</p>
            </div>
        `;
        this.startButton = document.createElement('button');
        this.startButton.textContent = 'START';
        this.startScreen.appendChild(this.startButton);
        this.startButton.onclick = () => {
            document.body.removeChild(this.startScreen);
            this.assetsManager.loadAll(() => {
                this.start()
            });
        }
        document.body.appendChild(this.startScreen);
        
        this.gameOverScreen = document.createElement('div');
        this.gameOverScreen.classList.add('screen', 'gameover');
        this.gameOverScreen.innerHTML = `<p class="title">GAME OVER</p>`;
        this.retryButton = document.createElement('button');
        this.retryButton.textContent = 'RETRY';
        this.gameOverScreen.appendChild(this.retryButton);
        this.retryButton.onclick = () => {
            document.body.removeChild(this.gameOverScreen);
            this.start();
        }

        this.pauseScreen = document.createElement('div');
        this.pauseScreen.classList.add('screen', 'pause');
        this.pauseScreen.innerHTML = `<p class="title">PAUSE</p>`;

        setInterval(() => {
            if (this.controller.buttons.esc.down && this.isStarted) {
                this.controller.buttons.esc.down = false;
                this.pause();
            }
        }, 50);
    }

    start() {
        this.isGameOver = false;
        this.isStarted = true;
        this.player = new Player(this);
        this.levelManager.levels = [];
        this.levelManager.addLevel(
            '1',
            new TileMap(10, 10, 
                [[
                    2, 1, 1, 6, 6, 6, 7, 8, 9, 10,
                    1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
                    1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
                    1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
                    1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
                    1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
                    1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
                    1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
                    1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
                    1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
                ]],
                this.assetsManager.spriteSheets['tileSheet']
            )
        );
        this.player.feet.instanciate();
        this.engine.start();
        this.renderer.setLevel(this.levelManager.getCurrentLevel());
    }

    restart() {
        this.isGameOver = false;
        this.isStarted = true;
        this.player = new Player(this);
        this.levelManager.getCurrentLevel().gameObjects.unshift(this.player);
        this.player.feet.instanciate();
        this.engine.start();
        this.renderer.setLevel(this.levelManager.getCurrentLevel());
    }

    update = () => {
        if (this.isGameOver) {
            this.gameOver();
        }

        for (let i = 0; i < this.levelManager.getCurrentLevel().gameObjects.length; i++) {
            this.levelManager.getCurrentLevel().gameObjects[i].update();

            for (let j = i + 1; j < this.levelManager.getCurrentLevel().gameObjects.length; j++) {
                this.levelManager.getCurrentLevel().gameObjects[i].checkCollision(this.levelManager.getCurrentLevel().gameObjects[j]);
            }
        }

        this.levelManager.getCurrentLevel().checkGameObjects();
    }

    render = () => {
        this.renderer.render();
    }

    gameOver() {
        this.engine.stop();
        document.body.appendChild(this.gameOverScreen);
    }

    pause() {
        if (!this.isPaused) {
            console.log()
            this.isPaused = true;
            this.engine.stop();
            document.body.appendChild(this.pauseScreen);
        }
        else {
            this.isPaused = false;
            this.engine.start();
            document.body.removeChild(this.pauseScreen);
        }
    }

    toViewportCoordinates(vector) {
        let rect = this.renderer.ctx.canvas.getBoundingClientRect();
        let scale = this.renderer.ctx.canvas.width / rect.width;

        return new Vector2(Math.floor((vector.x - rect.left) * scale), Math.floor((vector.y - rect.top) * scale));
    }
    
    toWorldCoordinates(vector) {
        return new Vector2(vector.x + this.renderer.viewport.position.x, vector.y + this.renderer.viewport.position.y);
    }
}

const game = new Game(canvas);

game.assetsManager.addToQueue(
    './src/assets/dungeon_tiles.png',
    './src/assets/player_sprites/default.png',
    './src/assets/player_sprites/feet_idle.png',
    './src/assets/player_sprites/feet_run.png',
    './src/assets/player_sprites/feet_strafe_left.png',
    './src/assets/player_sprites/feet_strafe_right.png',
    './src/assets/player_sprites/feet_walk.png',
    './src/assets/player_sprites/pistol_idle.png',
    './src/assets/player_sprites/pistol_meele.png',
    './src/assets/player_sprites/pistol_move.png',
    './src/assets/player_sprites/pistol_reload.png',
    './src/assets/player_sprites/pistol_shoot.png',
    './src/assets/player_sprites/riffle_idle.png',
    './src/assets/player_sprites/riffle_meele.png',
    './src/assets/player_sprites/riffle_move.png',
    './src/assets/player_sprites/riffle_reload.png',
    './src/assets/player_sprites/riffle_shoot.png',
    './src/assets/zombie_sprites/default.png',
    './src/assets/zombie_sprites/zombie_idle.png',
    './src/assets/zombie_sprites/zombie_move.png',
    './src/assets/zombie_sprites/zombie_attack.png',
    './src/assets/bullet.png',
    './src/assets/flash.png'
)

game.assetsManager.loadAll(() => {
    game.assetsManager.createSpriteSheet('tileSheet', './src/assets/dungeon_tiles.png', 16, 16, 10, 5, 20, true);
    game.assetsManager.createSpriteSheet('feetidle', './src/assets/player_sprites/feet_idle.png', 132, 155, 1, 1, 1, false);
    game.assetsManager.createSpriteSheet('feetRun', './src/assets/player_sprites/feet_run.png', 204, 124, 20, 1, 1, false);
    game.assetsManager.createSpriteSheet('feetStrafeLeft', './src/assets/player_sprites/feet_strafe_left.png', 155, 174, 20, 1, 1, false);
    game.assetsManager.createSpriteSheet('feetStrafeRight', './src/assets/player_sprites/feet_strafe_right.png', 154, 176, 20, 1, 1, false);
    game.assetsManager.createSpriteSheet('pistolidle', './src/assets/player_sprites/pistol_idle.png', 253, 216, 20, 1, 1, false);
    game.assetsManager.createSpriteSheet('pistolMove', './src/assets/player_sprites/pistol_move.png', 258, 220, 20, 1, 1, false);
    game.assetsManager.createSpriteSheet('pistolShoot', './src/assets/player_sprites/pistol_shoot.png', 255, 215, 3, 1, 1, false);
    game.assetsManager.createSpriteSheet('pistolReload', './src/assets/player_sprites/pistol_reload.png', 260, 230, 15, 1, 1, false);
    game.assetsManager.createSpriteSheet('riffleidle', './src/assets/player_sprites/riffle_idle.png', 313, 207, 20, 1, 1, false);
    game.assetsManager.createSpriteSheet('riffleMove', './src/assets/player_sprites/riffle_move.png', 313, 206, 20, 1, 1, false);
    game.assetsManager.createSpriteSheet('riffleShoot', './src/assets/player_sprites/riffle_shoot.png', 312, 206, 3, 1, 1, false);
    game.assetsManager.createSpriteSheet('riffleReload', './src/assets/player_sprites/riffle_reload.png', 322, 217, 20, 1, 1, false);
    game.assetsManager.createSpriteSheet('zombieidle', './src/assets/zombie_sprites/zombie_idle.png', 241, 222, 17, 1, 1, false);
    game.assetsManager.createSpriteSheet('zombieWalk', './src/assets/zombie_sprites/zombie_move.png', 288, 311, 17, 1, 1, false);
    game.assetsManager.createSpriteSheet('zombieAttack', './src/assets/zombie_sprites/zombie_attack.png', 318, 294, 17, 1, 1, false);
})