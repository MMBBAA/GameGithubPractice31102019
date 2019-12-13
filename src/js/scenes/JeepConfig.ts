export const JeepConfig = {
  images_dir: '../../../assets/images/',
  images: [
    {
      id: 'jeep_up',
      direction: 'up',
      obj: 'jeep',
      src: 'jeepUp.png'
    },

    {
      id: 'jeep_down',
      direction: 'down',
      obj: 'jeep',
      src: 'jeepDown.png'
    },

    {
      id: 'jeep_left',
      direction: 'left',
      obj: 'jeep',
      src: 'jeepLeft.png'
    },

    {
      id: 'jeep_right',
      direction: 'right',
      obj: 'jeep',
      src: 'jeepRight.png'
    }

  ],
  audio_dir: '../../../assets/sounds/',
  audio: [
    {
      id: 'Jeep',
      src: 'Jeep_En_Marcha_3.mp3',
      type: 'jeep',
      options: {
        //volume: 0.7,
        loop: true
      }
    },
    {
      id: 'Arranque',
      src: 'Jeep_Arrancando.mp3',
      type: 'jeep',
      options: {
        // volume: 0.7,
        // loop: false
      }
    },
    {
      id: 'Freno',
      src: 'Jeep_Frenando.mp3',
      type: 'jeep',
      options: {
        loop: false
      }
    },
    {
      id: 'BateriaBaja',
      src: 'Bateria_Baja.mp3',
      type: 'jeep',
      options: {
        mute: false,
        volume: 1,
        rate: 1,
        detune: 0,
        seek: 0,
        delay: 0,
        loop: true
      },
    {
      id: 'RecargaEnergia',
      src: 'Recarga_Energia.mp3',
      type: 'jeep'
    },
    {
      id: 'oxigenoBajo',
      src: 'Oxigeno_Bajo.mp3',
      type: 'jeep',
      loop: 'true'
    },
    {
      id: 'Energia',
      src: 'Sonido_Energia_0.mp3',
      type: 'bateria'
    },
    {
      id: 'ImpactoHuracan2',
      src: 'Sonido_Colision_Huracan.mp3',
      type: 'huracan'
    },
    {
      id: 'ImpactoCrater',
      src: 'Sonido_Colision_Crater.mp3',
      type: 'impact'
    },
    {
      id: 'ImpactoHuracan',
      src: 'Impacto_Huracan.mp3',
      type: 'impact'
    },

    {
      id: 'VueltaBase',
      src: 'Traer_Jeep_Vuelta_A_Base.mp3',
      type: 'base'
    },
    {
      id: 'VueltaBase2',
      src: 'Traer_Jeep_Vuelta_A_Base.mp3',
      type: 'base'
    },
    {
      id: 'MuestraRecogida',
      src: 'Muestra_Recogida.mp3',
      type: 'muestra'
    },
    {
      id: 'EscudosBajos',
      src: 'Escudos_Bajos.mp3',
      type: 'escudos'
    },
  
    {
      id: 'EscudosBajos2',
      src: 'Sonido_Escudos_Bajos.mp3',
      type: 'escudos'
    },
    {
      id: 'ShieldReload',
      src: 'Sonido_Recarga_Escudos.mp3',
      type: 'escudos'
    }]
};
