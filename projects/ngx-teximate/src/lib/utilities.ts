/**
 * Convert text string into a workable text
 */
export function teximateFactory(text: string, selector?: string): string[][][] {
  const paragraphs: string[][][] = [];
  // Split text into paragraphs
  text.split('\n').map((paragraph: string) => {
    const words: string[][] = [];
    // Split paragraph into words
    paragraph
      .split(' ')
      .filter(word => word !== '')
      .map((word: string) =>
        // Split word into letters
        words.push((selector === 'word') ? [word] : word.split(/(?!$)/u))
      );
    paragraphs.push(words);
  });
  return paragraphs;
}
