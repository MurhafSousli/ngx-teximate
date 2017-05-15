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

  /** The processed text */
  arr: Line[] = [];
  /** A worker to do the job async */
  worker = new Subject();
  /** A state used to update the template */
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

  /** Run effect on a new text */
  createEffect(text: string, options: TeximateOptions, hover?: TeximateHover) {

    // Get a processed text to work with
    this.arr = this.textFactory(text, options, hover);

    // Send the job to the worker
    this.worker.next({ options: options, hover: hover });
  }

  /** Run effect on an existing text */
  runEffect(options: TeximateOptions) {

    this.worker.next({ options: options });
  }

  /** The magic that runs the effect on letters */
  lettersJob(options: TeximateOptions): Observable<any> {

    return Observable.from(this.arr)
      .mergeMap((line: any) => {

        // A temp variable used to calculate word's index relative to letters sequence
        let relativeIndex = 0;

        // Shuffle words if shuffle is ordered
        let lineWords = (options.word.type === TeximateOrder.SHUFFLE) ? Helper.shuffle(line.words.slice(0)) : line.words;

        return Observable.of(lineWords)
          .mergeAll()
          .mergeMap((wordItem: Word, j) => {

            // Process word (calculate index & delay according to word's type)
            const word = Helper.processWord(options, lineWords, j, relativeIndex);

            // Set the index for the next word relative to letter sequence
            relativeIndex += word.letters.length;

            // Shuffle letters if letter type is shuffle
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

  /** The magic that runs the effect on words */
  wordsJob(options: TeximateOptions): Observable<any> {

    return Observable.from(this.arr)
      .mergeMap((line: any, i) => {

        // Shuffle words if shuffle is ordered
        let lineWords = (options.word.type === TeximateOrder.SHUFFLE) ? Helper.shuffle(line.words.slice(0)) : line.words;

        return Observable.of(lineWords)
          .mergeAll()
          .mergeMap((wordItem: Word, j) => {

            // Process word (calculate index & delay according to word's type)
            // in this case `options.letter.delay` must be 0
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

  /** Process and convert text string into a workable text */
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
