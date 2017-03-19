export module Helper {

    /** Get Splitter */
    export const getSplitter = (splitter: string): string => {

        switch (splitter.toLowerCase()) {
            case 'letter':
                return '';
            case 'word':
                return ' ';
            case 'line':
                return '\n';
            default:
                console.warn('[texilate]: tmSplit invalid input, fallback to "letter"');
                return 'letter';
        }
    }

    /** Create 2d array from a text */
    function textFactory(text) {

        let linesArr = [];

        let lines = text.split('\n');
        lines.map((line) => {

            let wordArr = [];

            let words = line.split(' ');
            words.map((word) => {
                let letters = word.split('');
                wordArr.push(letters);
            });

            linesArr.push(wordArr);
        });
        return linesArr;
    }

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
}