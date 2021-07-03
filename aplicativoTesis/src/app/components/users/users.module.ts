import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../shared/shared.module';

import { UsersRoutingModule } from './users-routing.module';

import { UsersComponent } from './users.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { InicioComponent } from './inicio/inicio.component';
import { CreateProyectComponent } from './create-proyect/create-proyect.component';


@NgModule({
  declarations: [
    UsersComponent,
    EditUserComponent,
    InicioComponent,
    CreateProyectComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule
  ]
})
export class UsersModule { }
