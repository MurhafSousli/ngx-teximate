import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeximateComponent } from './component/teximate.component';
import { TeximateService } from './service/teximate.service';

@NgModule({
  imports: [CommonModule],
  providers: [TeximateService],
  declarations: [TeximateComponent],
  exports: [TeximateComponent]
})
export class TeximateModule { }
