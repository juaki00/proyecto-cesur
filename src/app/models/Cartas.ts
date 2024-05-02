

export class Carta{
    palo: number;
    valor: number;
    imagenUrl: string;

    constructor(palo: Palo, valor: number, imagenUrl: string){
        this.palo = palo;
        this.valor= valor
        this.imagenUrl = imagenUrl;
    }
}

export enum Palo{
    OROS, COPAS, ESPADAS, BASTOS
}

export class Baraja{
    cartas: Carta[] = [];

    constructor(){
    }
}

export class ManoBrisca{
    cartas:Carta[] ;

    constructor(carta1: Carta, carta2: Carta, carta3: Carta){
        this.cartas = new Array();
        this.cartas[0] = carta1;
        this.cartas[1] = carta2;
        this.cartas[2] = carta3;
    }
}

export enum TipoCarta{
    BASURA, MINIPUNTOS, PUNTOS, VIDA, VIDAMEDIANA, VIDAPUNTOS
}


