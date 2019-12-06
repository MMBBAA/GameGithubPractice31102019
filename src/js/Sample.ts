import {  Geom, GameObjects, Scene } from 'phaser';

export class Sample {
    x;
    y;
    width;
    height;

    contactSound;
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
      //  this.contactSound
        this.contactSound.play();
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
        }*/
        }
        



  