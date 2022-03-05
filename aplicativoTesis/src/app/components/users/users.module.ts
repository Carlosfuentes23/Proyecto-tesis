import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../shared/shared.module';

import { UsersRoutingModule } from './users-routing.module';

import { UsersComponent } from './users.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { InicioComponent } from './inicio/inicio.component';
import { CreateProjectComponent } from './create-project/create-project.component';
import { CreatePhaseComponent } from './create-phase/create-phase.component';
import { ProjectComponent } from './project/project.component';
import { PhaseComponent } from './phase/phase.component';
import { SelectRoleComponent } from './select-role/select-role.component';
import { SelectProjectComponent } from './select-project/select-project.component';
import { AddMembersProyectComponent } from './add-members-proyect/add-members-proyect.component';
import { AddMembersPhaseComponent } from './add-members-phase/add-members-phase.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [
    UsersComponent,
    EditUserComponent,
    InicioComponent,
    CreateProjectComponent,
    CreatePhaseComponent,
    ProjectComponent,
    PhaseComponent,
    SelectRoleComponent,
    SelectProjectComponent,
    AddMembersProyectComponent,
    AddMembersPhaseComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule,
    FontAwesomeModule
  ]
})
export class UsersModule { }
