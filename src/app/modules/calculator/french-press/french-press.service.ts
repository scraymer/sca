import { Inject, Injectable, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { FrenchPressConstants } from './french-press.constants';
import { FrenchPressInput, FrenchPressOutput } from './french-press';
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';
import { FrenchPressFormService } from './french-press-form.service';

@Injectable({
  providedIn: 'root'
})
export class FrenchPressService implements OnDestroy {

  private subscriptions: Subscription = new Subscription();

  private output$: Subject<FrenchPressOutput> = new BehaviorSubject<FrenchPressOutput>(null as any);
  public output(): Observable<FrenchPressOutput> {
    return this.output$.asObservable();
  }

  constructor(private formService: FrenchPressFormService) {
    this.subscriptions.add(this.formService.form.valueChanges.subscribe(
      (values: FrenchPressInput) => this.onFormChanges(values)));

    this.onFormChanges(this.formService.form.value);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  onFormChanges(options: FrenchPressInput): void {
    this.output$.next(this.calculate(options));
  }

  calculate(options: FrenchPressInput): FrenchPressOutput {
    return {
      coffee: options.amount / this.ratio(options.strength),
      water: options.amount,
      time: 4,
      grind: 'Coarse',
      measurement: options.measurement
    };
  }

  ratio(strength: number): number {
    return 17 - strength;
  }
}
