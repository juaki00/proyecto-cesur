import { Component, OnInit } from '@angular/core';
import { Carta } from 'src/app/models/Cartas';
import { BarajaService } from 'src/app/services/baraja.service';

@Component({
  selector: 'app-carta',
  templateUrl: './carta.component.html',
  styleUrls: ['./carta.component.scss']
})
export class CartaComponent implements OnInit {
  carta!: Carta | undefined;

  constructor(barajaService: BarajaService) {
    
    this.carta = barajaService.cogerPrimeraCarta();
   }

  ngOnInit(): void {
  }

  pulsarCarta(){
    if(this.carta)
    this.carta.imagenUrl="";
  }

}
