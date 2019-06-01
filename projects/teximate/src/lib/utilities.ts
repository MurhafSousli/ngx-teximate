/**
 * Return animation
 */
export function getRandomItemFromArray(arr: any[]): any {
  return arr[Math.floor(Math.random() * arr.length)]
}

export function getRandomNumberFromRange(min, max): number {
  return Math.random() * (max - min) + min;
}

/**
 * Convert text string into a workable text
 */
export function teximateFactory(text: string): string[][][] {
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
        words.push(word.split(/(?!$)/u))
      );
    paragraphs.push(words);
  });
  return paragraphs;
}
