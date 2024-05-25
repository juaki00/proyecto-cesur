import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { Login } from '../models/Usuario';
import { SessionService } from '../services/session.service';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginValido = false;
  verLogin = true;
  verRegister = false;
  error = false;
  errorLabel='';
  email = '';
  username = '';
  lastName = '';
  //dateOfBirth = '';
  confirmPassword = '';
  
  IsVisible = false;
  password= '';

  constructor(private renderer: Renderer2, private router: Router, private sessionService: SessionService, private loginService: LoginService) {}

  ngOnInit(): void {
    this.error=false;
    this.renderer.setStyle(document.body, 'background-color', 'rgb(53, 104, 45)');
  }

  switchLogin() {
    this.verLogin = !this.verLogin;
    this.verRegister = !this.verRegister;
    this.errorLabel = '';
  }


  iniciarSesion(nombre: string, pswd: string){
    let login: Login;
    this.loginService.login$(nombre,pswd).subscribe(response => {
      if(response.existe){
        localStorage.setItem("usuario", nombre);
        this.sessionService.setNombre(nombre);
        this.router.navigate(['../']);
      }
      else{
        this.error = true;
        this.errorLabel = 'Usuario o contraseña incorrecta';
      }
    });   
  }

  crearUsuario(name:string, pass:string, email:string, nameInput: HTMLInputElement, emailInput: HTMLInputElement, passwordInput: HTMLInputElement){
    if(name.length<3){
      this.errorLabel = 'El nombre debe tener un longitud minima de 3 caracteres';
    }else if(pass.length<6){
      this.errorLabel = 'La contraseña debe tener un longitud minima de 6 caracteres';
    }else if(!this.validarEmail(email)){
      this.errorLabel = 'Formato de e-mail incorrecto';
    }else{
      this.loginService.agregarUsuario$(name,pass,email).subscribe(
        () => {
          console.log('Usuario agregado exitosamente');
          this.errorLabel= 'Usuario agregado exitosamente';
          nameInput.value = '';
          emailInput.value = '';
          passwordInput.value = '';
        },
        (error: HttpErrorResponse) => {
          console.error('Error al agregar usuario:', error);

          // Manejar el error basado en el código de estado HTTP
          if (error.status === 412) {
            this.errorLabel = 'Error, El usuario ya existe';
          } else {
            this.errorLabel = `Error del servidor.`;
          
        }
      }); 
    }
  }
  validarEmail(email: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
}

