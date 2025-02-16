import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'denuncia', loadChildren: () => import('./denuncia/denuncia.module').then(m => m.CrudModule) },
        { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
        { path: 'usuario', loadChildren: () => import('./usuario/usuario.module').then(m => m.UsuarioModule) },
        { path: 'relatorios', loadChildren: () => import('./relatorio/relatorio.module').then(m => m.RelatorioModule) },
        { path: 'classificacao', loadChildren: () => import('./classificacao/classificacao.module').then(m => m.ClassificacaoModule) },

    ])],
    exports: [RouterModule]
})
export class PagesRoutingModule { }
