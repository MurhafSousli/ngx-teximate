import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatSliderModule } from '@angular/material/slider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

import { TeximateModule } from '../../projects/teximate/src/public_api';
// import { TeximateModule } from 'ngx-teximate';

import { AppComponent } from './app.component';
import { AnimationFormComponent } from './animation-form/animation-form.component';
import { GithubRepoComponent } from './github-repo/github-repo.component';

@NgModule({
  declarations: [
    AppComponent,
    AnimationFormComponent,
    GithubRepoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonToggleModule,
    TextFieldModule,
    MatIconModule,
    MatSelectModule,
    MatToolbarModule,
    MatSliderModule,
    MatButtonModule,
    MatInputModule,
    MatChipsModule,
    TeximateModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
