import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <main class="h-100 w-100">
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [
    `
      main {
        background-color: #f7f7f7;
      }
    `,
  ],
})
export class AppComponent {}
