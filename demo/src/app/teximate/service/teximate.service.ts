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

import { Helper, WorkType, Line, Word, Letter, TeximateOptions } from './teximate.helper';

/** This service is not meant to be used outside TeximateModule
 *  Each component instance has service instance
 */
@Injectable()
export class TeximateService {

  arr: Line[] = [];

  array = new Subject();
  worker = new Subject();

  constructor() {

    this.worker.switchMap((job: any) => {

      // console.log('worker execute:', job.options);

      return this.job(job.textArr, job.options);

    }).subscribe();
  }


  run(text: string, options: TeximateOptions) {    
    this.arr = Helper.textFactory(text);
    this.worker.next({ textArr: this.arr, options: options });
  }

  runEffect(options: TeximateOptions) {
    this.worker.next({ textArr: this.arr, options: options });
  }


  job(textArr, options: TeximateOptions): Observable<any> {

    return Observable.from(textArr)
      .mergeMap((line: any, i) => {

        /** To calculate a word's delay, should store the previous word length */
        let prevWordLength = 0;

        return Observable.of(line.words)
          .mergeAll()
          .mergeMap((wordItem: Word, j) => {

            /** Process word (calculate index & delay according to word's type) */
            const word = this.processWord(options, line.words, j, prevWordLength);

            /** To calculate next word's delay */
            prevWordLength = prevWordLength + word.letters.length;

            /** Shuffle word's letter if letter type is shuffle */
            let wordLetters;
            if (options.letter.type === WorkType.SHUFFLE) {
              wordLetters = Helper.shuffle(word.letters.slice());
            } else {
              wordLetters = word.letters;
            }

            /** Apply changes to the letter then update the view */
            wordItem.visibility = 'visible';
            /** set animation and custom classes */
            wordItem.animateClass = ` animated ${options.animation.name}`;

            return Observable.of(wordLetters).delay(word.delay)
              .mergeAll()
              .mergeMap((letterItem, k) => {

                /** Process letter (calculate index & delay according to letter's type) */
                const letter = this.processLetter(options, wordLetters, k);

                return Observable.of(letter.item).delay(letter.delay)
                  .do((letterItem: Letter) => {

                    /** Apply changes to the letter then update the view */
                    letterItem.visibility = 'visible';
                    /** set animation and custom classes */
                    letterItem.animateClass = ` animated ${options.animation.name}`;
                    this.array.next(textArr);
                  });
              });
          });
      });
  }

  processWord(options, arr, i, prevWordLength) {

    let index;
    let delay;

    switch (options.word.type) {
      case WorkType.SYNC:
        index = i;
        delay = 0;
        break;
      case WorkType.REVERSE:
        index = arr.length - i - 1;
        delay = (prevWordLength * options.letter.delay) + (i * options.word.delay);
        break;
      default:
        index = i;
        delay = (prevWordLength * options.letter.delay) + (i * options.word.delay);
    }
    return {
      letters: arr[index].letters,
      delay: delay
    };
  }

  processLetter(options, arr, i) {

    let index;
    let delay;

    switch (options.letter.type) {
      case WorkType.SYNC:
        index = i;
        delay = 0;
        break;
      case WorkType.REVERSE:
        index = arr.length - i - 1;
        delay = i * options.letter.delay;
        break;
      default:
        index = i;
        delay = i * options.letter.delay;
    }

    return {
      item: arr[index],
      delay: delay
    };
  }

}