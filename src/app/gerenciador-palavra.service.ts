import { Injectable } from '@angular/core';

export class Palavra {

  palavra: string;

  constructor(palavra: string) {
    this.palavra = palavra; 
  }

}

@Injectable({
  providedIn: 'root'
})
export class GerenciadorPalavraService {

  palavras: Palavra[];

  constructor() { 
    this.palavras = [];
    this.mock();
  }

  mock() {
    this.palavras.push({palavra: "AMADA"} );
    this.palavras.push({palavra: "CARRO"} );
    this.palavras.push({palavra: "PATIO"} );
    this.palavras.push({palavra: "FARDA"} );
    this.palavras.push({palavra: "LETRA"} );
    this.palavras.push({palavra: "OBRAS"} );
    this.palavras.push({palavra: "BROAS"} );
    this.palavras.push({palavra: "TENAZ"} );
    this.palavras.push({palavra: "TEMOR"} );
    this.palavras.push({palavra: "MUNDO"} );
    this.palavras.push({palavra: "ESTAR"} );
    this.palavras.push({palavra: "VICIO"} );
    this.palavras.push({palavra: "ORDEM"} );
    this.palavras.push({palavra: "PLENO"} );
    this.palavras.push({palavra: "CRISE"} );
    this.palavras.push({palavra: "FLUXO"} );
    this.palavras.push({palavra: "OBTER"} );
    this.palavras.push({palavra: "NICHO"} );
    this.palavras.push({palavra: "AMPLO"} );
    this.palavras.push({palavra: "AUDIO"} );
    this.palavras.push({palavra: "AMADO"} );


  }
}
