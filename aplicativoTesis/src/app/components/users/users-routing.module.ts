import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateProyectComponent } from './create-proyect/create-proyect.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { InicioComponent } from './inicio/inicio.component';
import { UsersComponent } from './users.component';


const routes: Routes = [
  { path:'', component: UsersComponent, children:[
    { path: '', component: InicioComponent },
    { path: 'edit-user', component: EditUserComponent},
    { path: 'create-proyect', component: CreateProyectComponent}
  ]},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
