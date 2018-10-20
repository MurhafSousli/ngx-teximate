import { Word, Letter, Paragraph } from './teximate.model';

/** Convert text string into a workable text */
export function teximateFactory(text: string) {
  const paragraphArr: Paragraph[] = [];

  // Split text into paragraphs
  const paragraphs = text.split('\n');
  paragraphs.map((p: string) => {
    const wordArr: Word[] = [];

    // Split paragraph into words
    const words = p.split(' ');
    words.filter(word => word !== '').map((word, j) => {
      const letterArr: Letter[] = [];

      // Split word into letters
      const letters = word.split(/(?!$)/u);
      letters.map((letter, k) => {
        const letterItem: Letter = {
          value: letter
        };
        letterArr.push(letterItem);
      });

      const wordItem: Word = {
        letters: letterArr
      };
      wordArr.push(wordItem);
    });

    paragraphArr.push({
      words: wordArr
    });
  });
  return paragraphArr;
}
