import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { GerenciadorPalavraService } from './gerenciador-palavra.service';
import { TelaJogoComponent } from './tela-jogo/tela-jogo.component';

@NgModule({
  declarations: [
    AppComponent,
    TelaJogoComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [ GerenciadorPalavraService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
