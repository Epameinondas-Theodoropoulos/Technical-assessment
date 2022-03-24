import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoctailsListingComponent } from './coctails-listing.component';

const routes: Routes = [
  {
    path: '',
    component: CoctailsListingComponent,
  },
  {
    path: 'coctail/:id',
    loadChildren: () => import('./coctail/coctail.module').then(x => x.CoctailModule),
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoctailsListingRoutingModule {}
