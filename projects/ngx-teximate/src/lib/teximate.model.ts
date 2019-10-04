import { InjectionToken } from '@angular/core';
import { AnimationReferenceMetadata } from '@angular/animations';

export type TeximateAnimationSelector = 'paragraph' | 'word' | 'letter';

export interface TeximateTimeline {
  content: string[][][];
  type: TeximateAnimationSelector;
  isPlaying: boolean;
}

export interface TeximateOptions {
  type?: 'enter' | 'leave' | 'default';
  selector?: TeximateAnimationSelector;
  delay?: number;
  animation?: AnimationReferenceMetadata;
  autoPlay?: boolean;
}

export const TEXIMATE_OPTIONS = new InjectionToken<TeximateOptions>('TEXIMATE_OPTIONS');
