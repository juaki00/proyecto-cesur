import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'proyecto-cesur';
  nombre: string;
  constructor(private router: Router){
    let nombreAux = localStorage.getItem("usuario");
    if(nombreAux){
      this. nombre = nombreAux;
    }
    else{
      this.router.navigate(['../login']);
      this.nombre = "";
    }
  }
  ngOnInit(): void {}

  logout(){
    localStorage.clear();
    this.router.navigate(['../login']);
  }

  
}
