import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'denuncia', loadChildren: () => import('./denuncia/denuncia.module').then(m => m.CrudModule) },
        { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) }
    ])],
    exports: [RouterModule]
})
export class PagesRoutingModule { }
