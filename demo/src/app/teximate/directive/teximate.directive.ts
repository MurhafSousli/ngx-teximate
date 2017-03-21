import { Directive, Input, Renderer, ElementRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Helper } from '../functions.helper';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/mergeAll';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/delay';

import 'rxjs/add/observable/zip';
import 'rxjs/add/observable/timer';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/of';


@Directive({
  selector: '[teximate]'
})
export class TeximateDirective {

  itemsArr = [];

  /** Text input */
  textArr: string[] = [];
  @Input() teximate;

  /** Splite by letter/word/line */
  splitter: string;
  @Input() set tmType(splitter: string) {
    this.splitter = Helper.getSplitter(splitter);
  }

  lineInterval: number = 0;
  wordInterval: number = 0;

  /** The delay used for displaying elements */
  @Input('tmInterval') interval = 0;

  @Input('tmIn') inAnimation;

  @Input() set tmRun(flag) {
    if (this.itemsArr.length > 0) {

      (Observable.from(this.itemsArr)
        .mergeAll())
        .mergeAll()
        .mergeMap((v: any, i) => Observable.of(v).delay(i * this.interval))
        .do((item) => {
          this.renderer.setElementClass(item, this.inAnimation.class, false);
          this.renderer.setElementClass(item, 'bounceOut', true);
        })
        .do(() => {
          this.job().subscribe();
        })
        .subscribe();
    }

  }

  constructor(private renderer: Renderer, private el: ElementRef) { }

  ngOnInit() {
    this.job().subscribe();
  }

  job(): Observable<any> {
    //Check if text is valid
    if (typeof this.teximate !== 'string') {
      console.warn('[texilate]: invalid input');
      return;
    }
    //Prepare host content
    this.renderer.setElementAttribute(this.el.nativeElement, 'aria-label', 'text');
    this.renderer.setElementProperty(this.el.nativeElement, 'innerText', '');

    this.itemsArr = this.textFactory(this.teximate);

    switch (this.inAnimation.method.toLowerCase()) {
      // case 'sequence':
      //   return this.sequence();

      // case 'reverse':
      //   return this.reverse();

      // case 'sync':
      //   return this.sync();

      case 'shuffle':
        return this.shuffle();

      default:
        console.warn('[texilate]: inAnimation invalid method input');
        return Observable.empty();
    }

  }

  textFactory(textBlock: string): string[] {
    //Arrays for DOM elements
    let lineArr = [];
    // put lines into array
    let lines: string[] = textBlock.split('\n');

    lines.map((line, i) => {
      let lineItem = this.createLine(line, i);
      // put words into array
      let wordArr = [];
      let words = line.split(' ');

      words.map((word) => {
        /** Loop over letters */
        let letterArr = [];
        let letters = word.split('');

        let wordItem = this.createWord(lineItem, word, i);

        letters.map((letter, i) => {

          let letterItem = this.createLetter(wordItem, letter, i);
          letterArr.push(letterItem);
        });

        wordArr.push(letterArr);
      });

      lineArr.push(wordArr);
    });
    return lineArr;
  }

  /** Shuffle mode */
  shuffle(): Observable<any> {

    return Observable.from(this.itemsArr)
      .mergeMap((line: any, i) => Observable.of(line).delay(i * this.lineInterval))
      .mergeAll()
      .mergeMap((word: any, i) => {
        return Observable.of(word).delay(i * this.wordInterval)
          .mergeAll()
          .mergeMap((letter: any, i) => Observable.of(letter).delay(i * this.interval))
          .do((item) => this.showItem(item));
      });
  }

  /** Sync mode */
  sync(): Observable<any> {
    // return Observable.from(this.textArr)
    //   .map((text, i) => {
    //     let item = this.createWord(text, i);
    //     this.showItem(item);
    //   });

    return Observable.from(this.itemsArr)
      .mergeMap((line: any, i) => Observable.of(line).delay(i * this.lineInterval))
      .mergeAll()
      .mergeMap((word: any, i) => {
        return Observable.of(word).delay(i * this.wordInterval)
          .mergeAll()
          .mergeMap((letter: any, i) => Observable.of(letter).delay(i * this.interval))
          .do((item) => this.showItem(item));
      });
  }

