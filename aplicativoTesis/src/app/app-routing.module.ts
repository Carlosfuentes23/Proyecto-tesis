import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SigninComponent } from './components/signin/signin.component';

const routes: Routes = [
  { path: '', redirectTo:'Login', pathMatch:'full'},
  { path: 'Login', component: LoginComponent },
  { path: 'Signin', component: SigninComponent },
  { path: 'users', loadChildren: ()=> import('./components/users/users.module').then(m => m.UsersModule)},
  { path: '**', redirectTo:'login', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
