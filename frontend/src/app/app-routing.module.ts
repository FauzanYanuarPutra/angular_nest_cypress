import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthGuard } from './auth/auth.guard';
import { UserGuard } from './auth/user.guard';
import { CreateComponent } from './dashboard/blog/create/create.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [UserGuard]
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: DashboardComponent
      },
      {
        path: 'create',
        component: CreateComponent
      }
    ]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [UserGuard]

  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [UserGuard]
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


