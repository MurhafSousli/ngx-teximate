import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Teximate } from './teximate';
import { ParagraphEvents, WordEvents, LetterEvents } from './teximate-events';

@NgModule({
  imports: [CommonModule],
  declarations: [
    Teximate,
    ParagraphEvents,
    WordEvents,
    LetterEvents
  ],
  exports: [
    Teximate,
    ParagraphEvents,
    WordEvents,
    LetterEvents
  ]
})
export class TeximateModule {
}
