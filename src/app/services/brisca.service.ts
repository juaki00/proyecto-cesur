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

   tipoCarta(carta: Carta, pinta: Palo):TipoCarta{
    let tipo: TipoCarta;
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
    return tipo;
   }

   
  decidirJugada(cartas: Carta[], mesa: Carta[], pinta: Palo):number{
    
    return 0;
  }
   
}
