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

  /** Return 3d array from the text */
  export const textFactory = (text): Line[] => {

    const linesArr: Line[] = [];
    /** get text's lines */
    const lines = text.split('\n');
    lines.map((line) => {

      const wordArr: Word[] = [];
      /** get line's words and filter empty words */
      const words = line.split(' ');
      words.filter(word => word !== '').map((word) => {

        const letterArr: Letter[] = [];
        /** get word's letters */
        const letters = word.split('');
        letters.map((letter) => {

          letterArr.push({
            text: letter,
            visibility: 'hidden'
          });
        });

        wordArr.push({
          letters: letterArr,
          visibility: 'hidden'
        });
      });

      linesArr.push({
        words: wordArr,
        visibility: 'hidden'
      });
    });
    return linesArr;
  };
}

export const WorkType = {
  SEQUENCE: 'SEQUENCE',
  REVERSE: 'REVERSE',
  SYNC: 'SYNC',
  SHUFFLE: 'SHUFFLE'
};

export interface Line {
  visibility: string;
  words: Word[];
}

export interface Word {
  visibility: string;
  letters: Letter[];
}

export interface Letter {
  visibility: string;
  text: string;
  class?: string;
}

export interface TeximateOptions {
  line?: ElementOptions;
  word?: ElementOptions;
  letter?: ElementOptions;
}

export interface ElementOptions {
  type;
  class?;
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
