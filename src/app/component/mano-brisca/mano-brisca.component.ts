import { Component, OnInit } from '@angular/core';
import { ManoBrisca } from 'src/app/models/Cartas';
import { CartaComponent } from '../carta/carta.component';
import { BarajaService } from 'src/app/services/baraja.service';

@Component({
  selector: 'app-mano-brisca',
  templateUrl: './mano-brisca.component.html',
  styleUrls: ['./mano-brisca.component.scss']
})
export class ManoBriscaComponent implements OnInit {

  carta1: CartaComponent;
  carta2: CartaComponent;
  carta3: CartaComponent;

  constructor(BarajaService: BarajaService) {
    this.carta1 = new CartaComponent(BarajaService);
    this.carta2 = new CartaComponent(BarajaService);
    this.carta3 = new CartaComponent(BarajaService);
   }

  ngOnInit(): void {
  }

}
