import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'coctails-listing', pathMatch: 'full'},
  {path: 'coctails-listing', loadChildren: () => import('./coctails-listing/coctails-listing.module').then(x => x.CoctailsListingModule) },
  { path: '404', loadChildren: () => import('./page-not-found/page-not-found.module').then(x => x.PageNotFoundModule) },
  { path: '**', redirectTo: '404' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
