import { KeyValue, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { bindCallback, range } from 'rxjs';
import { GerenciadorPalavraService, Palavra } from '../gerenciador-palavra.service';


@Component({
  selector: 'app-tela-jogo',
  templateUrl: './tela-jogo.component.html',
  styleUrls: ['./tela-jogo.component.css'],
})
export class TelaJogoComponent implements OnInit {

  palavras: Palavra[];
  tabuleiro: any[][];
  letrasTeclado: any[];
  contaColuna: number;
  contaLinha: number;
  numeroSorteado: number;
  palavraSorteada: string;
  palavraTabuleiro: string;
  arrayPalavraTabuleiro: string[];
  arrayPalavraSorteadaFake: string[];

  constructor(private srv:GerenciadorPalavraService) { 
    this.tabuleiro = [
      [{letra: " ", status: "letra-nao-testada", achouLetra: false}, {letra: " ", status: "letra-nao-testada", achouLetra: false}, {letra: " ", status: "letra-nao-testada", achouLetra: false}, {letra: " ", status: "letra-nao-testada", achouLetra: false}, {letra: " ", status: "letra-nao-testada", achouLetra: false}],
      [{letra: " ", status: "letra-nao-testada", achouLetra: false}, {letra: " ", status: "letra-nao-testada", achouLetra: false}, {letra: " ", status: "letra-nao-testada", achouLetra: false}, {letra: " ", status: "letra-nao-testada", achouLetra: false}, {letra: " ", status: "letra-nao-testada", achouLetra: false}],
      [{letra: " ", status: "letra-nao-testada", achouLetra: false}, {letra: " ", status: "letra-nao-testada", achouLetra: false}, {letra: " ", status: "letra-nao-testada", achouLetra: false}, {letra: " ", status: "letra-nao-testada", achouLetra: false}, {letra: " ", status: "letra-nao-testada", achouLetra: false}],
      [{letra: " ", status: "letra-nao-testada", achouLetra: false}, {letra: " ", status: "letra-nao-testada", achouLetra: false}, {letra: " ", status: "letra-nao-testada", achouLetra: false}, {letra: " ", status: "letra-nao-testada", achouLetra: false}, {letra: " ", status: "letra-nao-testada", achouLetra: false}],
      [{letra: " ", status: "letra-nao-testada", achouLetra: false}, {letra: " ", status: "letra-nao-testada", achouLetra: false}, {letra: " ", status: "letra-nao-testada", achouLetra: false}, {letra: " ", status: "letra-nao-testada", achouLetra: false}, {letra: " ", status: "letra-nao-testada", achouLetra: false}],
      [{letra: " ", status: "letra-nao-testada", achouLetra: false}, {letra: " ", status: "letra-nao-testada", achouLetra: false}, {letra: " ", status: "letra-nao-testada", achouLetra: false}, {letra: " ", status: "letra-nao-testada", achouLetra: false}, {letra: " ", status: "letra-nao-testada", achouLetra: false}]
    ];

    this.letrasTeclado = [{letra: "Q", status: "letra-nao-testada"},{letra: "W", status: "letra-nao-testada"}, {letra: "E", status: "letra-nao-testada"}, {letra: "R", status: "letra-nao-testada"}, {letra: "F", status: "letra-nao-testada"}, {letra: "T", status: "letra-nao-testada"}, {letra: "Y", status: "letra-nao-testada"},
    {letra: "U", status: "letra-nao-testada"}, {letra: "I", status: "letra-nao-testada"}, {letra: "O", status: "letra-nao-testada"}, {letra: "P", status: "letra-nao-testada"}, {letra: "A", status: "letra-nao-testada"}, {letra: "S", status: "letra-nao-testada"}, {letra: "D", status: "letra-nao-testada"}, {letra: "F", status: "letra-nao-testada"}, {letra: "G", status: "letra-nao-testada"}, 
    {letra: "H", status: "letra-nao-testada"}, {letra: "J", status: "letra-nao-testada"}, {letra: "K", status: "letra-nao-testada"}, {letra: "L", status: "letra-nao-testada"}, {letra: "Z", status: "letra-nao-testada"}, {letra: "X", status: "letra-nao-testada"}, {letra: "C", status: "letra-nao-testada"}, {letra: "V", status: "letra-nao-testada"}, {letra: "B", status: "letra-nao-testada"}, 
    {letra: "N", status: "letra-nao-testada"}, {letra: "M", status: "letra-nao-testada"}, {letra: "<=", status: "letra-nao-testada"}, {letra: "Enter", status: "letra-nao-testada"}]
    
    this.contaColuna = 0;
    this.contaLinha = 0;
    this.numeroSorteado = 0;
    this.palavraSorteada = "";
    this.palavraTabuleiro = "";
    this.arrayPalavraTabuleiro = [];
    this.arrayPalavraSorteadaFake = [];
    this.palavras = this.srv.palavras;
    
  }

  ngOnInit(): void {
    this.geraPalavra();
  }

  escreveNaTabela(letra: string) {

    if(letra === "Enter") {
      this.verificaLetras();
    }
    else if(letra === "<="){
      this.apagaTecla();
    }
    else if(this.contaColuna < 5)
    {
      this.tabuleiro[this.contaLinha][this.contaColuna].letra = letra;
      this.contaColuna++;
    }

  }

  apagaTecla() {
    
    if(this.contaColuna > 0) {
      this.contaColuna--;
    }
    this.tabuleiro[this.contaLinha][this.contaColuna].letra = "";
    
  }                                                                                                                                                                                           

  geraPalavra() {
    this.numeroSorteado =  Math.floor(Math.random() * (this.palavras.length - 1));
    this.palavraSorteada = this.palavras[this.numeroSorteado].palavra;
    this.arrayPalavraSorteadaFake = this.palavraSorteada.split('');
  }

  verificaLetras() {

    for(let letraDigitada = 0; letraDigitada < 5; letraDigitada++){
      this.arrayPalavraTabuleiro[letraDigitada] = this.tabuleiro[this.contaLinha][letraDigitada].letra;
    }


    for(let letraDigitada = 0; letraDigitada < 5; letraDigitada++)
    {
      if(this.palavraSorteada[letraDigitada] === this.arrayPalavraTabuleiro[letraDigitada]) {
        this.tabuleiro[this.contaLinha][letraDigitada].status = "letra-certa";
        this.tabuleiro[this.contaLinha][letraDigitada].achouLetra = true;
        this.arrayPalavraSorteadaFake[letraDigitada] = "*";
        this.mudaStatusTeclado(this.tabuleiro[this.contaLinha][letraDigitada].status, this.arrayPalavraTabuleiro[letraDigitada]);
      } 
    }
    
    for(let letraDigitada = 0; letraDigitada < 5; letraDigitada++)
    {
      if(this.arrayPalavraSorteadaFake.includes(this.arrayPalavraTabuleiro[letraDigitada]) && this.tabuleiro[this.contaLinha][letraDigitada].achouLetra === false) {
        this.tabuleiro[this.contaLinha][letraDigitada].status = "letra-quase-certa";
        this.tabuleiro[this.contaLinha][letraDigitada].achouLetra = true;
        this.mudaStatusTeclado(this.tabuleiro[this.contaLinha][letraDigitada].status, this.tabuleiro[this.contaLinha][letraDigitada].letra)
      } 
      else if (this.tabuleiro[this.contaLinha][letraDigitada].status != "letra-certa" && this.tabuleiro[this.contaLinha][letraDigitada].status != "letra-quase-certa"){
        this.tabuleiro[this.contaLinha][letraDigitada].status = "letra-errada";
        this.mudaStatusTeclado(this.tabuleiro[this.contaLinha][letraDigitada].status, this.tabuleiro[this.contaLinha][letraDigitada].letra)
      }
    }
  
    this.verificaFimDeJogo();

  }

  getBackgroundColor(status: string) {
    switch(status) {
      case 'letra-nao-testada':
        return '#836FFF'
        break;
      case 'letra-quase-certa':
        return '#FFD700'
        break;
      case 'letra-certa':
        return 'green'
        break;
      case 'letra-errada':
        return '#800000'
        break;
      default:
         return '836FFF'
    }
  }

  getBackgroundTecladoColor(status: string) {
    switch(status) {
      case 'letra-nao-testada':
        return '#836FFF'
        break;
      case 'letra-quase-certa':
        return '#FFD700'
        break;
      case 'letra-certa':
        return 'green'
        break;
      case 'letra-errada':
        return '#800000'
        break;
      default:
         return '836FFF'
    }
  }

  verificaFimDeJogo() {
    this.palavraTabuleiro = this.arrayPalavraTabuleiro.join("");

    if(this.palavraSorteada === this.palavraTabuleiro)
    {
      this.jogadorVenceu();
    } 
    else if(this.contaLinha < 5) {
      this.contaLinha++;
      this.contaColuna = 0;
    } 
    else {
      this.jogadorPerdeu();
    }
  }

  jogadorPerdeu() {
    window.alert("Jogador Perdeu!")
  }

  jogadorVenceu() {
    window.alert("Você acertou a palavra, parabéns!")
  }

  mudaStatusTeclado(status: string, letra: string) {
    for(let letraDigitada = 0; letraDigitada < this.letrasTeclado.length -1; letraDigitada++) {
      if(letra === this.letrasTeclado[letraDigitada].letra)
      {
        this.letrasTeclado[letraDigitada].status = status;
      }
    }
  }





}
