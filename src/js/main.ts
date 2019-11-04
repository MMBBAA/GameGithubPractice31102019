import { Game, AUTO } from 'phaser';
import { SceneOne } from './scenes/SceneOne';

const mySettings = {
    type: AUTO,
    width: 800,
    height: 600,
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
            debug: true
        }
    }
}

//only run when  the DOM Content is Loaded.

document.addEventListener('DOMContentLoaded', () => {
    let myContainerDiv = document.getElementById("my-container");//obtain a piece of html, now we can control it with js
    myContainerDiv.innerHTML += '';

    new Game(mySettings);
});