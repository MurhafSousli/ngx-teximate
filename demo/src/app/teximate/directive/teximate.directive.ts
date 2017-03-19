import { Directive, Input, Renderer, ElementRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/delay';

import 'rxjs/add/observable/zip';
import 'rxjs/add/observable/timer';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/empty';

@Directive({
  selector: '[teximate]'
})
export class TeximateDirective {

  arr = [];

  /** Text input */
  text: string[] = [];
  @Input() teximate;

  /** Splite by letter/word/line */
  splitter: string;
  @Input() set tmSplitter(splitter: string) {
    switch (splitter.toLowerCase()) {
      case 'letter':
        this.splitter = '';
        break;
      case 'word':
        this.splitter = ' ';
        break;
      case 'line':
        this.splitter = '\n';
        break
      default: console.warn('[texilate]: tmSplit invalid input');
    }
  }

  /** The classes to add to each element */
  classes: string[] = [];
  @Input() set tmClass(classes: string) {
    this.classes = classes.split(' ');
  }

  /** The delay used for displaying elements */
  @Input('tmInterval') interval = 0;

  /** The class will be added on element hover */
  @Input('tmHoverClass') hoverClass: string;

  /** The class will be added on element click */
  @Input('tmClickClass') clickClass: string;

  @Input('tmIn') inAnimation;
  @Input('tmOut') outAnimation;

  job$: Observable<any>;

  @Input() set tmRun(flag) {
    if (flag) {
      this.job$.subscribe();
    }
  }

  constructor(private renderer: Renderer, private el: ElementRef) { }

  ngOnInit() {
    this.job$ = this.job();
  }

  job(): Observable<any> {
    //Check if text is valid
    if (typeof this.teximate !== 'string') {
      console.warn('[texilate]: invalid input');
      return;
    }
    //Create array of string element
    this.text = this.teximate.split(this.splitter);

    //Prepare host content
    this.renderer.setElementAttribute(this.el.nativeElement, 'aria-label', 'text');
    this.renderer.setElementProperty(this.el.nativeElement, 'innerText', '');

    switch (this.inAnimation.method.toLowerCase()) {
      case 'sequence':
        return this.sequence();

      case 'reverse':
        return this.reverse();

      case 'sync':
        return this.sync();

      case 'shuffle':
        return this.shuffle();

      default:
        console.warn('[texilate]: inAnimation invalid method input');
        return Observable.empty();
    }

  }

  shuffle(): Observable<any> {
    return Observable.zip(
      Observable.from(this.text)
        .map((item) => this.arr.push(this.createItem(item)))
        .do(() => this.arr = shuffle(this.arr)),

      Observable.timer(0, 500), (item, i) => {
        this.showItem(this.arr[i]);
      });
  }

  sync(): Observable<any> {
    return Observable.from(this.text)
      .map((text) => {
        let item = this.createItem(text);
        this.showItem(item);
      });
  }

  sequence(): Observable<any> {

    return Observable.zip(
      Observable.from(this.text)
        .map((text) => this.arr.push(this.createItem(text))),

      Observable.timer(0, 500), (item, i) => {
        this.showItem(this.arr[i]);
      });
  }

  reverse(): Observable<any> {

    return Observable.zip(
      Observable.from(this.text)
        .map((item) => this.arr.push(this.createItem(item))),

      Observable.timer(0, 500), (item, i) => {
        this.showItem(this.arr[this.arr.length - i - 1]);
      });

  }

  createItem(text: string): HTMLElement {

    let item = this.renderer.createElement(this.el.nativeElement, 'span');

    this.renderer.setElementProperty(item, 'innerText', text + this.splitter);
    this.renderer.setElementAttribute(item, 'aria-hidden', 'true');

    this.renderer.setElementClass(item, 'animated', true);
    this.renderer.setElementStyle(item, 'visibility', 'hidden');

    /** Add animation class */
    this.renderer.setElementClass(item, this.inAnimation.class, true);

    /** Add classes */
    this.classes.map((className) => {
      this.renderer.setElementClass(item, className, true);
    });

    /**  */
    this.renderer.setElementClass(item, this.inAnimation.class, true);

    return item;
  }

  showItem(item: HTMLElement) {

    this.renderer.setElementStyle(item, 'visibility', 'visible');
  }

  hoverEvent(item) {
    /** Add class on onmouseenter */
    this.renderer.setElementProperty(item, 'onmouseenter', () => {
      this.renderer.setElementClass(item, this.hoverClass, true);
    });
    /** remove class on onmouseleave */
    this.renderer.setElementProperty(item, 'onmouseleave', () => {
      setTimeout(() => {
        this.renderer.setElementClass(item, this.hoverClass, false);
      }, this.interval);
    });
  }

  clickEvent(item) {
    this.renderer.setElementProperty(item, 'onclick', () => {
      this.renderer.setElementClass(item, this.clickClass, true);
    });
  }
}


function shuffle(array) {
  var m = array.length, t, i;

  // While there remain elements to shuffle…
  while (m) {

    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}
