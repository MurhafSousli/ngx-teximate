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

import { Helper, WorkType, Line, Word, Letter, TeximateOptions, ElementOptions } from './teximate.helper';

@Injectable()
export class TeximateService {

  arr: Line[] = [];

  array = new Subject();
  worker = new Subject();

  lineInterval = 0;
  wordInterval = 300;
  letterInterval = 100;

  constructor() {

    this.worker.switchMap((job: any) => {

      console.log('worker execute:', job.type);

      const options: TeximateOptions = {
        word: {
          type: WorkType.SHUFFLE,
        },
        letter: {
          type: WorkType.SHUFFLE,
          class: 'slideInDown'
        }
      };
      return this.job(job.textArr, options);

    }).subscribe();
  }

  run(text, options?: TeximateOptions) {
    this.arr = Helper.textFactory(text);

    this.worker.next({ textArr: this.arr, options: options });
  }

  job(textArr, options: TeximateOptions): Observable<any> {

    return Observable.from(textArr).mergeMap((line: any, i) => {

      /** To calculate a word's delay, should store the previous word length */
      let prevWordLength = 0;

      /** Shuffle line's words if word type is shuffle */
      let lineWords;
      if (options.word.type === WorkType.SHUFFLE) {
        lineWords = Helper.shuffle(line.words.slice());
      } else {
        lineWords = line.words;
      }

      return Observable.of(lineWords).delay(i * this.lineInterval)
        .mergeAll()
        .mergeMap((wordItem: Word, j) => {

          /** Process word (calculate index & delay according to word's type) */
          const word = this.processWord(options.word.type, lineWords, j, prevWordLength);

          /** To calculate next word's delay */
          prevWordLength = prevWordLength + word.letters.length;

          /** Shuffle word's letter if letter type is shuffle */
          let wordLetters;
          if (options.letter.type === WorkType.SHUFFLE) {
            wordLetters = Helper.shuffle(word.letters.slice());
          } else {
            wordLetters = word.letters;
          }

          return Observable.of(wordLetters).delay(word.delay)
            .mergeAll()
            .mergeMap((letterItem, k) => {

              /** Process letter (calculate index & delay according to letter's type) */
              const letter = this.processLetter(options.letter.type, wordLetters, k);

              return Observable.of(letter.item).delay(letter.delay)
                .do((item) => {
                  /** Apply changes to the letter then update the view */
                  item.visibility = 'visible';
                  item.class = 'animated ' + options.letter.class;
                  this.array.next(textArr);
                });
            });
        });
    });
  }

  processWord(type, arr, i, prevWordLength) {

    let index;
    let delay;

    switch (type) {
      case WorkType.SYNC:
        index = i;
        delay = 0;
        break;
      case WorkType.REVERSE:
        index = arr.length - i - 1;
        delay = (prevWordLength * this.letterInterval) + (i * this.wordInterval);
        break;
      default:
        index = i;
        delay = (prevWordLength * this.letterInterval) + (i * this.wordInterval);
    }
    return {
      letters: arr[index].letters,
      delay: delay
    };
  }

  processLetter(type, arr, i) {

    let index;
    let delay;

    switch (type) {
      case WorkType.SYNC:
        index = i;
        delay = 0;
        break;
      case WorkType.REVERSE:
        index = arr.length - i - 1;
        delay = i * this.letterInterval;
        break;
      default:
        index = i;
        delay = i * this.letterInterval;
    }

    return {
      item: arr[index],
      delay: delay
    };
  }

}