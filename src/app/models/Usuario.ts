
export class Login{
    existe: boolean;

    constructor(existe: boolean){
        this.existe = existe;
    }
}
export class Ranking{
    partidas: Partida[];
    
    constructor(partidas: Partida[]){
        this.partidas = partidas;
    }
}

export class Partida{
    puntuacion: number;
    fecha: string;
    jugador: Jugador;

    constructor(puntuacion: number, fecha: string, nombreJugador: Jugador){
        this.puntuacion = puntuacion;
        this.fecha = fecha;
        this.jugador = nombreJugador;
    }
}

export class Jugador {
    nombre: string;
    email: string;

    constructor(nombre: string, email: string){
        this.nombre = nombre;
        this.email = email;
    }
}


