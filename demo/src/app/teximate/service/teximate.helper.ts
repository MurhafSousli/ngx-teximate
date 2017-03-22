export module Helper {

    /** Shuffle Array */
    export const shuffle = (array) => {
        var m = array.length, t, i;
        while (m) {
            i = Math.floor(Math.random() * m--);
            t = array[m];
            array[m] = array[i];
            array[i] = t;
        }
        return array;
    }

    /** Return 3d array from the text */
    export const textFactory = (text): Line[] => {

        let linesArr: Line[] = [];
        /** get text's lines */
        let lines = text.split('\n');
        lines.map((line) => {

            let wordArr: Word[] = [];
            /** get line's words and filter empty words */
            let words = line.split(' ');
            words.filter(word => word !== '').map((word) => {

                let letterArr: Letter[] = [];
                /** get word's letters */
                let letters = word.split('');
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
    }
}

export const WorkType = {
    SEQUENCE: 'SEQUENCE',
    REVERSE: 'REVERSE',
    SYNC: 'SYNC',
    SHUFFLE: 'SHUFFLE'
}

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
}