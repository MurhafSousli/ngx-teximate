export interface Line {
  visibility: string;
  class: string;
  words: Word[];
}

export interface Word {
  visibility: string;
  class: string;
  letters: Letter[];
  animateClass?: string;
  hover?;
}

export interface Letter {
  visibility: string;
  class: string;
  text: string;
  animateClass?: string;
  hover?;
}

export interface TeximateOptions {
  type?: string;
  animation?: {
    name;
    duration;
  };
  word?: {
    type;
    class?;
    delay?;
    hover?;
  };
  letter?: {
    type;
    class?;
    delay?;
    hover?;
  };
}

export interface TeximateHover{
  type: string;
  in?: string;
  out?: string;
}

export const TeximateOrder = {
  SEQUENCE: 'SEQUENCE',
  REVERSE: 'REVERSE',
  SYNC: 'SYNC',
  SHUFFLE: 'SHUFFLE'
};
