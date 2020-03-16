import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-button-with-loader',
  templateUrl: './button-with-loader.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonWithLoaderComponent {
  @Input() pending: boolean;

  @Input() disable: boolean;

  @Input() type: string;

  @Input() classes: string;
}
