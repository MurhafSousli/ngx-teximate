import { TeximateOrder } from './teximate.class';

export module Helper {

  /** Shuffle Array */
  export const shuffle = (array) => {
    let m = array.length, t, i;
    while (m) {
      i = Math.floor(Math.random() * m--);
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }
    return array;
  };

  export const processWord = (options, arr, i, prevWordLength) => {

    let index;
    let delay;

    switch (options.word.type) {
      case TeximateOrder.SYNC:
        index = i;
        delay = 0;
        break;
      case TeximateOrder.REVERSE:
        index = arr.length - i - 1;
        delay = (prevWordLength * options.letter.delay) + (index * options.word.delay);
        break;
      default:
        // SEQUENCE
        index = i;
        delay = (prevWordLength * options.letter.delay) + (i * options.word.delay);
    }
    return {
      letters: arr[index].letters,
      delay: delay
    };
  };

  export const processLetter = (options, arr, i) => {

    let index;
    let delay;

    switch (options.letter.type) {
      case TeximateOrder.SYNC:
        index = i;
        delay = 0;
        break;
      case TeximateOrder.REVERSE:
        index = arr.length - i - 1;
        delay = i * options.letter.delay;
        break;
      default:
        // SEQUENCE
        index = i;
        delay = i * options.letter.delay;
    }

    return {
      item: arr[index],
      delay: delay
    };
  };
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
