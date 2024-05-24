import { Component, OnInit, Renderer2 } from '@angular/core';
import { Ranking } from '../models/Usuario';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mis-partidas',
  templateUrl: './mis-partidas.component.html',
  styleUrls: ['./mis-partidas.component.scss']
})
export class MisPartidasComponent implements OnInit {
  nombre = '';
  ranking: Ranking;
  constructor(private renderer: Renderer2, private loginService: LoginService, private router: Router) {
    this.ranking = new Ranking([]);
   }

  ngOnInit(): void {
    this.renderer.setStyle(document.body, 'background-color', 'rgb(53, 104, 45)');
    let nombreOpt = localStorage.getItem("usuario");
    if(nombreOpt){
      this.nombre = nombreOpt;
    }
    else{
      this.router.navigate(['../login']);
    }
    this.loginService.partidasDelUsuario$(this.nombre).subscribe(response => {
      this.ranking.partidas = response.partidas;
    });   
  }

  volver(){
    this.router.navigate(['../game']);
  }

}