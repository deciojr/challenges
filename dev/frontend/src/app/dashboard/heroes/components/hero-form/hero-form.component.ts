import { Component, OnInit, ChangeDetectionStrategy, Input, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HeroClass } from '@shared/models/hero-class.model';

import { Hero } from '@shared/models/hero.model';
import { heroClassesValues } from '@shared/util/enum.util';

@Component({
  selector: 'app-hero-form',
  templateUrl: './hero-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroFormComponent {
  @Input() set hero(hero: Hero) {
    if (!!!hero) {
      return;
    }
    this.patchForm(hero);
  }

  @Input() update: boolean;

  @Input() pending: boolean;

  @Input() error: boolean;

  @Input() message: string;

  @Input() header: string;

  @Output() registerOrUpdate: EventEmitter<{ hero: Hero }> = new EventEmitter<{ hero: Hero }>();

  heroForm: FormGroup;

  heroClasses = heroClassesValues;

  constructor(private formBuilder: FormBuilder) {
    this.heroForm = this.formBuilder.group({
      id: this.formBuilder.control(''),
      name: this.formBuilder.control('', Validators.required),
      badge: this.formBuilder.control('', Validators.required),
      heroClass: this.formBuilder.control('', Validators.required),
      lat: this.formBuilder.control('', Validators.required),
      lng: this.formBuilder.control('', Validators.required),
    });
  }

  get name() {
    return this.heroForm.get('name');
  }

  get badge() {
    return this.heroForm.get('badge');
  }

  get heroClass() {
    return this.heroForm.get('heroClass');
  }

  get lat() {
    return this.heroForm.get('lat');
  }

  get lng() {
    return this.heroForm.get('lng');
  }

  get requiredAsterix() {
    return this.update ? '' : '*';
  }

  get submitText() {
    return this.update ? 'Update' : 'Register';
  }

  removeValidatorsFromFormGroup(formGroup: FormGroup) {
    for (const key in formGroup.controls) {
      if (formGroup.controls.hasOwnProperty(key)) {
        const control = formGroup.get(key);

        if (control instanceof FormGroup) {
          return this.removeValidatorsFromFormGroup(control);
        }

        control.clearValidators();
        control.updateValueAndValidity();
      }
    }
  }

  patchForm(hero: Hero) {
    this.removeValidatorsFromFormGroup(this.heroForm);
    this.heroForm.patchValue(hero);
  }

  submit() {
    this.registerOrUpdate.emit({
      hero: this.heroForm.value as Hero,
    });
  }
}
