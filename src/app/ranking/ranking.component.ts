import { Component, OnInit, Renderer2 } from '@angular/core';
import { Ranking } from '../models/Usuario';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss']
})
export class RankingComponent implements OnInit {

  ranking: Ranking;
  constructor(private renderer: Renderer2, private loginService: LoginService, private router: Router) {
    this.ranking = new Ranking([]);
   }

  ngOnInit(): void {
    this.renderer.setStyle(document.body, 'background-color', 'rgb(53, 104, 45)');
    this.loginService.ranking$().subscribe(response => {
      this.ranking.partidas = response.partidas;
    });   
  }

  volver(){
    this.router.navigate(['../game']);
  }

}
