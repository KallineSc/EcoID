import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { AppLayoutComponent } from "./layout/app.layout.component";
import { authGuard } from './auth.guard';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', redirectTo:'home', pathMatch:'full'
            },            
            {
                path: 'home', 
                component: AppLayoutComponent,
                canMatch: [authGuard],
                children: [
                    { path: 'dashboard', loadChildren: () => import('./components/pages/dashboard/dashboard.module').then(m => m.DashboardModule) },
                    { path: 'pages', loadChildren: () => import('./components/pages/pages.module').then(m => m.PagesModule) }
                ]
            },
            { path: 'auth', loadChildren: () => import('./components/auth/auth.module').then(m => m.AuthModule) },
            { path: 'notfound', component: NotfoundComponent },
            { path: '**', redirectTo: '/notfound' },
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
