import { Scene } from 'phaser';

export class Display {
    messageBox: any;
    messageShieldBox: any;
    messagePowerBox: any;
    messageOxigenBox: any;
    add: any;
    scene: Scene;
    

    constructor(config:any) {
        this.scene = config.scene;
    }

    create(){
        this.shieldMessageBoxSetup();
        this.powerMessageBoxSetup();
        this.oxigenMessageBoxSetup();
        this.messageBoxSetup();
        
    }
    message(msg = '') {
        this.messageBox.setText(msg);
    }

    messageBoxSetup(msg = '', x = 50, y = 50) {
        this.messageBox =
            this.scene.add.text(
                x,
                y,
                msg,
                {
                    fontSize: '14px',
                    fill: 'white'
                });
    }

    updateShieldMessage(msg){
        this.messageShieldBox.setText(`SHIELD:${msg}`);
    }

    shieldMessageBoxSetup(msg = '', x = 350, y = 50) {
        //this.messageBox =
        this.messageShieldBox=
            this.scene.add.text(
                x,
                y,
                msg,
                {
                    fontSize: '14px',
                    fill: 'white'
                });
    }
    //mensaje de victoria o derrota
    checkGameStateBoxSetup(msg='',x=550,y=50){
        this.messageShieldBox=
            this.scene.add.text(
                x,
                y,
                msg,
                {
                    fontSize: '14px',
                    fill: 'white'
                });
    }

    updateEnergyMessage(msg){
        this.messagePowerBox.setText(`POWER:${msg}`);
    }



    powerMessageBoxSetup(msg = '', x = 450, y = 50) {
        //this.messageBox =
        this.messagePowerBox=
            this.scene.add.text(
                x,
                y,
                msg,
                {
                    fontSize: '14px',
                    fill: 'white'
                });
    }

    updateOxigenMessage(msg){
        this.messageOxigenBox.setText(`O2 Time:${msg}`);
    }

    oxigenMessageBoxSetup(msg = '', x = 550, y = 50) {
        //this.messageBox =
        this.messageOxigenBox=
            this.scene.add.text(
                x,
                y,
                msg,
                {
                    fontSize: '14px',
                    fill: 'white'
                });
    }
}
