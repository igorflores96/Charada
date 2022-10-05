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

    if(this.contaColuna < 5)
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
      } 
    }
    
    for(let letraDigitada = 0; letraDigitada < 5; letraDigitada++)
    {
      if(this.arrayPalavraSorteadaFake.includes(this.arrayPalavraTabuleiro[letraDigitada]) && this.tabuleiro[this.contaLinha][letraDigitada].achouLetra === false) {
        this.tabuleiro[this.contaLinha][letraDigitada].status = "letra-quase-certa";
        this.tabuleiro[this.contaLinha][letraDigitada].achouLetra = true;
      } 
      else if (this.tabuleiro[this.contaLinha][letraDigitada].status != "letra-certa" && this.tabuleiro[this.contaLinha][letraDigitada].status != "letra-quase-certa"){
        this.tabuleiro[this.contaLinha][letraDigitada].status = "letra-errada";
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





}
