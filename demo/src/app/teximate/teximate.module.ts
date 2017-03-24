import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeximateDirective } from './directive/teximate.directive';
import { TeximateComponent } from './component/teximate.component';
import { TeximateService } from './service/teximate.service';

@NgModule({
  imports: [CommonModule],
  providers: [TeximateService],
  declarations: [TeximateDirective, TeximateComponent],
  exports: [TeximateDirective, TeximateComponent]
})
export class TeximateModule { }
