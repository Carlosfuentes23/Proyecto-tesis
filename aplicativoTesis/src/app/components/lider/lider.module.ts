import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LiderRoutingModule } from './lider-routing.module';
import { LiderComponent } from './lider.component';


@NgModule({
  declarations: [
    LiderComponent
  ],
  imports: [
    CommonModule,
    LiderRoutingModule
  ]
})
export class LiderModule { }
