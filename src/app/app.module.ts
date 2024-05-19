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
import { BriscaService } from './services/brisca.service';
import {MatCardModule} from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AvatarComponent } from './avatar/avatar.component';
import {MatInputModule} from '@angular/material/input';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RankingComponent } from './ranking/ranking.component';
import { FechaPipe } from './pipes/fecha.pipe';
import { MisPartidasComponent } from './mis-partidas/mis-partidas.component';
import { NombrePropioPipe } from './pipes/nombre-propio.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    GameComponent,
    PaloPipe,
    CartaNombrePipe,
    LoginComponent,
    AvatarComponent,
    RankingComponent,
    FechaPipe,
    MisPartidasComponent,
    NombrePropioPipe
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule,
    //material
    MatInputModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatToolbarModule,
    CommonModule,
    MatButtonModule,
    MatIconModule
    
  ],
  providers: [AppComponent,BarajaService, BriscaService, Baraja,
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'fill'}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
