import { Scene, Physics, Input, Cameras } from 'phaser';
import { Jeep2 } from '../Jeep2';
import { JeepConfig } from './JeepConfig';

export class SceneOne extends Scene {
    iconobase: Phaser.GameObjects.Image | undefined;

    jeep: Jeep2;
    jeep2: Jeep2;
    key_W: Input.Keyboard.Key;
    key_D: Input.Keyboard.Key;
    key_A: Input.Keyboard.Key;
    key_S: Input.Keyboard.Key;
    iconoBase: Phaser.GameObjects.Sprite;
    onBase: boolean = true;
    messageBox: Phaser.GameObjects.Text;

    constructor() {
        super({
            key: 'SceneOne'
        })
        this.scene = this;
    }

    preload() {
        this.jeep = new Jeep2(this, 400, 300, JeepConfig);
        this.jeep2 = new Jeep2(this, 40, 120, JeepConfig);

        this.loadImagesFunction();
        this.loadSoundsFunction();
    }

    create() {
        this.iconoBase = this.physics.add.sprite(400, 300, 'base');

        this.jeep.sprite = this.physics.add.sprite(this.jeep.x, this.jeep.y, 'jeep_right');
        this.jeep.sprite.setScale(0.15);

        this.jeep2.sprite = this.physics.add.sprite(this.jeep2.x, this.jeep2.y, 'jeep_right');
        this.jeep2.sprite.setScale(0.15);
        this.keysSetup();
        this.collisionSetup();
        this.collisionBaseAndJeepSetup();
        this.messageBoxSetup();

        // this.cameraSetup();
    }
    //función para cargar las imágenes
    loadImagesFunction() {
        this.load.image('base', '../../../assets/images/iconobase.png');
    }
    //función para cargar sonidos
    loadSoundsFunction() { }
    //funcion para crear cámara
    cameraSetup() {
        const camera = this.cameras.main;
        camera.setViewport(150, 150, 300, 300);
        camera.startFollow(this.jeep.sprite);
    }

    keysSetup() {
        this.key_A = this.input.keyboard.addKey(Input.Keyboard.KeyCodes.A);
        this.key_W = this.input.keyboard.addKey(Input.Keyboard.KeyCodes.W);
        this.key_S = this.input.keyboard.addKey(Input.Keyboard.KeyCodes.S);
        this.key_D = this.input.keyboard.addKey(Input.Keyboard.KeyCodes.D);
    }

    keysListener() {
        if (this.key_D.isDown) this.jeep.moveRight();
        if (this.key_A.isDown) this.jeep.moveLeft();
        if (this.key_S.isDown) this.jeep.moveDown();
        if (this.key_W.isDown) this.jeep.moveUp();
    }
    update() {
        this.keysListener();
        this.jeep.updateXYPhaser();
        this.jeep.displayCoordinates();

        const collision = this.physics.collide(
            this.jeep.sprite,
            this.iconoBase);

        console.log(`collision: ${collision}`);

        if (!collision) {
            this.baseHit = false

        } else {
            this.baseHit = true
        }


        // console.log(this.physics.world.overlap(this.jeep.sprite, this.iconoBase));

    }
    collisionSetup() {
        this.physics.add.collider(
            this.jeep.sprite,
            this.jeep2.sprite,
            this.playerHit,
            null,
            this);
    }
    //colision de la base y el jeep

    collisionBaseAndJeepSetup() {

        this.physics.add.collider(
            this.iconoBase,
            this.jeep.sprite,
            this.baseHit,
            null,
            this);
    }

    playerHit() {
        this.message(`Jeep colission in ${this.jeep.x} and ${this.jeep.y}`);

    }
    baseHit() {
        this.message(`Base colission in ${this.jeep.x} and ${this.jeep.y}`);
    }
    message(msg = '') {
        this.messageBox.setText(msg);
    }
    //pantalla de mensaje
    messageBoxSetup(msg = '', x = 50, y = 50) {
        this.messageBox =
            this.add.text(
                x,
                y,
                msg,
                {
                    fontSize: '18px',
                    fill: 'white'
                });
    }
    
    /* borderHit() {
    
     }*/
}
