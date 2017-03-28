import { Component, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { TeximateComponent, TeximateOptions, TeximateOrder } from '../teximate';

@Component({
  selector: 'main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent {

  text = "A window of opportunity won't open itself.. 👾";

  options: TeximateOptions = {
    animation: { name: 'zoomInLeft', duration: 1000 },
    word: { type: TeximateOrder.SHUFFLE, delay: 100 },
    letter: { type: TeximateOrder.SHUFFLE, delay: 50 }
  };

  type = 'letter';

  @ViewChild(TeximateComponent) teximate: TeximateComponent;

  ngOnInit(){

    const options: TeximateOptions = {
      animation: { name: 'bounce', duration: 1000 },
      word: { type: TeximateOrder.SEQUENCE, delay: 100 },
      letter: { type: TeximateOrder.SEQUENCE, delay: 50 }
    };

    setTimeout(()=>{
      this.teximate.runEffect(options, 'letter');
    }, 2500);
  }

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
  texiOrders = [
    'SEQUENCE',
    'SHUFFLE',
    'REVERSE',
    'SYNC'
  ];

  texiTypes = [
    'letter',
    'word'
  ];

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

