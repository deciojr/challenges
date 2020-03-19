import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Threat } from '@shared/models/threat.model';
import { dangerLevelsValues } from '@shared/util/enum.util';

import { filterObject } from '@shared/util/object.util';

@Component({
  selector: 'app-threat-filter',
  templateUrl: './threat-filter.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThreatFilterComponent {
  @Input() pending;

  @Output() filter: EventEmitter<{ query: Partial<Threat> }> = new EventEmitter<{ query: Partial<Threat> }>();

  threatFilterForm: FormGroup;

  dangerLevels: string[] = dangerLevelsValues;

  constructor(private formBuilder: FormBuilder) {
    this.threatFilterForm = this.formBuilder.group({
      monsterName: this.formBuilder.control(''),
      dangerLevel: this.formBuilder.control(''),
      heroName: this.formBuilder.control(''),
    });
  }

  submit() {
    this.filter.emit({ query: filterObject(this.threatFilterForm.value, field => field !== '') as Partial<Threat> });
  }
}
