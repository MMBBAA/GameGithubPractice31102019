import { Scene, GameObjects, Physics, Input, Cameras } from 'phaser';
import { Jeep2 } from '../Jeep2';
import { JeepConfig } from './JeepConfig';
import { Crater } from '../Crater';
import { Display } from '../Display';
import { Sample } from '../Sample';
import { Tornado } from '../Tornado';

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
    musicIsPlaying: boolean = false;
    crater1: Crater;
    crater2: Crater;
    crater3: Crater;
    crater4: Crater;
    muestra1: Sample;
    muestra2: Sample;
    muestra3: Sample;
    muestra4: Sample;
    tornado1: Tornado;
    tornado2: Tornado;

    iconoCrater1: Physics.Arcade.Sprite;
    iconoCrater2: Physics.Arcade.Sprite;
    iconoCrater3: Physics.Arcade.Sprite;
    iconoCrater4: Physics.Arcade.Sprite;
    iconoMuestra1: Physics.Arcade.Sprite;
    iconoMuestra2: Physics.Arcade.Sprite;
    iconoMuestra3: Physics.Arcade.Sprite;
    iconoMuestra4: Physics.Arcade.Sprite;
    iconoTornado1: Physics.Arcade.Sprite;
    iconoTornado2: Physics.Arcade.Sprite;
    collision: string;
    display: Display;


    constructor() {
        super({
            key: 'SceneOne'
        })
        this.display = new Display({ scene: this });
    }

    preload() {


        this.jeep1 = new Jeep2(this, 400, 300, JeepConfig);
        this.loadImagesFunction();
        this.load.audio('musicaFondo', '../../assets/sounds/musica.mp3');
        //this.load.audio('craterColission', '../../assets/music/Sonido_Colision_Crater.mp3'); 
        this.crater1 = new Crater({ scene: this, x: 370, y: 80, widht: 140, height: 140 });
        this.crater1.preload();
        this.crater2 = new Crater({ scene: this, x: 150, y: 400, widht: 140, height: 140 });
        this.crater2.preload();
        this.crater3 = new Crater({ scene: this, x: 150, y: 400, widht: 140, height: 140 });
        this.crater3.preload();
        this.crater4 = new Crater({ scene: this, x: 150, y: 400, widht: 140, height: 140 });
        this.crater4.preload();
        this.muestra1 = new Sample({ scene: this, x: 440, y: 500, widht: 5, height: 5 });
        this.muestra1.preload();
        this.muestra2 = new Sample({ scene: this, x: 600, y: 450, widht: 5, height: 5 });
        this.muestra2.preload();
        this.muestra3 = new Sample({ scene: this, x: 40, y: 40, widht: 5, height: 5 });
        this.muestra3.preload();
        this.muestra4 = new Sample({ scene: this, x: 700, y: 50, widht: 5, height: 5 });
        this.muestra4.preload();
        this.tornado1 = new Tornado({ scene: this, x: 100, y: 50, width: 20, height: 20 });
        this.tornado1.preload();
        this.tornado2 = new Tornado({ scene: this, x: 500, y: 250, width: 20, height: 20 });
        this.tornado2.preload();

    }

    create() {

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
        //this.iconoTornado2.setScale(1.2);
        this.iconoBase = this.physics.add.sprite(400, 300, 'base');
        this.iconoCrater1 = this.physics.add.sprite(440, 150, 'invisibleCrater');
        this.iconoCrater2 = this.physics.add.sprite(170, 470, 'invisibleCrater');
        this.iconoCrater3 = this.physics.add.sprite(668, 170, 'invisibleCrater');
        this.iconoCrater4 = this.physics.add.sprite(730, 420, 'invisibleCrater');
        this.iconoMuestra1 = this.physics.add.sprite(440, 500, 'sample');
        this.iconoMuestra2 = this.physics.add.sprite(600, 450, 'sample');
        this.iconoMuestra3 = this.physics.add.sprite(40, 40, 'sample');
        this.iconoMuestra4 = this.physics.add.sprite(700, 50, 'sample');
        /*this.iconoTornado1 = this.physics.add.sprite(100, 100, 'tornado');
        this.iconoTornado2 = this.physics.add.sprite(400, 250, 'tornado');
        [this.iconoTornado1, this.iconoTornado2].forEach( item => {
            item.displayHeight = 50;
            item.displayWidth = 50;
       })*/

        this.iconoCrater1.displayWidth = 120;
        this.iconoCrater1.displayHeight = 120;
        this.iconoCrater2.displayWidth = 220;
        this.iconoCrater2.displayHeight = 110;
        this.iconoCrater3.displayWidth = 45;
        this.iconoCrater3.displayHeight = 45;
        this.iconoCrater4.displayWidth = 60;
        this.iconoCrater4.displayHeight = 210;

        [this.iconoMuestra1, this.iconoMuestra2, this.iconoMuestra3,
        this.iconoMuestra4].forEach(item => {
            item.displayHeight = 20;
            item.displayWidth = 20;
        })

        this.jeep1.sprite = this.physics.add.sprite(
            this.jeep1.initialX,
            this.jeep1.initialY,
            'jeep_right');
        this.jeep1.sprite.setScale(0.15);

        this.iconoTornado1 = this.physics.add.sprite(100, 100, 'tornado');
        this.iconoTornado2 = this.physics.add.sprite(400, 250, 'tornado');
        [this.iconoTornado1, this.iconoTornado2].forEach(item => {
            item.displayHeight = 50;
            item.displayWidth = 50;
        })
        this.iconoTornado1.horizontalDirection = "derecha";
        this.iconoTornado2.horizontalDirection = "derecha";
        this.iconoTornado1.verticalDirection="abajo";
        this.iconoTornado2.verticalDirection="abajo";

        this.keysSetup();
        // this.jeep1.oxigenDecrement();//probando
        this.collisionListenerBetweenBaseAndJeep();
        this.collisionListenerBetweenCraterAndJeep();
        this.collisionListenerBetweenSampleAndJeep();
        this.collisionListenerBetweenTornadoAndJeep();
        //  this.display.messageBoxSetup();
        this.display.create();
        this.worldSetup();
        this.cameraSetup();

        this.jeep1.sprite.setCollideWorldBounds(true);
        this.iconoTornado1.setCollideWorldBounds(true);
        this.iconoTornado2.setCollideWorldBounds(true);


    }



    loadImagesFunction() {
        this.load.image('base', '../../../assets/images/iconobase.png');
        this.load.image('bg', '../../../assets/images/suelo2.jpg');
        this.load.image('invisibleCrater', '../../../assets/images/enBlanco.png');
        this.load.image('sample', '../../../assets/images/muestras2.gif');
        this.load.image('tornado', '../../../assets/images/tornado2.gif');


   };

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
        this.moveTornado(this.iconoTornado1);
        this.moveTornado(this.iconoTornado2);

    }



    //metodo para mover el tornado
    moveTornado(tornado: Physics.Arcade.Sprite) {
        let speed = 2
        let directionX = 1;
        let directionY = 1;
        let signo=Phaser.Math.Between(0, 2);//vibracion
        

        if (tornado.horizontalDirection === 'izquierda') {
            directionX = -directionX*signo
        }
        if (tornado.verticalDirection === 'abajo') {
            directionY = -directionY*signo
        }
        if (tornado.horizontalDirection === 'derecha') {//probando
            directionX = directionX*signo
        }

        directionX = directionX * speed;
        directionY = directionY * speed;
        tornado.x = tornado.x + directionX;
        tornado.y = tornado.y + directionY;
        this.bounceTornado(tornado);
    }

    toggleMusic(forcetrue = false) {
        if (!this.musicIsPlaying || forcetrue) {
            this.bgMusic.play();
            this.musicIsPlaying = true;
        }
        else {
            this.bgMusic.stop();
            this.musicIsPlaying = false;
        }
    }

    //deteccion de colision de tormenta con el borde y rebote
    bounceTornado(tornado: Physics.Arcade.Sprite) {

        var top = this.physics.world.bounds.top;
        var bottom = this.physics.world.bounds.bottom;
        var left = this.physics.world.bounds.left;
        var right = this.physics.world.bounds.right;

        this.display.message(`Far top border: ${top}, \nTornado y: ${tornado.y} \n directionX: ${tornado.horizontalDirection} \ndirectionY: ${tornado.verticalDirection}`);
        if ((tornado.x + 23) === right) {
            tornado.horizontalDirection = "izquierda";
            this.display.message(`revotandoTornado izquierda `);
        }
        if ((tornado.x - 23) === left) {
            tornado.horizontalDirection = "derecha";
            this.display.message(`revotandoTornado derecha `);
        }
        if((tornado.y+21)===bottom){
            tornado.verticalDirection = "abajo";
            this.display.message(`revotandoTornado abajo `);
        }
        if((tornado.y-21)===top){
            tornado.verticalDirection = "arriba";
            this.display.message(`revotandoTornado arriba `);
        }
    }

    collisionListenerBetweenBaseAndJeep() {
        this.physics.add.collider(
            this.iconoBase,
            this.jeep1.sprite
            this.baseHit,
            null,
            this);
    }
    collisionListenerBetweenSampleAndJeep() {
        this.physics.add.collider(
            this.iconoMuestra1,
            this.jeep1.sprite,
            this.collectSampleHit,
            null,
            this);

        this.physics.add.collider(
            this.iconoMuestra2,
            this.jeep1.sprite,
            this.collectSampleHit,
            null,
            this);
        this.physics.add.collider(
            this.iconoMuestra3,
            this.jeep1.sprite,
            this.collectSampleHit,
            null,
            this);
        this.physics.add.collider(
            this.iconoMuestra4,
            this.jeep1.sprite,
            this.collectSampleHit,
            null,
            this);

    }

    //colisiones entre jeep y tormentas
    collisionListenerBetweenTornadoAndJeep() {
        this.physics.add.collider(
            this.jeep1.sprite,
            this.iconoTornado1,
            // this.jeep1.sprite,
            this.tornadoHit,
            null,
            this);

        this.physics.add.collider(
            this.jeep1.sprite,
            this.iconoTornado2,
            //this.jeep1.sprite,
            this.tornadoHit,
            null,
            this);


    }
  
    collisionListenerBetweenCraterAndJeep() {
        this.physics.add.collider(
            this.iconoCrater1,
            this.jeep1.sprite,
            this.collisionHit,
            null,
            this);

        this.physics.add.collider(
            this.iconoCrater2,
            this.jeep1.sprite,
            this.collisionHit,
            null,
            this);
        this.physics.add.collider(
            this.iconoCrater3,
            this.jeep1.sprite,
            this.collisionHit,
            null,
            this);
        this.physics.add.collider(
            this.iconoCrater4,
            this.jeep1.sprite,
            this.collisionHit,
            null,
            this);

        //    this.physics.add.collider(
        // this.crater1.craterImage,
        //     this.jeep1.sprite,
        //    this.jeep1.collisionWithCrater,
        //     null,
        //     this);
    }
    collisionHit() {

        this.display.message(`Crater1 colission`);
        this.collision = this.jeep1.direction;
    }
    tornadoHit() {

        this.display.message(`Crater1 colission`);
        this.jeep1.onTornadoCollision();
        // this.collision = this.jeep1.direction;
    }

    collectSampleHit(sample, jeep) {
        sample.visible = false;
        this.jeep1.onSampleCollected();
        this.Comprobar();

    }
    Comprobar() {
        if (this.iconoMuestra1.visible == false && this.iconoMuestra2.visible == false
            && this.iconoMuestra3.visible == false && this.iconoMuestra4.visible == false) {
            this.display.message(`all Samples Collected, return to base`);
        }
    }

    playerHit() {//probando para colision con crater1

        this.display.message(`Crater colission in ${this.jeep1.sprite.x} and ${this.jeep1.sprite.y}`);

    }

    baseHit() {

        this.display.message(`Base colission in ${this.jeep1.sprite.x} and ${this.jeep1.sprite.y}`);
        this.jeep1.repairShield();
    }
