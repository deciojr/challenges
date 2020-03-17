import { Component, ChangeDetectionStrategy, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Hero } from '@shared/models/hero.model';
import { heroClassesValues } from '@shared/util/hero-classes.util';

@Component({
  selector: 'app-hero-filter',
  templateUrl: './hero-filter.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroFilterComponent {
  @Input() pending: boolean;

  @Output() filter: EventEmitter<{ query: Partial<Hero> }> = new EventEmitter<{ query: Partial<Hero> }>();

  heroFilterForm: FormGroup;

  heroClasses = heroClassesValues;

  constructor(private formBuilder: FormBuilder) {
    this.heroFilterForm = this.formBuilder.group({
      name: this.formBuilder.control(''),
      badge: this.formBuilder.control(''),
      heroClass: this.formBuilder.control(''),
    });
  }

  filterNotSpecifiedFields(formValue: object) {
    const filtered = {};

    const wasSpecified = fieldValue => fieldValue !== '';

    for (const field in formValue) {
      if (formValue.hasOwnProperty(field) && wasSpecified(formValue[field])) {
        filtered[field] = formValue[field];
      }
    }
    return filtered;
  }

  submit() {
    this.filter.emit({ query: this.filterNotSpecifiedFields(this.heroFilterForm.value) as Partial<Hero> });
  }
}
