import { Physics,GameObjects,Math } from 'phaser';
import { SceneOne } from './scenes/SceneOne';


export class Jeep2 {
  
        
    

    initialX: number
    initialY: number
    scene: SceneOne
    messageBox
    sprite: Physics.Arcade.Sprite
    bateria: number;
    //oxigen: number;//variable oxigeno
    oxigen: number=10;//cantidad inicial oxigeno7500
    oxigenBajoNivel=20;//nivel bajo de oxigeno
    bateriaInicial: number = 1000;
    bateriaBajoNivel = 100
    initialDirection: string = 'right';
    direction: string;
    currentImage: any;
    imageTextures: Array<any> = [];
    sounds: Array<any> = [];
    fatalFailure: boolean = false;
    speed: number = 1;
    limite: number =62;//probando
    engineRunning: boolean = false;
    batteryWarningOn: boolean = false;
    oxigenWarning: boolean= false;//booleano alerta oxigeno
    config: any;
    notMoving: boolean = true;
    notMusic: boolean = false;

    escudosInitial = 100;//1000
    shield = this.escudosInitial;
    escudosNivelDeAdvertencia = 100;
    escudosDestruidos = false;


    constructor(scene: Scene, x: number, y: number, config) {
        this.scene = scene;
        this.initialX = x;
        this.config = config;
        this.initialY = y;
        this.preloadImages();
        this.preloadAudios();
        this.reset();
    }

    repairShield(){
        if(this.shield<1000){
        this.shield++;
        this.playSound('ShieldReload');   
        }else{
            this.shield=1000;
        }
      
    }
    preloadImages() {

        this.config.images.forEach((imagen) => {
            let dir = this.config.images_dir;
            let url = `${dir}${imagen.src}`;
            let key = imagen.id;
            this.scene.load.image(key, url);
            this.imageTextures[imagen.direction] = this.scene.textures.get(key);
        });
    }

    preloadAudios() {
        this.config.audio.forEach((audio) => {
            let dir = this.config.audio_dir;
            let url = `${dir}${audio.src}`;
            let key = audio.id;
            this.scene.load.audio(key, [url]);
            //console.table(audio.options);
            //this.sounds[key] = this.scene.sound.add(key, audio.options);
        });
    }
    addAudios() {
        this.config.audio.forEach((audio) => {
            // let dir = this.config.audio_dir;
            //  let url = `${dir}${audio.src}`;
            let key = audio.id;
            //   this.scene.load.audio(key, [url]);
            //  console.table(audio.options);
            this.sounds[key] = this.scene.sound.add(key, audio.options);
        });
    }

    reset() {
        if (this.sprite) {
            this.sprite.x = this.initialX;
            this.sprite.y = this.initialY;
        }
        this.bateria = this.bateriaInicial;
        this.setDirection(this.initialDirection);
    }

    displayCoordinates() {
        this.message(`move to ${this.sprite.x} and ${this.sprite.y}`);
    }
    message(msg = '') {
        // this.scene.message(msg);
    }

    setDirection(direction: string) {
        this.direction = direction;
        this.setSprite(direction)
    }

    setSprite(key) {
        this.currentImage = this.imageTextures[key];
        if (this.sprite) {
            this.sprite.setTexture(`jeep_${key}`);
        }
    }

    onCraterCollision() {
       if(this.shield>0){
        this.shield--;
        this.playSound('ImpactoCrater');
       }else{
            this.shield=0;
        }
    }

    _move(direction: string, dx = 1, dy = 1) {
        if (this.scene.collision === direction) {
            this.onCraterCollision();
            // console.log("colision con crater 1");
        }
        else {
            this.scene.collision = null;
            if (!this.fatalFailure) {
                this.notMoving = false;
                this.arranque();
                if (!this.fatalFailure) {
                    this.sprite.x = this.sprite.x + (dx * this.speed);
                    this.sprite.y = this.sprite.y + (dy * this.speed);

                    this.setDirection(direction);
                    // this.playSound('Freno');
                    this.bateria--;
                }
            }
            else {
                this.notMoving = true;
            }
        }
    }

    moveRight(dx = 2) {
        this._move("right", dx, 0);
    }

    moveLeft(dx = -2) {
        this._move("left", dx, 0);
    }

    moveUp(dy = -2) {
        this._move("up", 0, dy);
    }

    moveDown(dy = 2) {
        this._move("down", 0, dy);
    }

