import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthComponent } from './components/auth/auth.component';

export const routes: Routes = [
    {path:'',component: AuthComponent},
    {path:'dashboard', component: DashboardComponent},
    {path:'**', redirectTo:''}
];
