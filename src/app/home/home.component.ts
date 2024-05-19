import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Login } from '../models/Usuario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  login: Login | undefined;
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.router.navigate(['../game']);
  }

}
