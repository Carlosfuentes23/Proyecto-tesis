import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatePhaseComponent } from './create-phase/create-phase.component';
import { CreateProjectComponent } from './create-project/create-project.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { InicioComponent } from './inicio/inicio.component';
import { PhaseComponent } from './phase/phase.component';
import { ProjectComponent } from './project/project.component';
import { SelectRoleComponent } from './select-role/select-role.component';
import { UsersComponent } from './users.component';


const routes: Routes = [
  { path:'', component: UsersComponent, children:[
    { path: '', component: InicioComponent },
    { path: 'edit-user', component: EditUserComponent },
    { path: 'create-project', component: CreateProjectComponent },
    { path: 'create-phase', component: CreatePhaseComponent },
    { path: 'project', component: ProjectComponent},
    { path: 'phase', component: PhaseComponent},
    { path: 'select-role', component: SelectRoleComponent }
  ]},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
