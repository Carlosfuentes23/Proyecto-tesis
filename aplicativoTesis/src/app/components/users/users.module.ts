import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../shared/shared.module';

import { UsersRoutingModule } from './users-routing.module';
import { AdminComponent } from './admin/admin.component';
import { MemberComponent } from './member/member.component';
import { LeaderComponent } from './leader/leader.component';


@NgModule({
  declarations: [
    AdminComponent,
    MemberComponent,
    LeaderComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule
  ]
})
export class UsersModule { }