  // /** Sequence mode */
  // sequence(): Observable<any> {
  //   return Observable.zip(
  //     Observable.from(this.textArr)
  //       .map((text, i) => {
  //         let item = this.createWord(text, i);
  //         this.showItem(item);
  //       }),
  //     Observable.timer(0, this.interval), (item, i) => {
  //       this.showItem(this.itemsArr[i]);
  //     });
  // }

  // /** Reverse mode */
  // reverse(): Observable<any> {

  //   return Observable.zip(
  //     Observable.from(this.textArr)
  //       .map((text, i) => {
  //         let item = this.createWord(text, i);
  //         this.showItem(item);
  //       }),

  //     Observable.timer(0, this.interval), (item, i) => {
  //       this.showItem(this.itemsArr[this.itemsArr.length - i - 1]);
  //     });
  // }

  /** Create and return DOM element from the text input */
  createLetter(word: HTMLElement, text: string, i: number): HTMLElement {

    let letter = this.renderer.createElement(word, 'span');
    this.renderer.setElementProperty(letter, 'innerText', text);
    this.renderer.setElementAttribute(letter, 'aria-hidden', 'true');
    this.renderer.setElementStyle(letter, 'display', 'inline-block');
    this.renderer.setElementStyle(letter, 'visibility', 'hidden');

    /** Set element class e.g. "char char1" */
    this.renderer.setElementClass(letter, 'char', true);
    this.renderer.setElementClass(letter, 'char' + i, true);

    /** Add animation class */
    this.renderer.setElementClass(letter, 'animated', true);

    return letter;
  }

  /** Create and return DOM element from the text input */
  createWord(line: HTMLElement, text: string, i: number): HTMLElement {

    if (text === '') return;

    let word = this.renderer.createElement(line, 'span');

    this.renderer.setElementAttribute(word, 'aria-hidden', 'true');
    this.renderer.setElementStyle(word, 'display', 'inline-block');
    this.renderer.setElementStyle(word, 'visibility', 'hidden');
    this.renderer.setElementStyle(word, 'margin-right', '8px');

    /** Set element class e.g. "word word1" */
    this.renderer.setElementClass(word, 'word', true);
    this.renderer.setElementClass(word, 'word' + i, true);


    /** Add animation class */
    this.renderer.setElementClass(word, 'animated', true);

    return word;
  }

  createLine(text: string, i: number): HTMLElement {
    let line = this.renderer.createElement(this.el.nativeElement, 'div');

    this.renderer.setElementAttribute(line, 'aria-hidden', 'true');
    this.renderer.setElementStyle(line, 'visibility', 'hidden');

    /** Set element class e.g. "line line1" */
    this.renderer.setElementClass(line, 'line', true);
    this.renderer.setElementClass(line, 'line' + i, true);

    return line;
  }

  /** Display DOM element */
  showItem(item: HTMLElement) {
    this.renderer.setElementClass(item, this.inAnimation.class, true);
    this.renderer.setElementStyle(item, 'visibility', 'visible');
  }
}


/**
 * 
  /** The class will be added on element hover 
  @Input('tmHoverClass') hoverClass: string;

  /** The class will be added on element click 
  @Input('tmClickClass') clickClass: string;

  @Input('tmOut') outAnimation;
 * 
  hoverEvent(item) {
    /** Add class on onmouseenter 
    this.renderer.setElementProperty(item, 'onmouseenter', () => {
      this.renderer.setElementClass(item, this.hoverClass, true);
    });
    /** remove class on onmouseleave 
    this.renderer.setElementProperty(item, 'onmouseleave', () => {
      setTimeout(() => {
        this.renderer.setElementClass(item, this.hoverClass, false);
      }, this.interval);
    });
  }

  clickEvent(item, className) {
    this.renderer.setElementProperty(item, 'onclick', () => {
      this.renderer.setElementClass(item, className, true);
    });
  }


    /** fix for poor ios performance 
    // this.renderer.setElementStyle(word, '-webkit-transform', 'translate3d(0,0,0)');
    // this.renderer.setElementStyle(word, '-moz-transform', 'translate3d(0,0,0)');
    // this.renderer.setElementStyle(word, '-o-transform', 'translate3d(0,0,0)');
    // this.renderer.setElementStyle(word, 'transform', 'translate3d(0,0,0)');
 */