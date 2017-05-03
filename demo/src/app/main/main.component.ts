import {Component, ViewChild, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {TeximateComponent, TeximateOptions, TeximateOrder, TeximateHover} from '../teximate';
import {Defaults} from './main.defaults';

@Component({
  selector: 'main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent implements OnInit {

  text = `They don't make bugs like Bunny anymore. 🐰`;

  options: TeximateOptions = {
    type: 'letter',
    animation: {name: 'bounce', duration: 1000},
    word: {type: TeximateOrder.SEQUENCE, delay: 100},
    letter: {type: TeximateOrder.SEQUENCE, delay: 50}
  };

  hover: TeximateHover = {
    type: 'letter',
    in: 'zoomIn',
    out: 'rubberBand'
  };

  texiTypes;
  hoverTypes;
  texiOrders;
  animateCss;

  @ViewChild(TeximateComponent) teximate: TeximateComponent;

  ngOnInit() {

    this.texiTypes = Defaults.texiTypes;
    this.texiOrders = Defaults.texiOrders;
    this.animateCss = Defaults.animateCss;
    this.hoverTypes = Defaults.hoverTypes;

    const diffOptions: TeximateOptions = {
      type: 'letter',
      animation: {name: 'bounce', duration: 1000},
      word: {type: TeximateOrder.SEQUENCE, delay: 100},
      letter: {type: TeximateOrder.SEQUENCE, delay: 50}
    };

    setTimeout(() => {
      this.teximate.runEffect(diffOptions);
    }, 2500);
  }

  updateAnimationType(type) {
    this.options = Object.assign({}, this.options, {type: type});
  }

  updateAnimationClass(className) {
    this.options = Object.assign({}, this.options, {
      animation: Object.assign({}, this.options.animation, {name: className})
    });
  }

  updateAnimationDuration(duration) {
    this.options = Object.assign({}, this.options, {
      animation: Object.assign({}, this.options.animation, {duration: duration})
    });
  }

  updateWordType(type) {
    this.options = Object.assign({}, this.options, {
      word: Object.assign({}, this.options.word, {type: type})
    });
  }

  updateLetterType(type) {
    this.options = Object.assign({}, this.options, {
      letter: Object.assign({}, this.options.letter, {type: type})
    });
  }

  updateWordDelay(delay) {
    this.options = Object.assign({}, this.options, {
      word: Object.assign({}, this.options.word, {delay: delay})
    });
  }

  updateLetterDelay(delay) {
    this.options = Object.assign({}, this.options, {
      letter: Object.assign({}, this.options.letter, {delay: delay})
    });
  }

  updateHoverType(type) {
    this.hover = Object.assign({}, this.hover, {type: type});
  }

  updateHoverIn(inEffect) {
    this.hover = Object.assign({}, this.hover, {in: inEffect});
  }

  updateHoverOut(outEffect) {
    this.hover = Object.assign({}, this.hover, {out: outEffect});
  }


}
