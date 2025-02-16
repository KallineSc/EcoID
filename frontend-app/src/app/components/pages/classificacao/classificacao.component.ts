import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ClassificacaoService } from 'src/app/service/classificacao.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';


@Component({
    templateUrl: './classificacao.component.html',
    providers: [MessageService]
})

export class ClassificacaoComponent {
    imagemSelecionada: File | null = null;
    classificacao: SafeHtml | null = null;
    erro: string | null = null;
    loading: boolean = false;
  
    constructor(
      private classificacaoService: ClassificacaoService,
      private messageService: MessageService,
      private sanitizer: DomSanitizer
    ) {}
  
    onFileSelected(event: any) {
      const file: File = event.target.files[0];
      if (file) {
        this.imagemSelecionada = file;
        this.erro = null;
      }
    }
  
    enviarImagem() {
      if (!this.imagemSelecionada) {
        this.messageService.add({ severity: 'warn', summary: 'Atenção', detail: 'Selecione uma imagem antes de enviar!' });
        return;
      }
      console.log(this.imagemSelecionada);
      this.loading = true;
  
      this.classificacaoService.classificarImagem(this.imagemSelecionada)
        .subscribe(
          response => {
            this.loading = false;
            if (response.classificacao) {
              this.classificacao = this.sanitizer.bypassSecurityTrustHtml(response.classificacao.replace(/\n/g, "<br>"));
            } else {
              this.erro = 'Erro ao processar a imagem.';
            }
          },
          error => {
            this.loading = false;
            this.erro = 'Erro ao conectar com a API.';
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao classificar a imagem.' });
          }
        );
    }
  
    limpar() {
      this.imagemSelecionada = null;
      this.classificacao = null;
      this.erro = null;
    }

}
