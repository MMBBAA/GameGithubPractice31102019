 import {  Scene, GameObjects } from 'phaser';

export class Jeep2 {

    initialX: number
    initialY: number
    x: number 
    y: number
    scene: Scene
    messageBox
    sprite: GameObjects.Sprite

    constructor(scene: Scene, x: number, y: number) {
        this.scene = scene;
        this.initialX = x;
        this.initialY = y;
        this.reset();
        this.createMessageBox();
    }
    //creacion de un metodo
    reset() {
        this.x = this.initialX;
        this.y = this.initialY;
    }
    //función message
    createMessageBox(msg='', x = 16, y = 16) {
        this.messageBox =
            this.scene.add.text(
                x,
                y,
                msg,
                {
                    fontSize: '20px',
                    fill: 'red'
                });
    }
    //función displayCoordinates
    displayCoordinates() {
        this.message(`move to ${this.x} and ${this.y}`);
    }
    message(msg=''){
        this.messageBox.setText(msg);
    }
    updateXYPhaser(){
        this.sprite.x=this.x;
        this.sprite.y=this.y;
    }




}