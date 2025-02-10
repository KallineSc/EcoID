import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { RelatorioService } from 'src/app/service/relatorio.service';
import { Router } from '@angular/router';

@Component({
    templateUrl: './relatorio.component.html',
    providers: [MessageService]
})
export class RelatorioComponent {
    selectedFormat: string = 'json';
    formatOptions = [
      { label: 'JSON', value: 'json' },
      { label: 'CSV', value: 'csv' },
      { label: 'PDF', value: 'pdf' }
    ];
  
    constructor(private relatorioService: RelatorioService, private messageService: MessageService, private router: Router) { }

    generateRelatorio() {
      this.relatorioService.generateRelatorio(this.selectedFormat).subscribe((blob: Blob) => {
        const link = document.createElement('a');
        const url = window.URL.createObjectURL(blob);
        link.href = url;
        link.download = `relatorio.${this.selectedFormat}`;
        link.click();
        window.URL.revokeObjectURL(url);
      }, (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: `Ocorreu um erro ao gerar o relatório: ${error.message || error}`
        });
      });
  }
}
