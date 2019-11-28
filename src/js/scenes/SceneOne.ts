import { Scene, Physics, Input, Cameras } from 'phaser';
import { Jeep2 } from '../Jeep2';
import { JeepConfig } from './JeepConfig';
import { Crater } from '../Crater';

export class SceneOne extends Scene {
    iconobase: Phaser.GameObjects.Image | undefined;

    planetMarsWidth: number = 890;
    planetMarsHeight: number = 590;
    jeep1: Jeep2;
    key_M: Input.Keyboard.Key;
    key_W: Input.Keyboard.Key;
    key_D: Input.Keyboard.Key;
    key_A: Input.Keyboard.Key;
    key_S: Input.Keyboard.Key;
    key_R: Input.Keyboard.Key;//declarada la r
    key_SPACE: Input.Keyboard.Key;
    iconoBase: Phaser.GameObjects.Sprite;
    onBase: boolean = true;
    messageBox: Phaser.GameObjects.Text;
    bgImg: Phaser.GameObjects.Sprite;
    musicIsPlaying: boolean =false;
    



    constructor() {
        super({
            key: 'SceneOne'
        })
    }

    preload() {
        this.jeep1 = new Jeep2(this, 400, 300, JeepConfig);
        this.loadImagesFunction();
        this.load.audio('musicaFondo', '../../assets/sounds/musica.mp3');
        this.crater1= new Crater({x:200,y:200,scene:this, width: 300});
        this.crater1.preload();
    }

    create() {
    this.crater1.draw();
    this.bgMusic = this.sound.add('musicaFondo', {
             volume: 0.5,
             loop: true,
            detune: 25
});
        this.toggleMusic(true);

        this.jeep1.addAudios();
        this.bgImg = this.add.sprite(0, 0, 'bg');
        this.bgImg.setOrigin(0, 0);
        // this.bgImg.setScale(1.1);
        // this.bgImg.displayHeight = 590;
        // this.bgImg.displayWidth = 890;

        //this.bgImg.setScale(2);
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
        this.key_M = this.input.keyboard.addKey(Input.Keyboard.KeyCodes.M);
        this.key_A = this.input.keyboard.addKey(Input.Keyboard.KeyCodes.A);
        this.key_W = this.input.keyboard.addKey(Input.Keyboard.KeyCodes.W);
        this.key_S = this.input.keyboard.addKey(Input.Keyboard.KeyCodes.S);
        this.key_D = this.input.keyboard.addKey(Input.Keyboard.KeyCodes.D);
        this.key_R = this.input.keyboard.addKey(Input.Keyboard.KeyCodes.R);//añadir recarga
        this.key_SPACE = this.input.keyboard.addKey(Input.Keyboard.KeyCodes.SPACE);
    }

    keysListener() {
        switch (true) {
            case this.key_D.isDown:
                this.jeep1.moveRight();
                break;
            case this.key_A.isDown:
                this.jeep1.moveLeft();
                break;
            case this.key_W.isDown:
                this.jeep1.moveUp();
                break;
            case this.key_S.isDown:
                this.jeep1.moveDown();
                break;
            case this.key_M.isDown:
                this.toggleMusic();
                break;
            case this.key_R.isDown:
                this.jeep1.rechargeBattery();
            default:
                this.jeep1.onBreak();
                break;
        }

        if (this.key_SPACE.isDown) this.jeep1.brake();
        if (this.key_D.isUp && this.key_A.isUp && this.key_S.isUp
            && this.key_W.isUp) this.jeep1.stop();
    }

    update(delta, time) {

        this.keysListener();
        this.jeep1.update();
        this.crater1.draw();
        this.crater1.draw2();
    }

    toggleMusic(forcetrue=false){
        if(!this.musicIsPlaying||forcetrue){
            this.bgMusic.play();
            this.musicIsPlaying = true;
        }
        else{
            this.bgMusic.stop();
            this.musicIsPlaying = false;
        }
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