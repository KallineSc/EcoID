import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { UserRegistrationComponent } from './pages/user-registration/user-registration.component';
import { HomeComponent } from './pages/home/home.component';

import { AuthGuard } from './services/auth-guard.service';

export const routes: Routes = [
    {
        path: "login",
        component: LoginComponent
    },
    {
        path: "userRegistration",
        component: UserRegistrationComponent
    },
    {
        path: "home",
        component: HomeComponent
    }
];
