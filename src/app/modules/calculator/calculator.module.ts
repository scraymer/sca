import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalculatorRoutingModule } from './calculator-routing.module';
import { FrenchPressComponent } from './french-press/french-press.component';
import { CalculatorComponent } from './calculator.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [
    FrenchPressComponent,
    CalculatorComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CalculatorRoutingModule
  ]
})
export class CalculatorModule { }
