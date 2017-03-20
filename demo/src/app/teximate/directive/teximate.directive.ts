import { Directive, Input, Renderer, ElementRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Helper } from '../functions.helper';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

import 'rxjs/add/observable/zip';
import 'rxjs/add/observable/timer';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/empty';

@Directive({
  selector: '[teximate]'
})
export class TeximateDirective {

  itemsArr;

  /** Text input */
  textArr: string[] = [];
  @Input() teximate;

  /** Splite by letter/word/line */
  splitter: string;
  @Input() set tmSplitter(splitter: string) {
    this.splitter = Helper.getSplitter(splitter);
  }

  /** The delay used for displaying elements */
  @Input('tmInterval') interval = 0;

  /** The class will be added on element hover */
  @Input('tmHoverClass') hoverClass: string;

  /** The class will be added on element click */
  @Input('tmClickClass') clickClass: string;

  @Input('tmIn') inAnimation;
  @Input('tmOut') outAnimation;

  // job: Observable<any>;

  @Input() set tmRun(flag) {
    if (flag) {
      // this.job
      this.itemsArr.map(item => {
        this.renderer.setElementClass(item, this.inAnimation.class, false);
        this.renderer.setElementClass(item, 'bounceOut', true);
      });
      setTimeout(() => {

        this.textFactory().subscribe();
      }, 2000);
    }
  }

  constructor(private renderer: Renderer, private el: ElementRef) { }

  ngOnInit() {
    this.textFactory().subscribe();
  }

  textFactory(): Observable<any> {
    //Check if text is valid
    if (typeof this.teximate !== 'string') {
      console.warn('[texilate]: invalid input');
      return;
    }
    this.itemsArr = [];
    //Create array of string element
    this.textArr = this.teximate.split(this.splitter);

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

  /** Shuffle mode */
  shuffle(): Observable<any> {
    return Observable.zip(
      Observable.from(this.textArr)
        .map((text, i) => this.itemsArr.push(this.createItem(text, i, 'char')))
        .do(() => this.itemsArr = Helper.shuffle(this.itemsArr)),

      Observable.timer(0, this.interval), (item, i) => {
        this.showItem(this.itemsArr[i]);
      });
  }

  /** Sync mode */
  sync(): Observable<any> {
    return Observable.from(this.textArr)
      .map((text, i) => {
        let item = this.createItem(text, i, 'char');
        this.showItem(item);
      });
  }

  /** Sequence mode */
  sequence(): Observable<any> {
    return Observable.zip(
      Observable.from(this.textArr)
        .map((text, i) => {
          let item = this.createItem(text, i, 'char');
          this.showItem(item);
        }),
      Observable.timer(0, this.interval), (item, i) => {
        this.showItem(this.itemsArr[i]);
      });
  }

  /** Reverse mode */
  reverse(): Observable<any> {

    return Observable.zip(
      Observable.from(this.textArr)
        .map((text, i) => {
          let item = this.createItem(text, i, 'char');
          this.showItem(item);
        }),

      Observable.timer(0, this.interval), (item, i) => {
        this.showItem(this.itemsArr[this.itemsArr.length - i - 1]);
      });
  }

  /** Create and return DOM element from the text input */
  createItem(text: string, i: number, className: string): HTMLElement {

    let item = this.renderer.createElement(this.el.nativeElement, 'span');
    this.renderer.setElementProperty(item, 'innerText', text + this.splitter);
    this.renderer.setElementAttribute(item, 'aria-hidden', 'true');
    this.renderer.setElementStyle(item, 'display', 'inline-block');
    this.renderer.setElementStyle(item, 'visibility', 'hidden');

    /** Set element class e.g. "char char1" */
    this.renderer.setElementClass(item, className, true);
    this.renderer.setElementClass(item, className + i, true);

    /** Add animation class */
    this.renderer.setElementClass(item, 'animated', true);

    return item;
  }

  /** Display DOM element */
  showItem(item: HTMLElement) {
    this.renderer.setElementClass(item, this.inAnimation.class, true);
    this.renderer.setElementStyle(item, 'visibility', 'inherit');
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

