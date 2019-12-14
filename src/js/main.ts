import { Game, AUTO,Scale } from 'phaser';
import { SceneOne } from './scenes/SceneOne';

const mySettings = {
    type: AUTO,
    width: 890,
    height: 590,
    scale:
    {
        mode: Scale.FIT,
        autoCenter: Scale.CENTER_BOTH
    },
    scene: [
        SceneOne
    ],
    parent: 'my-container',
    render: {
        pixelArt: true
    },
    physics: {
        default: "arcade",
        arcade: {
            debug: false
        }
    }
}

//only run when  the DOM Content is Loaded.

document.addEventListener('DOMContentLoaded', () => {
    let myContainerDiv = document.getElementById("my-container");//obtain a piece of html, now we can control it with js
    myContainerDiv.innerHTML += '';

   let game =  new Game(mySettings);
   window.game = game;
});