import { Routes } from '@angular/router';
import { HomeComponent } from './_components/home/home.component';
import { AdminComponent } from './_components/admin/admin.component';
import { UserComponent } from './_components/user/user.component';
import { LoginComponent } from './_components/login/login.component';
import { ForbiddenComponent } from './_components/forbidden/forbidden.component';
import { RegisterComponent } from './_components/register/register.component';
import { authGuard } from './_auth/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent,
    // ,
    // children: [
    //   {
    //     path: 'register',
    //     component: RegisterComponent,
    //   },
    // ],
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [authGuard],
    data: { roles: ['Admin'] },
  },
  {
    path: 'user',
    component: UserComponent,
    canActivate: [authGuard],
    data: { roles: ['User'] },
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  { path: 'login', component: LoginComponent },
  { path: 'forbidden', component: ForbiddenComponent },
];
