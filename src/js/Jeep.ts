import { GameObjects, Scene } from 'phaser'

export class Jeep extends GameObjects.Sprite {

  height = 20;
  width = 20;
  radius = 20

  escudosInitial = 1000;
  escudos = this.escudosInitial;
  escudosNivelDeAdvertencia = 100;
  escudosDestruidos = false;

  // segundos de oxigeno 7599
  segundosInitial = 7599;
  segundos = this.segundosInitial;

  energia = 1000;

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


  assets = {
    dir: "assets/images/",
    images: [
            {
	direction: "up",
	obj: "jeep",
	src: "jeepUp.png"
      },

      {
	direction: "down",
	obj: "jeep",
	src: "jeepDown.png"
      },

      {
	direction: "left",
	obj: "jeep",
	src: "jeepLeft.png"
      },

      {
	direction: "right",
	obj: "jeep",
	src: "jeepRight.png"
      }
    ]
  }

  
  constructor (scene, config) {
    super(scene, config.x, config.y, 'jeep', 'back')
    
    this.xInitial = config.xInitial;
    this.yInitial = config.yInitial;

    scene.add.existing(this);
    this.initialise(false);
  }

  preload() {
    
    this.assets.images.forEach((i) => {
     this.images.url = `${this.assets.dir}${i.src}`;
     this.images.id = `jeep${i.direction}`;
     this.load.image(this.images.id, this.images.url);
    });

    // jeep
    this.load.audio('Jeep', "assets/music/Jeep_En_Marcha_3.mp3");
    this.load.audio('Arranque', "assets/music/Jeep_Arrancando.mp3");
    this.load.audio('Freno', "assets/music/Jeep_Frenando.mp3");
    this.load.audio('BateriaBaja', "assets/music/Bateria_Baja.mp3");
    this.load.audio('RecargaEnergia', "assets/music/Recarga_Energia.mp3");
    this.load.audio('oxigenoBajo', "assets/music/Oxigeno_Bajo.mp3");
    this.load.audio('Energia', "assets/music/Sonido_Energia_0.mp3")

    this.load.audio( 'ImpactoHuracan2', "assets/music/Sonido_Colision_Huracan.mp3");

    // impact
    this.load.audio('ImpactoCrater', "assets/music/Sonido_Colision_Crater.mp3");
    this.load.audio('ImpactoHuracan', "assets/music/Impacto_Huracan.mp3");

    this.load.audio('VueltaBase', "assets/music/Traer_Jeep_Vuelta_A_Base.mp3");
    this.load.audio('VueltaBase2', "assets/music/Traer_Jeep_Vuelta_A_Base.mp3");

    this.load.audio('MuestraRecogida', "assets/music/Muestra_Recogida.mp3");

    // shields
    this.load.audio('EscudosBajos', "assets/music/Escudos_Bajos.mp3");
    this.load.audio('EscudosBajos2', "assets/music/Sonido_Escudos_Bajos.mp3");
    this.load.audio('ShieldReload', "assets/music/Sonido_Recarga_Escudos.mp3");
  }

  initialise(destruido) {
    this.escudos = this.escudosInitial;
    this.escudosDestruidos = destruido;
    this.x = this.xInitial;
    this.y = this.yInitial;
    this.setDirection(this.dirrecionInicio);
    this.energyReload();
    this.arranque();
  }

  recarga() {

    this.sounds('MuestraRecogida').play();
  }

  // se produce sonido cuando el jeep está recargando
  energyReload() {
    this.sounds('RecargaEnergia').play();
  }

  // was soundshieldLow
  // low shields
  escudidosBajos() {
    this.sounds('EscudosBajos').play();
  }

  // return jeep to base
  vueltaBase() {
    this.sounds('VueltaBase').play();
  }

  arranque() {
    this.sounds('Arranque').play();
  }

  freno() {
    this.sounds('Jeep').pause();
    this.sounds('Freno').play();
  }

  // was soundsampleTaken
  // jeep recoge muesta (sample)
  muesta() {
    this.sounds('MuestraRecogida').play();
  }

  // jeep recolecta recursos o muestas
  recursoRecolecta() {
    this.sounds('recursoRecogido').play();
  }

  sinEnergia() {
    this.sound['Energia'].play();
    this.sound['freno'].play();
  }

  // se produce cuando el jeep recarga escudos en la base
  ShieldReload() {
    this.sounds('ShieldReload').play();
  }

  // se produce cuando el jeep es tocado por un huracan
  collisionHurricane() {
    this.sounds('ImpactoHuracan').play();
  }
  // se produce cuando el jeep choca con un crater
  craterCollision() {
    this.sounds('ImpactoCrater').play();
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

  muerto() {
    return this.escudos === 0;
    // this.oxigeno === 0 ||
  }

  // informa si la batería está por debajo de 150, se repite continuamente
  batteryLowCheck() {
    if (this.energia <= 100) {
      this.bateria_baja.play();
    }
  }

  get oxigenoAgotado() {
    return this.segundos === 0;
  }

  get oxigenLow() {
    return this.segundos <= 1000 && this.segundos > 0;
  }

  oxigenCheck() {
    if (this.oxigenlow) {
      this.oxigenoBajo.play();
    }

    if (this.oxigenoAgotado) {
      this.onFailure();
    }
  }

  onFailure() {

  }

  // informa si los escudos están entre 0 y escudosNivelDeAdvertencia
  get shieldLow() {
    return this.escudos <= this.escudosNivelDeAdvertencia && this.escudos > 0;
  }

  shieldCheck() {
    if (this.shieldLow) {
      this.sounds('EscudosBajos').play();
      this.sounds('EscudosBajos2').play();
    }

    if (this.escudos == 0) {
      this.onFailure();
    }
  }


  setDirection(direction) {
    this.direction = direction;
    this.currentImage = this.images[direction];
  }

  _move(direction) {
    this.sounds('Jeep').play();
    this.setDirection(direction);
    this.sounds('Freno').pause();
  }

  moveRight() {
    this.x += this.speedX;
    this._move("right");
  }

  moveLeft() {
    this.x -= this.speedX
    this._move("left");
  }

  moveUp() {
    this.y -= this.speedY;
    this._move("up");
  }

  moveDown() {
    this.y += this.speedY;
    this._move("down");
  }

  dibujar(ctx, x = this.x, y = this.y) {
    ctx.beginPath();
    ctx.arc(x, y, this.radius, 0, Math.PI * 2);
    ctx.drawImage(this.currentImage, x - 10, y - 15, 30, 30);
    ctx.closePath();
  }
}
