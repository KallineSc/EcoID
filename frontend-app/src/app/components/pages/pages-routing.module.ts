import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'denuncia', loadChildren: () => import('./denuncia/denuncia.module').then(m => m.CrudModule) },
        { path: 'usuario', loadChildren: () => import('./usuario/usuario.module').then(m => m.UsuarioModule) }
    ])],
    exports: [RouterModule]
})
export class PagesRoutingModule { }
