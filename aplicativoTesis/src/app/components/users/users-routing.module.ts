import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AbilitieListComponent } from './abilitie-list/abilitie-list.component';
import { AbilitieComponent } from './abilitie/abilitie.component';
import { AddMembersAbilitieComponent } from './add-members-abilitie/add-members-abilitie.component';
import { AddMembersPhaseComponent } from './add-members-phase/add-members-phase.component';
import { AddMembersProyectComponent } from './add-members-proyect/add-members-proyect.component';
import { CreateAbilitieComponent } from './create-abilitie/create-abilitie.component';
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
    { path: 'profile/:id', component: InicioComponent },
    { path: 'edit-user/:id', component: EditUserComponent },
    { path: 'create-project', component: CreateProjectComponent },
    { path: 'create-phase/:id', component: CreatePhaseComponent },
    { path: 'create-abilitie/:id', component: CreateAbilitieComponent },
    { path: 'project/:id', component: ProjectComponent},
    { path: 'phase/:id', component: PhaseComponent},
    { path: 'select-role', component: SelectRoleComponent },
    { path: 'add-members-phase/:id', component: AddMembersPhaseComponent },
    { path: 'add-members-project/:id', component: AddMembersProyectComponent },
    { path: 'list-members-project/:id', component: AddMembersProyectComponent },
    { path: 'list-members-phase/:id', component: AddMembersPhaseComponent },
    { path: 'project/:projectId/abilitie/:id', component: AbilitieComponent },
    { path: 'phase/:phaseId/abilitie/:id', component: AbilitieComponent },
    { path: 'add-abiblitie-phase/:id', component: AbilitieListComponent },
    { path: 'phase/:phaseId/add-members-abilities/:id', component: AddMembersAbilitieComponent },
    { path: 'phase/:phaseId/members-abilities/:id', component: AddMembersAbilitieComponent },
    { path:':id', component: InicioComponent},
  ]},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
