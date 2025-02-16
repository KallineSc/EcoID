import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ClassificacaoComponent } from './classificacao.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: ClassificacaoComponent }
	])],
	exports: [RouterModule]
})
export class ClassificacaoRoutingModule { }
