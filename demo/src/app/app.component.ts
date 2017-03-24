import { Component, ViewChild } from '@angular/core';

import { TeximateComponent, TeximateOptions, WorkType } from './teximate';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  text = `It’s kind of fun to do the impossible.
  second line is for test
  the third one is just for fun`;

  @ViewChild(TeximateComponent) teximate: TeximateComponent;

  constructor() {

  }

  options: TeximateOptions;

  ngOnInit() {
    this.options = {
      type: 'letter',
      animation: { name: 'slideInLeft', duration: 200 },
      word: { type: WorkType.SHUFFLE, delay: 300 },
      letter: { type: WorkType.REVERSE, delay: 50 }
    };
  }

  test1() {
    this.text = 'It’s kind of fun to do the impossible. 🔥';
  }

  test2() {
    const options = {
      type: 'letter',
      animation: { name: 'slideOutRight', duration: 200 },
      word: { type: WorkType.SHUFFLE, delay: 300 },
      letter: { type: WorkType.REVERSE, delay: 50 }
    };
    this.teximate.runEffect(options);
  }

  test3() {
    const options = {
      type: 'letter',
      animation: { name: 'jello', duration: 200 },
      word: { type: WorkType.SHUFFLE, delay: 300 },
      letter: { type: WorkType.REVERSE, delay: 50 }
    };
    this.teximate.runEffect(options);
  }

}
