import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoctailComponent } from './coctail.component';

const routes: Routes = [
  {
    path: '',
    component: CoctailComponent
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoctailRoutingModule {}
