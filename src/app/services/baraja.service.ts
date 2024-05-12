import { Injectable } from '@angular/core';
import { Baraja, Carta, Palo } from '../models/Cartas';

@Injectable({
  providedIn: 'root'
})
export class BarajaService {
  getBaraja(): Baraja {
    return this.baraja;
  }

  baraja: Baraja;

  constructor() { 
    this.baraja = new Baraja();
    this.inicializarBaraja();
    this.barajar();
  }

  reiniciarBaraja(){
    this.baraja = new Baraja();
    this.inicializarBaraja();
    this.barajar();
  }

  inicializarBaraja(): void {
    for (let i = 1; i <= 10; i++) {
      for (let j = 1; j <= 4; j++) {
        let imagen = "assets\\cartas\\"+i+"-"+j+".jpg";
        let carta = new Carta(j,i,imagen);
        this.baraja.cartas.push(carta);
      }
    }
  }

  barajar() {
    for (let i = this.baraja.cartas.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = this.baraja.cartas[i];
      this.baraja.cartas[i] = this.baraja.cartas[j];
      this.baraja.cartas[j] = temp;
    }
  }

  cogerPrimeraCarta(): Carta{
    let primeraCarta: Carta | undefined = this.baraja.cartas.pop();
      if(primeraCarta){
        return primeraCarta;
      }
      else{
        return new Carta(0,0,"");
      }
    }

  estaVacio():boolean{
    return this.baraja.cartas.length == 0;
  }

  introducirCartaAbajo(carta: Carta){
    this.baraja.cartas.unshift(carta);
  }

  cartasEnMano(cartas: Carta[]):number{
    let result = 0;
    cartas.forEach(carta=>{
      if(carta.valor>0){
        result++;
      }
    });
    return result;
  }
  
}
