import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  text = `It’s kind of fun to do the impossible.`;

  anotherText = `3rd line
  4th one
  asdasdasd
  `;

  run = false;

  constructor() {

  }
}
