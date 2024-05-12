import { Injectable } from '@angular/core';
import { Carta, ManoBrisca, Palo, TipoCarta } from '../models/Cartas';

@Injectable({
  providedIn: 'root'
})
export class BriscaService {
  
  constructor() {
   }

   cartaGanadora(carta1: Carta, carta2: Carta, pinta: Palo):Carta{
    let cartaGanadora = carta1;
    if(carta2.palo==pinta){
      if(carta1.palo == pinta){
        cartaGanadora = this.cartamayor(carta1,carta2);
      }
      else{
        cartaGanadora = carta2;
      }
    }
    else if(carta2.palo == carta1.palo){
      cartaGanadora = this.cartamayor(carta1,carta2);
    }
    return cartaGanadora;
   }

   cartamayor(carta1:Carta, carta2:Carta): Carta{
    let cartaMayor = carta1;
    if(carta1.valor == 1){
      cartaMayor = carta1;
    }
    else if(carta2.valor == 1){
      cartaMayor = carta2;
    }
    else if(carta1.valor == 3){
      cartaMayor = carta1;
    }
    else if(carta2.valor == 3){
      cartaMayor = carta2;
    }
      else if(carta2.valor > carta1.valor){
      cartaMayor = carta2;
    }

    return cartaMayor;
   }

   valorCarta(carta:Carta): number{
    let valor = 0;
      if(carta.valor==1){
        valor = 11;
      }
      else if(carta.valor == 3){
        valor = 10;
      }
      else if(carta.valor == 8){
        valor = 2;
      }
      else if(carta.valor == 9){
        valor = 3;
      }
      else if(carta.valor == 10){
        valor = 4;
      }

      return valor;
   }

   contarPuntos(cartas:Carta[]):number{
    let puntos = 0;
    cartas.forEach((carta) =>  puntos = puntos + this.valorCarta(carta) );
      
    return puntos;
   }

   private tipoCarta(carta: Carta, pinta: Palo):TipoCarta{

    let tipo: TipoCarta;
    if(!carta || carta.valor <= 0){
      tipo = TipoCarta.NULL;
    }
    else{
      if(carta.palo == pinta){
        if(carta.valor == 1 || carta.valor == 3){
          tipo = TipoCarta.VIDAPUNTOS;
        }
        else if(carta.valor > 7){
          tipo = TipoCarta.VIDAMEDIANA;
        }
        else{
          tipo = TipoCarta.VIDA;
        }
      }
      else{
        if(carta.valor == 1 || carta.valor == 3){
          tipo = TipoCarta.PUNTOS;
        }
        else if(carta.valor > 7){
          tipo = TipoCarta.MINIPUNTOS;
        }
        else{
          tipo = TipoCarta.BASURA;
        }
      }
    }
    return tipo;
   }

   obtenerTurno(cartas: Carta[]):number{
    let contador = 0;
    for(let i = 0; i< 4; i++){
        if(!cartas[i] || cartas[i].valor == 0){
            contador++;
        }
    }
    return 5-contador;
  }

  private puntosEnLaMesa(mesa: Carta[]):number{
    let acumulador = 0;
    for(const carta of mesa){
      if(carta){
        acumulador += this.valorCarta(carta);
      }
    }
    return acumulador;
  }

  private esMenor(carta1:Carta, carta2:Carta):boolean{
    
    return this.valorCarta(carta1) < this.valorCarta(carta2) || 
    ( this.valorCarta(carta1) === this.valorCarta(carta2) && carta1.valor < carta2.valor );

  }

  private esMayor(carta1:Carta, carta2:Carta):boolean{
    return this.esMenor(carta2, carta1);
  }

  private tirarBasura(cartas: Carta[], pinta: Palo): number{
    let jugadaElegida = 1;
    let tipo2 = this.tipoCarta(cartas[1], pinta);
    let tipo3 = this.tipoCarta(cartas[2], pinta);
    if(tipo2!=0){
      jugadaElegida = this.elegirBasura(cartas[0],cartas[1], pinta);
      if(tipo3!=0){
        if(jugadaElegida==1){
          jugadaElegida = this.elegirBasura(cartas[0],cartas[2], pinta);
          if(jugadaElegida>1) jugadaElegida++;
        } else{
          jugadaElegida = this.elegirBasura(cartas[1],cartas[2], pinta);
          jugadaElegida++;
        }
      }
    }
    return jugadaElegida;
  }

