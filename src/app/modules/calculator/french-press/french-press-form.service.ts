import { Inject, Injectable, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { Subscription } from 'rxjs';
import { FrenchPressInput } from './french-press';
import { FrenchPressConstants } from './french-press.constants';

@Injectable({
  providedIn: 'root'
})
export class FrenchPressFormService implements OnDestroy {

  private subscriptions: Subscription = new Subscription();

  readonly form: FormGroup;

  constructor(private formBuilder: FormBuilder, @Inject(LOCAL_STORAGE) private storage: StorageService) {
    this.form = this.build(this.defaults());

    this.subscriptions.add(this.form.valueChanges.subscribe(
      (value: FrenchPressInput) => this.onFormChanges(value)));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  onFormChanges(options: FrenchPressInput): void {
    this.storage.set(FrenchPressConstants.DEFAULT_INPUT_STORAGE_KEY, options);
  }

  private build(options: FrenchPressInput): FormGroup {
    return this.formBuilder.group({
      amount: [ options.amount, [ Validators.required, Validators.min(1) ] ],
      strength: [ options.strength, [ Validators.required, Validators.min(1), Validators.max(7) ] ],
      measurement: [ options.measurement, [ Validators.required, Validators.pattern(/^(imperial|metric)$/g) ] ]
    });
  }

  private defaults(): FrenchPressInput {
    const prev: FrenchPressInput = this.storage.get(FrenchPressConstants.DEFAULT_INPUT_STORAGE_KEY) ?? {};
    return {
      amount: prev.amount ?? FrenchPressConstants.DEFAULT_INPUT.amount,
      strength: prev.strength ?? FrenchPressConstants.DEFAULT_INPUT.strength,
      measurement: prev.measurement ?? FrenchPressConstants.DEFAULT_INPUT.measurement
    };
  }
}
