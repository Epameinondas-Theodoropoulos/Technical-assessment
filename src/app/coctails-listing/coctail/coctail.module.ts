import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoctailComponent } from './coctail.component';
import { CoctailRoutingModule } from './coctail-routing.module';


@NgModule({
  declarations: [
    CoctailComponent
  ],
  imports: [
    CommonModule,
    CoctailRoutingModule
  ]
})
export class CoctailModule { }
