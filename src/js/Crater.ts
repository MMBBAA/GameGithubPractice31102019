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
       
    }

    collisionHandler(obj = null) {
        this.impactSound.play();
    }



    draw() {

    }


}
