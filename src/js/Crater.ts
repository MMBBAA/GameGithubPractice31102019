import {  Geom, GameObjects, Scene } from 'phaser';

export class Crater {
    x;
    y;
    width;
    height;

    impactSound;
    scene: Scene;
    craterImage: any;

    constructor(obj) {
        this.scene = obj.scene;
        this.x = obj.x;
        this.y = obj.y;
        this.width = obj.width;
        this.height = obj.height;
    }

    preload() {
        //  this.impactSound = this.scene.load.audio("craterColission", "../../assets/music/Sonido_Colision_Crater.mp3");
    }

    collisionHandler(obj = null) {
        this.impactSound.play();
        // if (obj) {
        //     obj.collisiontHandler(this);
        // 	    this.jeep.escudos -= 50;
        // this.collisionHurricane();
        // this.hurricaneImpact();
        // }
    }
    /*
        get Tx() {
        return this.x + this.height;
        }*/
    /*
        get Ty() {
        return this.y + this.height;
        }*/
    /*
        _inRange(x, min, max) {
        return (x - min) * (x - max) <= 0;
        }*/

    // detector de colisión con el crater
    /*
    hasCollided(obj) {
	return this._inRange(obj.x, this.x, this.Tx) ||
	    this._inRange(obj.y, this.y, this.Ty) ||
	    this._inRange(obj.Tx, this.x, this.Tx) ||
	    this._inRange(obj.Ty, this.y, this.Ty);
    }*/
    /*
        detector(obj) {
        if (this.hasCollided(obj)) {
            this.collisionHandler(obj);
        }
        }*/


    draw() {
   // this.craterImage =  new GameObjects.Zone(this.scene, 370, 80 , 140 , 140);
/*var circle = new Phaser.Geom.Circle(50, 50, 25);
   this.craterImage = this.scene.add.graphics({ fillStyle: { color: 0xff0000 } };
    this.craterImage.fillCircleShape(circle);
  this.scene.physics.add.existing(this.craterImage);*/
    }

    hi() {
     /*   alert("hi");
        console.log('hi');*/
    }
}
