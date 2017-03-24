import { Component, OnChanges, Input, Renderer, ElementRef, SimpleChanges, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Helper, TeximateOptions, WorkType } from '../service/teximate.helper';

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

  /** Default effect */
  options: TeximateOptions = {
    type: 'letter',
    animation: { name: 'fadeIn', duration: 300 },
    word: { type: WorkType.SEQUENCE, delay: 100 },
    letter: { type: WorkType.SHUFFLE, delay: 50 }
  };

  content: string = 'Teximate is working';

  @Input() effect;

  @Input() text: string;

  constructor(private teximate: TeximateService, private renderer: Renderer, private el: ElementRef) {
    /** create dynamic stlye (to avoid applying css rules' vendors for each element in the template) */
    this.style = this.renderer.createElement(this.el.nativeElement, 'style');
  }

  ngOnChanges(changes: SimpleChanges) {

    if (changes['effect']) {
      this.options = Object.assign({}, this.options, changes['effect'].currentValue);
    }
    if (changes['text']) {
      this.content = changes['text'].currentValue;
    }

    this.teximate.run(this.content, this.options);
  }

  runEffect(options) {

    this.teximate.runEffect(options);
  }

  setAnimationDuration(duration) {
    this.renderer.setElementProperty(this.style, 'innerHTML', `
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
    this.teximate.array.unsubscribe();
    this.teximate.worker.unsubscribe();
  }

}
