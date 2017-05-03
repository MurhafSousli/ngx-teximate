import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/mergeAll';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/takeWhile';
import 'rxjs/add/operator/catch';

import 'rxjs/add/observable/from';
import 'rxjs/add/observable/of';

import { Helper } from '../helper/teximate.helper';
import { TeximateOptions, TeximateOrder, TeximateHover, Line, Word, Letter } from '../helper/teximate.class';

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

    this.worker
      .takeWhile(() => !this.text.closed)
      .switchMap((job: any) => {
        // console.log('worker execute:', job.type);

        return (job.options.type === 'letter') ?
          this.lettersJob(job.options) :
          this.wordsJob(job.options);
      })
      .catch(res => {
        console.log('[Teximate]:', res);
        return Observable.of(null)
      })
      .subscribe();
  }

  /** Create new text and run the effect on it */
  createEffect(text: string, options: TeximateOptions, hover?: TeximateHover) {

    this.arr = this.textFactory(text, options, hover);
    this.worker.next({ options: options, hover: hover });
  }

  /** Run effect on an existing text */
  runEffect(options: TeximateOptions) {

    this.worker.next({ options: options });
  }

  /** Animation effect for letters */
  lettersJob(options: TeximateOptions): Observable<any> {

    return Observable.from(this.arr)
      .mergeMap((line: any) => {

        /** To calculate a word's delay */
        let prevWordLength = 0;

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
              .mergeMap((letterInstance, k) => {

                /** Process letter (calculate index & delay according to requested order) */
                const letter = Helper.processLetter(options, wordLetters, k);

                return Observable.of(letter.item).delay(letter.delay)
                  .do((letterItem: Letter) => this.updateItem(letterItem, options))
              });
          });
      });
  }

  /** Animation effect for words */
  wordsJob(options: TeximateOptions): Observable<any> {

    return Observable.from(this.arr)
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

            /** Process word (calculate index & delay according to requested order)
             *  in this case `options.letter.delay` must be 0 */
            const word = Helper.processWord(options, lineWords, j, 0);

            return Observable.of(word)
              .delay(word.delay)
              .do(() => this.updateItem(wordItem, options));
          });
      });
  }

  updateItem(item: Letter | Word, options: TeximateOptions) {
    /** Display the letter */
    item.visibility = 'visible';

    /** Set animation class */
    item.animateClass = ` animated ${options.animation.name}`;

    /** Update the array */
    this.text.next(this.arr);
  }

  /** Set word/letter hover animation */
  setItemHover(item: Letter | Word, options: TeximateOptions, hover: TeximateHover) {

    return () => {
      /** hover in effect */
      item.animateClass = ` animated ${(hover.in) ? hover.in : ''}`;
      /** hover out effect */
      setTimeout(() => {
        item.animateClass = ` animated ${(hover.out) ? hover.out : ''}`;
        this.text.next(this.arr);
      }, options.animation.duration);
    };

  }

  /** Return 3d array from the text */
  textFactory(text: string, options: TeximateOptions, hover: TeximateHover) {

    const linesArr: Line[] = [];
    /** get text's lines */
    const lines = text.split('\n');
    lines.map((line, i) => {

      const wordArr: Word[] = [];
      /** get line's words and filter empty words */
      const words = line.split(' ');
      words.filter(word => word !== '').map((word, j) => {

        const letterArr: Letter[] = [];
        /** get word's letters */
        const letters = word.split(/(?!$)/u);
        letters.map((letter, k) => {

          const letterItem: Letter = {
            text: letter,
            class: ' letter' + (k + 1),
            animateClass: ' animated ',
            visibility: (options.type === 'word') ? 'visible' : 'hidden',
            hover: () => {
            }
          };
          if (hover.type === 'letter') {
            letterItem.hover = this.setItemHover(letterItem, options, hover);
          }
          letterArr.push(letterItem);
        });

        const wordItem: Word = {
          letters: letterArr,
          class: ' word' + (j + 1),
          animateClass: ' animated ',
          visibility: 'hidden',
          hover: () => {
          }
        };
        if (hover.type === 'word') {
          wordItem.hover = this.setItemHover(wordItem, options, hover);
        }
        wordArr.push(wordItem);
      });

      linesArr.push({
        words: wordArr,
        class: ' line' + (i + 1),
        visibility: 'hidden'
      });
    });
    return linesArr;
  }
}
