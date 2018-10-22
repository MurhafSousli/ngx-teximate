import { Directive, Output, AfterViewInit, OnDestroy, Inject, ElementRef, EventEmitter, forwardRef } from '@angular/core';
import { Subscription, fromEvent, merge, SubscriptionLike, of } from 'rxjs';
import { filter, switchMap, tap } from 'rxjs/operators';
import { Teximate } from './teximate';

export class TeximateEvents implements AfterViewInit, OnDestroy {

  private selector: string;
  private events: SubscriptionLike = Subscription.EMPTY;
  @Output('') click = new EventEmitter();
  @Output('') hover = new EventEmitter();

  constructor(private element: ElementRef, @Inject(forwardRef(() => Teximate)) private teximate: Teximate) {
  }

  ngAfterViewInit() {
    this.events = this.teximate.state.pipe(
      filter(() => !!this.click.observers.length || !!this.hover.observers.length),
      switchMap(() => {
        let clickEvents = of(null);
        let hoverEvents = of(null);
        const words = this.element.nativeElement.querySelectorAll(this.selector);
        if (this.click.observers.length) {
          const events = Array.from(words).map((el: HTMLElement) => fromEvent(el, 'click'));
          clickEvents = merge(...events).pipe(tap(e => this.click.emit(e)));
        }
        if (this.hover.observers.length) {
          const events = Array.from(words).map((el: HTMLElement) => fromEvent(el, 'mouseenter'));
          hoverEvents = merge(...events).pipe(tap(e => this.hover.emit(e)));
        }
        return merge(clickEvents, hoverEvents);
      })
    ).subscribe();
  }

  ngOnDestroy() {
    this.events.unsubscribe();
  }

}

@Directive({
  selector: 'teximate[paragraphClick], teximate[paragraphHover]'
})
export class ParagraphEvents extends TeximateEvents {
  private selector = '.teximate-paragraph';
  @Output('paragraphClick') click = new EventEmitter();
  @Output('paragraphHover') hover = new EventEmitter();
  constructor(private element: ElementRef, @Inject(forwardRef(() => Teximate)) private teximate: Teximate) {
    super(element, teximate);
  }
}

@Directive({
  selector: 'teximate[wordClick], teximate[wordHover]'
})
export class WordEvents extends TeximateEvents {
  private selector = '.teximate-word';
  @Output('wordClick') click = new EventEmitter();
  @Output('wordHover') hover = new EventEmitter();
  constructor(private element: ElementRef, @Inject(forwardRef(() => Teximate)) private teximate: Teximate) {
    super(element, teximate);
  }
}

@Directive({
  selector: 'teximate[letterClick], teximate[letterHover]'
})
export class LetterEvents extends TeximateEvents {
  private selector = '.teximate-letter';
  @Output('letterClick') click = new EventEmitter();
  @Output('letterHover') hover = new EventEmitter();
  constructor(private element: ElementRef, @Inject(forwardRef(() => Teximate)) private teximate: Teximate) {
    super(element, teximate);
  }
}
