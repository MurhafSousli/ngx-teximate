import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullPagesComponent } from './full-pages/full-pages.component';
import { FullPageComponent } from './full-page/full-page.component';
import { FullPageNavComponent } from './full-page-nav/full-page-nav.component';

@NgModule({
    declarations: [
      FullPagesComponent,
      FullPageComponent,
      FullPageNavComponent
    ],
    providers: [],
    imports: [CommonModule],
    exports: [
      FullPagesComponent,
      FullPageComponent,
      FullPageNavComponent
    ]
})
export class FullpageModule {
}
