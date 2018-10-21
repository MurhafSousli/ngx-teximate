import { AnimationReferenceMetadata } from '@angular/animations';

export interface TextAnimation {
  id?: string;
  delay?: number;
  isEnter?: boolean;
  type?: 'paragraph' | 'word' | 'letter';
  animation?: AnimationReferenceMetadata;
}
