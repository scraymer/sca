import { Component, OnInit } from '@angular/core';
import { FormGroup, NumberValueAccessor } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { FrenchPressInput, FrenchPressOutput, MeasurementSystem } from './french-press';
import { FrenchPressFormService } from './french-press-form.service';
import { FrenchPressService } from './french-press.service';

interface FrenchPressMeasurement {
  label: string;
  value: string;
  icon?: string;
}

interface FrenchPressSizeOption {
  label: string;
  value: number;
}

@Component({
  selector: 'app-french-press-calculator',
  templateUrl: './french-press.component.html',
  styleUrls: ['./french-press.component.scss']
})
export class FrenchPressComponent implements OnInit {

  form: FormGroup = this.formService.form;

  measurements: Observable<Array<FrenchPressMeasurement>> = this.service.output().pipe(
    map(value => this.toMeasurements(value)));

  pressSizeOptions: Observable<Array<FrenchPressSizeOption>> = this.service.output().pipe(
    map(value => this.toPressSizeOptions(value?.measurement)));

  ratio: (strength: number) => string = (value) => this.resolveRatio(value);

  constructor(private formService: FrenchPressFormService, private service: FrenchPressService) {}

  ngOnInit(): void {}

  private resolveRatio(strength: number): string {
    return `1:${this.service.ratio(strength)}`;
  }

  private toMeasurements(value: FrenchPressOutput): Array<FrenchPressMeasurement> {
    return [
      { label: 'Beans', value: this.toSolidFormat(value?.coffee, value?.measurement) },
      { label: 'Grind', value: value?.grind ?? '' },
      { label: 'Water', value: this.toFluidFormat(value?.water, value?.measurement) },
      { label: 'Time', value: this.toTimeFormat(value?.time) }
    ];
  }

  private toFluidFormat(value: number, measurement: MeasurementSystem): string {
    const isImperial = measurement === 'imperial';
    return `${(value ?? 0).toFixed(isImperial ? 1 : 0)} (${isImperial ? 'fl oz' : 'ml'})`;
  }

  private toPressSizeOptions(measurement: MeasurementSystem): Array<FrenchPressSizeOption> {
    return measurement === 'imperial' ? [
      { value: 12, label: 'Single (12 fl oz)' },
      { value: 17, label: 'Small (17 fl oz)' },
      { value: 34, label: 'Medium (34 fl oz)' },
      { value: 51, label: 'Large (51 fl oz)' },
      { value: 59, label: 'Extra Large (59 fl oz)' }
    ] : [
      { value: 350, label: 'Single (350 ml)' },
      { value: 500, label: 'Small (500 ml)' },
      { value: 1000, label: 'Medium (1000 ml)' },
      { value: 1500, label: 'Large (1500 ml)' },
      { value: 1750, label: 'Extra Large (1750 ml)' }
    ];
  }  

  private toSolidFormat(value: number, measurement: MeasurementSystem): string {
    const isImperial = measurement === 'imperial';
    return `${(value ?? 0).toFixed(isImperial ? 1 : 0)} (${isImperial ? 'oz' : 'g'})`;
  }

  private toTimeFormat(value: number): string {
    return `${value ?? 0} (min)`;
  }
}
