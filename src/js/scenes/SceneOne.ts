import { Scene, Physics, Input, Cameras } from 'phaser';
import { Jeep2 } from '../Jeep2';
import { JeepConfig } from './JeepConfig';

export class SceneOne extends Scene {
    iconobase: Phaser.GameObjects.Image | undefined;

    planetMarsWidth: number = 800;
    planetMarsHeight: number = 600;
    jeep1: Jeep2;
    key_W: Input.Keyboard.Key;
    key_D: Input.Keyboard.Key;
    key_A: Input.Keyboard.Key;
    key_S: Input.Keyboard.Key;
    iconoBase: Phaser.GameObjects.Sprite;
    onBase: boolean = true;
    messageBox: Phaser.GameObjects.Text;
    bgImg: Phaser.GameObjects.Sprite;

    constructor() {
        super({
            key: 'SceneOne'
        })
    }


    preload() {
        this.jeep1 = new Jeep2(this, 400, 300, JeepConfig);
        this.loadImagesFunction();
    }

    create() {
        this.bgImg = this.add.sprite(0, 0, 'bg');
        this.bgImg.setScale(2);
        this.iconoBase = this.physics.add.sprite(400, 300, 'base');

        this.jeep1.sprite = this.physics.add.sprite(
            this.jeep1.initialX,
            this.jeep1.initialY,
            'jeep_right');
        this.jeep1.sprite.setScale(0.15);

        this.keysSetup();
        this.collisionListenerBetweenBaseAndJeep();
        this.messageBoxSetup();
        this.worldSetup();
        this.cameraSetup();

        this.jeep1.sprite.setCollideWorldBounds(true);
    }

    mouseCheck() {
        const pointer = this.input.activePointer;
        // Convert the mouse position to world position within the camera
        const worldPoint = pointer.positionToCamera(this.cameras.main);
        if (pointer.isDown) {
            this.message(`Mouse clicked at ${worldPoint.x} ${worldPoint.y}`);
        }
    }

    loadImagesFunction() {
        this.load.image('base', '../../../assets/images/iconobase.png');
        this.load.image('bg', '../../../assets/images/suelo2.jpg');
    }

    worldSetup() {
        // create an invisible rectangle, that deines edges of the world
        this.physics.world.setBounds(0, 0, this.planetMarsWidth, this.planetMarsHeight);
        // Enables or disables collisions on each edge of the World boundary.
        this.physics.world.setBoundsCollision(true);
    }

    cameraSetup() {
        this.camera = this.cameras.main;
        // Camera can move to bounds of world
        this.camera.setBounds(0, 0, this.planetMarsWidth, this.planetMarsHeight)

        // make camera follow jeep    
        this.camera.startFollow(this.jeep1.sprite);

    }

    keysSetup() {
        this.key_A = this.input.keyboard.addKey(Input.Keyboard.KeyCodes.A);
        this.key_W = this.input.keyboard.addKey(Input.Keyboard.KeyCodes.W);
        this.key_S = this.input.keyboard.addKey(Input.Keyboard.KeyCodes.S);
        this.key_D = this.input.keyboard.addKey(Input.Keyboard.KeyCodes.D);
    }

    keysListener() {
        if (this.key_D.isDown) this.jeep1.moveRight();
        if (this.key_A.isDown) this.jeep1.moveLeft();
        if (this.key_S.isDown) this.jeep1.moveDown();
        if (this.key_W.isDown) this.jeep1.moveUp();
    }

    update(delta, time) {
        this.keysListener();
    }

    collisionListenerBetweenBaseAndJeep() {
        this.physics.add.collider(
            this.iconoBase,
            this.jeep1.sprite,
            this.baseHit,
            null,
            this);
    }

    playerHit() {
        this.message(`Jeep colission in ${this.jeep1.sprite.x} and ${this.jeep1.sprite.y}`);
    }

    baseHit() {
        this.message(`Base colission in ${this.jeep1.sprite.x} and ${this.jeep1.sprite.y}`);
    }

    message(msg = '') {
        this.messageBox.setText(msg);
    }

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
}