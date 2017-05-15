import { Component, OnChanges, Input, Renderer2, ElementRef, SimpleChanges, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { TeximateOptions, TeximateOrder, TeximateHover } from '../helper/teximate.class';
import { TeximateService } from '../service/teximate.service';

@Component({
  selector: 'teximate',
  templateUrl: './teximate.component.html',
  styleUrls: ['./teximate.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [TeximateService]
})
export class TeximateComponent implements OnChanges, OnDestroy {

  style: HTMLElement;

  jobText: string = 'Teximate is working';

  jobHover: TeximateHover = {
    type: 'off',
    in: undefined,
    out: undefined
  };

  /** Default effect */
  jobEffect: TeximateOptions = {
    type: 'letter',
    animation: { name: 'fadeIn', duration: 300 },
    word: { type: TeximateOrder.SEQUENCE, delay: 100 },
    letter: { type: TeximateOrder.SHUFFLE, delay: 50 }
  };

  @Input() text: string;

  @Input() hover;

  @Input() effect;

  constructor(public teximate: TeximateService, private renderer: Renderer2, el: ElementRef) {

    /** create dynamic style (to avoid applying css rules' vendors for each element in the template) */
    this.style = this.renderer.createElement('style');
    this.renderer.appendChild(el.nativeElement, this.style);
  }

  ngOnChanges(changes: SimpleChanges) {

    let reload: boolean = changes['text'] && changes['text'].firstChange;

    if (changes['text'] && changes['text'].currentValue) {

      this.jobText = changes['text'].currentValue;
      reload = true;
    }

    if (changes['hover'] && changes['hover'].currentValue) {
      this.jobHover = Object.assign({}, this.jobEffect, changes['hover'].currentValue);
      reload = true;
    }

    if (changes['effect']) {

      this.jobEffect = Object.assign({}, this.jobEffect, changes['effect'].currentValue);
      this.setAnimationDuration(changes['effect'].currentValue.animation.duration);
      if (!changes['effect'].firstChange && changes['effect'].previousValue.type !== changes['effect'].currentValue.type) {
        reload = true;
      }
    }

    if (reload) {
      this.teximate.createEffect(this.jobText, this.jobEffect, this.jobHover);
    } else {
      this.teximate.runEffect(this.jobEffect);
    }
  }

  /** 
    * Run effect to the existing text
    * (using component ref) e.g. :
    * ViewChild(TeximateComponent) tx;
    * tx.runEffect(options);
    */
  runEffect(options: TeximateOptions) {

    this.teximate.runEffect(options);
  }

  setAnimationDuration(duration) {
    this.renderer.setProperty(this.style, 'innerHTML', `
      .animated {
        animation-duration: ${duration}ms;
        -webkit-animation-duration: ${duration}ms;
        -moz-animation-duration: ${duration}ms;
        -o-animation-duration: ${duration}ms;
        -ms-animation-duration: ${duration}ms;
      }
    `);
  }

  ngOnDestroy() {
    this.teximate.text.unsubscribe();
    this.teximate.worker.unsubscribe();
  }

}
