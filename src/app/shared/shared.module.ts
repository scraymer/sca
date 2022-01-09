import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as Material from './material';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    Material.Modules
  ],
  exports: [
    ReactiveFormsModule,
    Material.Modules
  ],
  providers: [
    Material.Providers
  ]
})
export class SharedModule { }
