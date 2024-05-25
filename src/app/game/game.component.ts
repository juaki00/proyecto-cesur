import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { Baraja, Carta, ManoBrisca, Palo } from '../models/Cartas';
import { BarajaService } from '../services/baraja.service';
import { BriscaService } from '../services/brisca.service';
import { SessionService } from '../services/session.service';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NombrePropioPipe } from '../pipes/nombre-propio.pipe';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  providers: [NombrePropioPipe]
})
export class GameComponent implements OnInit {
  VELOCIDAD_PARTIDA = 4;

  nombre = '';
  pointerEventsValue = 'none';
  manosRepartidas = false;
  baraja!:Baraja;
  manos: ManoBrisca[];
  tablero: Carta[];
  pinta:Carta;
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

  logg: string[] = []; //= "puntuacion";
  logPartida: string[] = [];
  esRondaFinal = this.barajaService.estaVacio();

  constructor(private nombrePipe: NombrePropioPipe, private renderer: Renderer2, private el: ElementRef,private router: Router, private barajaService:BarajaService, private bricaService:BriscaService, private sessionService: SessionService, private loginService: LoginService) {
    this.manos = new Array(3);
    this.tablero = new Array(4);
    this.pinta = this.barajaService.cogerPrimeraCarta();
    this.barajaService.introducirCartaAbajo(this.pinta);
  }

  ngOnInit(): void {
    this.renderer.setStyle(document.body, 'background-color', 'rgb(53, 104, 45)');
    const user = localStorage.getItem("usuario");
    if(!user){
      this.router.navigate(['../login']);
    }
    else{
      this.nombre = this.nombrePipe.transform(user);
    }
    this.logg[0] = 'Equipo de ' + this.nombre + ': 0';
    this.logg[1] = 'Equipo contrario: 0';
  }

  private iniciarVariables(){
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

  verPuntuaciones(){
    this.router.navigate(['../misPartidas']);
  }

  verRanking(){
    this.router.navigate(['../ranking']);
  }

  salir(){
    window.location.reload();
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
      this.logPartida.push('Jugador ' + this.turno + ': ' + this.barajaService.nombreCarta(this.manos[this.turno-1].cartas[cartaDecidida]));
      if (this.logPartida.length > 4) {
        this.logPartida.shift();
      }
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
    this.logPartida.push(this.nombre + ': ' + this.barajaService.nombreCarta(cartaJugada));
    if (this.logPartida.length > 4) {
      this.logPartida.shift();
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
      this.logg[0] = 'Equipo de ' + this.nombre + ': ' + this.equipo1;
      this.logg[1] = 'Equipo contrario: ' + this.equipo2;
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

  async decidirJugada(cartas: Carta[], tablero: Carta[], cartaGanadora: Carta, palo: number, vamosGanando: boolean): Promise<number> {
    return this.bricaService.decidirJugada(cartas,tablero, cartaGanadora, palo, vamosGanando);
  }

  async juegaIAFinal() {
    let cartaDecidida = 0;
    let vamosGanando: boolean  = ((this.jugadorGanador == 1 || this.jugadorGanador == 3) 
                               && (this.turno == 1 || this.turno == 3))
                              || ((this.jugadorGanador == 2 || this.jugadorGanador == 4)
                               && (this.turno == 2 || this.turno == 4));
    (async () => {
      let cartaDecidida: number = await this.decidirJugada(this.manos[this.turno-1].cartas,this.tablero, this.cartaGanadora, this.pinta.palo, vamosGanando);
      console.log("pasa")
    
    if(this.manos[this.turno-1].cartas[cartaDecidida].valor==0){
      cartaDecidida = 0;
    }
    console.log("carta decidida: " + cartaDecidida + " por jugador " + this.turno);
    const numeroCartasEnMano = this.barajaService.cartasEnMano(this.manos[this.turno-1].cartas);
    //this.quitarCartaVacia(this.turno-1);
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
  })();    
  }

  quitarCartaVacia(numJugador:number){
    let cartasOrdenadas: Carta[] = new Array();
    //comprobar que alguna de las tres cartas existe
     this.manos[numJugador].cartas.forEach(carta=>{
      if(carta && carta.valor>0){
        cartasOrdenadas.push(carta);
      }
     });
    let i = 0;
     for(let carta of cartasOrdenadas){
      this.manos[numJugador].cartas[i] = carta;
      i++;
     }

     for(let i = 0; i < 3; i++ ){
      if(!cartasOrdenadas[i] || this.manos[numJugador].cartas[i].valor==0){
        this.manos[numJugador].cartas[i] = new Carta(0,0,"");
      }    
     }
  }

  finDelJuego() {
    this.loginService.agregarPartida$(this.nombre, this.equipo1).subscribe(
      () => {
        console.log('Partida agregada exitosamente');
      },
      (error: HttpErrorResponse) => {
        console.error('Error al agregar partida:', error);
        
      }
    ); 
    if(this.equipo1>this.equipo2){
      this.logg[0]="Has ganado con una puntuacion de " + this.equipo1;
      this.logg[1]="";
      this.logg[2]="";
    }
    else if(this.equipo1<this.equipo2){
      this.logg[0]="Has perdido con una puntuacion de " + this.equipo1;
      this.logg[1]="";
      this.logg[2]="";
    }
    else{
      this.logg[0]="Empate a " + this.equipo1 + " puntos";
      this.logg[1]="";
      this.logg[2]="";
    }
    
  }

  //VELOCIDAD DE JUEGO
  async pauseForOneSecondAsync() {
    await new Promise((resolve) => setTimeout(resolve, 5000/this.VELOCIDAD_PARTIDA)); // Wait for 1 second
  }

}