  private elegirBasura(carta1: Carta, carta2: Carta, pinta: Palo): number{
    let cartaElegida = 1;
    let tipo1 = this.tipoCarta(carta1, pinta);
    let tipo2 = this.tipoCarta(carta2, pinta);
    let valor1 = this.valorCarta(carta1);
    let valor2 = this.valorCarta(carta2);
    switch(tipo1){
      case TipoCarta.BASURA:  
        if(tipo2 == TipoCarta.BASURA && carta2.valor < carta1.valor){
          cartaElegida = 2;
        }
        break;
      case TipoCarta.MINIPUNTOS:
        if(tipo2 == TipoCarta.BASURA || (tipo2 == TipoCarta.MINIPUNTOS && valor2 < valor1)){
          cartaElegida = 2;
        }
        break;
      case TipoCarta.VIDA:
        if(tipo2 == TipoCarta.BASURA || tipo2 == TipoCarta.MINIPUNTOS 
          || (tipo2 == TipoCarta.VIDA && carta2.valor < carta1.valor)){
          cartaElegida = 2;
        }
        break;
      case TipoCarta.VIDAMEDIANA:
        if(tipo2 == TipoCarta.BASURA || tipo2 == TipoCarta.VIDA 
          || tipo2 == TipoCarta.MINIPUNTOS || 
          (tipo2 == TipoCarta.VIDAMEDIANA && valor2 < valor1)){
          cartaElegida = 2;
        }
        break;
      case TipoCarta.PUNTOS:
        if(tipo2 == TipoCarta.BASURA || tipo2 == TipoCarta.VIDA 
          || tipo2 == TipoCarta.MINIPUNTOS || tipo2 == TipoCarta.VIDAMEDIANA || 
          (tipo2 == TipoCarta.PUNTOS && valor2 < valor1)){
          cartaElegida = 2;
        }
        break;
      case TipoCarta.VIDAPUNTOS:
        if(tipo2 == TipoCarta.BASURA || tipo2 == TipoCarta.VIDA || tipo2 == TipoCarta.PUNTOS 
          || tipo2 == TipoCarta.MINIPUNTOS || tipo2 == TipoCarta.VIDAMEDIANA || 
          (tipo2 == TipoCarta.VIDAPUNTOS && valor2 < valor1)){
          cartaElegida = 2;
        }
        break;
    }
    return cartaElegida;
  }

  //Si alguna supera devuelve la posicion empezando por 1, si ninguna supera devuelve 0
  private algunaSupera(cartas: Carta[], cartaGanadora: Carta): number{
    let eleccion = 0;
    let contador = 1;
    let cartaElegida: Carta | undefined;
    cartas.forEach( carta => {
      if(this.laSupera(carta, cartaGanadora)){
        if(cartaElegida == undefined || this.esMenor(carta, cartaElegida)){
          cartaElegida = carta;
          eleccion = contador;
        }
      }
      contador++;
    });
    return eleccion;
  }

  private algunaSuperaConPuntos(cartas: Carta[], cartaGanadora: Carta): number{
    let eleccion = 0;
    let contador = 1;
    let cartaElegida: Carta | undefined;
    cartas.forEach( carta => {
      if(this.laSupera(carta, cartaGanadora) && this.valorCarta(carta) >9){
        if(cartaElegida == undefined || this.esMayor(carta, cartaElegida)){
          cartaElegida = carta;
          eleccion = contador;
        }
      }
      contador++;
    });
    return eleccion;
  }

  private laMenorPinta(cartas: Carta[], pinta: Palo): number{
    let eleccion = 0;
    let cartaElegida: Carta |undefined;
    let contador = 1;
    cartas.forEach( carta => {
      if(carta.palo == pinta){
        if(cartaElegida === undefined || this.esMenor(carta, cartaElegida)){
          cartaElegida = carta;
          eleccion = contador;
        }
      }
      contador++;
    });
    return eleccion;
  }

  private laMenorPintaPequeña(cartas: Carta[], pinta: Palo): number{
    let eleccion = 0;
    let cartaElegida: Carta |undefined;
    let contador = 1;
    cartas.forEach( carta => {
      if(this.tipoCarta(carta, pinta) == TipoCarta.VIDA){
        if(cartaElegida === undefined || this.esMenor(carta, cartaElegida)){
          cartaElegida = carta;
          eleccion = contador;
        }
      }
      contador++;
    });
    return eleccion;
  }

