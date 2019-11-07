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

        this.jeep.sprite = this.physics.add.sprite(this.jeep.initialX, this.jeep.initialY, 'jeep_right');
        this.jeep.sprite.setScale(0.15);

        this.jeep2.sprite = this.physics.add.sprite(this.jeep2.initialX, this.jeep2.initialY, 'jeep_right');
        this.jeep2.sprite.setScale(0.15);
        this.keysSetup();
        this.collisionSetup();
        this.collisionBaseAndJeepSetup();
        this.messageBoxSetup();
        // this.setupMouse();
        // this.cameraSetup();


        this.physics.world.setBounds(0, 0, 800 + 300, 600 + 200);
        this.physics.world.setBoundsCollision(true);
        this.camera = this.cameras.main;
        this.camera.setBounds(0, 0, 800 + 300, 600 + 200)
        this.camera.startFollow(this.jeep.sprite);
        this.controls = new Phaser.Cameras.Controls.FixedKeyControl(
            {

                camera: this.cameras.main,
            })
        this.jeep.sprite.setCollideWorldBounds(true);
    }


    setupMouse() {
        // Convert the mouse position to world position within the camera
        const worldPoint = this.input.activePointer.positionToCamera(this.cameras.main);
    }

    mouseCheck() {
        const pointer = this.input.activePointer;
        const worldPoint = pointer.positionToCamera(this.cameras.main);
        if (pointer.isDown) {
            this.message(`Mouse clicked at ${worldPoint.x} ${worldPoint.y}`);
        }
    }

    loadImagesFunction() {
        this.load.image('base', '../../../assets/images/iconobase.png');
    }

    loadSoundsFunction() { }

    cameraSetup() {
        // const camera = this.cameras.main;
        // camera.setViewport(150, 150, 300, 300);

        // Phaser supports multiple cameras, but you can access the default camera like this:

        // Constrain the camera so that it isn't allowed to move outside the width/height of tilemap
        // this.camera.setBounds(0, 0, this.sys.scale.width, this.sys.scale.height);

        const cursors = this.input.keyboard.createCursorKeys();
        const controlConfig = {
            camera: this.cameras.main,
            left: cursors.left,
            right: cursors.right,
            up: cursors.up,
            down: cursors.down,
            speed: 0.5
        };
        this.controls = new Phaser.Cameras.Controls.FixedKeyControl(controlConfig);

        // Limit the camera to the map size
        // this.cameras.main.setBounds(0, 0, this.sys.scale.width, this.sys.scale.height);
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
    update(delta, time) {
        this.controls.update(delta);
        // this.cameraSetup();
        this.keysListener();
        this.jeep.displayCoordinates();
        //this.cameras.main.scrollX = this.jeep2.sprite.x;
        // this.cameras.main.scrollY = this.jeep2.sprite.y;
        // this.camera.main.world.setScroll(this.jeep.x, this.jeep.y)
        // this.cameras.main.worldView.centerX = this.jeep.x; 
        // this.cameras.main.setScroll(this.jeep.x, this.jeep.y)
        // this.cameras.main.startFollow(this.jeep.sprite);
        const collision = this.physics.collide(
            this.jeep.sprite,
            this.iconoBase);

        this.physics.world.on('worldbounds',
            (body, blockedUp, blockedDown, blockedLeft, blockedRight) => {
                alert('hit a wall')
            });
        // console.log(`collision: ${collision}`);

        // if (!collision) {
        //     this.baseHit = false

        // } else {
        //     this.baseHit = true
        // }


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
