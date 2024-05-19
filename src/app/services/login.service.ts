import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login, Ranking } from '../models/Usuario';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private _endpoint = 'http://localhost:8080';

  constructor(private _http: HttpClient) { }
  
  login$(nombre: string, contrasena: string): Observable<Login> {
    // Utilizamos los parámetros recibidos en la función
    return this._http.get<Login>(`${this._endpoint}/clientes/login`, {
      params: {
        nombre: nombre,
        contrasena: contrasena,
        token: '1234'
      }
    });
  }

  ranking$(): Observable<Ranking> {
    // Utilizamos los parámetros recibidos en la función
    return this._http.get<Ranking>(`${this._endpoint}/partidas/ranking`, {
      params: {
        token: '1234'
      }
    });
  }

  partidasDelUsuario$(nombre: string): Observable<Ranking> {
    // Utilizamos los parámetros recibidos en la función
    return this._http.get<Ranking>(`${this._endpoint}/partidas/deUsuario`, {
      params: {
        token: '1234',
        nombre: nombre
      }
    });
  }

  agregarUsuario$(nombre: string, contrasena: string, email: string): Observable<void> {
    const params = new HttpParams()
      .set('nombre', nombre)
      .set('contrasena', contrasena)
      .set('email', email)
      .set('token', '1234');

    return this._http.post<void>(`${this._endpoint}/clientes/insertCliente`, null, { params });
  }

  agregarPartida$(nombre: string, puntuacion: number): Observable<void> {
    const params = new HttpParams()
      .set('nombre', nombre)
      .set('puntuacion', puntuacion)
      .set('token', '1234');

    return this._http.post<void>(`${this._endpoint}/partidas/insertPartida`, null, { params });
  }
}
