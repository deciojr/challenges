import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  TrackByFunction,
} from '@angular/core';

import { Hero } from '@shared/models/hero.model';

@Component({
  selector: 'app-hero-table',
  templateUrl: './hero-table.component.html',
  styleUrls: ['./hero-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroTableComponent implements OnInit {
  @Input() heroes: Hero[];

  @Input() pending: boolean;

  @Input() error: boolean;

  @Input() message: string;

  @Output() update: EventEmitter<{ hero: Hero }> = new EventEmitter<{ hero: Hero }>();

  @Output() delete: EventEmitter<{ hero: Hero }> = new EventEmitter<{ hero: Hero }>();

  constructor() {}

  ngOnInit(): void {}

  updateHero(hero: Hero) {
    this.update.emit({ hero });
  }

  deleteHero(hero: Hero) {
    this.delete.emit({ hero });
  }

  trackHeroes: TrackByFunction<Hero> = (index, hero: Hero) => hero.id;
}
