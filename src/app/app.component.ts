import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from './services/session.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'proyecto-cesur';
  nombre!: string;
  constructor(private router: Router, private sessionService: SessionService){
  }
  ngOnInit(): void {
    this.sessionService.nombre$.subscribe(nombre => {
      this.nombre = nombre;
    });
    let nombreAux = localStorage.getItem("usuario");
    if(nombreAux){
    this. nombre = nombreAux;
    this.router.navigate(['../home']);
  }
  else{
    this.nombre = "";
    this.router.navigate(['../login']);
  }}

  logout(){
    this.sessionService.setNombre('');
    localStorage.clear();

    this.router.navigate(['../login']);
  }

  home(){
    this.router.navigate(['../home']);
  }

  
}
