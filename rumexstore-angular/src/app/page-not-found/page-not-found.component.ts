import { Component } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  template: `
    <p>
      This page doesn't exist. Go back to
      <a routerLink="/shop">home</a>.
    </p>
  `,
  styles: [],
})
export class PageNotFoundComponent {}
