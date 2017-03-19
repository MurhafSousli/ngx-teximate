import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeximateDirective } from './directive/teximate.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [TeximateDirective],
  exports: [TeximateDirective]
})
export class TeximateModule { }
