import { Scene, Physics, Input } from 'phaser';
//import { Jeep } from '../Jeep';
import { Jeep2 } from '../Jeep2';

export class SceneOne extends Scene {
    iconobase: Phaser.GameObjects.Image | undefined;

    jeep: Jeep2;
    jeep2: Jeep2;
    key_W: Input.Keyboard.Key;
    key_D: Input.Keyboard.Key;
    key_A: Input.Keyboard.Key;
    key_S: Input.Keyboard.Key;
    iconoBase: Phaser.GameObjects.Sprite;


    constructor() {
        super({
            key: 'SceneOne'
        })
    }

    preload() {
        this.load.image('base', '../../../assets/images/iconobase.png');
        this.load.image('jeepRight', '../../../assets/images/jeepRight.png');
    }

    create() {
        this.iconoBase = this.physics.add.sprite(400, 300, 'base');
        this.jeep = new Jeep2(this, 400, 300);

        this.jeep.sprite = this.physics.add.sprite(this.jeep.x, this.jeep.y, 'jeepRight');
        this.jeep.sprite.setScale(0.15);
        this.jeep2 = new Jeep2(this, 40, 120);
        this.jeep2.sprite = this.physics.add.sprite(this.jeep2.x, this.jeep2.y, 'jeepRight');
        this.jeep2.sprite.setScale(0.15);
        this.keysSetup();
        this.collisionSetup();
        this.collisionBaseAndJeepSetup();

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
    }
    collisionSetup() {
        this.physics.add.collider(
            this.jeep.sprite,
            this.jeep2.sprite,
            this.playerHit,
            null,
            this);
    }

    /*//función para controlar colisión con los bordes 
    collisionBorderSetup() {
        //desarrollar codigo
    }*/

    collisionBaseAndJeepSetup() {
        this.physics.add.collider(
            this.iconoBase,
            this.jeep.sprite,
            this.baseHit,
            null,
            this);
    }

    playerHit() {
        this.add.text(
            16,
            16,
            'ouch',
            {
                fontSize: '32px',
                fill: 'red'
            });
    }
    baseHit() {
        this.add.text(
            16,
            16,
            'baseColission',
            {
                fontSize: '32px',
                fill: 'yellow'
            });
    }
    //mensaje de colisión con bordes de pantalla
   /* borderHit() {
        this.add.text(
            16,
            16,
            'border Colission',
            {
                fontSize: '32px',
                fill: 'green'
            });
    }*/
}
}