    playSound(soundID) {

        //  let loop = this.config.audio.[soundID].options.loop;

        // this.scene.sound.play(soundID);

        //console.table(this.sounds);
        // this.sounds[soundID].play && 
        console.log(soundID);
        if (this.sounds[soundID].seek === 0) {
            this.sounds[soundID].play();
        }

        // if (soundID == 'BateriaBaja') {
        // this.scene.sound.play(soundID);
        // this.sounds[soundID].loop();
        //}
    }

    arranque() {
        if (!this.engineRunning) {
            this.playSound('Jeep');
            this.engineRunning = true;
            this.playSound('Arranque');
        }
    }

    stop() {

    }

    onBreak() {
        this.notMoving = true;

        //            if (this.sounds['Jeep'].seek != 0) {
        this.sounds['Jeep'].stop();

    }

    break() {
        this.playSound('Freno');
    }
    //recarga de bateria con la letra r
    rechargeBattery() {
        this.bateria++;
        this.playSound('RecargaEnergia');
    }

    oxigenDecrement(){//va reduciendo oxigeno del jeep
     
       console.log(this.limite);
        if(this.oxigen>0){
           this.limite--;
            if(this.limite==0){
                this.oxigen--;
                this.limite=62;
            }
          //  console.log(this.oxigenInicial);
        }
        else{
            this.oxigen=0;
           // console.log(this.oxigenInicial);
        } 
    }

    get bateriaAgotado() {
        return this.bateria <= 0;
    }

    jeepStopCheck() {
        if (this.notMoving) {
            this.stopSound('Jeep');
        }
        else {
            this.playSound('Jeep');
        }
    }

    // informa si la batería está por debajo de 150, se repite continuamente
    batteryCheck() {
        //if(!this.batteryWarningOn){}
        if (this.bateriaAgotado) {
            this.onDeadBattery();
            return;
        }
        if (!this.batteryWarningOn) {

            if (this.bateria <= this.bateriaBajoNivel) {
                this.batterLowWarningOn();
            }
        }
    }
    collisionWithCrater() {
        // this.playSound('ImpactoCrater');
    }

    batterLowWarningOn() {
        this.batteryWarningOn = true;
        this.playSound('BateriaBaja');
    }

    batteryLowWarningOff() {
        this.stopSound('BateriaBaja');
    }

    shutDown() {
        this.batteryLowWarningOff();
    }
    onFailure(data, fatalFailure = false) {
        if (fatalFailure) {
            this.fatalFailure = true;
            this.shutDown();
        }
        // this.feedbackHandler('failure', data);
    }
    //funcion que reduce oxigeno continuamente
    oxigenCheck(){
        //oxigenInicial=50;
        if(this.oxigen<this.oxigenBajoNivel && this.oxigen>0){
            this.playSound('oxigenoBajo');
        }
    }

    onDeadBattery() {
        if (!this.fatalFailure) {
            this.playSound('Energia');
            this.batteryLowWarningOff();
            this.playSound('Freno');
            this.onFailure('dead-battery', true);
        }
    }

    stopSound(soundID) {
        this.sounds[soundID].stop();
    }

    update() {
        if (!this.fatalFailure) {
            // this.shieldCheck();
            this.oxigenDecrement();
            this.oxigenCheck();
            this.batteryCheck();
            this.jeepStopCheck();
            this.scene.display.updateShieldMessage(this.shield);
            this.scene.display.updateEnergyMessage(this.bateria);
            this.scene.display.updateOxigenMessage(this.oxigen);
        }
    }

    // se produce cuando el jeep recarga escudos en la base
    shieldReload(playSound = true) {
        if (playSound) {
            this.playSound('ShieldReload');
        }
        this.shield = this.escudosInitial;
        this.escudosDestruidos = false;

    }

    get shieldLow() {
        return this.shield <= this.escudosNivelDeAdvertencia && this.shield > 0;
    }

    shieldCheck() {
        if (this.shield == 0) {
          this.onShieldsExhausted();
          return;
        }
    
        if (this.shieldLow) {
          this.shieldLowWarningOn();
        }
      }

        shieldLowWarningOn() {
            this.playSound('EscudosBajos');
            this.playSound('EscudosBajos2');

        }

        shieldLowWarningOff() {
            this.stopSound('EscudosBajos');
            this.stopSound('EscudosBajos2');
        }

        onShieldsExhausted() {
            if (!this.fatalFailure) {
                this.stopSound('EscudosBajos');
                this.stopSound('EscudosBajos2');
                this.onFailure('no-shields', true);
            }
        }


    }