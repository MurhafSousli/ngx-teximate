import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ObserversModule} from '@angular/cdk/observers';
import { Teximate } from './teximate';
import {TeximateContent} from './teximate-content';

@NgModule({
  declarations: [
    Teximate,
    TeximateContent
  ],
  imports: [
    CommonModule,
    ObserversModule
  ],
  exports: [
    Teximate,
    TeximateContent
  ]
})
export class TeximateModule {
}
