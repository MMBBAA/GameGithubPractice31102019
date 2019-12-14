import { Scene, GameObjects, Physics, Input, Cameras } from 'phaser';
import { Jeep2 } from '../Jeep2';
import { JeepConfig } from './JeepConfig';
import { Display } from '../Display';

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
    onBase: boolean = false;
    allCollected: boolean = true;
    messageBox: Phaser.GameObjects.Text;
    bgImg: Phaser.GameObjects.Sprite;
    musicIsPlaying: boolean = false;
    victory: boolean = false;
    defeat: boolean = false;
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

    /** constructor, llama a constructor de la clase Scene. */
    constructor() {
        super({
            key: 'SceneOne'
        })
        this.display = new Display({ scene: this });
    }

    /** preload, carga las imágenes y sonidos */
    preload() {

        this.jeep1 = new Jeep2(this, 400, 300, JeepConfig);
        this.loadImagesFunction();
        this.load.audio('musicaFondo', '../../assets/sounds/musica.mp3');
    }

    /**create(), crea el juego */
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
        this.iconoBase = this.physics.add.sprite(400, 300, 'base');
        this.iconoCrater1 = this.physics.add.sprite(440, 150, 'invisibleCrater');
        this.iconoCrater2 = this.physics.add.sprite(170, 470, 'invisibleCrater');
        this.iconoCrater3 = this.physics.add.sprite(668, 170, 'invisibleCrater');
        this.iconoCrater4 = this.physics.add.sprite(730, 420, 'invisibleCrater');
        this.iconoMuestra1 = this.physics.add.sprite(440, 500, 'sample');
        this.iconoMuestra2 = this.physics.add.sprite(600, 450, 'sample');
        this.iconoMuestra3 = this.physics.add.sprite(40, 40, 'sample');
        this.iconoMuestra4 = this.physics.add.sprite(700, 50, 'sample');

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
        this.iconoTornado1.verticalDirection = "abajo";
        this.iconoTornado2.verticalDirection = "abajo";

        this.keysSetup();
        this.collisionListenerBetweenBaseAndJeep();
        this.collisionListenerBetweenCraterAndJeep();
        this.collisionListenerBetweenSampleAndJeep();
        this.collisionListenerBetweenTornadoAndJeep();
        this.display.create();
        this.worldSetup();
        this.cameraSetup();
        this.stopGameJeep();
        this.jeep1.sprite.setCollideWorldBounds(true);
        this.iconoTornado1.setCollideWorldBounds(true);
        this.iconoTornado2.setCollideWorldBounds(true);
        this.checkGameState();
        this.positionReturnBase();
    }

    /** loadImagesFunction(), carga de imágenes en scene */
    loadImagesFunction() {
        this.load.image('base', '../../../assets/images/iconobase.png');
        this.load.image('bg', '../../../assets/images/suelo2.jpg');
        this.load.image('invisibleCrater', '../../../assets/images/enBlanco.png');
        this.load.image('sample', '../../../assets/images/muestras2.gif');
        this.load.image('tornado', '../../../assets/images/tornado2.gif');
    };

    /** worldSetup(), añade físicas y bordes de colisión al mundo del juego */
    worldSetup() {
        // create an invisible rectangle, that deines edges of the world
        this.physics.world.setBounds(0, 0, this.planetMarsWidth, this.planetMarsHeight);
        // Enables or disables collisions on each edge of the World boundary.
        this.physics.world.setBoundsCollision(true);//activa o desactiva los bordes del mundo
    }

    /** función cameraSetup(), permitiría seguir el movimiento del jeep con una camara, no se ha empleado*/
    cameraSetup() {
        this.camera = this.cameras.main;
        // Camera can move to bounds of world
        this.camera.setBounds(0, 0, this.planetMarsWidth, this.planetMarsHeight)

        // make camera follow jeep    
        //this.camera.startFollow(this.jeep1.sprite);//al descomentar la camara persigue al jeep
    }
    /** función keySetup(): keyboard events*/
    keysSetup() {
        this.key_M = this.input.keyboard.addKey(Input.Keyboard.KeyCodes.M);
        this.key_A = this.input.keyboard.addKey(Input.Keyboard.KeyCodes.A);
        this.key_W = this.input.keyboard.addKey(Input.Keyboard.KeyCodes.W);
        this.key_S = this.input.keyboard.addKey(Input.Keyboard.KeyCodes.S);
        this.key_D = this.input.keyboard.addKey(Input.Keyboard.KeyCodes.D);
        this.key_R = this.input.keyboard.addKey(Input.Keyboard.KeyCodes.R);

    }
    /** keyListener(), switch, mueve el jeep según el evento de tecla abajo se produzca */
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

        if (this.key_D.isUp && this.key_A.isUp && this.key_S.isUp
            && this.key_W.isUp) this.jeep1.stop();
    }

    /** function update(): actualiza continuamente funciones mientras el juego está en marcha */
    update(delta, time) {

        this.keysListener();
        this.jeep1.update();
        this.checkGameState();
        this.positionReturnBase();
        this.stopGameJeep();
        this.moveTornado(this.iconoTornado1);
        this.moveTornado(this.iconoTornado2);
        // this.cameraSetup();//not using it

    }
    /** checkGameState, comprueba estados del juego y envia mensaje de victoria o derrota*/
    checkGameState() {

        if ((this.jeep1.oxigen == 0) || (this.jeep1.shield == 0)) {
            this.defeat = true;
            this.display.message(`Mision fracasada`);
        }
        if (this.iconoMuestra1.visible == false && this.iconoMuestra2.visible == false
            && this.iconoMuestra3.visible == false && this.iconoMuestra4.visible == false
            && this.onBase == true) {
            this.victory = true;
            this.display.message(`Mision cumplida`);
        }
    }
    /** stopGameJeep(): detiene el juego cuando se cumpla la victoria o la derrota*/
    stopGameJeep() {
        if (this.victory == true || this.defeat == true) {
            this.toggleMusic(false);
            this.scene.pause();
            this.jeep1.onBreak();
        }
    }
    /** positionReturnBase() cambia el valor de onBase a true/false segun posición de jeep*/
    positionReturnBase() {
        if ((this.jeep1.sprite.x >= 316 && this.jeep1.sprite.x <= 484)
            && (this.jeep1.sprite.y >= 252 && this.jeep1.sprite.y <= 370)) {
            this.onBase = true;
        }
        else {
            this.onBase = false;
            console.log(this.onBase);
        }
    }

    /** moveTornado(), metodo para mover el tornado*/
    moveTornado(tornado: Physics.Arcade.Sprite) {
        let speed = 2
        let directionX = 1;
        let directionY = 1;
        let signo = Phaser.Math.Between(0, 2);//vibracion

        if (tornado.horizontalDirection === 'izquierda') {
            directionX = -directionX * signo
        }
        if (tornado.verticalDirection === 'abajo') {
            directionY = -directionY * signo
        }
        if (tornado.horizontalDirection === 'derecha') {
            directionX = directionX * signo
        }

        directionX = directionX * speed;
        directionY = directionY * speed;
        tornado.x = tornado.x + directionX;
        tornado.y = tornado.y + directionY;
        this.bounceTornado(tornado);
    }

    /** toogleMusic() activa o desactiva la musica */
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

    /**bounceTornado(), deteccion de colision de tormenta con borde y rebote*/
    bounceTornado(tornado: Physics.Arcade.Sprite) {

        var top = this.physics.world.bounds.top;
        var bottom = this.physics.world.bounds.bottom;
        var left = this.physics.world.bounds.left;
        var right = this.physics.world.bounds.right;

        if ((tornado.x + 23) === right) {
            tornado.horizontalDirection = "izquierda";
        }
        if ((tornado.x - 23) === left) {
            tornado.horizontalDirection = "derecha";
        }
        if ((tornado.y + 21) === bottom) {
            tornado.verticalDirection = "abajo";
        }
        if ((tornado.y - 21) === top) {
            tornado.verticalDirection = "arriba";
        }
    }
    /**listener de colisión entre jeep y base*/
    collisionListenerBetweenBaseAndJeep() {
        this.physics.add.collider(
            this.iconoBase,
            this.jeep1.sprite
            this.baseHit,
            null,
            this);
    }
    /**listener de colisión entre muestras y base*/
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

    /**listener de colisión entre jeep y tormentas*/
    collisionListenerBetweenTornadoAndJeep() {
        this.physics.add.collider(
            this.jeep1.sprite,
            this.iconoTornado1,
            this.tornadoHit,
            null,
            this);

        this.physics.add.collider(
            this.jeep1.sprite,
            this.iconoTornado2,
            this.tornadoHit,
            null,
            this);
    }

    /**listener de colisión entre jeep y crateres*/
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

    }

    collisionHit() {
        this.collision = this.jeep1.direction;
    }
    tornadoHit() {
        this.jeep1.onTornadoCollision();
    }

    /** recogida de muestras, comprueba si todas las muestras han sido recogidas*/
    collectSampleHit(sample, jeep) {
        sample.visible = false;
        this.jeep1.onSampleCollected();
        this.Comprobar();
    }
    /** Comprobar(), comprueba que los recursos han sido recogidos*/
    Comprobar() {
        if (this.iconoMuestra1.visible == false && this.iconoMuestra2.visible == false
            && this.iconoMuestra3.visible == false && this.iconoMuestra4.visible == false) {
            this.display.message(`all Samples Collected, return to base`);
        }
    }

    /* baseHit, llama a repairShield, la cual repara el jeep**/
    baseHit() {
        this.jeep1.repairShield();
    }