import { AnimationReferenceMetadata } from '@angular/animations';

export interface Paragraph {
  words: Word[];
}

export interface Word {
  letters: Letter[];
}

export interface Letter {
  value: string;
}

export interface PlayerConfig {
  id?: string;
  type?: string;
  delay?: number;
  isEnter?: boolean;
  animation?: AnimationReferenceMetadata;
}

export interface TextAnimation {
  id?: string;
  delay?: number;
  type?: 'paragraph' | 'word' | 'letter';
  animation?: AnimationReferenceMetadata;
}
