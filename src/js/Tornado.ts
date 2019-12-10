import {  Geom, GameObjects, Scene } from 'phaser';

export class Tornado {
    x;
    y;
    width;
    height;

    contactSound;
    scene: Scene;
    tornadoImage: any;

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

        this.contactSound.play();

    }