import { AnimationReferenceMetadata } from '@angular/animations';

export interface TeximateState {
  currAnimation?: string;
  isPlaying: boolean;
}

export interface TeximateTimeline {
  player: TeximateAnimation;
  content: string[][][];
  type: 'paragraph' | 'word' | 'letter';
  isPlaying: boolean;
}

export interface TeximateAnimation {
  selector: 'paragraph' | 'word' | 'letter';
  delay: number;
  animation: AnimationReferenceMetadata;
}


export interface TeximateBuilderState {
  content: string[][][];
  animation: AnimationReferenceMetadata;
  animationDelay: number;
  selector: 'paragraph' | 'word' | 'letter';
}
