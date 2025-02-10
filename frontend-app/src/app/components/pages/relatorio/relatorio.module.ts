import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToolbarModule } from 'primeng/toolbar';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';

import { RelatorioComponent } from './relatorio.component';
import { RelatorioRoutingModule } from './relatorio-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule, 
    HttpClientModule,
    ToolbarModule,
    DropdownModule,
    ButtonModule,
    RelatorioRoutingModule
  ],
  declarations: [RelatorioComponent]
})
export class RelatorioModule { }
