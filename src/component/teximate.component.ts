import { Component, OnChanges, Input, Renderer2, ElementRef, SimpleChanges, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { TeximateOptions, TeximateOrder } from '../helper/teximate.class';

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

  jobType: string = 'letter';

  /** Default effect */
  jobEffect: TeximateOptions = {
    animation: { name: 'fadeIn', duration: 300 },
    word: { type: TeximateOrder.SEQUENCE, delay: 100 },
    letter: { type: TeximateOrder.SHUFFLE, delay: 50 }
  };

  @Input() text: string;

  @Input() type: string;

  @Input() inEffect;

  // @Input() hoverEffect;

  // @Input() clickEffect;

  constructor(private teximate: TeximateService, private renderer: Renderer2, el: ElementRef) {

    /** create dynamic style (to avoid applying css rules' vendors for each element in the template) */
    this.style = this.renderer.createElement('style');
    this.renderer.appendChild(el.nativeElement, this.style);
  }

  ngOnChanges(changes: SimpleChanges) {

    console.log(changes['type'])

    let reloadText = changes['text'] && changes['text'].firstChange;

    if (changes['text'] && changes['text'].currentValue) {

      this.jobText = changes['text'].currentValue;
      reloadText = true;
    }

    if (changes['type'] && changes['type'].currentValue) {

      this.jobType = changes['type'].currentValue;
    }

    if (changes['inEffect']) {

      this.jobEffect = Object.assign({}, this.jobEffect, changes['inEffect'].currentValue);
      this.setAnimationDuration(changes['inEffect'].currentValue.animation.duration);
    }

    if (reloadText) {
      this.teximate.run(this.jobText, this.jobEffect, this.jobType);
    } else {
      this.teximate.runEffect(this.jobEffect, this.jobType);
    }
  }

  runEffect(options: TeximateOptions, type: string) {
    /** Run effect to the existing text (should be used from component ref
     * e.g. :
     * ViewChild(TeximateComponent) tx;
     * tx.runEffect(options);
     * */
    this.teximate.runEffect(options, type);
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
