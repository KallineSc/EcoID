import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';

import { AuthGuard } from './services/auth-guard.service';

export const routes: Routes = [
    {
        path: "login",
        component: LoginComponent
    }
];
