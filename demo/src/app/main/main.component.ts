import { Component, ViewChild, SimpleChanges, OnChanges } from '@angular/core';

import { TeximateComponent, TeximateOptions, WorkType } from '../teximate';

@Component({
  selector: 'main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {

  
  text = 'It’s kind of fun to do the impossible. 🔥';

  options: TeximateOptions = {
    animation: { name: 'fadeIn', duration: 300 },
    word: { type: WorkType.SHUFFLE, delay: 100 },
    letter: { type: WorkType.REVERSE, delay: 50 }
  };

  type = 'letter';

  @ViewChild(TeximateComponent) teximate: TeximateComponent;

  updateAnimationClass(className) {
    this.options = Object.assign({}, this.options, {
      animation: Object.assign({}, this.options.animation, { name: className })
    });
  }

  updateAnimationDuration(duration) {
    this.options = Object.assign({}, this.options, {
      animation: Object.assign({}, this.options.animation, { duration: duration })
    });
  }
  
  updateWordType(type) {
    this.options = Object.assign({}, this.options, {
      word: Object.assign({}, this.options.word, { type: type })
    });
  }
  updateLetterType(type) {
    this.options = Object.assign({}, this.options, {
      letter: Object.assign({}, this.options.letter, { type: type })
    });
  }
  updateWordDelay(delay) {
    this.options = Object.assign({}, this.options, {
      word: Object.assign({}, this.options.word, { delay: delay })
    });
  }
  updateLetterDelay(delay) {
    this.options = Object.assign({}, this.options, {
      letter: Object.assign({}, this.options.letter, { delay: delay })
    });
  }

  // workType = [
  //   'sequence',
  //   'shuffle',
  //   'reverse',
  //   'sync'
  // ];
   workType = [
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

