import { Component, ChangeDetectionStrategy, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Hero } from '@shared/models/hero.model';
import { heroClassesValues } from '@shared/util/enum.util';
import { filterObject } from '@shared/util/object.util';

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

  submit() {
    this.filter.emit({ query: filterObject(this.heroFilterForm.value, field => field !== '') as Partial<Hero> });
  }
}
