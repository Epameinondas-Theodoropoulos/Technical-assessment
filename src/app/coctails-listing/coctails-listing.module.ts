import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoctailsListingComponent } from './coctails-listing.component';
import { CoctailsListingRoutingModule } from './coctails-listing-routing.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CoctailsListingComponent
  ],
  imports: [
    CommonModule,
    CoctailsListingRoutingModule,
    ReactiveFormsModule
  ]
})
export class CoctailsListingModule { }
