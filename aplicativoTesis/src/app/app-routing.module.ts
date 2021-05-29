import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  { path: '', redirectTo:'login', pathMatch:'full'},
  { path: 'login', component: LoginComponent },
  { path: 'users', loadChildren: ()=> import('./components/users/users.module').then(m => m.UsersModule)},
  { path: '**', redirectTo:'login', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
