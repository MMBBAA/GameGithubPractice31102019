import { Scene, Physics } from 'phaser';
//import { Jeep } from '../Jeep';
import { Jeep2 } from '../Jeep2';

export class SceneOne extends Scene {
    iconobase: Phaser.GameObjects.Image | undefined;

    jeep: Jeep2;

    constructor() {
        super({
            key: 'SceneOne'
        })
   // this.jeep=new Jeep2();
    }

    preload() {
        this.load.image('base', '../../../assets/images/iconobase.png');
        this.load.image('jeepRight', '../../../assets/images/jeepRight.png');
        
    }

    create() {
        this.iconobase = this.add.sprite(400, 300, 'base');
        this.jeep = new Jeep2(this, 10,20);
        this.jeep.sprite = this.add.sprite(400, 300, 'jeepRight');
        this.jeep.sprite.setScale(0.2);

  //this.jeep = new Jeep(this, 200, 400);
  
    
    }

    update() {
   //     this.myLogo.angle += 12;
        // this.myLogo.x += 0.5
       this.jeep.x++;
       this.jeep.y++;
        this.jeep.displayCoordinates();
       // this.jeep.movement(30,100);
    }
}
