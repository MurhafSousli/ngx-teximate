import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSliderModule } from '@angular/material/slider';
import { MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

import { AppComponent } from './app.component';
import { TeximateModule } from './teximate';
import { AnimationFormComponent } from './animation-form/animation-form.component';

@NgModule({
  declarations: [
    AppComponent,
    AnimationFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonToggleModule,
    MatCardModule,
    MatSelectModule,
    MatToolbarModule,
    MatSliderModule,
    MatButtonModule,
    MatInputModule,
    MatChipsModule,
    TeximateModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
