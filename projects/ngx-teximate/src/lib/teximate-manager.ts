import { Inject, Injectable, Optional } from '@angular/core';
import { TEXIMATE_OPTIONS, TeximateOptions } from './teximate.model';
import { rotateOutDownLeft } from 'ng-animate';

const defaultOptions: TeximateOptions = {
  autoPlay: true,
  delay: 50,
  selector: 'letter',
  type: 'enter',
  animation: rotateOutDownLeft
};

@Injectable({ providedIn: 'root' })
export class TeximateManager {
  readonly globalOptions: TeximateOptions;

  constructor(@Optional() @Inject(TEXIMATE_OPTIONS) options: TeximateOptions) {
    this.globalOptions = options ? { ...defaultOptions, ...options } : defaultOptions;
  }
}
