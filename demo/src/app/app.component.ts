import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  text = `Okay alright,
  I will talk to him about this tomorrow.`;

  run = false;
}
