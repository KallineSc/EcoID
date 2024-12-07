import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DenunciaComponent } from './denuncia.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: DenunciaComponent }
	])],
	exports: [RouterModule]
})
export class DenunciaRoutingModule { }