  private superarOVida(cartas: Carta[], cartaGanadora: Carta, pinta: Palo): number{
    let eleccion = 0;
    let cartaElegida: Carta | undefined;
    let contador = 1;
    //si la carta ganadora no es pinta, se intenta superar
    if(cartaGanadora.palo != pinta){
      eleccion = this.algunaSupera(cartas, cartaGanadora);
     
      //Si ninguna carta supera a la ganadora se tira la menor pinta
      if(eleccion == 0){
        eleccion = this.laMenorPinta(cartas, pinta);
      }

      //si la carta ganadora es pinta, se intenta superar
    }else{
      contador = 1;
      cartas.forEach( carta => {
        if(this.laSupera(carta, cartaGanadora)){
          if(cartaElegida === undefined || this.valorCarta(carta) < this.valorCarta(cartaElegida)){
            cartaElegida = carta;
            eleccion = contador;
          }
          
        }
        contador++;
      });
    }
    //si no tenemos pinta que supere a la ganadora, tiramos basura
    if(eleccion == 0){
      eleccion = this.tirarBasura(cartas, pinta);
    }

    return eleccion;
  }

  superarOVidaPequeñaOBasura(cartas: Carta[], cartaGanadora: Carta, pinta: Palo): number {
    let eleccion = 0;
    let cartaElegida: Carta | undefined;
    let contador = 1;
    //si la carta ganadora no es pinta, se intenta superar
    if(cartaGanadora.palo != pinta){
      eleccion = this.algunaSupera(cartas, cartaGanadora);
     
      //Si ninguna carta supera a la ganadora se tira la menor pinta pequeña
      if(eleccion == 0){
        eleccion = this.laMenorPintaPequeña(cartas, pinta);
      }

      //si la carta ganadora es pinta, se intenta superar con una pinta mediana
    }else{
      contador = 1;
      cartas.forEach( carta => {
        if(this.laSupera(carta, cartaGanadora) && this.tipoCarta(carta, pinta) != TipoCarta.VIDAPUNTOS){
          if(cartaElegida === undefined || this.valorCarta(carta) < this.valorCarta(cartaElegida)){
            cartaElegida = carta;
            eleccion = contador;
          }
        }
        contador++;
      });
    }
    //si no tenemos pinta que supere a la ganadora, tiramos basura
    if(eleccion == 0){
      eleccion = this.tirarBasura(cartas, pinta);
    }

    return eleccion;
  }

  private superarOBasura(cartas: Carta[],cartaGanadora: Carta, pinta: Palo): number {
    let elegida = this.algunaSupera(cartas, cartaGanadora);
    if(elegida == 0){
      elegida = this.tirarBasura(cartas, pinta);
    }
    return elegida;
  }

  superarConPuntosOBasura(cartas: Carta[], cartaGanadora: Carta, pinta: Palo): number {
    let elegida = this.algunaSuperaConPuntos(cartas, cartaGanadora);
    if(elegida == 0){
      elegida = this.tirarBasura(cartas, pinta);
    }
    return elegida;
  }

  private laSupera(carta1: Carta, carta2: Carta): boolean{
    return (carta1.palo == carta2.palo && (this.valorCarta(carta1) > this.valorCarta(carta2)) ||
            (this.valorCarta(carta1) == this.valorCarta(carta2) && carta1.valor > carta2.valor));
  }

  private tirarVidaMedianaOBasura(cartas: Carta[], pinta: Palo): number {
    let eleccion = 0;
    let cartaElegida: Carta |undefined;
    let contador = 1;
    cartas.forEach(carta =>{
      if(this.tipoCarta(carta, pinta) == TipoCarta.VIDAMEDIANA || this.tipoCarta(carta, pinta) == TipoCarta.VIDA){
        if(cartaElegida == undefined || this.esMenor(carta, cartaElegida)){
          eleccion = contador;
          cartaElegida = carta;
        }
      }
      contador++;
    });
    if(eleccion == 0){
      eleccion = this.tirarBasura(cartas, pinta);
    }
    return eleccion;
  }

  private tirarVidaMaxima(cartas: Carta[], pinta: Palo): number {
    let eleccion = 0;
    let cartaElegida: Carta |undefined;
    let contador = 1;
    cartas.forEach(carta =>{
      if(this.tipoCarta(carta, pinta) == TipoCarta.VIDAMEDIANA || this.tipoCarta(carta, pinta) == TipoCarta.VIDA || this.tipoCarta(carta, pinta) == TipoCarta.VIDAPUNTOS){
        if(cartaElegida == undefined || this.esMayor(carta, cartaElegida)){
          eleccion = contador;
          cartaElegida = carta;
        }
      }
      contador++;
    });
    if(eleccion == 0){
      eleccion = this.tirarBasura(cartas, pinta);
    }
    return eleccion;
  }

