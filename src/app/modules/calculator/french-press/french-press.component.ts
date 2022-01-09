import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { FrenchPressOutput } from './french-press';
import { FrenchPressFormService } from './french-press-form.service';
import { FrenchPressService } from './french-press.service';

@Component({
  selector: 'app-french-press-calculator',
  templateUrl: './french-press.component.html',
  styleUrls: ['./french-press.component.scss']
})
export class FrenchPressComponent implements OnInit {

  public form: FormGroup = this.formService.form;
  public coffee: Observable<number> = this.service.output().pipe(map(value => Math.round(value?.coffee)));
  public water: Observable<number> = this.service.output().pipe(map(value => Math.round(value?.water)));

  constructor(private formService: FrenchPressFormService, private service: FrenchPressService) {}

  ngOnInit(): void {}
}
