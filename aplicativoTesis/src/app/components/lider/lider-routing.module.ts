import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LiderComponent } from './lider.component';

const routes: Routes = [
  { path: '', component: LiderComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LiderRoutingModule { }