  private tiraPuntos(cartas: Carta[], pinta: Palo): number {
    let eleccion = 0;
    let cartaElegida: Carta |undefined;
    let contador = 1;
    cartas.forEach(carta =>{
      if(this.tipoCarta(carta, pinta) == TipoCarta.PUNTOS || this.tipoCarta(carta, pinta) == TipoCarta.MINIPUNTOS){
        if(cartaElegida == undefined || this.esMayor(carta, cartaElegida)){
          eleccion = contador;
          cartaElegida = carta;
        }
      }
      contador++;
    });
    if(eleccion == 0){
      eleccion = this.tirarBasura(cartas, pinta);
    }
    return eleccion;
  }

  private tiraMinipuntosOpuntosOBasura(cartas: Carta[], pinta: Palo) {
    let eleccion = 0;
    let cartaElegida: Carta |undefined;
    let contador = 1;
    cartas.forEach(carta =>{
      if(this.tipoCarta(carta, pinta) == TipoCarta.PUNTOS || this.tipoCarta(carta, pinta) == TipoCarta.MINIPUNTOS){
        if(cartaElegida == undefined || this.esMenor(carta, cartaElegida)){
          eleccion = contador;
          cartaElegida = carta;
        }
      }
      contador++;
    });
    if(eleccion == 0){
      eleccion = this.tirarBasura(cartas, pinta);
    }
    return eleccion;
  }
   
  decidirJugada(cartas: Carta[], mesa: Carta[], cartaGanadora: Carta, pinta: Palo, vamosGanando: boolean):number{
    let cartaElegida = 1;
    switch(this.obtenerTurno(mesa)){
      case 1: cartaElegida = this.decidirJugada1(cartas, mesa, pinta);
        break;
      case 2: cartaElegida = this.decidirJugada2(cartas, mesa, pinta, cartaGanadora);
        break;
      case 3: cartaElegida = this.decidirJugada3(cartas, mesa, cartaGanadora, pinta, vamosGanando);
        break;
      case 4: cartaElegida = this.decidirJugada4(cartas, mesa, cartaGanadora, pinta, vamosGanando);
        break;  
    }

    return cartaElegida -1;
  }
  
  private decidirJugada1(cartas: Carta[], mesa: Carta[], pinta: Palo): number {
    return this.tirarBasura(cartas, pinta);
  }

  private decidirJugada2(cartas: Carta[], mesa: Carta[], pinta: Palo, cartaGanadora: Carta): number {
    let eleccion = 1;
    if(this.puntosEnLaMesa(mesa) > 9){
      eleccion = this.superarOVida(cartas, cartaGanadora, pinta);
    }else{
      eleccion = this.superarOBasura(cartas, cartaGanadora, pinta);
    }

    return eleccion;
  }

  private decidirJugada3(cartas: Carta[], mesa: Carta[], cartaGanadora: Carta, pinta: Palo, vamosGanando: boolean) {
    let eleccion = 1;
    if(vamosGanando){
      //la carta ganadora no es pinta
      if(cartaGanadora.palo != pinta){
        if(this.puntosEnLaMesa(mesa) >= 5 && this.puntosEnLaMesa(mesa) <= 9){
          eleccion = this.tirarVidaMedianaOBasura(cartas, pinta);
        }
        else if(this.puntosEnLaMesa(mesa) >= 10){
          eleccion = this.tirarVidaMaxima(cartas, pinta);
        }
        else{
          eleccion = this.tirarBasura(cartas, pinta);
        }
      }
      //la carta ganadora es pinta
      else{
        if(this.valorCarta(cartaGanadora) > 2){
          eleccion = this.tiraPuntos(cartas, pinta);
        }
        else{
          eleccion = this.tiraMinipuntosOpuntosOBasura(cartas, pinta);
        }
      }
      //si no vamos ganando
    }else{
      if(this.puntosEnLaMesa(mesa) > 9){
        eleccion = this.superarOVida(cartas, cartaGanadora, pinta);
      }else{
        eleccion = this.superarOBasura(cartas, cartaGanadora, pinta);
      }
    }
    return eleccion;
  }

  private decidirJugada4(cartas: Carta[], mesa: Carta[], cartaGanadora: Carta, pinta: Palo, vamosGanando: boolean): number {
    let eleccion = 1;
    if(vamosGanando){
      eleccion = this.tiraPuntos(cartas, pinta);
    }
    //si no vamos ganando
    else{
      if(this.puntosEnLaMesa(mesa) > 9){
        eleccion = this.superarOVida(cartas, cartaGanadora, pinta);
      }
      else if(this.puntosEnLaMesa(mesa) > 4){
        eleccion = this.superarOVidaPequeñaOBasura(cartas, cartaGanadora, pinta);
      }
      else{
        eleccion = this.superarConPuntosOBasura(cartas, cartaGanadora, pinta);
      }
      
    }

    return eleccion;
  }
   
}
