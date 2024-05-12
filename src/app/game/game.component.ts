import { Component, OnInit } from '@angular/core';
import { Baraja, Carta, ManoBrisca, Palo } from '../models/Cartas';
import { BarajaService } from '../services/baraja.service';
import { BriscaService } from '../services/brisca.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  VELOCIDAD_PARTIDA = 22;

  pointerEventsValue = 'none';
  manosRepartidas = false;
  baraja!:Baraja;
  manos: ManoBrisca[];
  tablero: Carta[];

  cartasJugadas = 0;
  cartasEnLaBaraja = 40;
  turno = 1;
  zValue1 = 0;
  zValue2 = 0;
  zValue3 = 0;
  zValue4 = 0;

  equipo1 = 0;
  equipo2 = 0;

  finalRonda=false;
  valorRonda = 0;
  cartaGanadora!: Carta;
  jugadorGanador = 0;
  pinta:Carta;

  logg = "puntuacion";
  esRondaFinal = this.barajaService.estaVacio();

  constructor(private barajaService:BarajaService, private bricaService:BriscaService) {
    this.manos = new Array(3);
    this.tablero = new Array(4);
    this.pinta = this.barajaService.cogerPrimeraCarta();
    this.barajaService.introducirCartaAbajo(this.pinta);
  }

  ngOnInit(): void {
  }

  iniciarVariables(){
    this.pointerEventsValue = 'none';
    this.manosRepartidas = false;

    this.cartasJugadas = 0;
    this.cartasEnLaBaraja = 40;
    this.turno = 2;
    this.zValue1 = 0;
    this.zValue2 = 0;
    this.zValue3 = 0;
    this.zValue4 = 0;
    this.tablero = [];
    this.equipo1 = 0;
    this.equipo2 = 0;

    this.finalRonda=false;
    this.valorRonda = 0;
    this.jugadorGanador = 0;
  }

  async empezarPartida(){

    this.iniciarVariables();
    this.manos = new Array(3);
    for (let i = 0; i < 4; i++) {
      let carta1 = this.barajaService.cogerPrimeraCarta();
      let carta2 = this.barajaService.cogerPrimeraCarta();
      let carta3 = this.barajaService.cogerPrimeraCarta();
      this.manos[i] = new ManoBrisca(carta1, carta2, carta3);
    }
    this.manosRepartidas = true;
    (async () => {
      await this.pauseForOneSecondAsync();
      this.jugarRonda();
    })(); 
  }

  async jugarRonda(){
    this.cartasEnLaBaraja = this.barajaService.baraja.cartas.length;
      //elegir si juega IA o el jugador
      
      if(this.turno==3){
        if(this.cartasJugadas>=4){
          this.resolver();
        }
        else{
          this.juegaJugador();
        }
      }
      else{
        //esperar 2 segundos
        (async () => {
          this.juegaIA();
          await this.pauseForOneSecondAsync();
          if(this.cartasJugadas<4){
            this.siguienteRonda();
            this.jugarRonda();
          }
          else{
            this.resolver();
          }
      })(); 
      } 
  }

  siguienteRonda(){
    
    //si hay 4 cartas jugadas resolver sino avanzar turno y cartas jugadas
    if(this.cartasJugadas>=4){
      this.resolver();
    }
    else{
      this.cartasJugadas++;
      if(this.turno==4){
        this.turno=1;
      }
      else{
        this.turno++;
      }
    }
  }

  juegaIA(){
    let vamosGanando: boolean  = ((this.jugadorGanador == 1 || this.jugadorGanador == 3) 
                               && (this.turno == 1 || this.turno == 3))
                              || ((this.jugadorGanador == 2 || this.jugadorGanador == 4)
                               && (this.turno == 2 || this.turno == 4));
    const cartaDecidida = this.bricaService.decidirJugada(this.manos[this.turno-1].cartas,this.tablero, this.cartaGanadora, this.pinta.palo, vamosGanando);

    let cartaJugada:Carta;
    if(this.cartasJugadas<4){
      cartaJugada = {...this.manos[this.turno-1].cartas[cartaDecidida]};
      this.manos[this.turno-1].cartas[cartaDecidida]=this.barajaService.cogerPrimeraCarta();
      this.tablero[this.turno-1] = cartaJugada;

      switch(this.turno){
        case 1: this.zValue1=this.cartasJugadas*100; break;
        case 2: this.zValue2=this.cartasJugadas*100; break;
        case 4: this.zValue4=this.cartasJugadas*100; break;
      }
      if(!this.cartaGanadora || this.cartaGanadora.valor == 0){
        this.cartaGanadora = cartaJugada;
      }
      else{
        this.cartaGanadora = this.bricaService.cartaGanadora(this.cartaGanadora, cartaJugada, this.pinta.palo);
        
      }
      if(this.cartaGanadora == cartaJugada){
        this.jugadorGanador = this.turno;
      }
    }     
  }

  juegaJugador(){
    this.pointerEventsValue = 'auto';
  }

  async jugarCarta(numeroCarta:number){
    let cartaJugada:Carta;
    if(numeroCarta==1){
      
      cartaJugada = {...this.manos[2].cartas[0]};
      this.manos[2].cartas[0]=this.barajaService.cogerPrimeraCarta();
      this.tablero[2] = cartaJugada;
    }
    else if(numeroCarta==2){
      cartaJugada = {...this.manos[2].cartas[1]};
      this.manos[2].cartas[1]=this.barajaService.cogerPrimeraCarta();
      this.tablero[2] = cartaJugada;
    }
    else{
      cartaJugada = {...this.manos[2].cartas[2]};
      this.manos[2].cartas[2]=this.barajaService.cogerPrimeraCarta();
      this.tablero[2]=cartaJugada;
    }
    if(!this.cartaGanadora || this.cartaGanadora.valor == 0){
      this.cartaGanadora = cartaJugada;
    }
    else{
      this.cartaGanadora = this.bricaService.cartaGanadora(this.cartaGanadora, cartaJugada, this.pinta.palo);
    }
    if(cartaJugada == this.cartaGanadora){
      this.jugadorGanador = this.turno;
    }
    this.pointerEventsValue = 'none';
    this.zValue3=this.cartasJugadas*100;
    if(this.cartasJugadas>=3){
      (async () => {
        await this.pauseForOneSecondAsync();
        this.resolver();
      })();
      
    }
    else{
      (async () => {
        await this.pauseForOneSecondAsync();
        if(this.esRondaFinal){
          this.siguienteRonda();
          this.rondaFinal();
        }
        else{
          this.siguienteRonda();
        this.jugarRonda();
        }
      })();
      
    }
  }

  resolver(){
    (async () => {
      this.valorRonda = this.bricaService.contarPuntos(this.tablero);
      this.finalRonda = true;
      if(this.jugadorGanador==1 || this.jugadorGanador==3){
        this.equipo1 = this.equipo1 + this.valorRonda;
      }
      else{
        this.equipo2 = this.equipo2 + this.valorRonda;
      }
      
      this.logg = 
      this.jugadorGanador + " gana la ronda, " +
      "Equipo 1 y 3: " + this.equipo1 + 
      ", Equipo 2 y 4: " + this.equipo2;
      this.valorRonda = 0;
      this.tablero = new Array();
      this.cartasJugadas = 0;
      this.turno = this.jugadorGanador;
      this.cartaGanadora = new Carta(0,0,"");
      await this.pauseForOneSecondAsync();
      if(this.barajaService.estaVacio()){
        this.esRondaFinal = true;
        if(this.manos[0].cartas[0].valor==0 && this.manos[0].cartas[1].valor==0 && this.manos[0].cartas[2].valor==0){
          this.finDelJuego();
        }else{
        this.rondaFinal();
        }
      }
      else{
          this.jugarRonda();
      }
    })(); 
  }

  //RONDA FINAL
  async rondaFinal() {
    console.log("ronda finl, cartasjugadas:" + this.cartasJugadas + ", turno: " + this.turno);
    //elegir si juega IA o el jugador
    if(this.turno==3){
      if(this.cartasJugadas>=4){
        this.resolver();
      }
      else{
          this.juegaJugador();
      }
      
    }
    else{
      //esperar 2 segundos
      (async () => {
        this.juegaIAFinal();
        await this.pauseForOneSecondAsync();
        if(this.cartasJugadas<4){
          this.siguienteRonda();
          this.rondaFinal();
        }
        else{
          this.resolver();
        }
        
    })(); 
    } 
  }

  juegaIAFinal() {
    let vamosGanando: boolean  = ((this.jugadorGanador == 1 || this.jugadorGanador == 3) 
                               && (this.turno == 1 || this.turno == 3))
                              || ((this.jugadorGanador == 2 || this.jugadorGanador == 4)
                               && (this.turno == 2 || this.turno == 4));
    const cartaDecidida = this.bricaService.decidirJugada(this.manos[this.turno-1].cartas,this.tablero, this.cartaGanadora, this.pinta.palo, vamosGanando);

    const numeroCartasEnMano = this.barajaService.cartasEnMano(this.manos[this.turno-1].cartas);
    this.quitarCartaVacia(this.turno-1);
    let cartaJugada:Carta;
    if(this.cartasJugadas<4){
      cartaJugada = {...this.manos[this.turno-1].cartas[cartaDecidida]};
      this.manos[this.turno-1].cartas[cartaDecidida]=this.barajaService.cogerPrimeraCarta();
      this.tablero[this.turno-1] = cartaJugada;

      switch(this.turno){
        case 1: this.zValue1=this.cartasJugadas*100; break;
        case 2: this.zValue2=this.cartasJugadas*100; break;
        case 4: this.zValue4=this.cartasJugadas*100; break;
      }
      if(!this.cartaGanadora || this.cartaGanadora.valor == 0){
        this.cartaGanadora = cartaJugada;
      }
      else{
        this.cartaGanadora = this.bricaService.cartaGanadora(this.cartaGanadora, cartaJugada, this.pinta.palo);
        
      }
      if(this.cartaGanadora == cartaJugada){
        this.jugadorGanador = this.turno;
      }


    }     
  }

  quitarCartaVacia(numJugador:number){
    let cartasOrdenadas: Carta[] = new Array();
    //comprobar que alguna de las tres cartas existe
     this.manos[numJugador].cartas.forEach(carta=>{
      if(carta.valor>0){
        cartasOrdenadas.push(carta);
      }
     });

     for(let i = 0; i < 3; i++ ){
      if(cartasOrdenadas[i]){
        this.manos[numJugador].cartas[i] = cartasOrdenadas[i];
      }
      else{
        this.manos[numJugador].cartas[i] = new Carta(0,0,"");
      }
      
     }
     
  }

  finDelJuego() {
    if(this.equipo1>this.equipo2){
      this.logg="Has ganado con una puntuacion de " + this.equipo1;
    }
    else if(this.equipo1<this.equipo2){
      this.logg="Has perdido con una puntuacion de " + this.equipo1;
    }
    else{
      this.logg="Empate a " + this.equipo1 + " puntos";
    }
    
  }

  //VELOCIDAD DE JUEGO
  async pauseForOneSecondAsync() {
    await new Promise((resolve) => setTimeout(resolve, 5000/this.VELOCIDAD_PARTIDA)); // Wait for 1 second
  }

}
