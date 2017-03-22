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

import { Helper, WorkType, Line, Word, Letter } from './teximate.helper';

@Injectable()
export class TeximateService {

  arr: Line[] = [];

  array = new Subject();
  worker = new Subject();

  lineInterval: number = 0;
  wordInterval: number = 0;
  letterInterval: number = 100;

  constructor() {

    this.worker.switchMap((job: any) => {

      console.log('worker execute:', job.type);

      switch (job.type.toUpperCase()) {
        case WorkType.SEQUENCE:
          return this.sequence(job.textArr);

        case WorkType.REVERSE:
          return this.reverse(job.textArr);

        case WorkType.SYNC:
          return this.sync(job.textArr);

        case WorkType.SHUFFLE:
          return this.shuffle(job.textArr);
          
        default:
          console.warn('[texilate]: inAnimation invalid method input');
          return Observable.empty();
      }
    }).subscribe();
  }

  run(text) {
    this.arr = Helper.textFactory(text);
    this.worker.next({ textArr: this.arr, type: WorkType.SHUFFLE });
  }

  sequence(textArr): Observable<any> {

    return Observable.from(textArr)
      .mergeMap((line: any, i) => {

        let temp = 0;

        return Observable.of(line.words).delay(i * this.lineInterval)
          .mergeAll()
          .mergeMap((word: Word, j) => {

            /** Word method */
            let wordIndex = j;
            let wordItem = line.words[wordIndex].letters;
            let wordDelay = (temp * this.letterInterval) + (j * this.wordInterval);
            temp = temp + wordItem.length;

            return Observable.of(wordItem).delay(wordDelay)
              .mergeAll()
              .mergeMap((letter: Letter, k) => {

                /** Letter method */
                let letterIndex = k;
                let letterItem = wordItem[letterIndex];
                let letterDelay = k * this.letterInterval;

                return Observable.of(letterItem).delay(letterDelay)
                  .do((item: Letter) => {

                    item.visibility = 'visible';
                    this.array.next(textArr);
                  })
              })
          })
      })
  }

  /** Reverse mode */
  reverse(textArr: Line[]): Observable<any> {

    return Observable.from(textArr)
      .mergeMap((line: any, i) => {

        let temp = 0;

        return Observable.of(line.words).delay(i * this.lineInterval)
          .mergeAll()
          .mergeMap((word: Word, j) => {

            /** Word method */
            let wordIndex = line.words.length - j - 1;
            let wordItem = line.words[wordIndex].letters;
            let wordDelay = (temp * this.letterInterval) + (j * this.wordInterval);
            temp = temp + wordItem.length;

            return Observable.of(wordItem).delay(wordDelay)
              .mergeAll()
              .mergeMap((letter: Letter, k) => {

                /** Letter method */
                let letterIndex = wordItem.length - k - 1;
                let letterItem = wordItem[letterIndex];
                let letterDelay = k * this.letterInterval;

                return Observable.of(letterItem).delay(letterDelay)
                  .do((item: Letter) => {

                    item.visibility = 'visible';
                    this.array.next(textArr);
                  })
              })
          })
      })
  }


  sync(textArr): Observable<any> {

    let wordSync = 1;
    let letterSync = 0;

    return Observable.from(textArr)
      .mergeMap((line: any, i) => {

        let temp = 0;

        return Observable.of(line.words).delay(i * this.lineInterval)
          .mergeAll()
          .mergeMap((word: Word, j) => {

            /** Word method */
            let wordIndex = j;
            let wordItem = line.words[wordIndex].letters;
            let wordDelay = ((temp * this.letterInterval) + (j * this.wordInterval)) * wordSync;
            temp = temp + wordItem.length;

            return Observable.of(wordItem).delay(wordDelay)
              .mergeAll()
              .mergeMap((letter: Letter, k) => {

                /** Letter method */
                let letterIndex = k;
                let letterItem = wordItem[letterIndex];
                let letterDelay = k * this.letterInterval * letterSync;

                return Observable.of(letterItem).delay(letterDelay)
                  .do((item: Letter) => {

                    item.visibility = 'visible';
                    this.array.next(textArr);
                  })
              })
          })
      })
  }


  shuffle(textArr): Observable<any> {

    let wordSync = 1;
    let letterSync = 0;

    return Observable.from(textArr)
      .mergeMap((line: any, i) => {

        let temp = 0;

        return Observable.of(line.words).delay(i * this.lineInterval)
          .mergeAll()
          .mergeMap((word: Word, j) => {

            /** Word method */
            let wordIndex = j;
            let wordItem = line.words[wordIndex].letters;
            let wordDelay = ((temp * this.letterInterval) + (j * this.wordInterval)) * wordSync;
            temp = temp + wordItem.length;

            return Observable.of(wordItem).delay(wordDelay)
              .mergeAll()
              .mergeMap((letter: Letter, k) => {

                /** Letter method */
                let letterIndex = k;
                let letterItem = wordItem[letterIndex];
                let letterDelay = k * this.letterInterval * letterSync;

                return Observable.of(letterItem).delay(letterDelay)
                  .do((item: Letter) => {

                    item.visibility = 'visible';
                    this.array.next(textArr);
                  })
              })
          })
      })
  }

}

/**
 * 
 * 
    return Observable.from(textArr)
      .mergeMap((line: any, i) => Observable.of(line.words).delay(i * this.lineInterval))
      .mergeAll()
      .mergeMap((word: any, i) => Observable.of(word.letters).delay(i * this.wordInterval))
      .mergeAll()
      .mergeMap((letter: any, i) => Observable.of(letter).delay(i * this.letterInterval))
      .do((item: Letter) => {
        item.visibility = 'visible';
        this.array.next(textArr);
      })
 */