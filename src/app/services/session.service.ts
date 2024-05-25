import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private nombreSubject: BehaviorSubject<string>;

  constructor() {
    const nombre = localStorage.getItem('usuario') || '';
    this.nombreSubject = new BehaviorSubject<string>(nombre);
  }

  get nombre$() {
    return this.nombreSubject.asObservable();
  }

  setNombre(nombre: string) {
    localStorage.setItem('usuario', nombre);
    this.nombreSubject.next(nombre);
  }

  getNombre(): string {
    return this.nombreSubject.value;
  }
}
