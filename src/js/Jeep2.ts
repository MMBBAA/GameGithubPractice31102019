import { Physics, Scene, GameObjects } from 'phaser';

export class Jeep2 {

    initialX: number
    initialY: number
    scene: Scene
    messageBox
    sprite: Physics.Arcade.Sprite
    bateria: number;
    bateriaInicial: number = 100 // 1000;
    bateriaBajoNivel = 50;  // 100
    initialDirection: string = 'right';
    direction: string;
    currentImage: any;
    imageTextures: Array<any> = [];
    sounds: Array<any> = [];
    fatalFailure: boolean = false;
    speed: number = 10;
    engineRunning: boolean = false;

    constructor(scene: Scene, x: number, y: number, config) {
        this.scene = scene;
        this.initialX = x;
        this.config = config;
        this.initialY = y;
        this.preloadImages();
        this.preloadAudios();
        this.reset();
    }

    preloadImages() {

        this.config.images.forEach((imagen) => {
            let dir = this.config.images_dir;
            let url = `${dir}${imagen.src}`;
            let key = imagen.id;
            this.scene.load.image(key, url);
            this.imageTextures[imagen.direction] = this.scene.textures.get(key);
        });
    }

    preloadAudios() {
        this.config.audio.forEach((audio) => {
            let dir = this.config.audio_dir;
            let url = `${dir}${audio.src}`;
            let key = audio.id;
            this.scene.load.audio(key, [url]);
            this.sounds[key] = this.scene.sound.add(key, audio.options); 
        });
    }

    reset() {
        if (this.sprite) {
            this.sprite.x = this.initialX;
            this.sprite.y = this.initialY;
        }
        this.bateria = this.bateriaInicial;
        this.setDirection(this.initialDirection);
    }

    displayCoordinates() {
        this.message(`move to ${this.sprite.x} and ${this.sprite.y}`);
    }
    message(msg = '') {
        // this.scene.message(msg);
    }

    setDirection(direction: string) {
        this.direction = direction;
        this.setSprite(direction)
    }

    setSprite(key) {
        this.currentImage = this.imageTextures[key];
        if (this.sprite) {
            this.sprite.setTexture(`jeep_${key}`);
        }
    }

    _move(direction: string, dx = 1, dy = 1) {
        this.arranque();
        if (!this.fatalFailure) {
            this.sprite.x = this.sprite.x + (dx * this.speed);
            this.sprite.y = this.sprite.y + (dy * this.speed);
            
            this.setDirection(direction);
            // this.playSound('Freno');
            this.bateria--;
        }
    }

    moveRight(dx = 1) {
        this._move("right", dx, 0);
    }

    moveLeft(dx = -1) {
        this._move("left", dx, 0);
    }

    moveUp(dy = -1) {
        this._move("up", 0, dy);
    }

    moveDown(dy = 1) {
        this._move("down", 0, dy);
    }

    playSound(soundID) {
        this.scene.sound.play(soundID);
    //  console.table(this.sounds);
      //this.sounds[soundID] && this.sounds[soundID].play();
    }

    arranque() {
        if(!this.engineRunning){
          //  this.playSound('Jeep');
            this.engineRunning=true;
        this.playSound('Arranque');
        }
    }
}