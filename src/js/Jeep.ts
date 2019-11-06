import { Physics, Scene, GameObjects } from 'phaser'

export class Jeep {

  
  scene: Scene;
  sprite: Physics.Arcade.Sprite;


  height = 20;
  width = 20;
  radius = 20;

  escudosInitial = 1000;
  escudos = this.escudosInitial;
  escudosNivelDeAdvertencia = 100;
  escudosDestruidos = false;

  // segundos de oxigeno 7999
  oxigenTimeInitial = 7599;
  oxigenTime = this.oxigenTimeInitial;

  bateriaInitial = 100;  // 1000;
  bateria = this.bateriaInitial;
  bateriaBajoNivel = 50;  // 100;

  dirrecionInicio = "right";
  dirrecion = this.dirrecionInicio;
 
  xInitial = null;
  yInitial = null;
  x = null;
  y = null;

  speedY = 15;
  speedX = 10;
  images = [];
  sounds = [];
  currentImage = null;
  fatalFailure = false;

  

  constructor(scene, xInitial, yInitial, feedbackHandler) {
    this.scene = scene;
    this.xInitial = xInitial;
    this.yInitial = yInitial;
    // callback function used to alert of state change
    // accepts a string i.e. 'out-of-fuel'
    this.feedbackHandler = feedbackHandler;

    this.preload();

    return this;
  }

  preload() {
    this.loadImages();
    this.loadAudio();
  }

  loadImages() {
    this.assets.images.forEach((item) => {
      let key =  this.images[item.direction];  
      let url = `${this.assets.images_dir}${item.src}`;
      this.scene.load(key, url);
      this.images[id] = this.scene.textures.get(key); 
    }
  }

  addImage(x, y, key) { 
    this.scene.add.image(x, y, key);
  } 

  loadAudio() {
    this.assets.audio.forEach((item) => {
      let audio = this.scene.load(item.id, item.url)
      // this.sounds[item.id] = new Audio(item.url);
      if (item.loop) {
        this.sounds[item.id].loop = true;
      }
    });
  }

  initialise(ctx = false) {
    this.fatalFailure = false;
    this.x = this.xInitial;
    this.y = this.yInitial;
    this.setDirection(this.dirrecionInicio);
    this.shieldReload(false);
    this.rechargeBattery();
    this.arranque();
    if (ctx) {
      this.dibujar(ctx);
    }
  }

  shutdown() {
    this.shieldLowWarningOff();
    this.batteryLowWarningOff();
  }

  recarga() {
    this.playSound('MuestraRecogida');
  }

  // se produce sonido cuando el jeep está recargando
  rechargeBattery(amount = this.bateriaInitial) {
    this.bateria = amount;
    this.playSound('RecargaEnergia');
  }

  // return jeep to base
  vueltaBase() {
    this.playSound('VueltaBase');
  }

  arranque() {
    this.playSound('Arranque');
  }

  freno() {
    this.stopSound('Jeep');
    this.playSound('Freno');
  }

  // was soundsampleTaken
  // jeep recoge muesta (sample)
  muesta() {
    this.playSound('MuestraRecogida');
  }

  // jeep recolecta recursos o muestas
  recursoRecolecta() {
    this.playSound('recursoRecogido');
  }

  // se produce cuando el jeep recarga escudos en la base
  shieldReload(playSound = true) {
    if (playSound) {
      this.playSound('ShieldReload');
    }
    this.escudos = this.escudosInitial;
    this.escudosDestruidos = false;

  }

  // se produce cuando el jeep es tocado por un huracan
  collisionHurricane() {
    this.playSound('ImpactoHuracan');
  }
  // se produce cuando el jeep choca con un crater
  craterCollision() {
    this.playSound('ImpactoCrater');
    this.escudos -= 1;
    switch (true) {
      case this.direction === "up":
        this.y += 1;
        break;
      case this.direction === "down":
        this.y -= 1;
        break;
      case this.direction === "left":
        this.x -= 1;
        break;
      case this.direction === "right":
        break;
      default:
      // code block
    }
  }

  Ty() {
    return this.y + this.radius;
  }

  Tx() {
    return this.x + this.radius;
  }

  get bateriaAgotado() {
    return this.bateria <= 0;
  }

  // informa si la batería está por debajo de 150, se repite continuamente
  batteryCheck() {
    if (this.bateriaAgotado) {
      this.onDeadBattery();
      return;
    }

    if (this.bateria <= this.bateriaBajoNivel) {
      this.batterLowWarningOn();
    }
  }

  batterLowWarningOn() {
    this.playSound('BateriaBaja');
  }

  batteryLowWarningOff() {
    this.stopSound('BateriaBaja');
  }

  onDeadBattery() {
    if (!this.fatalFailure) {
      this.playSound('Energia');
      this.playSound('freno');
      this.onFailure('dead-battery', true);
    }
  }

  get oxigenoAgotado() {
    return this.oxigenTime <= 0;
  }

  get oxigenLow() {
    return this.oxigenTime <= 1000 && this.oxigenTime > 0;
  }

  oxigenCheck() {
    if (this.oxigenlow) {
      this.oxigenoBajo.play();
    }

    if (this.oxigenoAgotado) {
      this.onOxigenFinished();
    }
  }

  onOxigenFinished() {
    if (!this.fatalFailure) {
      this.onFailure('no-oxigen', true);
    }
  }


  onFailure(data, fatalFailure = false) {
    if (fatalFailure) {
      this.fatalFailure = true;
      this.shutDown();
    }
    this.feedbackHandler('failure', data);
  }

  // informa si los escudos están entre 0 y escudosNivelDeAdvertencia
  get shieldLow() {
    return this.escudos <= this.escudosNivelDeAdvertencia && this.escudos > 0;
  }

  shieldCheck() {
    if (this.escudos == 0) {
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

  playSound(soundID) {
    this.sounds[soundID] && this.sounds[soundID].play();
  }

  stopSound(soundID) {
    this.sounds[soundID] && this.sounds[soundID].pause();
  }


  setDirection(direction) {
    this.direction = direction;
    this.currentImage = this.images[direction];
  }

  _move(direction, x = this.x, y = this.y) {
    if (!this.fatalFailure) {
      this.x = x;
      this.y = y;
      this.playSound('Jeep');
      this.setDirection(direction);
      // this.playSound('Freno');
      this.bateria--;
    }
  }

  moveRight(x = this.x + this.speedX) {
    this._move("right", x, this.y);
  }

  moveLeft(x = this.x - this.speedX) {
    this._move("left", x, this.y);
  }

  moveUp(y = this.y - this.speedY) {
    this._move("up", this.x, y);
  }

  moveDown(y = this.y + this.speedY) {
    this._move("down", this.x, y);
  }

  dibujar(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.drawImage(this.currentImage, this.x - 10, this.y - 15, 30, 30);
    ctx.closePath();
  }


  oxigenDecrement() {
    this.oxigenTime -= 1.66;
  }

  update(ctx) {
    if (!this.fatalFailure) {
      this.shieldCheck();
      this.oxigenDecrement();
      this.oxigenCheck();
      this.batteryCheck();
    }

    this.dibujar(ctx);
  }
}

