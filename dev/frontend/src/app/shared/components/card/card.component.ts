import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  @Input() classes: string;

  @Input() shadow: boolean;
}
