import { Scene, GameObjects } from 'phaser';


export class Jeep2 {

    initialX: number
    initialY: number
    x: number
    y: number
    scene: Scene
    messageBox
    sprite: GameObjects.Sprite
    bateria: number;
    bateriaInicial: number = 1000;
    direction: any;
    currentImage: any;
    images: any;
    fatalFailure: any;

    constructor(scene: Scene, x: number, y: number) {
        this.scene = scene;
        this.initialX = x;
        this.initialY = y;
        this.reset();
        this.createMessageBox();
    }


    //creacion de un metodo
    reset() {
        this.x = this.initialX;
        this.y = this.initialY;
        this.bateria = this.bateriaInicial;
    }
    //función message
    createMessageBox(msg = '', x = 16, y = 16) {
        this.messageBox =
            this.scene.add.text(
                x,
                y,
                msg,
                {
                    fontSize: '20px',
                    fill: 'red'
                });
    }

    preloadImages(scene, imagenes) {

        imagenes.forEach((imagen) => {
            let url: string = `${AssetsConfig.images_dir}${imagen.src}`;
            let key: string = `jeep${imagen.id}`;
            scene.load.image(key, url);
        }, scene);
    }

    //función displayCoordinates
    displayCoordinates() {
        this.message(`move to ${this.x} and ${this.y}`);
    }
    message(msg = '') {
        this.messageBox.setText(msg);
    }
    updateXYPhaser() {
        this.sprite.x = this.x;
        this.sprite.y = this.y;
    }

    setDirection(direction: string) {
        this.direction = direction;
        this.currentImage = this.images[direction];
    }

    _move(direction: string, x = this.x, y = this.y) {
        if (!this.fatalFailure) {
            this.x = x;
            this.y = y;
            //this.playSound('Jeep');
            this.setDirection(direction);
            // this.playSound('Freno');
            this.bateria--;
        }
    }



    moveRight(x = this.x) {
        this._move("right", x, this.y);
    }

    moveLeft(x = this.x) {
        this._move("left", x, this.y);
    }

    moveUp(y = this.y) {
        this._move("up", this.x, y);
    }

    moveDown(y = this.y) {
        this._move("down", this.x, y);
    }

}