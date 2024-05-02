import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { GameComponent } from './game/game.component';
import { BarajaService } from './services/baraja.service';
import { Baraja } from './models/Cartas';
import { PaloPipe } from './pipes/palo.pipe';
import { CartaNombrePipe } from './pipes/carta-nombre.pipe';
import { CartaComponent } from './component/carta/carta.component';
import { ManoBriscaComponent } from './component/mano-brisca/mano-brisca.component';
import { BriscaService } from './services/brisca.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    GameComponent,
    PaloPipe,
    CartaNombrePipe,
    CartaComponent,
    ManoBriscaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [AppComponent,BarajaService, BriscaService, Baraja],
  bootstrap: [AppComponent]
})
export class AppModule { }
