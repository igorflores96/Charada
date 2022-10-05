import { TestBed } from '@angular/core/testing';

import { GerenciadorPalavraService } from './gerenciador-palavra.service';

describe('GerenciadorPalavraService', () => {
  let service: GerenciadorPalavraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GerenciadorPalavraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
