import { Physics, Scene, GameObjects } from 'phaser';


export class Jeep2 {

    initialX: number
    initialY: number
    scene: Scene
    messageBox
    sprite:  Physics.Arcade.Sprite
    bateria: number;
    bateriaInicial: number = 1000;
    initialDirection: string = 'right';
    direction: string;
    currentImage: any;
    imageTextures: Array<any> = [];
    fatalFailure: boolean = false;
    speed: number = 10;

    constructor(scene: Scene, x: number, y: number, config) {
        this.scene = scene;
        this.initialX = x;
        this.initialY = y;
        this.config = config;
        this.preloadImages();
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


    //creacion de un metodo
    reset() {
       if (this.sprite) {
        this.sprite.x = this.initialX;
        this.sprite.y = this.initialY;
       }
        this.bateria = this.bateriaInicial;
        this.setDirection(this.initialDirection);
    }


    //función displayCoordinates
    displayCoordinates() {
        this.message(`move to ${this.sprite.x} and ${this.sprite.y}`);
    }
    message(msg = '') {
        // this.scene.message(msg);
    }
 

    setDirection(direction: string) {
        this.direction = direction;

        // switch (direction) {
        //     case 'up':
        //         this.sprite.angle = 0;
        //         break;

        //     case 'down':
        //         this.sprite.angle = 90
        //         break;
        //     case 'left':
        //         this.sprite.angle = 180
        //         break;
        //     case 'right':

        //         this.sprite.angle = 270
        //         break;
        //     default:
        //         break;
        // }
         this.setSprite(direction)
    }

    setSprite(key) {
        this.currentImage = this.imageTextures[key];
        if (this.sprite) {
            this.sprite.setTexture(`jeep_${key}`);
        }
    }

    _move(direction: string, dx = 1, dy = 1) {
        if (!this.fatalFailure) {
            this.sprite.x = this.sprite.x + (dx * this.speed);
            this.sprite.y = this.sprite.y + (dy * this.speed);
            //this.playSound('Jeep');
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

}