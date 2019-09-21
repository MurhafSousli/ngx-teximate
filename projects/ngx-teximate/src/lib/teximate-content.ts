import { Directive, Input, ElementRef } from '@angular/core';
import { AnimationReferenceMetadata } from '@angular/animations';
import { ContentObserver } from '@angular/cdk/observers';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Directive({
  selector: '[teximateContent]',
  exportAs: 'teximateContent'
})
export class TeximateContent {

  @Input() type: 'word' | 'paragraph' | 'letter';

  @Input() animationDelay: number;

  @Input() startDelay: number;

  @Input() endDelay: number;

  @Input() animation: AnimationReferenceMetadata;

  @Input() selected: boolean;

  contentChanges: Observable<TeximateDirective>;

  get value(): TeximateDirective {
    return {
      selected: this.selected,
      type: this.type,
      startDelay: this.startDelay,
      endDelay: this.endDelay,
      animation: this.animation,
      animationDelay: this.animationDelay,
      content: this.host.nativeElement.innerHTML
    };
  }

  constructor(private host: ElementRef, private observer: ContentObserver) {
    this.contentChanges = this.observer.observe(host.nativeElement).pipe(
      map(() => this.value)
    );
  }

}

export interface TeximateDirective {
  content: string;
  type: 'word' | 'paragraph' | 'letter';
  startDelay: number;
  endDelay: number;
  animation: AnimationReferenceMetadata;
  animationDelay: number;
  selected: boolean;
}
