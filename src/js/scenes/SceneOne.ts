import { Scene, Physics } from 'phaser';
import { Jeep } from '../Jeep';

export class SceneOne extends Scene {
    iconobase: Phaser.GameObjects.Image | undefined;

    constructor() {
        super({
            key: 'SceneOne'
        })
    }

    preload() {
        this.load.image('base', '../../../assets/images/iconobase.png');
    }

    create() {
        this.iconobase = this.add.image(400, 300, 'base');
    //    this.myLogo.setScale(0.3);

  this.jeep = new Jeep(this, 200, 400);
    }

    update() {
   //     this.myLogo.angle += 12;
        // this.myLogo.x += 0.5
    }
}
