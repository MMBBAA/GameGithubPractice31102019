import { Scene, Physics } from 'phaser';
//import { Jeep } from '../Jeep';
import { Jeep2 } from '../Jeep2';

export class SceneOne extends Scene {
    iconobase: Phaser.GameObjects.Image | undefined;

    jeep: Jeep2;
    jeep2: Jeep2;

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
        this.jeep = new Jeep2(this, 400,300);
        this.jeep.sprite = this.add.sprite(this.jeep.x,this.jeep.y, 'jeepRight');
        this.jeep.sprite.setScale(0.2);
        this.jeep2 = new Jeep2(this, 40,120);
        this.jeep2.sprite = this.add.sprite(this.jeep2.x,this.jeep2.y, 'jeepRight');
        this.jeep2.sprite.setScale(0.2);

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
