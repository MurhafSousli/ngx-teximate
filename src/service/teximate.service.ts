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

import { Helper } from '../helper/teximate.helper';
import { TeximateOptions, TeximateOrder, Line, Word, Letter } from '../helper/teximate.class';

/** This service is not meant to be used outside TeximateModule
 *  Each component instance has service instance
 */
@Injectable()
export class TeximateService {

  /** The text array coming from text factory */
  arr: Line[] = [];
  /** a worker to teximate the array */
  worker = new Subject();
  /** the teximated text to be displayed on the view */
  text = new Subject();

  constructor() {

    this.worker.switchMap((job: any) => {
      // console.log('worker execute:', job.type);

      return (job.type === 'word') ?
        this.wordsJob(job.textArr, job.options) :
        this.lettersJob(job.textArr, job.options)

    }).subscribe();
  }

  /** Create new text and run the effect on it */
  run(text: string, options: TeximateOptions, type: string) {

    this.arr = Helper.textFactory(text);
    this.worker.next({ textArr: this.arr, options: options, type: type });
  }

  /** Run effect on an existing text */
  runEffect(options: TeximateOptions, type: string) {

    this.worker.next({ textArr: this.arr, options: options, type: type });
  }

  /** Animation effect for letters */
  lettersJob(textArr, options: TeximateOptions): Observable<any> {

    return Observable.from(textArr)
      .mergeMap((line: any) => {

        /** To calculate a word's delay */
        let prevWordLength = 0;

        /** Shuffle line's word if word type is shuffle */
        let lineWords;
        if (options.word.type === TeximateOrder.SHUFFLE) {
          console.log(options.letter.type);
          lineWords = Helper.shuffle(line.words.slice());
        } else {
          lineWords = line.words;
        }

        return Observable.of(lineWords)
          .mergeAll()
          .mergeMap((wordItem: Word, j) => {

            /** Process word (calculate index & delay according to word's type) */
            const word = Helper.processWord(options, lineWords, j, prevWordLength);

            /** To calculate next word's delay */
            prevWordLength = prevWordLength + word.letters.length;

            /** Shuffle word's letter if letter type is shuffle */
            let wordLetters;
            if (options.letter.type === TeximateOrder.SHUFFLE) {
              wordLetters = Helper.shuffle(word.letters.slice());
            } else {
              wordLetters = word.letters;
            }

            return Observable.of(wordLetters).delay(word.delay)
              .mergeAll()
              .mergeMap((letterItem, k) => {

                /** Process letter (calculate index & delay according to letter's type) */
                const letter = Helper.processLetter(options, wordLetters, k);

                return Observable.of(letter.item).delay(letter.delay)
                  .do((letterItem: Letter) => {

                    /** Display the letter */
                    letterItem.visibility = 'visible';
                    /** Set animation class */
                    letterItem.animateClass = ` animated ${options.animation.name}`;
                    /** Update the array */
                    this.text.next(textArr);
                  });
              });
          });
      });
  }

  /** Animation effect for words */
  wordsJob(textArr, options: TeximateOptions): Observable<any> {

    return Observable.from(textArr)
      .mergeMap((line: any, i) => {

        /** Shuffle line's word if word type is shuffle */
        let lineWords;
        if (options.word.type === TeximateOrder.SHUFFLE) {
          lineWords = Helper.shuffle(line.words.slice());
        } else {
          lineWords = line.words;
        }

        return Observable.of(lineWords)
          .mergeAll()
          .mergeMap((wordItem: Word, j) => {

            /** Process word (calculate index & delay according to word's type)
             *  in this case `options.letter.delay` must be 0 */
            const word = Helper.processWord(options, lineWords, j, 0);

            return Observable.of(word)
              .delay(word.delay)
              .do(() => {

                /** display the word */
                wordItem.visibility = 'visible';
                /** Set animation class */
                wordItem.animateClass = ` animated ${options.animation.name}`;
                /** Update the array */
                this.text.next(textArr);
              })
          });
      });
  }

}


