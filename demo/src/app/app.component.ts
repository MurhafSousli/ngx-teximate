import { Component, ViewChild, SimpleChanges, OnChanges } from '@angular/core';

import { TeximateComponent, TeximateOptions, WorkType } from './teximate';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  text;

  options: TeximateOptions = {
    type: 'letter',
    animation: { name: 'fadeIn', duration: 300 },
    word: { type: WorkType.SHUFFLE, delay: 100 },
    letter: { type: WorkType.REVERSE, delay: 50 }
  };

  @ViewChild(TeximateComponent) teximate: TeximateComponent;

  constructor() {

  }

  test1() {
    this.text = 'It’s kind of fun to do the impossible. 🔥';
    console.log(this.options);
  }

  test2() {
    console.log(this.options);
  }
  
  updateAnimationClass(className) {
    this.options = Object.assign({}, this.options, { animation: { name: className } });
  }
  updateAnimationDuration(duration) {
    this.options = Object.assign({}, this.options, { animation: { duration: duration } });
  }
  updateType(type) {
    this.options = Object.assign({}, this.options, { type: type });
  }
  updateWordType(type) {
    this.options = Object.assign({}, this.options, { word: { type: type } });
  }
  updateLetterType(type) {
    this.options = Object.assign({}, this.options, { letter: { type: type } });
  }
  updateWordDelay(delay) {
    this.options = Object.assign({}, this.options, { word: { delay: delay } });
  }
  updateLetterDelay(delay) {
    this.options = Object.assign({}, this.options, { letter: { delay: delay } });
  }

  workType= [
    'SEQUENCE',
    'SHUFFLE',
    'REVERSE',
    'SYNC'
  ];

  optionsTypes = [
    'letter',
    'word'
  ]

  animateCss = [
    'bounce',
    'flash',
    'pulse',
    'rubberBand',
    'shake',
    'headShake',
    'swing',
    'tada',
    'wobble',
    'jello',
    'bounceIn',
    'bounceInDown',
    'bounceInLeft',
    'bounceInRight',
    'bounceInUp',
    'bounceOut',
    'bounceOutDown',
    'bounceOutLeft',
    'bounceOutRight',
    'bounceOutUp',
    'fadeIn',
    'fadeInDown',
    'fadeInDownBig',
    'fadeInLeft',
    'fadeInLeftBig',
    'fadeInRight',
    'fadeInRightBig',
    'fadeInUp',
    'fadeInUpBig',
    'fadeOut',
    'fadeOutDown',
    'fadeOutDownBig',
    'fadeOutLeft',
    'fadeOutLeftBig',
    'fadeOutRight',
    'fadeOutRightBig',
    'fadeOutUp',
    'fadeOutUpBig',
    'flipInX',
    'flipInY',
    'flipOutX',
    'flipOutY',
    'lightSpeedIn',
    'lightSpeedOut',
    'rotateIn',
    'rotateInDownLeft',
    'rotateInDownRight',
    'rotateInUpLeft',
    'rotateInUpRight',
    'rotateOut',
    'rotateOutDownLeft',
    'rotateOutDownRight',
    'rotateOutUpLeft',
    'rotateOutUpRight',
    'hinge',
    'rollIn',
    'rollOut',
    'zoomIn',
    'zoomInDown',
    'zoomInLeft',
    'zoomInRight',
    'zoomInUp',
    'zoomOut',
    'zoomOutDown',
    'zoomOutLeft',
    'zoomOutRight',
    'zoomOutUp',
    'slideInDown',
    'slideInLeft',
    'slideInRight',
    'slideInUp',
    'slideOutDown',
    'slideOutLeft',
    'slideOutRight',
    'slideOutUp'
  ];

}
