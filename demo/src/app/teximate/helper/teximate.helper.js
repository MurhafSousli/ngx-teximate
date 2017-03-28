import { TeximateOrder } from './teximate.class';
export var Helper;
(function (Helper) {
    /** Shuffle Array */
    Helper.shuffle = function (array) {
        var m = array.length, t, i;
        while (m) {
            i = Math.floor(Math.random() * m--);
            t = array[m];
            array[m] = array[i];
            array[i] = t;
        }
        return array;
    };
    /** Return 3d array from the text */
    Helper.textFactory = function (text) {
        var linesArr = [];
        /** get text's lines */
        var lines = text.split('\n');
        lines.map(function (line, i) {
            var wordArr = [];
            /** get line's words and filter empty words */
            var words = line.split(' ');
            words.filter(function (word) { return word !== ''; }).map(function (word, j) {
                var letterArr = [];
                /** get word's letters */
                var letters = word.split(/(?!$)/u);
                letters.map(function (letter, k) {
                    letterArr.push({
                        text: letter,
                        class: ' letter' + (k + 1),
                        visibility: 'hidden'
                    });
                });
                wordArr.push({
                    letters: letterArr,
                    class: ' word' + (j + 1),
                    visibility: 'hidden'
                });
            });
            linesArr.push({
                words: wordArr,
                class: ' line' + (i + 1),
                visibility: 'hidden'
            });
        });
        return linesArr;
    };
    Helper.processWord = function (options, arr, i, prevWordLength) {
        var index;
        var delay;
        switch (options.word.type) {
            case TeximateOrder.SYNC:
                index = i;
                delay = 0;
                break;
            case TeximateOrder.REVERSE:
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
    };
    Helper.processLetter = function (options, arr, i) {
        var index;
        var delay;
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
                index = i;
                delay = i * options.letter.delay;
        }
        return {
            item: arr[index],
            delay: delay
        };
    };
})(Helper || (Helper = {}));
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
//# sourceMappingURL=teximate.helper.js.map