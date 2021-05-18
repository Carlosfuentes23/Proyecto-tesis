import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  { path: '', redirectTo:'login', pathMatch:'full'},
  { path: 'login', component: LoginComponent },
  { path: 'admin', loadChildren: ()=>import('./components/admin/admin.module').then(m => m.AdminModule)},
  { path: 'member', loadChildren: ()=>import('./components/miembro/miembro.module').then(m => m.MiembroModule)},
  { path: 'leader', loadChildren: ()=>import('./components/lider/lider.module').then(m => m.LiderModule)},
  { path: '**', redirectTo:'login', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
