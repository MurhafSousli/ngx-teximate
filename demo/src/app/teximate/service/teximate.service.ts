import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/mergeAll';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/switchMap';

import 'rxjs/add/observable/from';
import 'rxjs/add/observable/of';

@Injectable()
export class TeximateService {

  arr = [];

  array = new Subject();
  worker = new Subject();

  lineInterval: number = 0;
  wordInterval: number = 200;
  letterInterval: number = 50;

  constructor() {

    this.worker.switchMap((textArr: any) => {
      console.log('worker executed.');
      return Observable.from(textArr)
        .mergeMap((line: any, i) => Observable.of(line.words).delay(i * this.lineInterval))
        .mergeAll()
        .mergeMap((word: any, i) => Observable.of(word.letters).delay(i * this.wordInterval))
        .mergeAll()
        .mergeMap((letter: any, i) => Observable.of(letter).delay(i * this.letterInterval))
        .do((item) => {
          item.visibility = 'visible';
          this.array.next(this.arr);
        })
    }).subscribe();
  }

  run(text) {
      this.arr = this.textFactory(text);
      this.worker.next(this.arr);
  }

  /** Return 3d array from the text */
  textFactory(text) {

    let linesArr = [];

    let lines = text.split('\n');
    lines.map((line) => {

      let wordArr = [];

      let words = line.split(' ');
      words.filter(word => word !== '').map((word) => {

        let letterArr = [];

        let letters = word.split('');
        letters.map((letter) => {

          let letterItem = {
            text: letter,
            visibility: 'hidden'
          };

          letterArr.push(letterItem);
        });

        let wordItem = {
          letters: letterArr,
          visibility: 'hidden'
        };

        wordArr.push(wordItem);
      });

      let lineItem = {
        words: wordArr,
        visibility: 'hidden'
      }

      linesArr.push(lineItem);
    });

    return linesArr;
  }
}
